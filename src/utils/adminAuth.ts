import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

export async function verifyAdminRequest(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    res.status(401).json({ error: 'Invalid token' });
    return false;
  }

  if (data.user.email !== 'hardbanrecordslab.pl@gmail.com') {
    res.status(403).json({ error: 'Forbidden' });
    return false;
  }

  return true;
}
