import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

const DEMO_PROFILES: Record<string, any> = {
  'luna-hrl': {
    id: 'luna-hrl', name: 'Luna', handle: '@luna.hrl', ico: '🌙',
    tags: ['Premium', 'Live Cam', 'OnlyFans'],
    bio: 'Profesjonalna twórczyni treści adult z 3-letnim doświadczeniem. Specjalizuję się w eleganckich, artystycznych sesjach i interaktywnych streamach live.',
    characteristics: 'Naturalna elegancja, zmysłowość i profesjonalne podejście do każdej sesji. Tworzę treści na najwyższym poziomie jakości.',
    measurements: { 'Wzrost': '168 cm', 'Biust': '90 cm', 'Talia': '64 cm', 'Biodra': '92 cm', 'Rozmiar': '75C', 'Włosy': 'Brązowe', 'Oczy': 'Zielone' },
    platforms: {
      onlyfans: { url: 'https://onlyfans.com', username: 'luna.hrl', followers: '2.4K' },
      chaturbate: { url: 'https://chaturbate.com', username: 'lunahrl', followers: '8.1K' },
      fansly: { url: 'https://fansly.com', username: 'luna.hrl', followers: '1.2K' },
    },
    stats: { subscribers: '3.6K', content: '240+', satisfaction: '98%' },
    liveSchedule: [
      { day: 'Wtorek', time: '21:00 – 23:00', active: true },
      { day: 'Czwartek', time: '22:00 – 00:00', active: true },
      { day: 'Sobota', time: '20:00 – 23:00', active: true },
    ],
    subscriptionPlans: [
      { name: 'Basic Fan', price: '$9.99/mies', features: ['Dostęp do zdjęć', 'DM priorytet'] },
      { name: 'VIP Access', price: '$24.99/mies', features: ['Ekskluzywne wideo', 'Prywatne ticki live', 'Custom PPV -20%'] },
      { name: 'Elite', price: '$49.99/mies', features: ['1x custom video/mies', 'Bezpośredni kontakt', 'Zdjęcia podpisane'] },
    ],
    testimonials: [
      { username: 'Fan_PL_01', text: 'Najlepsza twórczyni jakiej subskrybuję!', since: 'Marzec 2025', rating: 5 },
      { username: 'TopFan_X', text: 'Custom video przekroczyło moje oczekiwania.', since: 'Styczeń 2025', rating: 5 },
    ],
    heroImage: null, type: 'solo', status: 'active',
  },
  'alexia-hrl': {
    id: 'alexia-hrl', name: 'Alexia', handle: '@alexia.hrl', ico: '✨',
    tags: ['Fansly', 'Luxury', 'Artistic'],
    bio: 'Premium Glamour Creator. Studio HRL Adult. Specjalizacja: Artistic nudes, Lingerie, Live. Top 5% OnlyFans & Fansly.',
    characteristics: 'Artystka, elegancja, zmysłowość ze smakiem. Specjalistka od luxury content i fotografii high-end.',
    measurements: { 'Wzrost': '174 cm', 'Biust': '92 cm', 'Talia': '62 cm', 'Biodra': '92 cm', 'Rozmiar': '75B', 'Włosy': 'Czarne', 'Oczy': 'Brązowe' },
    platforms: {
      onlyfans: { url: 'https://onlyfans.com', username: 'alexia.hrl', followers: '3.8K' },
      fansly: { url: 'https://fansly.com', username: 'alexia.hrl', followers: '2.1K' },
    },
    stats: { subscribers: '5.2K', content: '380+', satisfaction: '99%' },
    liveSchedule: [
      { day: 'Środa', time: '20:00 – 22:00', active: true },
      { day: 'Piątek', time: '21:00 – 23:00', active: true },
    ],
    subscriptionPlans: [
      { name: 'Classic', price: '$12.99/mies', features: ['Galerie zdjęć', 'Monthly exclusive'] },
      { name: 'Luxury VIP', price: '$34.99/mies', features: ['Video content', 'Custom requests', 'Live priority'] },
    ],
    testimonials: [
      { username: 'LuxuryFan99', text: 'Absolutnie piękna i profesjonalna. Najlepsza inwestycja!', since: 'Styczeń 2025', rating: 5 },
    ],
    heroImage: null, type: 'solo', status: 'active',
  },
  'sofia-hrl': {
    id: 'sofia-hrl', name: 'Sofia', handle: '@sofia.hrl', ico: '🔥',
    tags: ['ManyVids', 'Chaturbate', 'BDSM'],
    bio: 'Multi-platform creator. Studio HRL Adult. BDSM, Fetish & Vanilla. ManyVids Top Seller 2025.',
    characteristics: 'Dominująca osobowość, profesjonalne podejście do fetish content. Najbardziej wszechstronna twórczyni w portfolio studia.',
    measurements: { 'Wzrost': '166 cm', 'Biust': '95 cm', 'Talia': '68 cm', 'Biodra': '98 cm', 'Rozmiar': '80D', 'Włosy': 'Rude', 'Oczy': 'Piwne' },
    platforms: {
      chaturbate: { url: 'https://chaturbate.com', username: 'sofiahrl', followers: '12.4K' },
      manyvids: { url: 'https://manyvids.com', username: 'sofia-hrl', followers: '4.2K' },
    },
    stats: { subscribers: '8.9K', content: '620+', satisfaction: '97%' },
    liveSchedule: [
      { day: 'Poniedziałek', time: '22:00 – 01:00', active: true },
      { day: 'Czwartek', time: '22:00 – 00:00', active: true },
      { day: 'Niedziela', time: '21:00 – 23:00', active: true },
    ],
    subscriptionPlans: [
      { name: 'Fan', price: '$7.99/mies', features: ['Podstawowe treści', 'Newsy'] },
      { name: 'Sub+', price: '$19.99/mies', features: ['Fetish content', 'Custom clips -15%', 'DM priority'] },
    ],
    testimonials: [
      { username: 'FetishKing', text: 'Najbardziej profesjonalna Domina na Chaturbate. Perfekcja.', since: 'Luty 2025', rating: 5 },
    ],
    heroImage: null, type: 'solo', status: 'active',
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { handle } = req.query;
  const handleStr = Array.isArray(handle) ? handle[0] : (handle ?? '');

  try {
    const partner = await prisma.partner.findUnique({ where: { handle: handleStr } });
    
    if (partner) {
      const safeJSON = (s: any, fallback: any = {}) => {
        try { return typeof s === 'string' ? JSON.parse(s) : (s || fallback); } catch { return fallback; }
      };

      // Parse profileData
      const parsedProfileData = safeJSON(partner.profileData, {
        likes: [], boundaries: [], bestInMe: [], whyWatchMe: [], gallery: []
      });

      // Ensure we return the real DB columns that the new ProfileTemplate expects
      return res.status(200).json({
        ...partner,
        height: partner.height || '174',
        weight: partner.weight || '58',
        measurements: partner.measurements || '92C / 62 / 92',
        bio: partner.bio || partner.description || '',
        characteristics: partner.description || '',
        platforms: safeJSON(partner.platforms),
        stats: safeJSON(partner.profileStats),
        liveSchedule: safeJSON(partner.liveSchedule, []),
        subscriptionPlans: safeJSON(partner.subscriptionPlans, []),
        testimonials: safeJSON(partner.testimonials, []),
        profileData: {
          likes: parsedProfileData.likes || [],
          boundaries: parsedProfileData.boundaries || [],
          bestInMe: parsedProfileData.bestInMe || [],
          whyWatchMe: parsedProfileData.whyWatchMe || [],
          gallery: parsedProfileData.gallery || []
        },
        tags: ['Premium', 'Studio HRL'],
        ico: '⭐',
      });
    }

    // Fallback demo
    const demo = DEMO_PROFILES[handleStr];
    if (demo) return res.status(200).json(demo);

    return res.status(404).json({ error: 'Profile not found' });
  } catch (error: any) {
    console.error('Profile API error:', error);
    const demo = DEMO_PROFILES[handleStr];
    if (demo) return res.status(200).json(demo);
    return res.status(500).json({ error: error.message });
  }
}
