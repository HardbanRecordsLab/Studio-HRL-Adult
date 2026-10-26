import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { liveEndpoints } from '@/lib/live';

export interface PublicLiveStatus {
  /** Display name of the profile (null when the profile does not exist). */
  name: string | null;
  /** A broadcast is armed for this profile. */
  live: boolean;
  /** The HLS playlist is actually available, i.e. viewers can watch right now. */
  onAir: boolean;
  title: string | null;
  startedAt: string | null;
  hlsUrl: string | null;
  platforms: Array<{ platform: string; label: string; profileUrl: string }>;
}

const OFFLINE: PublicLiveStatus = { name: null, live: false, onAir: false, title: null, startedAt: null, hlsUrl: null, platforms: [] };

// Tiny cache so a busy profile page does not hit the media server on every poll.
const onAirCache = new Map<string, { at: number; value: boolean }>();

async function playlistAvailable(url: string): Promise<boolean> {
  const cached = onAirCache.get(url);
  if (cached && Date.now() - cached.at < 5000) return cached.value;
  let value = false;
  try {
    const res = await fetch(url, { method: 'GET', signal: AbortSignal.timeout(2500) });
    value = res.ok;
  } catch {
    value = false;
  }
  onAirCache.set(url, { at: Date.now(), value });
  return value;
}

/** Public live status for a profile (no secrets). Used by /live/<handle> and the profile page. */
export default async function handler(req: NextApiRequest, res: NextApiResponse<PublicLiveStatus | { error: string }>) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const handle = String(Array.isArray(req.query.handle) ? req.query.handle[0] : req.query.handle || '');

  res.setHeader('Cache-Control', 'no-store');
  try {
    const partner = await prisma.partner.findUnique({ where: { handle }, select: { id: true, status: true, name: true } });
    if (!partner || partner.status !== 'active') return res.status(200).json(OFFLINE);
    const offline = { ...OFFLINE, name: partner.name };

    const session = await prisma.liveSession.findFirst({ where: { partnerId: partner.id, status: 'live' }, orderBy: { startedAt: 'desc' } });
    if (!session) return res.status(200).json(offline);

    const ids = Array.isArray(session.destinationIds) ? (session.destinationIds as unknown[]).filter((v): v is string => typeof v === 'string') : [];
    const destinations = ids.length
      ? await prisma.liveDestination.findMany({ where: { partnerId: partner.id, id: { in: ids }, enabled: true, profileUrl: { not: null } } })
      : [];

    const endpoints = liveEndpoints(null, handle);
    const hlsUrl = endpoints?.hlsUrl ?? null;
    return res.status(200).json({
      name: partner.name,
      live: true,
      onAir: hlsUrl ? await playlistAvailable(hlsUrl) : false,
      title: session.title,
      startedAt: session.startedAt.toISOString(),
      hlsUrl,
      platforms: destinations.map((d) => ({ platform: d.platform, label: d.label, profileUrl: d.profileUrl as string })),
    });
  } catch (error) {
    // A database hiccup must not break the profile page: report "offline".
    console.error('Live status error:', error);
    return res.status(200).json(OFFLINE);
  }
}
