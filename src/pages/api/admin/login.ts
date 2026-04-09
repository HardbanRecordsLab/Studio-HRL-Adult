import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';
import { logAdminAction, ADMIN_ACTIONS, ADMIN_RESOURCES } from '@/lib/adminLog';

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  token?: string;
  error?: string;
}

// Admin credentials - only your email should have access
const ADMIN_EMAIL = 'hardbanrecordslab.pl@gmail.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hrl_admin_secure_2024';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body as LoginRequest;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Check credentials
  if (email !== ADMIN_EMAIL) {
    // Log failed login attempt
    await logAdminAction({
      adminEmail: email,
      action: ADMIN_ACTIONS.LOGIN_FAILED,
      resource: ADMIN_RESOURCES.AUTH,
      details: JSON.stringify({ reason: 'Invalid email' }),
      ip: req.headers['x-forwarded-for'] as string || 'unknown'
    });
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  if (password !== ADMIN_PASSWORD) {
    // Log failed login attempt
    await logAdminAction({
      adminEmail: email,
      action: ADMIN_ACTIONS.LOGIN_FAILED,
      resource: ADMIN_RESOURCES.AUTH,
      details: JSON.stringify({ reason: 'Invalid password' }),
      ip: req.headers['x-forwarded-for'] as string || 'unknown'
    });
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Generate a simple JWT-like token (in production, use proper JWT library)
  const token = btoa(JSON.stringify({ 
    email: ADMIN_EMAIL, 
    timestamp: Date.now(),
    role: 'admin'
  }));

  // Log successful login
  await logAdminAction({
    adminEmail: ADMIN_EMAIL,
    action: ADMIN_ACTIONS.LOGIN,
    resource: ADMIN_RESOURCES.AUTH,
    details: JSON.stringify({ timestamp: Date.now() }),
    ip: req.headers['x-forwarded-for'] as string || 'unknown'
  });

  return res.status(200).json({ token });
}
