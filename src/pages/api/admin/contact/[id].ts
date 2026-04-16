import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/adminSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdminSession(req, res)) {
    return;
  }

  const { id } = req.query;
  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'PUT') {
    try {
      const { status } = req.body;
      const updated = await prisma.contactMessage.update({
        where: { id },
        data: { status },
      });
      return res.status(200).json(updated);
    } catch (error: any) {
      console.error('Error updating contact message:', error);
      return res.status(500).json({ error: 'Failed to update message' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.contactMessage.delete({ where: { id } });
      return res.status(200).json({ success: true });
    } catch (error: any) {
      console.error('Error deleting contact message:', error);
      return res.status(500).json({ error: 'Failed to delete message' });
    }
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  return res.status(405).end('Method Not Allowed');
}
