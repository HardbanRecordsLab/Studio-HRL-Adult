import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/adminSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdminSession(req, res)) {
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { applicationId } = req.body;

  if (!applicationId) {
    return res.status(400).json({ error: 'Application ID is required' });
  }

  try {
    // 1. Get the application
    const app = await prisma.castingApplication.findUnique({
      where: { id: applicationId }
    });

    if (!app) {
      return res.status(404).json({ error: 'Application not found' });
    }

    // 2. Create a Partner from the application
    // Use the first name and last name to create a handle
    const handle = `@${app.firstName.toLowerCase()}_${app.lastName.toLowerCase()}`.replace(/\s+/g, '');
    
    // Check if handle exists, if so append random
    let finalHandle = handle;
    const existing = await prisma.partner.findFirst({ where: { handle: finalHandle } });
    if (existing) {
       finalHandle = `${handle}_${Math.floor(Math.random() * 1000)}`;
    }

    const gallery = [app.photo1, app.photo2, app.photo3].filter(Boolean) as string[];

    const partner = await prisma.partner.create({
      data: {
        name: `${app.firstName} ${app.lastName}`,
        handle: finalHandle,
        email: app.email,
        phone: app.phone,
        description: app.motivation || 'New Partner from Casting',
        avatar: app.photo1 || '/images/profile-placeholder.jpg',
        status: 'active',
        platforms: app.platforms || [],
        bio: `Cechy: ${app.height}cm / ${app.weight}kg. ${app.hairColor ? `Włosy: ${app.hairColor}.` : ''}`,
        profileData: {
          gallery,
          video: app.video,
          sourceApplicationId: applicationId
        }
      }
    });

    // AUDIT LOG
    const session = requireAdminSession(req, res);
    if (session) {
      await prisma.adminLog.create({
        data: {
          adminEmail: session.email,
          action: 'CONVERT_CASTING_TO_PARTNER',
          resource: 'partners',
          resourceId: partner.id,
          details: JSON.stringify({ applicationId })
        }
      });
    }

    // 3. Update application status
    await prisma.castingApplication.update({
      where: { id: applicationId },
      data: { 
        status: 'approved',
        contractStatus: 'sent',
        convertedAt: new Date()
      }
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Partner created successfully',
      partnerId: partner.id,
      handle: partner.handle
    });

  } catch (error: any) {
    console.error('Error converting application to partner:', error);
    return res.status(500).json({ error: error.message });
  }
}
