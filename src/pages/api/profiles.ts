import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const rawProfiles = await prisma.partner.findMany({
      where: { status: 'active' },
    });

    const profiles = rawProfiles.map((p: any) => {
      let stats = { followers: '10K+', content: '100+', satisfaction: '98%', online: 'Daily' };
      try { if (p.profileStats) stats = JSON.parse(p.profileStats); } catch(e){}

      let tags = ['Premium'];
      try { 
        if (p.platforms) {
          const plats = JSON.parse(p.platforms);
          tags = Object.keys(plats).slice(0, 3).map(k => k.charAt(0).toUpperCase() + k.slice(1));
        }
      } catch(e){}

      const handle = p.handle || 'model';
      const name = p.name || 'HRL Model';

      return {
        id: p.id,
        name: name,
        handle: handle.startsWith('@') ? handle : `@${handle}`,
        age: 21,
        bio: p.bio || 'Premium content creator.',
        stats,
        tags: tags.length > 0 ? tags : ['Premium'],
        ico: '✨',
        measurements: null,
        characteristics: p.description || p.bio || 'Professional model.'
      };
    });

    if (profiles.length === 0) {
      profiles.push(
        { 
          id: 'jane', 
          name: 'Jane', 
          handle: '@jane_premium', 
          age: 24, 
          bio: 'Sensualna zmysłowa artystka • Premium content creator • Specjalizacja: Lingerie, artystyczne nudy, zmysłowe sesje. Top 5% OnlyFans.', 
          stats: { followers: '28.5K', content: '620+', satisfaction: '97%', online: '18-22' }, 
          tags: ['OnlyFans', 'Fansly', 'Sensual'], 
          ico: '💋',
          measurements: { height: '172cm', weight: '58kg', bust: '100cm', waist: '65cm', hips: '95cm' },
          characteristics: 'Zmysłowa, artystka, naturalny seks-appeal. Specjalistka od tworzenia pięknych lingerie content i artystycznych nudów z tatuażem na biodrze.'
        },
        { 
          id: 'alexia', 
          name: 'Alexia', 
          handle: '@alexia_premium', 
          age: 23, 
          bio: 'Premium Glamour Creator • 10+ lat doświadczenia w modelingu • Specjalizacja: Artistic nudes, Fashion, Lingerie. Top 3% OnlyFans & Fansly.', 
          stats: { followers: '42.8K', content: '850+', satisfaction: '99%', online: '12-20' }, 
          tags: ['OnlyFans', 'Fansly', 'Luxury'], 
          ico: '✨',
          measurements: { height: '174cm', weight: '56kg', bust: '92cm', waist: '62cm', hips: '92cm' },
          characteristics: 'Artystka, elegancja, zmysłowość ze smakiem. Specjalistka od luxury content, artystycznych nudów i fotografii high-end. Absolutna profesjonalistka.'
        }
      );
    }

    return res.status(200).json(profiles);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
