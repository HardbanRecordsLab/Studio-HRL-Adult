import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { verifyAdminToken } from '@/utils/adminAuth';

const PROFILE_SEEDS = [
  {
    name: 'Anna & Mark',
    handle: 'anna-mark',
    email: 'anna-mark@studiohrl.pl',
    type: 'couple',
    bio: 'Autentyczna para - czysta energia i niesamowita chemia. Dwie osoby, jeden cel - dostarczać ci niezapomniane chwile.',
    description: 'Jesteśmy tradycyjną parą, która odkryła nowy wymiar swojej relacji poprzez dzielenie się z naszymi fanami. Nasza seksualna harmonię to wynik lat spędzanych razem. Z każdą produkcją chcemy wam pokazać, że nasza miłość jest żywa, gwałtowna i autentyczna.',
    yearsTogether: 12,
    heroImage: '/image/am.jpg',
    aboutImage1: '/image/am1.jpg',
    aboutImage2: '/image/am2.jpg',
    profileStats: {
      subscribers: 2100,
      content: 165,
      satisfaction: 97,
    },
    platforms: [
      { id: 'onlyfans', name: 'OnlyFans', url: 'https://onlyfans.com', followers: 2100, icon: '💎', verified: true },
      { id: 'fansly', name: 'Fansly', url: 'https://fansly.com', followers: 1650, icon: '🔍', verified: true },
      { id: 'chaturbate', name: 'Chaturbate', url: 'https://chaturbate.com', followers: 2900, icon: '💬', verified: true },
      { id: 'twitter', name: 'Twitter/X', url: 'https://twitter.com', followers: 4200, icon: '𝕏', verified: true },
    ],
    liveSchedule: [
      { day: 'Poniedziałek', time: '', active: false },
      { day: 'Wtorek', time: '20:30', active: true },
      { day: 'Środa', time: '', active: false },
      { day: 'Czwartek', time: '', active: false },
      { day: 'Piątek', time: '22:00', active: true },
      { day: 'Sobota', time: '21:30', active: true },
      { day: 'Niedziela', time: '', active: false },
    ],
    subscriptionPlans: [
      {
        name: 'Miesiąc',
        description: 'Spróbuj bez zobowiązania',
        price: 12.99,
        period: 'miesiąc',
        featured: false,
        perks: ['Pełne archiwum', 'Live 3x w tygodniu', 'DM bez limitu'],
        ofUrl: 'https://onlyfans.com',
      },
      {
        name: 'Trzy miesiące',
        description: 'Oszczędzasz 20%',
        price: 10.99,
        period: 'miesiąc',
        featured: true,
        perks: ['Wszystko z planu Basic', 'Priorytetowe DM', 'Dostęp do PPV'],
        ofUrl: 'https://onlyfans.com',
      },
      {
        name: 'VIP — Rok',
        description: 'Najlepszy deal',
        price: 7.99,
        period: 'miesiąc',
        featured: false,
        perks: ['Wszystko z planu 3M', 'Custom video', 'Prywatna sesja', 'VIP w live'],
        ofUrl: 'https://onlyfans.com',
      },
    ],
    testimonials: [
      {
        username: 'COUPLE_LOVER_88',
        text: 'Jedyna para, którą naprawdę słedzę. Czuć między nimi autentyczną miłość, a nie udawaną chemię do kamery.',
        since: 'subskrybent od 7 miesięcy',
        rating: 5,
        avatar: '👤',
      },
      {
        username: 'REAL_ENERGY_PL',
        text: 'Anna i Mark to energia czysta. Liczę dni do kolejnego live. Najlepsza para na platformie.',
        since: 'subskrybent od roku',
        rating: 5,
        avatar: '👤',
      },
      {
        username: 'INTIMATE_MOMENTS',
        text: 'Custom video było doskonałe - widzieli naszą ideę i wykonali to perfekcyjnie. Profesjonalnie i z pasją.',
        since: 'subskrybent od 5 miesięcy',
        rating: 5,
        avatar: '👤',
      },
    ],
  },
  {
    name: 'Alexia',
    handle: 'alexia-exclusive',
    email: 'alexia@studiohrl.pl',
    type: 'solo',
    bio: 'Sexy, inteligentna i kompletnie bez tabu. Tworzę treści, które zapalają wyobraźnię i stawiają cię na krawędzi.',
    description: 'Jestem artystką w duchu i uwielbiającą eksplorację wszystkiego, co seksualne. Każda sesja to okazja do wyrażenia mojej zmysłowości i namiętności. Nie staję się tym, czego chcą inni - byłem tym wciąż sama, dopóki nie odkryłem moją władzę.',
    yearsTogether: 0,
    heroImage: '/image/Alexia.jpg',
    aboutImage1: '/image/alexia2.jpg',
    aboutImage2: '/image/alexia3.jpg',
    profileStats: {
      subscribers: 2200,
      content: 175,
      satisfaction: 98,
    },
    platforms: [
      { id: 'onlyfans', name: 'OnlyFans', url: 'https://onlyfans.com', followers: 2200, icon: '💎', verified: true },
      { id: 'fansly', name: 'Fansly', url: 'https://fansly.com', followers: 1750, icon: '🔍', verified: true },
      { id: 'manyvids', name: 'ManyVids', url: 'https://manyvids.com', followers: 1100, icon: '🎬', verified: true },
      { id: 'telegram', name: 'Telegram', url: 'https://t.me', followers: 2800, icon: '✈️', verified: false },
    ],
    liveSchedule: [
      { day: 'Poniedziałek', time: '21:00', active: true },
      { day: 'Wtorek', time: '', active: false },
      { day: 'Środa', time: '20:00', active: true },
      { day: 'Czwartek', time: '', active: false },
      { day: 'Piątek', time: '22:30', active: true },
      { day: 'Sobota', time: '', active: false },
      { day: 'Niedziela', time: '19:00', active: true },
    ],
    subscriptionPlans: [
      {
        name: 'Supporter',
        description: 'Podstawowy dostęp do świata Alexii',
        price: 5.99,
        period: 'miesiąc',
        featured: false,
        perks: ['Tygodniowe posty', 'DM dostęp', 'Story updates', 'Behind the scenes'],
        ofUrl: 'https://onlyfans.com',
      },
      {
        name: 'Premium',
        description: 'Pełny dostęp i priorytet',
        price: 11.99,
        period: 'miesiąc',
        featured: true,
        perks: ['Wszystkie wideo', 'Custom requests', 'Priority replies', 'Exclusive live'],
        ofUrl: 'https://onlyfans.com',
      },
      {
        name: 'Lover VIP',
        description: 'Najintymniejszy dostęp',
        price: 34.99,
        period: 'miesiąc',
        featured: false,
        perks: ['Wszystko z Premium', '1-on-1 video calls', 'Personalized content', 'Birthday gift'],
        ofUrl: 'https://onlyfans.com',
      },
    ],
    testimonials: [
      {
        username: 'ALEXIA_ADMIRER',
        text: 'Alexia to nie tylko piękno, to inteligencja i zmysł artystyczny. Każdy jej post to arcydzieło. Obowiązkowa subskrypcja.',
        since: 'subskrybent od 11 miesięcy',
        rating: 5,
        avatar: '👤',
      },
      {
        username: 'PREMIUM_FAN_2024',
        text: 'Custom video był dokładnie taki jaki sobie wybierowalem. Alexia zrozumiała każdy detal i dostarczyła czystą doskonałość.',
        since: 'subskrybent od 6 miesięcy',
        rating: 5,
        avatar: '👤',
      },
      {
        username: 'DEVOTED_SOUL',
        text: 'Live transmisje z Alexią to medytacja dla duszy. Energia, którą emituje, nauczyła mnie znaczenia prawdziwej zmysłowości.',
        since: 'subskrybent od 8 miesięcy',
        rating: 5,
        avatar: '👤',
      },
    ],
  },
  {
    name: 'Jane',
    handle: 'jane-desires',
    email: 'jane@studiohrl.pl',
    type: 'solo',
    bio: 'Nieznajoma fantazji i taboo. Twój bezpieczny azyl, gdzie wszystko jest możliwe i nic cię nie osądzi.',
    description: 'Jestem Jane - osoba namiętna, która nie boi się ekspresji seksualnej. Moją misją jest tworzyć treści, które nie tylko zapalają Cię fizycznie, ale także zmuszają cię do myślenia, marzenia i pragnienia czegoś więcej. Każdy moment powinien być wart wspomnień.',
    yearsTogether: 0,
    heroImage: '/image/Jane.jpg',
    aboutImage1: '/image/jane1.jpg',
    aboutImage2: '/image/jane2.jpg',
    profileStats: {
      subscribers: 1900,
      content: 155,
      satisfaction: 96,
    },
    platforms: [
      { id: 'onlyfans', name: 'OnlyFans', url: 'https://onlyfans.com', followers: 1900, icon: '💎', verified: true },
      { id: 'fansly', name: 'Fansly', url: 'https://fansly.com', followers: 1450, icon: '🔍', verified: true },
      { id: 'stripchat', name: 'StripChat', url: 'https://stripchat.com', followers: 2400, icon: '🎥', verified: true },
      { id: 'reddit', name: 'Reddit', url: 'https://reddit.com', followers: 1800, icon: '🟠', verified: false },
    ],
    liveSchedule: [
      { day: 'Poniedziałek', time: '', active: false },
      { day: 'Wtorek', time: '22:00', active: true },
      { day: 'Środa', time: '', active: false },
      { day: 'Czwartek', time: '21:30', active: true },
      { day: 'Piątek', time: '', active: false },
      { day: 'Sobota', time: '23:00', active: true },
      { day: 'Niedziela', time: '', active: false },
    ],
    subscriptionPlans: [
      {
        name: 'Curious',
        description: 'Pierwszy krok w mój świat',
        price: 6.99,
        period: 'miesiąc',
        featured: false,
        perks: ['Archiwum zdjęć', 'DM chat', 'Wiadomości video', 'Aktualizacje'],
        ofUrl: 'https://onlyfans.com',
      },
      {
        name: 'Passionate',
        description: 'Pełna immersja',
        price: 12.99,
        period: 'miesiąc',
        featured: true,
        perks: ['Wszystkie wideo', 'Exclusive sessions', 'Custom requests', 'Live shows'],
        ofUrl: 'https://onlyfans.com',
      },
      {
        name: 'Obsessed',
        description: 'VIP treatment',
        price: 39.99,
        period: 'miesiąc',
        featured: false,
        perks: ['Wszystko z Passionate', 'Private video calls', 'Personalized content', 'Story requests'],
        ofUrl: 'https://onlyfans.com',
      },
    ],
    testimonials: [
      {
        username: 'JANE_ADMIRER_PL',
        text: 'Jane to kombinacja piękna i inteligencji. Każdy jej post ma sens, każda sesja to dzieło sztuki. Najlepsza inwestycja Ever.',
        since: 'subskrybent od 9 miesięcy',
        rating: 5,
        avatar: '👤',
      },
      {
        username: 'FANTASY_SEEKER',
        text: 'Custom video - Jane tak dobrze rozumiała moją fantazję, że myślę, że czyta moje myśli. Poza świetem. Wracam co miesiąc.',
        since: 'subskrybent od 10 miesięcy',
        rating: 5,
        avatar: '👤',
      },
      {
        username: 'LIVE_DEVOTEE',
        text: 'Live z Jane to niesamowite doświadczenie. Energia, która wybucha z ekranu, zdaje się zaraźliwa. Nie mogę się doczekać następnego.',
        since: 'subskrybent od 4 miesięcy',
        rating: 5,
        avatar: '👤',
      },
    ],
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ success: boolean; count?: number } | { error: string }>
) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify admin authentication
  const adminToken = req.headers.authorization?.split(' ')[1];
  if (!adminToken || !verifyAdminToken(adminToken)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Create or update profiles
    let createdCount = 0;
    for (const profileData of PROFILE_SEEDS) {
      const existing = await prisma.partner.findUnique({
        where: { handle: profileData.handle },
      });

      if (!existing) {
        const { platforms, liveSchedule, subscriptionPlans, testimonials, profileStats, ...rest } = profileData;

        await prisma.partner.create({
          data: {
            ...rest,
            platforms: JSON.stringify(platforms),
            liveSchedule: JSON.stringify(liveSchedule),
            subscriptionPlans: JSON.stringify(subscriptionPlans),
            testimonials: JSON.stringify(testimonials),
            profileStats: JSON.stringify(profileStats),
          },
        });
        createdCount++;
      } else {
        const { platforms, liveSchedule, subscriptionPlans, testimonials, profileStats, ...rest } = profileData;

        await prisma.partner.update({
          where: { handle: profileData.handle },
          data: {
            ...rest,
            platforms: JSON.stringify(platforms),
            liveSchedule: JSON.stringify(liveSchedule),
            subscriptionPlans: JSON.stringify(subscriptionPlans),
            testimonials: JSON.stringify(testimonials),
            profileStats: JSON.stringify(profileStats),
          },
        });
      }
    }

    return res.status(200).json({ success: true, count: createdCount });
  } catch (error) {
    console.error('Seed error:', error);
    return res.status(500).json({ error: 'Failed to seed profiles' });
  }
}
