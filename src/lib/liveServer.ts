import crypto from 'crypto';
import prisma from '@/lib/prisma';
import { decryptSecret } from '@/lib/secretBox';
import {
  DestinationDto,
  WorkerStatus,
  liveEndpoints,
  publicNameFor,
} from '@/lib/live';
import { restreamer, restreamerConfigured, RestreamerDestination } from '@/lib/restreamer';

// Server-only helpers for the live multistream (Prisma + restreamer).

export const generateIngestKey = () => crypto.randomBytes(24).toString('base64url');

export function toDestinationDto(row: {
  id: string;
  platform: string;
  label: string;
  rtmpUrl: string;
  keyHint: string | null;
  profileUrl: string | null;
  enabled: boolean;
}): DestinationDto {
  return {
    id: row.id,
    platform: row.platform,
    label: row.label,
    rtmpUrl: row.rtmpUrl,
    keyHint: row.keyHint,
    profileUrl: row.profileUrl,
    enabled: row.enabled,
  };
}

const idsOf = (value: unknown): string[] => (Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []);

/** The partner's current ingest key, or null when none has been created yet. */
export async function getIngestKey(partnerId: string): Promise<string | null> {
  const channel = await prisma.liveChannel.findUnique({ where: { partnerId } });
  return channel?.ingestKey ?? null;
}

/** Returns the partner's ingest key, creating and registering one if it does not exist yet. */
export async function ensureIngestKey(partner: { id: string; handle: string }): Promise<string> {
  const existing = await getIngestKey(partner.id);
  if (existing) {
    if (restreamerConfigured()) await restreamer.registerIngest(existing, publicNameFor(partner.handle));
    return existing;
  }
  const key = generateIngestKey();
  if (restreamerConfigured()) await restreamer.registerIngest(key, publicNameFor(partner.handle));
  await prisma.liveChannel.create({ data: { partnerId: partner.id, ingestKey: key } });
  return key;
}

/** Replaces the ingest key (old links stop working). Returns the previous key, if any. */
export async function rotateIngestKey(partner: { id: string; handle: string }): Promise<string | null> {
  const previous = await getIngestKey(partner.id);
  const key = generateIngestKey();
  if (restreamerConfigured()) {
    await restreamer.registerIngest(key, publicNameFor(partner.handle));
    if (previous) await restreamer.removeIngest(previous);
  }
  await prisma.liveChannel.upsert({
    where: { partnerId: partner.id },
    create: { partnerId: partner.id, ingestKey: key },
    update: { ingestKey: key },
  });
  return previous;
}

/** Decrypted destinations (enabled ones among `ids`) in the shape the restreamer expects. */
export async function restreamerDestinations(partnerId: string, ids: string[]): Promise<RestreamerDestination[]> {
  if (!ids.length) return [];
  const rows = await prisma.liveDestination.findMany({ where: { partnerId, id: { in: ids }, enabled: true } });
  return rows.map((row) => ({ id: row.id, name: row.label, url: row.rtmpUrl, streamKey: decryptSecret(row.streamKeyEnc) }));
}

/** Pushes the open session's destination list to the restreamer (after an edit/delete mid-broadcast). */
export async function syncOpenSession(partnerId: string): Promise<void> {
  if (!restreamerConfigured()) return;
  const [key, session] = await Promise.all([
    getIngestKey(partnerId),
    prisma.liveSession.findFirst({ where: { partnerId, status: 'live' }, orderBy: { startedAt: 'desc' } }),
  ]);
  if (!key || !session) return;
  await restreamer.sync(key, await restreamerDestinations(partnerId, idsOf(session.destinationIds)));
}

export async function endOpenSessions(partnerId: string): Promise<void> {
  await prisma.liveSession.updateMany({ where: { partnerId, status: 'live' }, data: { status: 'ended', endedAt: new Date() } });
}

export interface LiveOverview {
  partner: { id: string; name: string; handle: string; publicName: string };
  endpoints: {
    configured: boolean;
    rtmpUrl: string | null;
    whipUrl: string | null;
    hlsUrl: string | null;
    viewerPath: string;
    cameraPath: string | null;
  };
  ingestKey: string | null;
  destinations: DestinationDto[];
  session: { id: string; title: string | null; startedAt: string; destinationIds: string[] } | null;
  restreamer: { configured: boolean; reachable: boolean; running: boolean; workers: WorkerStatus[]; error?: string };
}

export async function getOverview(partnerId: string): Promise<LiveOverview | null> {
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
    select: { id: true, name: true, handle: true },
  });
  if (!partner) return null;

  const [ingestKey, destinations, openSession] = await Promise.all([
    getIngestKey(partnerId),
    prisma.liveDestination.findMany({ where: { partnerId }, orderBy: { createdAt: 'asc' } }),
    prisma.liveSession.findFirst({ where: { partnerId, status: 'live' }, orderBy: { startedAt: 'desc' } }),
  ]);

  const rs: LiveOverview['restreamer'] = { configured: restreamerConfigured(), reachable: false, running: false, workers: [] };
  let session = openSession;

  if (rs.configured && ingestKey) {
    try {
      const status = await restreamer.status(ingestKey);
      rs.reachable = true;
      rs.running = status.running;
      rs.workers = status.workers;
      // The restreamer lost the session (e.g. it was restarted): the broadcast is over.
      if (session && !status.running) {
        await endOpenSessions(partnerId);
        session = null;
      }
    } catch (error: any) {
      rs.error = error?.message || 'Restreamer unreachable';
    }
  } else if (rs.configured) {
    rs.reachable = true;
  }

  const endpoints = liveEndpoints(ingestKey, partner.handle);
  return {
    partner: { id: partner.id, name: partner.name, handle: partner.handle, publicName: publicNameFor(partner.handle) },
    endpoints: {
      configured: Boolean(endpoints),
      rtmpUrl: endpoints?.rtmpUrl ?? null,
      whipUrl: endpoints?.whipUrl ?? null,
      hlsUrl: endpoints?.hlsUrl ?? null,
      viewerPath: `/live/${partner.handle}`,
      cameraPath: ingestKey ? `/studio/camera#${ingestKey}` : null,
    },
    ingestKey,
    destinations: destinations.map(toDestinationDto),
    session: session
      ? { id: session.id, title: session.title, startedAt: session.startedAt.toISOString(), destinationIds: idsOf(session.destinationIds) }
      : null,
    restreamer: rs,
  };
}

/** Maps restreamer/validation failures to an HTTP response the admin UI can show. */
export function respondLiveError(res: import('next').NextApiResponse, error: unknown) {
  const status = typeof (error as any)?.status === 'number' ? (error as any).status : 500;
  const message = (error as any)?.message || 'Internal server error';
  if (status >= 500) console.error('Live API error:', error);
  return res.status(status >= 400 && status < 600 ? status : 500).json({ error: message });
}

export const clientIp = (req: import('next').NextApiRequest) =>
  String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown').split(',')[0].trim();
