import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/adminSession';
import { logAdminAction } from '@/lib/adminLog';
import { RestreamerError, restreamer, restreamerConfigured } from '@/lib/restreamer';
import {
  clientIp,
  endOpenSessions,
  ensureIngestKey,
  getIngestKey,
  getOverview,
  respondLiveError,
  restreamerDestinations,
} from '@/lib/liveServer';

/**
 * POST { partnerId, action: 'start' | 'update' | 'stop', destinationIds?, title? }
 *
 * `start` arms the fan-out: the restreamer begins pushing to the chosen platforms as soon as the
 * camera (browser WHIP, phone camera page or OBS) publishes to the profile's ingest key.
 * `update` changes the destination list / title of the running broadcast, `stop` ends it.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const admin = requireAdminSession(req, res);
  if (!admin) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { partnerId, action, destinationIds, title } = req.body || {};
  if (!partnerId || !['start', 'update', 'stop'].includes(action)) {
    return res.status(400).json({ error: 'partnerId and a valid action are required' });
  }
  const ids: string[] = Array.isArray(destinationIds) ? destinationIds.filter((v: unknown) => typeof v === 'string') : [];

  try {
    const partner = await prisma.partner.findUnique({
      where: { id: String(partnerId) },
      select: { id: true, handle: true },
    });
    if (!partner) return res.status(404).json({ error: 'Profile not found' });
    if (!restreamerConfigured()) {
      throw new RestreamerError('The live stack is not configured (RESTREAMER_URL / RESTREAMER_TOKEN)', 503);
    }

    if (action === 'stop') {
      const key = await getIngestKey(partner.id);
      if (key) await restreamer.stop(key);
      await endOpenSessions(partner.id);
    } else {
      const key = await ensureIngestKey(partner);
      const destinations = await restreamerDestinations(partner.id, ids);
      if (destinations.length !== ids.length) {
        return res.status(400).json({ error: 'Some destinations are disabled or do not belong to this profile' });
      }
      await restreamer.sync(key, destinations);

      const open = await prisma.liveSession.findFirst({ where: { partnerId: partner.id, status: 'live' }, orderBy: { startedAt: 'desc' } });
      if (open) {
        await prisma.liveSession.update({
          where: { id: open.id },
          data: { destinationIds: ids, ...(title !== undefined ? { title: String(title).slice(0, 120) || null } : {}) },
        });
      } else {
        await prisma.liveSession.create({
          data: {
            partnerId: partner.id,
            title: title ? String(title).slice(0, 120) : null,
            startedBy: admin.email,
            destinationIds: ids,
          },
        });
      }
    }

    await logAdminAction({
      adminEmail: admin.email,
      action: action === 'stop' ? 'STOP_LIVE' : action === 'start' ? 'START_LIVE' : 'UPDATE_LIVE',
      resource: 'live',
      resourceId: partner.id,
      details: JSON.stringify({ destinations: ids.length }),
      ip: clientIp(req),
    });
    return res.status(200).json(await getOverview(partner.id));
  } catch (error) {
    return respondLiveError(res, error);
  }
}
