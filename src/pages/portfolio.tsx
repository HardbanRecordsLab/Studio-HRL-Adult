import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '@/utils/constants';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import CTA from '@/components/sections/CTA';

const PortfolioPage: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState('anna');

  const profiles = [
    { 
      id: 'anna', 
      name: 'Anna Rose', 
      handle: '@annarose_official', 
      age: 25, 
      bio: 'Tworzę treści od 2 lat • 1000+ unikalnych materiałów. Specjalizacja: Intymne rozmowy, Custom videos, Daily content. Top 5% OnlyFans.', 
      stats: { followers: '50.2K', content: '1.2K', satisfaction: '98%', online: '24/7' }, 
      tags: ['OnlyFans', 'Premium'], 
      ico: '📸',
      measurements: { height: '172cm', weight: '54kg', bust: '90cm', waist: '60cm', hips: '90cm' },
      characteristics: 'Elegancja, zmysłowość, profesjonalizm. Specjalistka od budowania głębokich relacji z fanami.'
    },
    { 
      id: 'marek', 
      name: 'Marek Wolf', 
      handle: '@marek_wolf', 
      age: 28, 
      bio: 'Męski i odważny styl. Profesjonalne sesje, wysoka jakość 4K. Specjalizacja: Solo & Group content.', 
      stats: { followers: '15.5K', content: '450', satisfaction: '95%', online: 'Daily' }, 
      tags: ['Chaturbate', 'Top Tier'], 
      ico: '📹',
      measurements: { height: '185cm', weight: '82kg', bust: '110cm', waist: '82cm', hips: '95cm' },
      characteristics: 'Charyzma, siła, autentyczność. Mistrz technicznych aspektów produkcji i dynamicznych show.'
    },
    { 
      id: 'couple', 
      name: 'Anna & Marek', 
      handle: '@anna_marek_duo', 
      age: 'Duo', 
      bio: 'Najlepsza para w branży. Chemia, emocje i luksusowa oprawa. Pełna synchronizacja na ManyVids i Fansly.', 
      stats: { followers: '85K', content: '2.5K', satisfaction: '99%', online: '24/7' }, 
      tags: ['ManyVids', 'Fansly'], 
      ico: '👩‍❤️‍👨',
      measurements: { height: 'Mixed', weight: 'N/A', bust: 'N/A', waist: 'N/A', hips: 'N/A' },
      characteristics: 'Perfekcyjna chemia, luksusowy styl życia, innowacyjne podejście do treści dla par.'
    },
  ];

// ─── PARTNER CARD ────────────────────────────────────────────────────────────
const PartnerCard: React.FC<{ profile: typeof profiles[0] }> = ({ profile }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[450px] w-full perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d shadow-2xl"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front Side: Photo & Pseudonym */}
        <div className="absolute inset-0 backface-hidden bg-dark-2 border border-gold/10 overflow-hidden flex flex-col">
          <div className="flex-1 bg-gradient-to-br from-dark-3 to-dark-4 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,85,106,0.1),transparent_70%)]" />
            <div className="text-8xl filter blur-[2px] opacity-20 group-hover:blur-none group-hover:opacity-40 transition-all duration-700">
              {profile.ico}
            </div>
            <div className="absolute top-4 left-4 flex gap-2">
              {profile.tags.map(tag => (
                <span key={tag} className="text-[7px] tracking-[0.1em] uppercase px-2 py-0.5 bg-gold/10 text-gold border border-gold/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="p-8 bg-dark-2 border-t border-gold/10">
            <h3 className="font-playfair text-3xl text-white font-bold mb-1">{profile.name}</h3>
            <p className="text-gold text-[10px] tracking-[0.3em] uppercase">{profile.handle}</p>
          </div>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Back Side: Measurements & Characteristics */}
        <div 
          className="absolute inset-0 backface-hidden bg-dark-3 border border-gold/30 p-8 flex flex-col justify-between rotate-y-180"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="space-y-8">
            <div>
              <h4 className="font-playfair text-xl text-gold italic border-b border-gold/10 pb-2 mb-6">Wymiary</h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {Object.entries(profile.measurements).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center border-b border-gold/5 pb-1">
                    <span className="text-[8px] text-dim uppercase tracking-widest">{key}</span>
                    <span className="text-xs text-white font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-playfair text-xl text-gold italic border-b border-gold/10 pb-2 mb-4">Charakterystyka</h4>
              <p className="text-dim text-[11px] leading-relaxed font-light italic">
                {profile.characteristics}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gold/10 flex justify-center">
             <Link href={`/profile/${profile.id}`} className="text-[9px] text-gold uppercase tracking-[0.3em] font-bold border border-gold/20 px-6 py-2 hover:bg-gold hover:text-dark transition-all">
               Pełny Profil
             </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

  const contentItems = [
    { title: 'Intimate Morning Routine', type: 'Video • 12:45', price: '$29.99', ico: '📹' },
    { title: 'Golden Hour Photoshoot', type: 'Gallery • 25 photos', price: '$19.99', ico: '📸' },
    { title: 'Personal Video Message', type: 'Custom • 5:30', price: '$49.99', ico: '💬' },
    { title: 'Behind the Scenes', type: 'BTS • 8:15', price: '$14.99', ico: '🎥' },
  ];

  const currentProfile = profiles.find(p => p.id === activeProfile) || profiles[0];

  return (
    <>
      <Head>
        <title>Portfolio - Studio HRL Adult</title>
        <meta name="description" content="Portfolio i szablony profili partnerek Studio HRL Adult. Zobacz nasze realizacje i styl Anna & Marek." />
      </Head>
      <>
        <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-24 pb-24">
          {/* Hero Portfolio */}
          <section className="relative h-[70vh] flex items-center justify-center overflow-hidden px-[7%]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(200,85,106,0.12),rgba(139,26,46,0.06)_50%,transparent_70%)] z-0" />
            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
              <div className="hero-academy-pre flex items-center justify-center gap-4 text-gold/60 text-[8.5px] tracking-[0.5em] uppercase">
                <div className="w-8 h-px bg-gold/30" />
                Premium Models & Profiles
                <div className="w-8 h-px bg-gold/30" />
              </div>
              <h1 className="h1-premium text-white">Portfolio <br /><span className="italic bg-gold-gradient bg-clip-text text-transparent">Studio HRL</span></h1>
              <p className="font-cormorant text-lg italic text-dim">Profesjonalne szablony i profile naszych partnerek</p>
              <p className="text-dim text-xs leading-loose font-light max-w-xl mx-auto">
                Odkryj nasze unikalne szablony profili w stylu Anna & Marek, które pomogą Ci wyróżnić się na platformach i przyciągnąć więcej fanów.
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <a href="#showcase" className="btn-gold">Zobacz Przykłady</a>
                <a href="#builder" className="btn-outline">Stwórz Profil</a>
              </div>
            </div>
          </section>

          {/* Profile Showcase Section */}
          <section id="showcase" className="py-24 px-[7%] max-w-7xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <div className="section-tag justify-center">Anna & Marek Style</div>
              <h2 className="h2-premium">Modele & <span className="italic">Partnerzy</span></h2>
              <p className="text-dim text-xs font-light max-w-xl mx-auto">
                Poznaj nasze flagowe profile stworzone w unikalnym stylu Studio HRL. Każdy partner jest profesjonalnie przeszkolony i gotowy do współpracy na najwyższym poziomie.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profiles.map(p => (
                <PartnerCard key={p.id} profile={p} />
              ))}
            </div>

            {/* Featured Profile Preview */}
            <div className="pt-24 space-y-12">
              <div className="section-tag justify-center">Preview: Aktywne Profile</div>
              <div className="flex justify-center gap-4 mb-12">
                {profiles.map(p => (
                  <button 
                    key={p.id}
                    onClick={() => setActiveProfile(p.id)}
                    className={`px-6 py-2 text-[10px] tracking-widest uppercase transition-all border ${
                      activeProfile === p.id ? 'bg-gold text-dark border-gold' : 'bg-dark-3/40 text-dim border-gold/10 hover:border-gold/30'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>

              <motion.div 
                key={activeProfile}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-dark-2 border border-gold/10 overflow-hidden rounded-sm"
              >
              {/* Profile Header Preview */}
              <div className="h-64 bg-gradient-to-br from-dark-3 to-dark-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(200,85,106,0.15),transparent_50%)]" />
                <div className="absolute bottom-[-40px] left-12 w-32 h-32 rounded-full border-4 border-dark-2 bg-gradient-to-br from-rose-500 to-gold flex items-center justify-center text-4xl text-white font-bold shadow-2xl">
                  {currentProfile.ico}
                </div>
              </div>

              <div className="p-12 pt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-playfair text-4xl text-white font-bold">{currentProfile.name}</h3>
                    <p className="text-gold text-sm tracking-widest mt-1">{currentProfile.handle}</p>
                  </div>
                  <p className="text-dim text-sm leading-loose font-light italic">
                    {currentProfile.bio}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-6 border-y border-gold/10">
                    {Object.entries(currentProfile.stats).map(([label, val]) => (
                      <div key={label}>
                        <span className="block font-playfair text-2xl text-gold font-bold">{val}</span>
                        <span className="text-[8px] text-dim uppercase tracking-widest">{label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button className="btn-gold px-10">Subskrybuj</button>
                    <button className="btn-outline px-10">Wiadomość</button>
                  </div>
                </div>

                <div className="space-y-8">
                  <h4 className="font-playfair text-xl text-white italic border-b border-gold/10 pb-4">Najnowsze Treści</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {contentItems.map((item, i) => (
                      <div key={i} className="bg-dark-3/40 border border-gold/5 p-4 flex gap-4 hover:border-gold/20 transition-all group">
                        <div className="w-12 h-12 bg-dark-4 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                          {item.ico}
                        </div>
                        <div>
                          <h5 className="text-[11px] text-white font-medium">{item.title}</h5>
                          <p className="text-[9px] text-dim">{item.type}</p>
                          <p className="text-[10px] text-gold font-bold mt-1">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Template Builder Section */}
          <section id="builder" className="py-24 bg-dark-2 border-y border-gold/5 px-[7%]">
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <div className="section-tag justify-center">Custom Builder</div>
                <h2 className="h2-premium">Stwórz swój <span className="italic">własny profil</span></h2>
                <p className="text-dim text-xs font-light max-w-xl mx-auto">
                  Nasz zaawansowany kreator profili pozwala Ci stworzyć unikalną prezentację dopasowaną do Twojego stylu w 5 prostych krokach.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: '1. Wybierz Szablon', options: ['Anna Style (Elegant)', 'Marek Style (Bold)', 'Duet Style (Couple)', 'Solo Style (Brand)'], ico: '🌹' },
                  { title: '2. Układ Layout', options: ['Klasyczny Sidebar', 'Masonry Style', 'Modern Grid', 'Minimalist Clean'], ico: '🧱' },
                  { title: '3. Paleta Kolorów', options: ['Rose Gold', 'Midnight Night', 'Royal Purple', 'Ocean Blue'], ico: '🎨' },
                  { title: '4. Typografia', options: ['Elegant Serif', 'Modern Sans', 'Playful Script', 'Bold Display'], ico: 'Aa' },
                ].map((step, i) => (
                  <div key={i} className="bg-dark-3/40 border border-gold/10 p-8 space-y-6 hover:border-gold/30 transition-all">
                    <div className="text-3xl">{step.ico}</div>
                    <h3 className="font-cormorant text-xl text-white italic">{step.title}</h3>
                    <ul className="space-y-3">
                      {step.options.map((opt, j) => (
                        <li key={j} className="flex items-center gap-3 text-[10px] text-dim font-light">
                          <div className={`w-2 h-2 rounded-full border border-gold/40 ${j === 0 ? 'bg-gold' : ''}`} />
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="text-center pt-8">
                <button className="btn-gold px-12 py-4">Uruchom Kreator Profili</button>
              </div>
            </div>
          </section>

          {/* Platform Integration Section */}
          <section className="py-24 px-[7%] max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <div className="section-tag">All-in-One</div>
                <h2 className="h2-premium">Jeden profil, <br /><span className="italic bg-gold-gradient bg-clip-text text-transparent">wszystkie platformy</span></h2>
                <p className="text-dim text-sm leading-loose font-light">
                  Zintegruj swój profil ze wszystkimi głównymi platformami. Zarządzaj treściami i synchronizuj dane w jednym miejscu, budując spójny wizerunek marki premium.
                </p>
                <div className="grid grid-cols-2 gap-6 pt-4">
                  {[
                    { name: 'OnlyFans', status: 'Connected', ico: '🔥' },
                    { name: 'Fansly', status: 'Connected', ico: '💫' },
                    { name: 'ManyVids', status: 'Pending', ico: '📹' },
                    { name: 'Chaturbate', status: 'Connected', ico: '🔴' },
                  ].map(plat => (
                    <div key={plat.name} className="bg-dark-3/40 border border-gold/10 p-6 flex items-center gap-4 group hover:border-gold/30 transition-all">
                      <div className="text-2xl group-hover:scale-110 transition-transform">{plat.ico}</div>
                      <div>
                        <div className="text-xs text-white font-medium">{plat.name}</div>
                        <div className={`text-[7px] uppercase tracking-widest ${plat.status === 'Connected' ? 'text-green-500' : 'text-gold/50'}`}>
                          {plat.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-crimson/20 to-gold/5 border border-gold/10 rounded-full flex items-center justify-center relative animate-pulse-slow">
                  <div className="w-3/4 h-3/4 bg-dark-2 rounded-full border border-gold/20 flex items-center justify-center text-center p-12">
                    <p className="font-cormorant text-2xl italic text-white leading-relaxed">
                      "Zautomatyzuj swój sukces z Studio HRL Adult"
                    </p>
                  </div>
                  {/* Floating icons around */}
                  <div className="absolute top-10 right-10 w-12 h-12 bg-dark-3 border border-gold/20 rounded-full flex items-center justify-center text-xl">✨</div>
                  <div className="absolute bottom-20 left-0 w-16 h-16 bg-dark-3 border border-gold/20 rounded-full flex items-center justify-center text-2xl">💰</div>
                  <div className="absolute top-1/2 left-[-20px] w-10 h-10 bg-dark-3 border border-gold/20 rounded-full flex items-center justify-center text-lg">🔒</div>
                </div>
              </div>
            </div>
          </section>

          <CTA />
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>
      </>

      <style jsx global>{`
        .font-playfair { font-family: 'Playfair Display', serif; }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default PortfolioPage;
