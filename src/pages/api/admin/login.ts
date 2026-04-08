import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

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
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Generate a simple JWT-like token (in production, use proper JWT library)
  const token = btoa(JSON.stringify({ 
    email: ADMIN_EMAIL, 
    timestamp: Date.now(),
    role: 'admin'
  }));

  return res.status(200).json({ token });
}
