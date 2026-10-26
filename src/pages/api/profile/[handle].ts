import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { toLocale } from '@/i18n';
import { getDemoProfile } from '@/i18n/demoProfile';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { handle } = req.query;
  const handleStr = Array.isArray(handle) ? handle[0] : (handle ?? '');
  // /profile/demo is the showcase profile; it works even without a database.
  const demo = handleStr === 'demo' ? getDemoProfile(toLocale(req.query.locale)) : null;

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
          tags: parsedProfileData.tags || ['Studio HRL'],
          videos: parsedProfileData.videos || [],
          experience: parsedProfileData.experience || '',
          milestones: parsedProfileData.milestones || [],
          age: parsedProfileData.age || '',
          nationality: parsedProfileData.nationality || '',
          faq: parsedProfileData.faq || [],
          badges: parsedProfileData.badges || [],
          languages: parsedProfileData.languages || [],
          location: parsedProfileData.location || '',
          timezone: parsedProfileData.timezone || '',
          size: parsedProfileData.size || ''
        },
        ico: '⭐',
        status: partner.status || 'active'
      });
    }

    if (demo) return res.status(200).json(demo);
    return res.status(404).json({ error: 'Profile not found.' });
  } catch (error: any) {
    console.error('Profile API error:', error);
    if (demo) return res.status(200).json(demo);
    return res.status(500).json({ error: 'Server error while fetching the profile.' });
  }
}
