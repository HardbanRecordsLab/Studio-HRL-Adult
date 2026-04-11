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

  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'PUT') {
    try {
      const { status } = req.body;
      const updatedApp = await prisma.castingApplication.update({
        where: { id },
        data: { status }
      });
      return res.status(200).json(updatedApp);
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.castingApplication.delete({
        where: { id }
      });
      return res.status(200).json({ message: 'Deleted successfully' });
    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
