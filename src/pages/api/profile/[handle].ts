import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

// Fallback profile data for testing
const FALLBACK_PROFILES: { [key: string]: any } = {
  'anna-mark': {
    id: 'test-001',
    handle: 'anna-mark',
    name: 'Anna & Mark',
    bio: 'Autentyczna para - czysta energia i niesamowita chemia.',
    heroImage: '/image/am.jpg',
    aboutImage1: '/image/am1.jpg',
    aboutImage2: '/image/am2.jpg',
    galleryImages: ['/image/am.jpg', '/image/am1.jpg', '/image/am2.jpg', '/image/am25.jpg', '/image/am3.jpg', '/image/am4.jpg'],
    description: 'Jesteśmy tradycyjną parą, która odkryła nowy wymiar swojej relacji poprzez dzielenie się z naszymi fanami. Nasza seksualna harmonię to wynik lat spędzanych razem.',
    yearsTogether: 12,
    type: 'couple',
    stats: { subscribers: 2100, content: 165, satisfaction: 97 },
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
      { name: 'Miesiąc', description: 'Spróbuj bez zobowiązania', price: 12.99, period: 'miesiąc', featured: false, perks: ['Pełne archiwum', 'Live 3x w tygodniu', 'DM bez limitu'], ofUrl: 'https://onlyfans.com' },
      { name: 'Trzy miesiące', description: 'Oszczędzasz 20%', price: 10.99, period: 'miesiąc', featured: true, perks: ['Wszystko z planu Basic', 'Priorytetowe DM', 'Dostęp do PPV'], ofUrl: 'https://onlyfans.com' },
      { name: 'VIP — Rok', description: 'Najlepszy deal', price: 7.99, period: 'miesiąc', featured: false, perks: ['Wszystko z planu 3M', 'Custom video', 'Prywatna sesja', 'VIP w live'], ofUrl: 'https://onlyfans.com' },
    ],
    testimonials: [
      { username: 'COUPLE_LOVER_88', text: 'Jedyna para, którą naprawdę słedzę. Czuć między nimi autentyczną miłość.', since: 'subskrybent od 7 miesięcy', rating: 5, avatar: '👤' },
      { username: 'REAL_ENERGY_PL', text: 'Anna i Mark to energia czysta. Liczę dni do kolejnego live.', since: 'subskrybent od roku', rating: 5, avatar: '👤' },
      { username: 'INTIMATE_MOMENTS', text: 'Custom video było doskonałe - profesjonalnie i z pasją.', since: 'subskrybent od 5 miesięcy', rating: 5, avatar: '👤' },
    ],
  },
  'alexia-exclusive': {
    id: 'test-002',
    handle: 'alexia-exclusive',
    name: 'Alexia',
    bio: 'Sexy, inteligentna i kompletnie bez tabu.',
    heroImage: '/image/Alexia.jpg',
    aboutImage1: '/image/alexia2.jpg',
    aboutImage2: '/image/alexia3.jpg',
    galleryImages: ['/image/Alexia.jpg', '/image/alexia2.jpg', '/image/alexia3.jpg', '/image/alexia4.jpg', '/image/alexia5.jpg'],
    description: 'Jestem artystką w duchu i uwielbiającą eksplorację wszystkiego, co seksualne. Każda sesja to okazja do wyrażenia mojej zmysłowości.',
    yearsTogether: 0,
    type: 'solo',
    stats: { subscribers: 2200, content: 234, satisfaction: 96 },
    platforms: [
      { id: 'onlyfans', name: 'OnlyFans', url: 'https://onlyfans.com', followers: 2200, icon: '💎', verified: true },
      { id: 'fansly', name: 'Fansly', url: 'https://fansly.com', followers: 1800, icon: '🔍', verified: true },
      { id: 'chaturbate', name: 'Chaturbate', url: 'https://chaturbate.com', followers: 3100, icon: '💬', verified: true },
      { id: 'twitter', name: 'Twitter/X', url: 'https://twitter.com', followers: 4800, icon: '𝕏', verified: true },
    ],
    liveSchedule: [
      { day: 'Poniedziałek', time: '22:00', active: true },
      { day: 'Wtorek', time: '', active: false },
      { day: 'Środa', time: '21:00', active: true },
      { day: 'Czwartek', time: '', active: false },
      { day: 'Piątek', time: '23:00', active: true },
      { day: 'Sobota', time: '20:30', active: true },
      { day: 'Niedziela', time: '23:30', active: true },
    ],
    subscriptionPlans: [
      { name: 'Starter', description: 'Podstawowy dostęp', price: 9.99, period: 'miesiąc', featured: false, perks: ['Archiwum', 'Weekly live', 'DM'], ofUrl: 'https://onlyfans.com' },
      { name: 'Pro', description: 'Pełny dostęp', price: 14.99, period: 'miesiąc', featured: true, perks: ['Wszystko', 'Priorytet', 'Custom video'], ofUrl: 'https://onlyfans.com' },
      { name: 'VIP Elite', description: 'Ekskluzywnie', price: 24.99, period: 'miesiąc', featured: false, perks: ['Wszystko Pro', 'Private show', '1:1 time'], ofUrl: 'https://onlyfans.com' },
    ],
    testimonials: [
      { username: 'ALEX_FAN_01', text: 'Najseksowniejsza dziewczyna na platformie. Zawsze nowe treści.', since: 'od 3 miesięcy', rating: 5, avatar: '👤' },
      { username: 'CONTENT_KING', text: 'Jakość contentu jest na poziomie profesjonalnych producentów.', since: 'od roku', rating: 5, avatar: '👤' },
      { username: 'TRUE_BELIEVER', text: 'To nie jest o seksie - to o sztuce i ekspresji. Wspaniałe.', since: 'od 4 miesięcy', rating: 5, avatar: '👤' },
    ],
  },
  'jane-professional': {
    id: 'test-003',
    handle: 'jane-professional',
    name: 'Jane',
    bio: 'Profesjonalna i elegancka - seks na poziomie sztuki.',
    heroImage: '/image/Jane.jpg',
    aboutImage1: '/image/jane1.jpg',
    aboutImage2: '/image/jane2.jpg',
    galleryImages: ['/image/Jane.jpg', '/image/jane1.jpg', '/image/jane2.jpg', '/image/jane4.jpg', '/image/jane5.jpg'],
    description: 'Wierzę że seks to sztuka. Każdy moment, każda sesja to starannie skomponowana produkcja dla twoich zmysłów. Doświadczenie jest kluczowe.',
    yearsTogether: 0,
    type: 'solo',
    stats: { subscribers: 1900, content: 187, satisfaction: 98 },
    platforms: [
      { id: 'onlyfans', name: 'OnlyFans', url: 'https://onlyfans.com', followers: 1900, icon: '💎', verified: true },
      { id: 'fansly', name: 'Fansly', url: 'https://fansly.com', followers: 1650, icon: '🔍', verified: true },
      { id: 'manyvids', name: 'ManyVids', url: 'https://manyvids.com', followers: 2100, icon: '🎬', verified: false },
      { id: 'twitter', name: 'Twitter/X', url: 'https://twitter.com', followers: 3200, icon: '𝕏', verified: true },
    ],
    liveSchedule: [
      { day: 'Poniedziałek', time: '21:00', active: true },
      { day: 'Wtorek', time: '20:30', active: true },
      { day: 'Środa', time: '', active: false },
      { day: 'Czwartek', time: '22:00', active: true },
      { day: 'Piątek', time: '', active: false },
      { day: 'Sobota', time: '21:00', active: true },
      { day: 'Niedziela', time: '22:30', active: true },
    ],
    subscriptionPlans: [
      { name: 'Essential', description: 'Podstawa', price: 11.99, period: 'miesiąc', featured: false, perks: ['Galeria', 'Live sessions', 'Chat'], ofUrl: 'https://onlyfans.com' },
      { name: 'Premium', description: 'Pełne doświadczenie', price: 16.99, period: 'miesiąc', featured: true, perks: ['Wszystko', 'PPV access', 'Priority DM'], ofUrl: 'https://onlyfans.com' },
      { name: 'Ultimate', description: 'Ekskluzywne sesje', price: 29.99, period: 'miesiąc', featured: false, perks: ['Wszystko Premium', 'Solo video', 'Prywatna rozmowa'], ofUrl: 'https://onlyfans.com' },
    ],
    testimonials: [
      { username: 'QUALITY_JUNKIES', text: 'Jane traktuje to jak sztukę. Każda sesja to produkcja Hollywood.', since: 'od 8 miesięcy', rating: 5, avatar: '👤' },
      { username: 'REFINED_TASTE', text: 'Elegancja, klasa i seks. Dokładnie to czego szukałem.', since: 'od najechodu', rating: 5, avatar: '👤' },
      { username: 'VIP_ONLY', text: 'Najlepszy content na całej platformie. Warte każdej złotówki.', since: 'od 5 miesięcy', rating: 5, avatar: '👤' },
    ],
  },
};

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
    // Try to fetch from database
    let partner;
    try {
      partner = await prisma.partner.findUnique({
        where: { handle },
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      partner = null;
    }

    // If not found in database, use fallback data
    if (!partner) {
      const fallbackProfile = FALLBACK_PROFILES[handle];
      if (fallbackProfile) {
        return res.status(200).json(fallbackProfile as ProfileData);
      }
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Parse JSON fields from database
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
    // Even on error, try to return fallback data
    const fallbackProfile = FALLBACK_PROFILES[handle as string];
    if (fallbackProfile) {
      return res.status(200).json(fallbackProfile as ProfileData);
    }
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
}
