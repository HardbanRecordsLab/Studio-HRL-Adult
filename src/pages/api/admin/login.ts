import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

// In a target production environment, use a real Admin database or env-hashed credentials
// For now, aligning with the "hrl-studio-secret-key-2026" used in other endpoints
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@hrlstudio.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hrl-premium-2026';
const JWT_SECRET = process.env.JWT_SECRET || 'hrl-studio-secret-key-2026';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign(
        { email, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      return res.status(200).json({
        success: true,
        token,
        message: 'Master Authentication Successful'
      });
    }

    return res.status(401).json({ 
      success: false, 
      error: 'Invalid credentials. Access Denied.' 
    });
  } catch (error: any) {
    console.error('Login API Error:', error);
    return res.status(500).json({ error: 'Authentication internal failure' });
  }
}
