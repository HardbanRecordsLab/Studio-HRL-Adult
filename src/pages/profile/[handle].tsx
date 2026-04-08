import React, { useState, useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Footer from '@/components/common/Footer';
import CustomCursor from '@/components/common/CustomCursor';
import Navigation from '@/components/common/Navigation';

// ─── MOCK DATA – w produkcji zastąp fetch z bazy ─────────────────────────────
const PROFILES: Record<string, ProfileData> = {
  'alexia': {
    handle: 'alexia',
    type: 'solo',
    name: 'Alexia',
    tagline: 'Premium Glamour & Luxury Art',
    eyebrow: 'Profesjonalna Artystka — Modelka — 10+ lat w industrii — Studio HRL Adult',
    bio: 'Jestem artystką, modelką i twórczynią treści premium. Specjalizuję się w luxury content, fotografii artystycznej i edukacji w branży. Każda sesja to dzieło sztuki łączące elegancję z autentycznością.',
    stats: [
      { val: '42.8k+', label: 'Obserwujących' },
      { val: '850+', label: 'Treści premium' },
      { val: '99%', label: 'Zadowolonych' },
    ],
    platforms: [
      { name: 'OnlyFans', url: '#', color: '#00AFF0', icon: '🔥' },
      { name: 'Fansly', url: '#', color: '#9B59B6', icon: '💫' },
      { name: 'ManyVids', url: '#', color: '#FF6B35', icon: '🎬' },
    ],
    plans: [
      { name: 'Gallery Pass', price: '$5.99', period: '/mies.', desc: 'Dostęp do galerii artystycznych', perks: ['150+ artystycznych zdjęć', 'Tygodniowe release', 'Wiadomości'], featured: false },
      { name: 'Premium Subscriber', price: '$14.99', period: '/mies.', desc: 'Pełny dostęp do wszystkich treści', perks: ['Wszystkie wideo 4K/8K', 'Custom content requests', 'Live stream dostęp 2x/mies.', 'BTS ekskluzywne'], featured: true },
      { name: 'VIP Patron', price: '$49.99', period: '/mies.', desc: 'Ekskluzywny dostęp i osobisty kontakt', perks: ['Prywatne 1-on-1 sessions', 'Custom video producction', 'Priority messaging', 'Personalized photo shoots planning'], featured: false },
    ],
    schedule: [
      { day: 'Wt', time: '19:00', active: true },
      { day: 'Cz', time: '20:30', active: false },
      { day: 'Pt', time: '21:00', active: true },
      { day: 'So', time: '22:00', active: false },
      { day: 'Nd', time: '19:30', active: false },
    ],
    testimonials: [
      { text: 'Alexia to artystka na najwyższym poziomie. Treści są piękne, artystyczne i profesjonalne. To nie jest zwykły porn — to prawdziwe dzieła sztuki.', name: 'ArtCollector_EU', since: 'Fan od 2 lat' },
      { text: 'Najlepsze custom video jakie kiedykolwiek kupiłem. Profesjonalne podejście, wysoka jakość, perfekcyjna komunikacja. Polecam 100%!', name: 'VerifiedFan', since: 'Fan od 18 miesięcy' },
      { text: 'Alexia jest niesamowita. Nie tylko piękna, ale również inteligentna, dowcipna i świadoma tego co robi. Jej treści inspirują mnie każdego dnia.', name: 'Premium_Supporter', since: 'Fan od 1 roku' },
    ],
    contentCount: 18,
    isLive: false,
  },
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
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Profile not found</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{profile.name} — {profile.tagline}</title>
        <meta name="description" content={profile.bio} />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Bebas+Neue&display=swap" rel="stylesheet" />
      </Head>

      <CustomCursor />

      {/* Navigation */}
      <nav className="profile-nav">
        <a href="/" className="profile-nav-logo">
          Studio <span>HRL</span>
        </a>
        <ul className="profile-nav-links">
          <li><a href="#about">O nas</a></li>
          <li><a href="#content">Treści</a></li>
          <li><a href="#plans">Plany</a></li>
          <li><a href="#testimonials">Opinie</a></li>
        </ul>
        <a href="#contact" className="profile-nav-cta">Kontakt</a>
      </nav>

      {/* Hero Section */}
      <section className="profile-hero">
        <div className="profile-hero-left">
          <div className="profile-hero-eyebrow">{profile.eyebrow}</div>
          <h1 className="profile-hero-title">
            {profile.name.split(' & ').map((part, i) => (
              i === 0 ? part : <><span className="amp"> & </span>{part}</>
            ))}
            <em>{profile.tagline}</em>
          </h1>
          <p className="profile-hero-sub">{profile.bio}</p>
          <div className="profile-hero-cta-group">
            <a href="#plans" className="profile-btn-primary">
              Zobacz plany 🔥
            </a>
            <a href="#content" className="profile-btn-secondary">
              Zobacz treści →
            </a>
          </div>
          <div className="profile-hero-stats">
            {profile.stats.map((stat, i) => (
              <div key={i} className="profile-stat-item">
                <div className="profile-stat-num">{stat.val}</div>
                <div className="profile-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="profile-hero-right">
          <div className="profile-hero-main-photo">
            <div className="profile-photo-placeholder">
              <div className="profile-photo-placeholder-icon">📸</div>
              <div>Zdjęcie główne</div>
            </div>
          </div>
          <div className="profile-hero-overlay-grad"></div>
          <div className="profile-hero-mini-card">
            <div className="profile-video-placeholder-mini">
              <div className="profile-play-icon">▶</div>
              <div>PREVIEW</div>
            </div>
            <div className="profile-hero-mini-card-label">Zobacz więcej</div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="profile-section" style={{ background: 'var(--deep)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
          <div>
            <div className="profile-section-eyebrow">O NAS</div>
            <h2 className="profile-section-title">
              Autentyczność <em>w każdym detalu</em>
            </h2>
            <p className="profile-section-body">
              Tworzymy treści premium łączące prawdziwe emocje z profesjonalnym podejściem. 
              Każda sesja to unikalne doświadczenie, gdzie liczy się chemia i zaufanie.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginTop: '48px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '20px', color: 'var(--rose)' }}>
                  🎬
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: 'var(--white)', marginBottom: '6px', fontStyle: 'italic' }}>
                    Jakość 4K
                  </div>
                  <div style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.6' }}>
                    Wszystkie nasze treści nagrywane są w najwyższej jakości z profesjonalnym oświetleniem i dźwiękiem.
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '20px', color: 'var(--rose)' }}>
                  💕
                </div>
                <div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: 'var(--white)', marginBottom: '6px', fontStyle: 'italic' }}>
                    Autentyczna chemia
                  </div>
                  <div style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: '1.6' }}>
                    Nie udajemy — nasze relacje i emocje są prawdziwe, co widać w każdej sekundzie naszych treści.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative', height: '600px' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '75%', height: '90%', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <div className="profile-photo-placeholder" style={{ minHeight: '100%' }}></div>
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: '55%', height: '55%', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}>
              <div className="profile-photo-placeholder" style={{ minHeight: '100%' }}></div>
            </div>
            <div style={{ position: 'absolute', top: '50%', left: '55%', transform: 'translate(-50%, -50%)', width: '100px', height: '100px', background: 'var(--black)', border: '1px solid var(--gold)', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 5, fontFamily: "'Bebas Neue', sans-serif", gap: '2px', boxShadow: '0 0 40px rgba(201,168,76,0.2)' }}>
              <div style={{ fontSize: '28px', color: 'var(--gold)', lineHeight: 1 }}>
                {profile.contentCount}
              </div>
              <div style={{ fontSize: '8px', letterSpacing: '2px', color: 'var(--muted)', textAlign: 'center', lineHeight: '1.4' }}>
                TREŚCI
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid Section */}
      <section id="content" className="profile-section" style={{ background: 'var(--black)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
          <div>
            <div className="profile-section-eyebrow">NASZE TREŚCI</div>
            <h2 className="profile-section-title">
              Zobacz nasze <em>ostatnie prace</em>
            </h2>
          </div>
          <a href="#plans" className="profile-btn-secondary">Zobacz wszystkie →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: '16px' }}>
          <div className="content-card large" style={{ gridColumn: 'span 2', aspectRatio: '16/9', position: 'relative', overflow: 'hidden', background: 'var(--card)', border: '1px solid var(--border)', transition: 'border-color 0.3s' }}>
            <div className="profile-photo-placeholder" style={{ minHeight: '260px' }}></div>
          </div>
          <div className="content-card square" style={{ aspectRatio: 1, position: 'relative', overflow: 'hidden', background: 'var(--card)', border: '1px solid var(--border)', transition: 'border-color 0.3s' }}>
            <div className="profile-photo-placeholder" style={{ minHeight: '260px' }}></div>
          </div>
          <div className="content-card tall" style={{ gridRow: 'span 2', position: 'relative', overflow: 'hidden', background: 'var(--card)', border: '1px solid var(--border)', transition: 'border-color 0.3s' }}>
            <div className="profile-photo-placeholder" style={{ minHeight: '520px' }}></div>
          </div>
          <div className="content-card wide" style={{ gridColumn: 'span 2', aspectRatio: '16/7', position: 'relative', overflow: 'hidden', background: 'var(--card)', border: '1px solid var(--border)', transition: 'border-color 0.3s' }}>
            <div className="profile-photo-placeholder" style={{ minHeight: '200px' }}></div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ProfilePage;
