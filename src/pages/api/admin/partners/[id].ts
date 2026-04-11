import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  if (req.method === 'PUT') {
    try {
      const { name, handle, email, status, type, bio } = req.body;
      const data: any = {};
      if (name !== undefined) data.name = name;
      if (handle !== undefined) data.handle = handle;
      if (email !== undefined) data.email = email;
      if (status !== undefined) data.status = status;
      if (type !== undefined) data.type = type;
      if (bio !== undefined) data.bio = bio;

      const partner = await prisma.partner.update({
        where: { id },
        data
      });
      return res.status(200).json(partner);
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      await prisma.partner.delete({
        where: { id }
      });
      return res.status(200).json({ message: 'Partner deleted successfully' });
    } catch (error: any) {
      console.error(error);
      return res.status(400).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
