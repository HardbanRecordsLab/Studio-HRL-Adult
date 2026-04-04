import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Footer from '@/components/common/Footer';

// ─── MOCK DATA – w produkcji zastąp fetch z bazy ─────────────────────────────
const PROFILES: Record<string, ProfileData> = {
  'anna-marek': {
    handle: 'anna-marek',
    type: 'couple',
    name: 'Anna & Marek',
    tagline: 'Tylko dla Twoich & naszych',
    eyebrow: 'Autentyczna Para — Polska — Studio HRL Adult',
    bio: 'Prawdziwe momenty, prawdziwa chemia, prawdziwa intymność. Żadnych scenariuszy — tylko my, kamera i wy. Tworzymy treści premium w studiu 4K z pełnym profesjonalizmem.',
    stats: [
      { val: '2.4k+', label: 'Subskrybentów' },
      { val: '180+', label: 'Filmów i sesji' },
      { val: '98%', label: 'Zadowolonych' },
    ],
    platforms: [
      { name: 'OnlyFans', url: '#', color: '#00AFF0', icon: '🔥' },
      { name: 'Fansly', url: '#', color: '#9B59B6', icon: '💫' },
      { name: 'Chaturbate', url: '#', color: '#F84' , icon: '🔴' },
    ],
    plans: [
      { name: 'Fan', price: '$9.99', period: '/mies.', desc: 'Dostęp do zdjęć i krótkich klipów', perks: ['50+ zdjęć miesięcznie', 'Klipy SFW', 'Wiadomości prywatne'], featured: false },
      { name: 'Premium', price: '$19.99', period: '/mies.', desc: 'Pełny dostęp do wszystkich treści', perks: ['Wszystkie filmy HD', 'Live stream dostęp', 'Custom requests', 'Priorytetowe odpowiedzi'], featured: true },
      { name: 'VIP', price: '$49.99', period: '/mies.', desc: 'Ekskluzywny dostęp i kontakt osobisty', perks: ['Wszystko z Premium', 'Prywatne sesje live', 'Custom video na życzenie', 'Bezpośredni kontakt'], featured: false },
    ],
    schedule: [
      { day: 'Wt', time: '21:00', active: false },
      { day: 'Cz', time: '20:00', active: false },
      { day: 'Pt', time: '22:00', active: true },
      { day: 'So', time: '21:00', active: false },
      { day: 'Nd', time: '20:00', active: false },
    ],
    testimonials: [
      { text: 'Najlepsza para na platformie. Autentyczność i chemia między nimi jest niesamowita. Subskrybuję od 8 miesięcy i nigdy się nie zawiodłem.', name: 'TopFan_PL', since: 'Fan od 8 miesięcy' },
      { text: 'Jakość 4K, profesjonalne podejście i zawsze na czas. Anna i Marek to standard, do którego inni powinni dążyć.', name: 'Premium_User', since: 'Fan od 1 roku' },
      { text: 'Custom video zrealizowane w 48h, dokładnie tak jak prosiłem. Polecam każdemu kto szuka czegoś wyjątkowego.', name: 'VIP_Member', since: 'Fan od 6 miesięcy' },
    ],
    contentCount: 12,
    isLive: false,
  },
  'sofia': {
    handle: 'sofia',
    type: 'solo',
    name: 'Sofia',
    tagline: 'Elegancja i Intymność',
    eyebrow: 'Premium Creator — Studio HRL Adult',
    bio: 'Tworzę treści premium łączące elegancję z autentycznością. Każda sesja to starannie zaplanowane dzieło sztuki w jakości 4K.',
    stats: [
      { val: '1.8k+', label: 'Subskrybentów' },
      { val: '120+', label: 'Treści' },
      { val: '99%', label: 'Zadowolonych' },
    ],
    platforms: [
      { name: 'OnlyFans', url: '#', color: '#00AFF0', icon: '🔥' },
      { name: 'Fansly', url: '#', color: '#9B59B6', icon: '💫' },
    ],
    plans: [
      { name: 'Fan', price: '$7.99', period: '/mies.', desc: 'Podstawowy dostęp', perks: ['Zdjęcia tygodniowo', 'Stories', 'Wiadomości'], featured: false },
      { name: 'Premium', price: '$15.99', period: '/mies.', desc: 'Pełny dostęp', perks: ['Wszystkie filmy', 'Live dostęp', 'PPV zniżki'], featured: true },
      { name: 'VIP', price: '$39.99', period: '/mies.', desc: 'Ekskluzywny kontakt', perks: ['Wszystko z Premium', 'Custom video', 'Prywatne live'], featured: false },
    ],
    schedule: [
      { day: 'Śr', time: '21:00', active: false },
      { day: 'Pt', time: '22:00', active: true },
      { day: 'So', time: '20:00', active: false },
    ],
    testimonials: [
      { text: 'Sofia to klasa sama w sobie. Profesjonalizm i autentyczność w jednym.', name: 'Fan_01', since: 'Fan od 6 miesięcy' },
      { text: 'Najlepsza inwestycja w subskrypcję jaką zrobiłem. Polecam każdemu.', name: 'Premium_01', since: 'Fan od 1 roku' },
    ],
    contentCount: 8,
    isLive: false,
  },
};

interface ProfileData {
  handle: string;
  type: 'couple' | 'solo';
  name: string;
  tagline: string;
  eyebrow: string;
  bio: string;
  stats: { val: string; label: string }[];
  platforms: { name: string; url: string; color: string; icon: string }[];
  plans: { name: string; price: string; period: string; desc: string; perks: string[]; featured: boolean }[];
  schedule: { day: string; time: string; active: boolean }[];
  testimonials: { text: string; name: string; since: string }[];
  contentCount: number;
  isLive: boolean;
}

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const { handle } = router.query;

  const profile = handle ? PROFILES[handle as string] : null;

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Profile not found</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{profile.name} - {profile.tagline}</title>
        <meta name="description" content={profile.bio} />
      </Head>
      <div className="min-h-screen bg-black text-white">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <h1 className="text-4xl font-bold mb-4">{profile.name}</h1>
          <p className="text-xl mb-8">{profile.bio}</p>
          {/* Add more profile content here */}
        </motion.div>
        <Footer />
      </div>
    </>
  );
};

export default ProfilePage;
