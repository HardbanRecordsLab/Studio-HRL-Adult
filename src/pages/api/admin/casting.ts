import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { verifyAdminRequest } from '@/utils/adminAuth';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorized = await verifyAdminRequest(req, res);
  if (!authorized) return;

  if (req.method === 'GET') {
    try {
      const applications = await prisma.castingApplication.findMany({
        orderBy: { createdAt: 'desc' }
      });
      return res.status(200).json(applications);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'PUT') {
    const { id } = req.query;
    const { status } = req.body;

    try {
      const application = await prisma.castingApplication.update({
        where: { id: id as string },
        data: { status }
      });
      return res.status(200).json(application);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    try {
      await prisma.castingApplication.delete({
        where: { id: id as string }
      });
      return res.status(200).json({ message: 'Application deleted' });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
