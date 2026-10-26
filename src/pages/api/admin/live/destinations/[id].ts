import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/adminSession';
import { logAdminAction } from '@/lib/adminLog';
import { isPlatformId, validateProfileUrl, validateRtmpUrl } from '@/lib/live';
import { encryptSecret, keyHint } from '@/lib/secretBox';
import { clientIp, respondLiveError, syncOpenSession, toDestinationDto } from '@/lib/liveServer';

/** PUT -> edit (stream key only replaced when a new one is sent) | DELETE -> remove. */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = requireAdminSession(req, res);
  if (!session) return;

  const id = String(req.query.id || '');
  try {
    const existing = await prisma.liveDestination.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Destination not found' });

    if (req.method === 'PUT') {
      const { platform, label, rtmpUrl, streamKey, profileUrl, enabled } = req.body || {};
      const data: Record<string, unknown> = {};

      if (platform !== undefined) {
        if (!isPlatformId(String(platform))) return res.status(400).json({ error: 'Unknown platform' });
        data.platform = String(platform);
      }
      if (label !== undefined) {
        if (!String(label).trim()) return res.status(400).json({ error: 'label cannot be empty' });
        data.label = String(label).trim().slice(0, 80);
      }
      if (rtmpUrl !== undefined) {
        const problem = validateRtmpUrl(String(rtmpUrl).trim());
        if (problem) return res.status(400).json({ error: problem });
        data.rtmpUrl = String(rtmpUrl).trim();
      }
      if (profileUrl !== undefined) {
        const problem = validateProfileUrl(String(profileUrl).trim());
        if (problem) return res.status(400).json({ error: problem });
        data.profileUrl = String(profileUrl).trim() || null;
      }
      if (streamKey) {
        if (String(streamKey).length > 512 || /\s/.test(String(streamKey))) return res.status(400).json({ error: 'Invalid stream key' });
        data.streamKeyEnc = encryptSecret(String(streamKey));
        data.keyHint = keyHint(String(streamKey));
      }
      if (enabled !== undefined) data.enabled = Boolean(enabled);

      const row = await prisma.liveDestination.update({ where: { id }, data });
      await logAdminAction({
        adminEmail: session.email,
        action: 'UPDATE_LIVE_DESTINATION',
        resource: 'live',
        resourceId: id,
        details: JSON.stringify({ fields: Object.keys(data).filter((k) => k !== 'streamKeyEnc') , keyChanged: Boolean(streamKey) }),
        ip: clientIp(req),
      });
      await syncOpenSession(row.partnerId);
      return res.status(200).json(toDestinationDto(row));
    }

    if (req.method === 'DELETE') {
      await prisma.liveDestination.delete({ where: { id } });
      await logAdminAction({
        adminEmail: session.email,
        action: 'DELETE_LIVE_DESTINATION',
        resource: 'live',
        resourceId: id,
        details: JSON.stringify({ platform: existing.platform, label: existing.label }),
        ip: clientIp(req),
      });
      await syncOpenSession(existing.partnerId);
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return respondLiveError(res, error);
  }
}
