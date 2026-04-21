import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

const DEFAULT_STATS = {
  followers: '10K+',
  content: '100+',
  satisfaction: '98%',
  online: 'Daily',
};

function safeParseJson<T>(value: any, fallback: T): T {
  if (!value) return fallback;
  if (typeof value === 'object') return value as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const partners = await prisma.partner.findMany({
      where: { status: 'active' },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        handle: true,
        bio: true,
        description: true,
        avatar: true,
        profileStats: true,
        platforms: true,
      },
    });

    const profiles = partners.map((partner) => {
      const stats = {
        ...DEFAULT_STATS,
        ...safeParseJson<Record<string, string>>(partner.profileStats, {}),
      };
      const platformData = safeParseJson<Record<string, { username?: string }>>(partner.platforms, {});
      const tags = Object.keys(platformData).length
        ? Object.keys(platformData).slice(0, 3).map((key) => key.charAt(0).toUpperCase() + key.slice(1))
        : ['Premium'];
      const handle = partner.handle || partner.id;

      return {
        id: handle,
        name: partner.name || 'HRL Model',
        handle,
        bio: partner.bio || partner.description || 'Premium content creator.',
        avatar: partner.avatar || null,
        stats,
        tags,
        ico: '✨',
        measurements: null,
        characteristics: partner.description || partner.bio || 'Professional model.',
      };
    });

    return res.status(200).json(profiles);
  } catch (error: any) {
    console.error('Profiles API error:', error.message);
    return res.status(500).json({ error: error.message });
  }
}
