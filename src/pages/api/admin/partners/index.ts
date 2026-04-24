import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/adminSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdminSession(req, res)) {
    return;
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
      const { name, handle, email, status, type, bio, description, avatar, height, weight, measurements, profileData, characteristics, heroPitch, bust, waist, hips, size } = req.body;
      
      // Basic validation
      if (!name || !handle || !email) {
        return res.status(400).json({ error: 'Name, Handle, and Email are mandatory fields.' });
      }

      const partner = await prisma.partner.create({
        data: {
          name,
          handle,
          email,
          status: status || 'active',
          type: type || 'solo',
          bio: bio || '',
          description: characteristics || description || '',
          avatar: avatar || null,
          heroImage: heroPitch || null,
          height: height ? Number(height) : null,
          weight: weight ? Number(weight) : null,
          measurements: measurements || null,
          profileData: {
            ...(profileData || {}),
            size: size || null
          }
        }
      });

      // AUDIT LOG
      const session = requireAdminSession(req, res);
      if (session) {
        await prisma.adminLog.create({
          data: {
            adminEmail: session.email,
            action: 'CREATE_PARTNER',
            resource: 'partners',
            resourceId: partner.id,
            details: JSON.stringify({ name, handle, email })
          }
        });
      }

      return res.status(201).json(partner);
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
