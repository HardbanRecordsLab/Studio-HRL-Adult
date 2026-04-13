import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Authorization Verification
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized - Missing Admin Token' });
  }

  // GET: Fetch all partners
  if (req.method === 'GET') {
    try {
      const partners = await prisma.partner.findMany({
        orderBy: { createdAt: 'desc' },
        include: {
          documents: true,
          financeRecords: true
        }
      });
      return res.status(200).json(partners);
    } catch (error: any) {
      console.error('Error fetching partners:', error);
      return res.status(500).json({ error: 'Internal server error', details: error.message });
    }
  }

  // POST: Create a new partner profile
  if (req.method === 'POST') {
    try {
      const { name, handle, email, status, type, bio, description, avatar, height, weight, measurements, profileData } = req.body;
      
      // Basic validation
      if (!name || !handle || !email) {
        return res.status(400).json({ error: 'Name, Handle, and Email are mandatory fields.' });
      }

      const partner = await prisma.partner.create({
        data: {
          name,
          handle,
          email,
          status: status || 'pending',
          type: type || 'solo',
          bio: bio || '',
          description: description || '',
          avatar: avatar || null
        }
      });

      if (height || weight || measurements || profileData) {
        await prisma.$executeRawUnsafe(
          `UPDATE "Partner" SET height = $1, weight = $2, measurements = $3, "profileData" = $4 WHERE id = $5`,
          Number(height) || null,
          Number(weight) || null,
          measurements || null,
          profileData ? profileData : null, // profileData is object, node-postgres driver stringifies JSON properly usually. However Prisma might need it parsed as JSON or Object
          partner.id
        );
      }

      return res.status(201).json({ ...partner, height, weight, measurements, profileData });
    } catch (error: any) {
      console.error('Error creating partner:', error);
      // Check for unique constraint violation
      if (error.code === 'P2002') {
        return res.status(400).json({ error: 'A partner with this handle or email already exists.' });
      }
      return res.status(400).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
