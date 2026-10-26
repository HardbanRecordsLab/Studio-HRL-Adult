import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/adminSession';
import { logAdminAction } from '@/lib/adminLog';
import { clientIp, endOpenSessions, ensureIngestKey, getIngestKey, getOverview, respondLiveError, rotateIngestKey } from '@/lib/liveServer';

/**
 * POST { partnerId, regenerate? }
 * Creates the profile's ingest key (the secret the camera / OBS publishes to). With `regenerate`
 * the old key is revoked, which also stops any running broadcast that used it.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = requireAdminSession(req, res);
  if (!session) return;
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { partnerId, regenerate } = req.body || {};
  if (!partnerId) return res.status(400).json({ error: 'partnerId is required' });

  try {
    const partner = await prisma.partner.findUnique({
      where: { id: String(partnerId) },
      select: { id: true, handle: true },
    });
    if (!partner) return res.status(404).json({ error: 'Profile not found' });

    if (regenerate && (await getIngestKey(partner.id))) {
      await rotateIngestKey(partner);
      await endOpenSessions(partner.id);
    } else {
      await ensureIngestKey(partner);
    }

    await logAdminAction({
      adminEmail: session.email,
      action: regenerate ? 'REGENERATE_LIVE_KEY' : 'CREATE_LIVE_KEY',
      resource: 'live',
      resourceId: partner.id,
      ip: clientIp(req),
    });
    return res.status(200).json(await getOverview(partner.id));
  } catch (error) {
    return respondLiveError(res, error);
  }
}
