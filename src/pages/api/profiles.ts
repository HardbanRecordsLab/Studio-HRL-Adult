import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

const DEMO = [
  {
    id: 'luna-hrl', name: 'Luna', handle: 'luna.hrl',
    bio: 'Premium content creator ze Studio HRL Adult. Specjalizacja: live cam, ekskluzywne subskrypcje, artystyczne treści adult. Top 3% OnlyFans.',
    stats: { followers: '3.6K', content: '240+', satisfaction: '98%', online: '21-23' },
    tags: ['OnlyFans', 'Live Cam', 'Premium'], ico: '🌙',
    measurements: { 'Wzrost': '168 cm', 'Biust': '90 cm', 'Talia': '64 cm', 'Biodra': '92 cm' },
    characteristics: 'Naturalna elegancja i profesjonalizm. Tworzę treści na najwyższym poziomie jakości w Studio HRL Adult.',
  },
  {
    id: 'alexia-hrl', name: 'Alexia', handle: 'alexia.hrl',
    bio: 'Premium Glamour Creator • Studio HRL Adult • Artistic nudes, Lingerie, Live. Top 5% OnlyFans & Fansly.',
    stats: { followers: '5.2K', content: '380+', satisfaction: '99%', online: '20-00' },
    tags: ['Fansly', 'Luxury', 'Studio'], ico: '✨',
    measurements: { 'Wzrost': '174 cm', 'Biust': '92 cm', 'Talia': '62 cm', 'Biodra': '92 cm' },
    characteristics: 'Artystka, elegancja, zmysłowość ze smakiem. Specjalistka od luxury content i fotografii high-end.',
  },
  {
    id: 'sofia-hrl', name: 'Sofia', handle: 'sofia.hrl',
    bio: 'Multi-platform creator • Studio HRL Adult • BDSM, Fetish & Vanilla. ManyVids Top Seller 2025.',
    stats: { followers: '8.9K', content: '620+', satisfaction: '97%', online: '22-02' },
    tags: ['ManyVids', 'Chaturbate', 'BDSM'], ico: '🔥',
    measurements: { 'Wzrost': '166 cm', 'Biust': '95 cm', 'Talia': '68 cm', 'Biodra': '98 cm' },
    characteristics: 'Dominująca osobowość, profesjonalne podejście do fetish content. Najbardziej wszechstronna twórczyni w portfolio studia.',
  },
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Use raw SQL to only select columns that actually exist in the DB
    const rawProfiles: any[] = await prisma.$queryRaw`
      SELECT id, email, status, "createdAt",
             COALESCE(name, CONCAT("firstName", ' ', "lastName"), 'HRL Model') as name,
             COALESCE(handle, id) as handle,
             COALESCE(bio, description, 'Premium content creator.') as bio,
             "profileStats", platforms, description
      FROM "Partner"
      WHERE status = 'active'
      ORDER BY "createdAt" DESC
    `;

    if (!rawProfiles || rawProfiles.length === 0) {
      return res.status(200).json(DEMO);
    }

    const profiles = rawProfiles.map((p: any) => {
      let stats = { followers: '10K+', content: '100+', satisfaction: '98%', online: 'Daily' };
      try { if (p.profileStats) stats = { ...stats, ...JSON.parse(p.profileStats) }; } catch {}
      let tags = ['Premium'];
      try { if (p.platforms) { const keys = Object.keys(JSON.parse(p.platforms)); if (keys.length) tags = keys.slice(0, 3).map((k: string) => k.charAt(0).toUpperCase() + k.slice(1)); } } catch {}

      const handle = p.handle || p.id || 'model';
      return {
        id: handle,
        name: p.name || 'HRL Model',
        handle: handle,
        bio: p.bio || 'Premium content creator.',
        stats, tags: tags.length > 0 ? tags : ['Premium'],
        ico: '✨', measurements: null,
        characteristics: p.description || p.bio || 'Professional model.',
      };
    });

    return res.status(200).json(profiles);
  } catch (error: any) {
    console.error('Profiles API error:', error.message);
    return res.status(200).json(DEMO);
  }
}
