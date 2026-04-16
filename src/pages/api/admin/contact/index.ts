import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/adminSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdminSession(req, res)) {
    return;
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
