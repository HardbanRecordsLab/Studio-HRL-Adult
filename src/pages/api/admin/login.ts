import type { NextApiRequest, NextApiResponse } from 'next';
<<<<<<< HEAD
import { supabaseAdmin } from '@/lib/supabase';
=======
import { supabase } from '@/utils/supabase';
import { logAdminAction, ADMIN_ACTIONS, ADMIN_RESOURCES } from '@/lib/adminLog';
>>>>>>> 3f057d9578d3a6cadf60e1a2fbe25213260bbb92

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

  try {
    // Log admin action
    await supabaseAdmin
      .from('AdminLog')
      .insert({
        adminEmail: email,
        action: 'LOGIN',
        resource: 'AUTH',
        details: 'Successful admin login',
        ip: req.headers['x-forwarded-for'] as string || req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
      });

<<<<<<< HEAD
    // Generate a simple JWT-like token (in production, use proper JWT library)
    const token = btoa(JSON.stringify({ 
      email: ADMIN_EMAIL, 
      timestamp: Date.now(),
      role: 'admin'
    }));

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
=======
  // Log successful login
  await logAdminAction({
    adminEmail: ADMIN_EMAIL,
    action: ADMIN_ACTIONS.LOGIN,
    resource: ADMIN_RESOURCES.AUTH,
    details: JSON.stringify({ timestamp: Date.now() }),
    ip: req.headers['x-forwarded-for'] as string || 'unknown'
  });

  return res.status(200).json({ token });
>>>>>>> 3f057d9578d3a6cadf60e1a2fbe25213260bbb92
}
