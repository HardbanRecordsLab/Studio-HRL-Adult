import type { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '@/lib/supabase';

interface VerifyResponse {
  valid?: boolean;
  error?: string;
}

const ADMIN_EMAIL = 'hardbanrecordslab.pl@gmail.com';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerifyResponse>
) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Decode token
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    
    // Verify email matches
    if (decoded.email !== ADMIN_EMAIL) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Check token age (24 hours)
    const tokenAge = Date.now() - decoded.timestamp;
    if (tokenAge > 24 * 60 * 60 * 1000) {
      return res.status(401).json({ error: 'Token expired' });
    }

    // Log admin action
    await supabaseAdmin
      .from('AdminLog')
      .insert({
        adminEmail: ADMIN_EMAIL,
        action: 'VERIFY',
        resource: 'AUTH',
        details: 'Admin token verification',
        ip: req.headers['x-forwarded-for'] as string || req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
      });

    return res.status(200).json({ valid: true });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
