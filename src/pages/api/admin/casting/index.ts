import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/adminSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdminSession(req, res)) {
    return;
  }

  if (req.method === 'GET') {
    try {
      const applications = await prisma.castingApplication.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(applications);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
