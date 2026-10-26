import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/adminSession';
import { logAdminAction } from '@/lib/adminLog';
import { isPlatformId, validateProfileUrl, validateRtmpUrl } from '@/lib/live';
import { encryptSecret, keyHint } from '@/lib/secretBox';
import { clientIp, respondLiveError, toDestinationDto } from '@/lib/liveServer';

/** GET ?partnerId= -> destinations (never including stream keys) | POST -> add one. */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = requireAdminSession(req, res);
  if (!session) return;

  try {
    if (req.method === 'GET') {
      const partnerId = String(req.query.partnerId || '');
      if (!partnerId) return res.status(400).json({ error: 'partnerId is required' });
      const rows = await prisma.liveDestination.findMany({ where: { partnerId }, orderBy: { createdAt: 'asc' } });
      return res.status(200).json(rows.map(toDestinationDto));
    }

    if (req.method === 'POST') {
      const { partnerId, platform, label, rtmpUrl, streamKey, profileUrl } = req.body || {};
      if (!partnerId || !label || !rtmpUrl || !streamKey) {
        return res.status(400).json({ error: 'partnerId, label, rtmpUrl and streamKey are required' });
      }
      if (!isPlatformId(String(platform))) return res.status(400).json({ error: 'Unknown platform' });
      const urlProblem = validateRtmpUrl(String(rtmpUrl).trim());
      if (urlProblem) return res.status(400).json({ error: urlProblem });
      const profileProblem = validateProfileUrl(String(profileUrl || '').trim());
      if (profileProblem) return res.status(400).json({ error: profileProblem });
      if (String(streamKey).length > 512 || /\s/.test(String(streamKey))) return res.status(400).json({ error: 'Invalid stream key' });

      const partner = await prisma.partner.findUnique({ where: { id: String(partnerId) }, select: { id: true } });
      if (!partner) return res.status(404).json({ error: 'Profile not found' });

      const row = await prisma.liveDestination.create({
        data: {
          partnerId: partner.id,
          platform: String(platform),
          label: String(label).trim().slice(0, 80),
          rtmpUrl: String(rtmpUrl).trim(),
          streamKeyEnc: encryptSecret(String(streamKey)),
          keyHint: keyHint(String(streamKey)),
          profileUrl: String(profileUrl || '').trim() || null,
        },
      });
      await logAdminAction({
        adminEmail: session.email,
        action: 'CREATE_LIVE_DESTINATION',
        resource: 'live',
        resourceId: row.id,
        details: JSON.stringify({ partnerId: partner.id, platform: row.platform, label: row.label }),
        ip: clientIp(req),
      });
      return res.status(201).json(toDestinationDto(row));
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return respondLiveError(res, error);
  }
}
