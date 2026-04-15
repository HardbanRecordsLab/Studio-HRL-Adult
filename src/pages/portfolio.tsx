import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '@/utils/constants';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import CTA from '@/components/sections/CTA';

const PortfolioPage: React.FC = () => {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profiles')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProfiles(data);
        } else {
          setProfiles([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch profiles:', err);
        setProfiles([]);
        setLoading(false);
      });
  }, []);

// ─── PARTNER CARD ────────────────────────────────────────────────────
const PartnerCard: React.FC<{ profile: any }> = ({ profile }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[450px] w-full perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d shadow-2xl group-hover:shadow-[0_25px_50px_-12px_rgba(255,215,0,0.25)]"
        animate={{ rotateY: isFlipped ? 180 : 0, scale: isFlipped ? 1.02 : 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front Side: Photo & Pseudonym */}
        <div className="absolute inset-0 backface-hidden bg-dark-2 border border-gold/10 overflow-hidden flex flex-col z-10">
          <div className="flex-1 bg-gradient-to-br from-dark-3 via-dark-4 to-dark-3 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,85,106,0.15),transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,215,0,0.05),transparent)]" />
            <div className="text-9xl filter blur-[1px] opacity-15 group-hover:blur-none group-hover:opacity-25 transition-all duration-700 transform group-hover:scale-110">
              {profile.ico}
            </div>
            <div className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:opacity-80 transition-all duration-700 scale-105 group-hover:scale-100"
                 style={{ backgroundImage: `url('${profile.avatar || '/images/default-profile.jpg'}')` }}>
            </div>
            <div className="absolute top-4 left-4 flex gap-2">
              {profile.tags.map(tag => (
                <span key={tag} className="text-[7px] tracking-[0.1em] uppercase px-2 py-0.5 bg-gold/10 text-gold border border-gold/20 backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
            <div className="absolute bottom-4 right-4">
              <div className="w-3 h-3 bg-gold rounded-full animate-pulse shadow-[0_0_20px_rgba(255,215,0,0.5)]" />
            </div>
          </div>
          <div className="p-8 bg-dark-2 border-t border-gold/10 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <h3 className="font-playfair text-3xl text-white font-bold mb-1 relative z-10">{profile.name}</h3>
            <p className="text-gold text-[10px] tracking-[0.3em] uppercase relative z-10">{profile.handle}</p>
          </div>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
          <div className="absolute inset-0 border border-gold/30 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
        </div>

        {/* Back Side: Short Bio */}
        <div 
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-dark-3 to-dark-4 border border-gold/30 p-8 flex flex-col justify-between rotate-y-180 [transform:rotateY(180deg)] z-20"
        >
          <div className="space-y-6">
            <div>
              <h4 className="font-playfair text-xl text-gold italic border-b border-gold/20 pb-2 mb-4 flex items-center">
                <span className="w-2 h-2 bg-gold rounded-full mr-3 animate-pulse" />
                O Mnie
              </h4>
              <p className="text-dim text-[11px] leading-relaxed font-light italic bg-dark-2/50 p-4 rounded-lg border border-gold/10">
                {profile.bio}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gold/20 flex justify-center relative z-50">
             <Link 
               href={`/profile/${profile.handle || profile.id}`} 
               className="text-[9px] text-gold uppercase tracking-[0.3em] font-bold border border-gold/20 px-6 py-2 hover:bg-gold hover:text-dark transition-all shadow-[0_0_20px_rgba(255,215,0,0.2)] pointer-events-auto relative z-50"
               onClick={(e) => e.stopPropagation()}
             >
               Pełny Profil
             </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

  const contentItems = [
    {
      title: 'Exclusive Content',
      description: 'Dostęp do premium materiałów od naszych topowych twórców',
      icon: '🔒',
      features: ['Wysoka jakość 4K', 'Codzienne aktualizacje', 'Personalizowane treści']
    },
    {
      title: 'Direct Interaction',
      description: 'Bezpośredni kontakt z twórcami i custom zamówienia',
      icon: '💬',
      features: ['Prywatne wiadomości', 'Custom videos', 'Live sesje']
    },
    {
      title: 'Premium Experience',
      description: 'Profesjonalne podejście i ekskluzywne materiały',
      icon: '⭐',
      features: ['Profesjonalizm', 'Bezpieczeństwo', 'Wsparcie 24/7']
    }
  ];

  return (
    <>
      <Head>
        <title>Portfolio - Studio HRL Adult</title>
        <meta name="description" content="Poznaj naszych topowych twórców tre adult. Premium content, profesjonalizm i ekskluzywne materiały." />
      </Head>

      <div className="min-h-screen bg-dark text-text relative font-cormorant">
        <Navigation />

        <main>
          {/* Hero Section */}
          <section className="min-h-screen flex items-center justify-center px-[10%] relative">
            <div className="absolute inset-0 bg-[url('/images/studio-noir.jpg')] bg-cover bg-center opacity-10"></div>
            
            <div className="max-w-6xl mx-auto text-center relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-16"
              >
                <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl text-white font-black leading-[0.9] mb-6">
                  Nasze <span className="text-gold">Portfolio</span>
                </h1>
                <p className="text-xl md:text-2xl text-dim font-light italic max-w-4xl mx-auto leading-relaxed">
                  Poznaj naszych topowych twórców. Każdy profil to gwarancja jakości, profesjonalizmu i unikalnych treści.
                </p>
              </motion.div>

              {/* Stats Cards */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid md:grid-cols-3 gap-8 mb-16"
              >
                <div className="bg-dark-2/50 backdrop-blur-sm border border-gold/10 p-8 text-center">
                  <div className="text-4xl font-playfair text-gold font-bold mb-2">5+</div>
                  <div className="text-sm text-dim uppercase tracking-widest">Aktywnych Twórców</div>
                </div>
                <div className="bg-dark-2/50 backdrop-blur-sm border border-gold/10 p-8 text-center">
                  <div className="text-4xl font-playfair text-gold font-bold mb-2">10K+</div>
                  <div className="text-sm text-dim uppercase tracking-widest">Zadowolonych Fanów</div>
                </div>
                <div className="bg-dark-2/50 backdrop-blur-sm border border-gold/10 p-8 text-center">
                  <div className="text-4xl font-playfair text-gold font-bold mb-2">2K+</div>
                  <div className="text-sm text-dim uppercase tracking-widest">Premium Treści</div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Profiles Grid */}
          <section className="py-32 px-[10%]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-5xl md:text-6xl text-white mb-4">
                Nasi <span className="text-gold">Twórcy</span>
              </h2>
              <p className="text-dim text-lg font-light italic max-w-3xl mx-auto">
                Każdy z naszych twórców to profesjonalista z unikalnym stylem i podejściem do tworzenia treści.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
              {Array.isArray(profiles) && profiles.map((profile) => (
                <PartnerCard key={profile.id} profile={profile} />
              ))}
              {(!Array.isArray(profiles) || profiles.length === 0) && !loading && (
                <div className="col-span-full text-center py-20 bg-dark-2/30 border border-gold/10 rounded-2xl">
                  <p className="text-gold text-lg font-playfair italic mb-2">Chwilowa przerwa w dostawie luksusu</p>
                  <p className="text-dim text-sm uppercase tracking-widest">Wróć za chwilę, nasze modelki właśnie się przygotowują.</p>
                </div>
              )}
            </div>
          </section>

          {/* Content Features */}
          <section className="py-32 px-[10%] bg-dark-2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="font-playfair text-5xl md:text-6xl text-white mb-4">
                Co <span className="text-gold">Oferujemy</span>
              </h2>
              <p className="text-dim text-lg font-light italic max-w-3xl mx-auto">
                Premium doświadczenie z dostępem do ekskluzywnych treści od najlepszych twórców.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {contentItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center space-y-6"
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="font-playfair text-2xl text-white mb-4">{item.title}</h3>
                  <p className="text-dim font-light mb-6">{item.description}</p>
                  <div className="space-y-2">
                    {item.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="text-sm text-gold/80">
                        ✓ {feature}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <CTA />
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>

      <style jsx global>{`
        .font-playfair { font-family: 'Playfair Display', serif; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </>
  );
};



export default PortfolioPage;
