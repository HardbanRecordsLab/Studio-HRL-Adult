import type { NextApiRequest, NextApiResponse } from 'next';
import { requireAdminSession } from '@/lib/adminSession';
import { getOverview, respondLiveError } from '@/lib/liveServer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdminSession(req, res)) return;
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const partnerId = String(req.query.partnerId || '');
  if (!partnerId) return res.status(400).json({ error: 'partnerId is required' });

  try {
    const overview = await getOverview(partnerId);
    if (!overview) return res.status(404).json({ error: 'Profile not found' });
    return res.status(200).json(overview);
  } catch (error) {
    return respondLiveError(res, error);
  }
}
