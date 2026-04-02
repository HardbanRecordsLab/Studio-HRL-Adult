import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import CTA from '@/components/sections/CTA';

const categories = [
  { id: 'all', name: 'Wszystko' },
  { id: 'platforms', name: 'Platformy' },
  { id: 'videos', name: 'Wideo Kursy' },
  { id: 'podcasts', name: 'Podcasty' },
  { id: 'guides', name: 'Przewodniki' },
];

const AcademyPage: React.FC = () => {
  const [activeCat, setActiveCat] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const platforms = [
    { 
      name: 'Chaturbate', 
      ico: '🔴', 
      badge: 'HOT', 
      desc: 'Największa platforma live cam na świecie z systemem tokenów.',
      features: ['Tokeny: 1 = $0.05', 'Private shows: 30-450 zł/min', 'Globalny traffic (USA/EU)', 'Cotygodniowe wypłaty']
    },
    { 
      name: 'Stripchat', 
      ico: '🎭', 
      badge: 'NEW', 
      desc: 'Nowoczesna platforma z VR i wysokimi wypłatami dla twórców.',
      features: ['VR shows (2x zarobki)', 'Wypłaty do 80%', 'Mobile friendly', 'Płatności krypto/Paxum']
    },
    { 
      name: 'OnlyFans', 
      ico: '💙', 
      badge: 'PREMIUM', 
      desc: 'Lider w branży płatnych subskrypcji i treści ekskluzywnych.',
      features: ['Subskrypcje: $4.99 - $49.99', 'PPV (Pay-Per-View) messages', 'Napiwki (Tips) bez limitów', 'Pełna kontrola nad wizerunkiem']
    },
    { 
      name: 'Fansly', 
      ico: '💫', 
      badge: 'GROWING', 
      desc: 'Szybko rosnąca konkurencja OF z lepszymi narzędziami dla twórców.',
      features: ['Tiered subscriptions', 'Lepsze odkrywanie (FYP)', 'Media bundles', 'Payouts od $25']
    },
    { 
      name: 'LiveJasmin', 
      ico: '💎', 
      badge: 'ELITE', 
      desc: 'Premium cam experience dla wymagających klientów high-end.',
      features: ['Klienci VIP', 'Wymagana jakość 4K', 'Wysokie stawki za minutę', 'Dedykowany support']
    },
    { 
      name: 'ManyVids', 
      ico: '📹', 
      badge: 'STABLE', 
      desc: 'Sklep z filmami, platforma cam i sklep z gadżetami w jednym.',
      features: ['Sprzedaż klipów (60-80% marży)', 'Custom videos na zamówienie', 'Sklep z bielizną i gadżetami', 'Wysokie SEO i pasywny dochód']
    }
  ];

  const videos = [
    { title: '14 Błędów Twórców Online', dur: '45:23', level: 'Początkujący', desc: 'Najczęstsze błędy początkujących i jak ich unikać.' },
    { title: 'Biznes Cyfrowej Intymności cz.1', dur: '1:23:45', level: 'Średni', desc: 'Zrozumienie modelu biznesowego w branży adult.' },
    { title: 'Biznes Cyfrowej Intymności cz.2', dur: '1:45:12', level: 'Średni', desc: 'Strategie monetyzacji i budowania marki.' },
    { title: 'Plan 42 Dni - Biznes Twórcy', dur: '2:15:30', level: 'Zaawansowany', desc: 'Kompleksowy plan rozwoju kariery dzień po dniu.' },
  ];

  const podcasts = [
    { title: 'Inżynieria Iluzji Bliskości', dur: '42:15', desc: 'Psychologia budowania relacji z fanami.' },
    { title: 'Największe Błędy Biznesowe', dur: '38:42', desc: 'Analiza błędów hamujących wzrost zarobków.' },
    { title: 'Psychologia Sprzedaży i Safety', dur: '51:28', desc: 'Zrozumienie klienta i ochrona danych.' },
    { title: 'Sex-camming jako Inżynieria', dur: '1:08:15', desc: 'Techniczne aspekty pracy na live cam.' },
  ];

  const guides = [
    { title: 'Operacyjna Mapa Platform', type: 'PDF', size: '2.3 MB' },
    { title: 'Dokumentacja Biznesowa', type: 'PDF', size: '4.1 MB' },
    { title: 'Przewodnik Operacyjny', type: 'PDF', size: '12.4 MB' },
    { title: 'Regulamin Szczegółowy', type: 'PDF', size: '890 KB' },
  ];

  return (
    <>
      <Head>
        <title>Akademia | Studio HRL Adult</title>
        <meta name="description" content="Portal edukacyjny Studio HRL Adult. Kursy, podcasty i przewodniki dla profesjonalnych twórców treści 18+." />
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-24 pb-24">
          {/* Hero Academy */}
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden px-[7%]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(155,31,53,0.12),rgba(90,15,30,0.06)_50%,transparent_70%)] z-0" />
            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-8">
              <div className="hero-academy-pre flex items-center justify-center gap-4 text-gold/60 text-[8.5px] tracking-[0.5em] uppercase">
                <div className="w-8 h-px bg-gold/30" />
                Knowledge is Power
                <div className="w-8 h-px bg-gold/30" />
              </div>
              <h1 className="h1-premium text-white">Akademia <br /><span className="italic bg-gold-gradient bg-clip-text text-transparent">Studio HRL</span></h1>
              <p className="font-cormorant text-xl italic text-dim">Kompleksowy portal edukacyjny dla twórców treści dla dorosłych</p>
              <p className="text-dim text-xs leading-loose font-light max-w-xl mx-auto">
                Odkryj sekrety sukcesu w branży adult. Nasza akademia oferuje profesjonalne kursy, 
                podcasty i przewodniki stworzone przez ekspertów z wieloletnim doświadczeniem.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <a href="#login" className="btn-gold">Rozpocznij Naukę</a>
                <a href="/casting" className="btn-outline">Zostań Partnerką</a>
              </div>
            </div>
          </section>

          {/* Login Prompt */}
          {!isLoggedIn && (
            <section id="login" className="px-[7%] max-w-4xl mx-auto mb-24">
              <div className="bg-dark-3/50 border border-gold/20 p-12 text-center space-y-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient" />
                <div className="section-tag justify-center">Strefa Partnera</div>
                <h3 className="font-cormorant text-3xl text-white italic">Zaloguj się, aby uzyskać pełny dostęp</h3>
                <p className="text-dim text-xs font-light max-w-md mx-auto">
                  Pełna zawartość akademii, w tym kursy wideo i podcasty, dostępna jest wyłącznie dla zarejestrowanych partnerek Studio HRL Adult.
                </p>
                <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                  <input type="email" placeholder="E-mail" className="flex-1 bg-dark-4 border border-gold/10 px-4 py-3 text-xs text-white outline-none focus:border-gold/40 transition-colors" />
                  <input type="password" placeholder="Hasło" className="flex-1 bg-dark-4 border border-gold/10 px-4 py-3 text-xs text-white outline-none focus:border-gold/40 transition-colors" />
                  <button onClick={() => setIsLoggedIn(true)} className="btn-gold px-8">Zaloguj</button>
                </div>
              </div>
            </section>
          )}

          {/* Filters */}
          <section className="px-[7%] mb-16">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCat(cat.id)}
                  className={`px-6 py-2.5 text-[9px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                    activeCat === cat.id 
                      ? 'bg-gold text-dark border-gold font-bold' 
                      : 'bg-dark-3/40 text-dim border-gold/10 hover:border-gold/30'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </section>

          {/* Content Sections */}
          <div className="px-[7%] space-y-32 max-w-7xl mx-auto">
            {/* Platforms */}
            {(activeCat === 'all' || activeCat === 'platforms') && (
              <section className="space-y-12">
                <div className="section-tag">Mapa Platform</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {platforms.map((plat) => (
                    <div key={plat.name} className="bg-dark-2 border border-gold/10 p-8 relative group overflow-hidden hover:border-gold/30 transition-all">
                      <div className="absolute top-4 right-4 text-[7px] tracking-[0.2em] uppercase bg-gold/10 text-gold px-2 py-1 border border-gold/20">
                        {plat.badge}
                      </div>
                      <div className="text-4xl mb-6">{plat.ico}</div>
                      <h3 className="font-cormorant text-2xl text-white mb-4 italic">{plat.name}</h3>
                      <p className="text-dim text-[11px] leading-relaxed mb-6 font-light">{plat.desc}</p>
                      <ul className="space-y-2">
                        {plat.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-[9px] text-dim/80 font-light italic">
                            <span className="text-gold">✓</span> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Videos */}
            {(activeCat === 'all' || activeCat === 'videos') && (
              <section className="space-y-12">
                <div className="section-tag">Wideo Kursy</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {videos.map((vid) => (
                    <div key={vid.title} className="bg-dark-3/40 border border-gold/10 group overflow-hidden hover:border-gold/30 transition-all">
                      <div className="aspect-video bg-dark-4 flex items-center justify-center relative">
                        <div className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center text-gold group-hover:scale-110 transition-transform pl-1">▶</div>
                        <div className="absolute bottom-2 right-2 bg-dark/80 text-[7px] text-white px-2 py-1">{vid.dur}</div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[7px] text-gold tracking-widest uppercase bg-gold/5 px-2 py-0.5 border border-gold/10">{vid.level}</span>
                        </div>
                        <h3 className="font-cormorant text-lg text-white italic leading-tight">{vid.title}</h3>
                        <p className="text-dim text-[9px] leading-relaxed font-light">{vid.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Podcasts */}
            {(activeCat === 'all' || activeCat === 'podcasts') && (
              <section className="space-y-12">
                <div className="section-tag">Podcasty</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {podcasts.map((pod) => (
                    <div key={pod.title} className="bg-dark-2 border border-gold/10 p-6 flex gap-6 items-center hover:border-gold/30 transition-all group">
                      <div className="w-16 h-16 bg-dark-4 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">🎙️</div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-cormorant text-base text-white italic">{pod.title}</h3>
                          <span className="text-[7px] text-dim/60 tracking-widest">{pod.dur}</span>
                        </div>
                        <p className="text-dim text-[9px] leading-relaxed font-light">{pod.desc}</p>
                        <button className="text-[7px] text-gold tracking-widest uppercase font-bold border-b border-gold/20 hover:border-gold transition-all">Słuchaj Teraz</button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Guides */}
            {(activeCat === 'all' || activeCat === 'guides') && (
              <section className="space-y-12">
                <div className="section-tag">Przewodniki</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {guides.map((guide) => (
                    <div key={guide.title} className="bg-dark-3/40 border border-gold/10 p-6 space-y-4 hover:border-gold/30 transition-all group">
                      <div className="text-3xl">📄</div>
                      <h3 className="font-cormorant text-lg text-white italic">{guide.title}</h3>
                      <div className="flex justify-between items-center text-[8px] text-dim tracking-widest uppercase">
                        <span>{guide.type}</span>
                        <span>{guide.size}</span>
                      </div>
                      <button className="w-full py-2 border border-gold/20 text-gold text-[8px] tracking-widest uppercase hover:bg-gold hover:text-dark transition-all">Pobierz</button>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <CTA />
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>
    </>
  );
};

export default AcademyPage;
