import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/adminSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdminSession(req, res)) {
    return;
  }

  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        const settings = await prisma.studioSettings.findUnique({
          where: { id: 'singleton' }
        });
        
        // Return default if not exists
        if (!settings) {
          return res.status(200).json({
            studioName: 'Studio HRL Adult',
            contactEmail: 'admin@hrlstudio.com',
            notificationEmail: 'alerts@hrlstudio.com',
            revenueModelShare: 60,
            revenuePartnerShare: 30,
            revenueStudioShare: 10
          });
        }
        
        return res.status(200).json(settings);
      }

      case 'POST': {
        const { 
          studioName, contactEmail, notificationEmail, 
          revenueModelShare, revenuePartnerShare, revenueStudioShare,
          roles, apiKeys, notifications, integrations, security, general
        } = req.body;
        
        const settings = await prisma.studioSettings.upsert({
          where: { id: 'singleton' },
          update: {
            studioName,
            contactEmail,
            notificationEmail,
            revenueModelShare,
            revenuePartnerShare,
            revenueStudioShare,
            roles: roles || undefined,
            apiKeys: apiKeys || undefined,
            notifications: notifications || undefined,
            integrations: integrations || undefined,
            security: security || undefined,
            general: general || undefined
          },
          create: {
            id: 'singleton',
            studioName: studioName || 'Studio HRL Adult',
            contactEmail: contactEmail || '',
            notificationEmail: notificationEmail || '',
            revenueModelShare: revenueModelShare || 60,
            revenuePartnerShare: revenuePartnerShare || 30,
            revenueStudioShare: revenueStudioShare || 10,
            roles: roles || {},
            apiKeys: apiKeys || {},
            notifications: notifications || {},
            integrations: integrations || {},
            security: security || {},
            general: general || {}
          }
        });
        
        return res.status(200).json(settings);
      }

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('Settings API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
