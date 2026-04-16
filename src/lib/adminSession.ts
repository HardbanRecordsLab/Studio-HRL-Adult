import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export interface AdminSessionPayload {
  email: string;
  role: 'admin';
}

const DEFAULT_JWT_SECRET = 'hrl-studio-secret-key-2026';

function getJwtSecret() {
  return process.env.JWT_SECRET || DEFAULT_JWT_SECRET;
}

export function signAdminSession(email: string) {
  return jwt.sign(
    { email, role: 'admin' } satisfies AdminSessionPayload,
    getJwtSecret(),
    { expiresIn: '24h' }
  );
}

export function getAdminSession(req: NextApiRequest): AdminSessionPayload | null {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return null;
  }

  try {
    const payload = jwt.verify(token, getJwtSecret());
    if (
      payload &&
      typeof payload === 'object' &&
      payload.role === 'admin' &&
      typeof payload.email === 'string'
    ) {
      return {
        email: payload.email,
        role: 'admin',
      };
    }
  } catch (error) {
    console.error('Admin session verification failed:', error);
  }

  return null;
}

export function requireAdminSession(
  req: NextApiRequest,
  res: NextApiResponse
): AdminSessionPayload | null {
  const session = getAdminSession(req);

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return null;
  }

  return session;
}
