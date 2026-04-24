import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { handle } = req.query;
  const handleStr = Array.isArray(handle) ? handle[0] : (handle ?? '');

  try {
    const partner = await prisma.partner.findUnique({ 
      where: { handle: handleStr } 
    });
    
    if (partner) {
      const safeJSON = (s: any, fallback: any = {}) => {
        try { 
          if (!s) return fallback;
          return typeof s === 'string' ? JSON.parse(s) : s; 
        } catch { 
          return fallback; 
        }
      };

      // Parse nested objects from Prisma JSON fields
      const parsedProfileData = safeJSON(partner.profileData, {});

      return res.status(200).json({
        ...partner,
        height: partner.height || '170',
        weight: partner.weight || '55',
        measurements: partner.measurements || '90 / 60 / 90',
        bio: partner.bio || partner.description || 'Brak opisu.',
        characteristics: partner.description || '',
        platforms: safeJSON(partner.platforms, {}),
        stats: safeJSON(partner.profileStats, { subscribers: '0', content: '0', satisfaction: '100%' }),
        liveSchedule: safeJSON(partner.liveSchedule, []),
        subscriptionPlans: safeJSON(partner.subscriptionPlans, []),
        testimonials: safeJSON(partner.testimonials, []),
        profileData: {
          likes: parsedProfileData.likes || [],
          boundaries: parsedProfileData.boundaries || [],
          bestInMe: parsedProfileData.bestInMe || [],
          whyWatchMe: parsedProfileData.whyWatchMe || [],
          gallery: parsedProfileData.gallery || [],
          tags: parsedProfileData.tags || ['Studio HRL']
        },
        ico: '⭐',
        status: partner.status || 'active'
      });
    }

    return res.status(404).json({ error: 'Nie odnaleziono takiego profilu w bazie Studio HRL.' });
  } catch (error: any) {
    console.error('Profile API error:', error);
    return res.status(500).json({ error: 'Błąd serwera podczas pobierania profilu.' });
  }
}
