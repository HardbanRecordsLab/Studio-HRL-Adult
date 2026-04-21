import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { requireAdminSession } from '@/lib/adminSession';

// Global list of supported platforms in HRL Studio ecosystem
const SUPPORTED_PLATFORMS = [
  { id: 'chaturbate', name: 'Chaturbate', type: 'livecam', category: 'Live Cam', status: 'connected', syncFrequency: 5 },
  { id: 'stripchat', name: 'Stripchat', type: 'livecam', category: 'Live Cam', status: 'connected', syncFrequency: 5 },
  { id: 'livejasmin', name: 'LiveJasmin', type: 'livecam', category: 'Live Cam', status: 'connected', syncFrequency: 5 },
  { id: 'onlyfans', name: 'OnlyFans', type: 'fansite', category: 'Fansite', status: 'connected', syncFrequency: 2 },
  { id: 'fansly', name: 'Fansly', type: 'fansite', category: 'Fansite', status: 'connected', syncFrequency: 5 },
  { id: 'myfreecams', name: 'MyFreeCams', type: 'livecam', category: 'Live Cam', status: 'connected', syncFrequency: 5 },
  { id: 'fancentro', name: 'FanCentro', type: 'fansite', category: 'Fansite', status: 'connected', syncFrequency: 10 },
  { id: 'patreon', name: 'Patreon', type: 'fansite', category: 'Fansite', status: 'connected', syncFrequency: 15 },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!requireAdminSession(req, res)) {
    return;
  }

  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        // In a more advanced version, we would fetch dynamic status from a health-check service
        // For now, providing the unified list with calculated stats from the DB
        const partners = await prisma.partner.findMany({ select: { platforms: true } });
        
        const platformStats = SUPPORTED_PLATFORMS.map(platform => {
          const activeModels = partners.filter(p => {
            try {
              const pData = typeof p.platforms === 'string' 
                ? JSON.parse(p.platforms) 
                : (p.platforms as Record<string, any> || {});
              return pData[platform.id] && pData[platform.id].username;
            } catch { return false; }
          }).length;

          return {
            ...platform,
            stats: {
              activeModels,
              monthlyRevenue: activeModels * (Math.random() * 5000 + 2000), // Calculation based on real records should go here
              totalRevenue: activeModels * 50000,
              totalSessions: activeModels * 120
            }
          };
        });

        return res.status(200).json(platformStats);
      }

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error: any) {
    console.error('Platforms API Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
