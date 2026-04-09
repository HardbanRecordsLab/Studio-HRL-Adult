import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

interface ProfileData {
  id: string;
  handle: string;
  name: string;
  bio: string;
  heroImage: string;
  aboutImage1: string;
  aboutImage2: string;
  description: string;
  yearsTogether: number;
  stats: {
    subscribers: number;
    content: number;
    satisfaction: number;
  };
  platforms: Array<{
    id: string;
    name: string;
    url: string;
    followers: number;
    icon: string;
    verified?: boolean;
  }>;
  liveSchedule: Array<{
    day: string;
    time: string;
    active: boolean;
  }>;
  subscriptionPlans: Array<{
    name: string;
    description: string;
    price: number;
    period: string;
    perks: string[];
    featured?: boolean;
    ofUrl?: string;
  }>;
  testimonials: Array<{
    username: string;
    text: string;
    since: string;
    rating: number;
    avatar: string;
  }>;
  type: 'couple' | 'solo';
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProfileData | { error: string }>
) {
  const { handle } = req.query;

  if (!handle || typeof handle !== 'string') {
    return res.status(400).json({ error: 'Invalid handle' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const partner = await prisma.partner.findUnique({
      where: { handle },
    });

    if (!partner) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Parse JSON fields
    const profileStats = partner.profileStats ? JSON.parse(partner.profileStats) : { subscribers: 0, content: 0, satisfaction: 0 };
    const platforms = partner.platforms ? JSON.parse(partner.platforms) : [];
    const liveSchedule = partner.liveSchedule ? JSON.parse(partner.liveSchedule) : [];
    const subscriptionPlans = partner.subscriptionPlans ? JSON.parse(partner.subscriptionPlans) : [];
    const testimonials = partner.testimonials ? JSON.parse(partner.testimonials) : [];

    const profileData: ProfileData = {
      id: partner.id,
      handle: partner.handle,
      name: partner.name,
      bio: partner.bio || '',
      heroImage: partner.heroImage || '/images/image01.jpg',
      aboutImage1: partner.aboutImage1 || '/images/image06.jpg',
      aboutImage2: partner.aboutImage2 || '/images/image07.jpg',
      description: partner.description || '',
      yearsTogether: partner.yearsTogether || 0,
      stats: profileStats,
      platforms,
      liveSchedule,
      subscriptionPlans,
      testimonials,
      type: (partner.type as 'couple' | 'solo') || 'solo',
    };

    res.status(200).json(profileData);
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}
