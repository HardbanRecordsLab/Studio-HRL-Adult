import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import jwt from 'jsonwebtoken';

const verifyToken = (req: NextApiRequest) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return false;
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'hrl-studio-secret-key-2026');
    return true;
  } catch (e) {
    return false;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!verifyToken(req)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
      });
      return res.status(200).json(messages);
    } catch (error: any) {
      console.error('Error fetching contact messages:', error);
      return res.status(500).json({ error: 'Failed to fetch messages' });
    }
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).end('Method Not Allowed');
}
