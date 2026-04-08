import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import ProfileTemplate from '@/components/profile/ProfileTemplate';

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { handle } = router.query;
        if (!handle) return;

        // Fetch from API or use mock data
        const response = await fetch(`/api/profile/${handle}`);
        if (!response.ok) {
          // Try mock data if API fails
          const mockProfile = getMockProfile(handle as string);
          if (mockProfile) {
            setProfileData(mockProfile);
            setLoading(false);
            return;
          }
          setError('Profil nie został znaleziony');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        // Try mock data on error
        const mockProfile = getMockProfile(router.query.handle as string);
        if (mockProfile) {
          setProfileData(mockProfile);
        } else {
          setError('Błąd podczas ładowania profilu');
        }
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchProfile();
    }
  }, [router.isReady, router.query]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-white text-lg">Ładowanie profilu...</p>
        </div>
      </div>
    );
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <Head>
          <title>Profil nie znaleziony | Studio HRL Adult</title>
        </Head>
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <p className="text-white text-lg">{error || 'Profil nie został znaleziony'}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{profileData?.name} | Studio HRL Adult</title>
        <meta name="description" content={profileData?.bio} />
      </Head>
      <ProfileTemplate data={profileData} />
    </>
  );
};

// Mock profiles - fallback data
const getMockProfile = (handle: string) => {
  const profiles: Record<string, any> = {
    'axel-vee': {
      id: 'axel-vee',
      handle: 'axel-vee',
      name: 'Axel & Vee',
      bio: 'Prawdziwe momenty, prawdziwa chemia, prawdziwa intymność. Zadnych scenariuszy — tylko my, kamera i wy.',
      yearsTogether: 16,
      heroImage: '/images/image01.jpg',
      aboutImage1: '/images/image06.jpg',
      aboutImage2: '/images/image07.jpg',
      description: 'Jestesmy ze sobą od 16 lat – przeszliśmy razem przez wszystko. Z biegiem czasu nasza więź stawała się tylko głębsza, a fantazje coraz odważniejsze. Zrozumieliśmy, że nasza chemia to coś, co wymyka się schematom.',
      stats: {
        subscribers: 2400,
        content: 180,
        satisfaction: 98,
      },
      platforms: [
        { id: 'onlyfans', name: 'OnlyFans', url: 'https://onlyfans.com', followers: 2400, icon: '💎', verified: true },
        { id: 'fansly', name: 'Fansly', url: 'https://fansly.com', followers: 1800, icon: '🔍', verified: true },
        { id: 'chaturbate', name: 'Chaturbate', url: 'https://chaturbate.com', followers: 3200, icon: '💬', verified: true },
        { id: 'stripchat', name: 'StripChat', url: 'https://stripchat.com', followers: 2800, icon: '🎥', verified: false },
        { id: 'twitter', name: 'Twitter/X', url: 'https://twitter.com', followers: 5600, icon: '𝕏', verified: true },
        { id: 'telegram', name: 'Telegram', url: 'https://t.me', followers: 3400, icon: '✈️', verified: false },
        { id: 'reddit', name: 'Reddit', url: 'https://reddit.com', followers: 2100, icon: '🟠', verified: false },
        { id: 'instagram', name: 'Instagram', url: 'https://instagram.com', followers: 8900, icon: '📸', verified: true },
      ],
      liveSchedule: [
        { day: 'Poniedziałek', time: '', active: false },
        { day: 'Wtorek', time: '21:00', active: true },
        { day: 'Środa', time: '', active: false },
        { day: 'Czwartek', time: '', active: false },
        { day: 'Piątek', time: '', active: false },
        { day: 'Sobota', time: '22:30', active: true },
        { day: 'Niedziela', time: '', active: false },
      ],
      subscriptionPlans: [
        {
          name: 'Miesiąc',
          description: 'Spróbuj bez zobowiązania',
          price: 14.99,
          period: 'miesiąc',
          featured: false,
          perks: ['Pełne archiwum', 'Live dwa razy w tygodniu', 'DM bez limitu'],
          ofUrl: 'https://onlyfans.com',
        },
        {
          name: 'Trzy miesiące',
          description: 'Oszczędzasz 25%',
          price: 11.99,
          period: 'miesiąc',
          featured: true,
          perks: ['Wszystko z planu Basic', 'Priorytetowe DM', 'Dostęp do archiwum PPV'],
          ofUrl: 'https://onlyfans.com',
        },
        {
          name: 'VIP — Rok',
          description: 'Najlepszy deal + custom',
          price: 8.99,
          period: 'miesiąc',
          featured: false,
          perks: ['Wszystko z planu 3M', '1 custom video miesięcznie', 'Prywatna sesja Q&A', 'Oznaczenie VIP w live'],
          ofUrl: 'https://onlyfans.com',
        },
      ],
      testimonials: [
        {
          username: 'DARKANGEL_88',
          text: 'Subskrybuję od pół roku i to jedyny profil, za który płacę z przyjemnością. Czuć że to prawdziwi ludzie, nie aktorzy.',
          since: 'subskrybent od 6 miesięcy',
          rating: 5,
          avatar: '👤',
        },
        {
          username: 'MIDNIGHT_WOLF',
          text: 'Zarabiłem custom i dostałem dokładnie to o co prosiłem. Vee i Axel to profesjonaliści w każdym sensie.',
          since: 'subskrybent od roku',
          rating: 5,
          avatar: '👤',
        },
        {
          username: 'SILVER_QUEEN_PL',
          text: 'Live w sobotę jest must-have mojego tygodnia. Chemia między nimi jest niesamowita.',
          since: 'subskrybentka od 4 miesięcy',
          rating: 5,
          avatar: '👤',
        },
      ],
    },
  };

  return profiles[handle] || null;
};

export default ProfilePage;
