import type { NextApiRequest, NextApiResponse } from 'next';

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
    // Decode the token
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    
    // Verify email matches
    if (decoded.email !== ADMIN_EMAIL) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Optionally check token age (e.g., expires after 24 hours)
    const tokenAge = Date.now() - decoded.timestamp;
    const ONE_DAY = 24 * 60 * 60 * 1000;
    
    if (tokenAge > ONE_DAY) {
      return res.status(401).json({ error: 'Token expired' });
    }

    return res.status(200).json({ valid: true });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token format' });
  }
}
