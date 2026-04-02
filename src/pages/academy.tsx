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

  const platforms = [
    { 
      name: 'Chaturbate', 
      ico: '🔴', 
      badge: 'HOT', 
      desc: 'Największa platforma live cam na świecie z systemem tokenów.',
      features: ['Tokeny: 1 = $0.05', 'Private shows: 30-450 zł/min', 'Globalny traffic (USA/EU)', 'Cotygodniowe wypłaty']
    },
    { 
      name: 'OnlyFans', 
      ico: '💙', 
      badge: 'PREMIUM', 
      desc: 'Lider w branży płatnych subskrypcji i treści ekskluzywnych.',
      features: ['Subskrypcje: $4.99 - $49.99', 'PPV (Pay-Per-View) messages', 'Napiwki (Tips) bez limitów', 'Pełna kontrola nad wizerunkiem']
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
    { title: 'Podstawy Streamingu 4K', dur: '45:00', level: 'Początkujący', desc: 'Konfiguracja sprzętu, oświetlenia i oprogramowania OBS.' },
    { title: 'Psychologia Widza i Tip Menu', dur: '32:15', level: 'Średni', desc: 'Jak budować relacje i zwiększać zarobki z napiwków.' },
    { title: 'Marketing na Twitterze/X', dur: '28:40', level: 'Zaawansowany', desc: 'Automatyzacja promocji i budowanie lejka sprzedażowego.' },
  ];

  const podcasts = [
    { title: 'E01: Pierwsze kroki w branży', dur: '52:10', desc: 'Rozmowa z topową modelką o początkach i wyzwaniach.' },
    { title: 'E02: Bezpieczeństwo i anonimowość', dur: '44:30', desc: 'Wszystko o geoblokowaniu i ochronie prywatności.' },
  ];

  return (
    <>
      <Head>
        <title>Akademia - Studio HRL Adult</title>
        <meta name="description" content="Portal edukacyjny Studio HRL Adult. Wiedza, kursy i podcasty dla twórców 18+." />
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-24 pb-24">
          {/* Hero Academy */}
          <section className="relative h-[70vh] flex items-center justify-center overflow-hidden px-[7%]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(155,31,53,0.12),rgba(90,15,30,0.06)_50%,transparent_70%)] z-0" />
            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
              <div className="hero-academy-pre flex items-center justify-center gap-4 text-gold/60 text-[8.5px] tracking-[0.5em] uppercase">
                <div className="w-8 h-px bg-gold/30" />
                Knowledge is Power
                <div className="w-8 h-px bg-gold/30" />
              </div>
              <h1 className="h1-premium text-white">Akademia <br /><span className="italic bg-gold-gradient bg-clip-text text-transparent">Studio HRL</span></h1>
              <p className="font-cormorant text-lg italic text-dim">Kompleksowy portal edukacyjny dla profesjonalnych twórców</p>
              <p className="text-dim text-xs leading-loose font-light max-w-xl mx-auto">
                Odkryj sekrety sukcesu w branży treści dla dorosłych. Nasza akademia oferuje profesjonalne kursy, 
                podcasty i przewodniki stworzone przez ekspertów z wieloletnim doświadczeniem.
              </p>
            </div>
          </section>

          {/* Filters */}
          <section className="px-[7%] mb-12">
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
          <div className="px-[7%] space-y-24 max-w-7xl mx-auto">
            {/* Platforms */}
            {(activeCat === 'all' || activeCat === 'platforms') && (
              <section className="space-y-12">
                <div className="section-tag">Mapa Platform</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {platforms.map((plat) => (
                    <div key={plat.name} className="card-premium relative group overflow-hidden">
                      <div className="absolute top-4 right-4 text-[7px] tracking-[0.2em] uppercase bg-gold/10 text-gold px-2 py-1 border border-gold/20">
                        {plat.badge}
                      </div>
                      <div className="text-4xl mb-6">{plat.ico}</div>
                      <h3 className="font-cormorant text-2xl text-white mb-4 italic">{plat.name}</h3>
                      <p className="text-dim text-xs leading-relaxed mb-6 font-light">{plat.desc}</p>
                      <ul className="space-y-2">
                        {plat.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-[10px] text-dim/80 font-light">
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((vid) => (
                    <div key={vid.title} className="bg-dark-3/40 border border-gold/10 group overflow-hidden hover:border-gold/30 transition-all">
                      <div className="aspect-video bg-dark-4 flex items-center justify-center relative">
                        <div className="w-12 h-12 border border-gold/30 rounded-full flex items-center justify-center text-gold group-hover:scale-110 transition-transform pl-1">▶</div>
                        <div className="absolute bottom-2 right-2 bg-dark/80 text-[8px] text-white px-2 py-1">{vid.dur}</div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] text-gold tracking-widest uppercase bg-gold/5 px-2 py-0.5 border border-gold/10">{vid.level}</span>
                        </div>
                        <h3 className="font-cormorant text-xl text-white italic">{vid.title}</h3>
                        <p className="text-dim text-[10px] leading-relaxed font-light">{vid.desc}</p>
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
                    <div key={pod.title} className="bg-dark-3/40 border border-gold/10 p-6 flex gap-6 items-center hover:border-gold/30 transition-all group">
                      <div className="w-20 h-20 bg-dark-4 flex items-center justify-center text-3xl group-hover:scale-105 transition-transform">🎙️</div>
                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center">
                          <h3 className="font-cormorant text-lg text-white italic">{pod.title}</h3>
                          <span className="text-[8px] text-dim/60 tracking-widest">{pod.dur}</span>
                        </div>
                        <p className="text-dim text-[10px] leading-relaxed font-light">{pod.desc}</p>
                        <button className="text-[8px] text-gold tracking-widest uppercase font-bold border-b border-gold/20 hover:border-gold transition-all">Słuchaj Teraz</button>
                      </div>
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
