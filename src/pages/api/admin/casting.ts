import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin, db } from '@/lib/supabase';

// Admin verification helper
const verifyAdminRequest = async (req: NextApiRequest, res: NextApiResponse): Promise<boolean> => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return false;
  }

  const token = authHeader.substring(7);
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    if (decoded.email !== 'hardbanrecordslab.pl@gmail.com') {
      res.status(401).json({ error: 'Unauthorized' });
      return false;
    }
    return true;
  } catch {
    res.status(401).json({ error: 'Invalid token' });
    return false;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorized = await verifyAdminRequest(req, res);
  if (!authorized) return;

  try {
    if (req.method === 'GET') {
      const data = await db.getCastingApplications();
      return res.status(200).json(data);
    } else if (req.method === 'PUT') {
      const { id } = req.query;
      const data = await db.updateCastingApplication(id as string, req.body);
      
      // Log admin action
      await supabaseAdmin
        .from('AdminLog')
        .insert({
          adminEmail: 'hardbanrecordslab.pl@gmail.com',
          action: 'UPDATE',
          resource: 'CASTING',
          resourceId: id as string,
          details: `Updated casting application status to ${req.body.status}`,
          ip: req.headers['x-forwarded-for'] as string || req.connection.remoteAddress,
          userAgent: req.headers['user-agent']
        });
      
      return res.status(200).json(data);
    } else if (req.method === 'DELETE') {
      const { id } = req.query;
      await supabaseAdmin.from('CastingApplication').delete().eq('id', id);
      
      // Log admin action
      await supabaseAdmin
        .from('AdminLog')
        .insert({
          adminEmail: 'hardbanrecordslab.pl@gmail.com',
          action: 'DELETE',
          resource: 'CASTING',
          resourceId: id as string,
          details: 'Deleted casting application',
          ip: req.headers['x-forwarded-for'] as string || req.connection.remoteAddress,
          userAgent: req.headers['user-agent']
        });
      
      return res.status(200).json({ message: 'Casting application removed' });
    } else {
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Casting API error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
