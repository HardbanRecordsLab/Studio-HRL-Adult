import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

const LandingPara: React.FC = () => {
  return (
    <>
      <Head>
        <title>Anna & Marek — Premium Content Duo</title>
        <meta name="description" content="Poznaj Annę i Marka - naszą topową parę twórców. Zobacz ich profil i dołącz do świata premium." />
      </Head>

      <div className="min-h-screen bg-dark text-text relative font-cormorant overflow-x-hidden">
        <Navigation />

        <main>
          {/* Hero Section */}
          <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 relative">
            {/* Left Content */}
            <div className="flex flex-col justify-center px-[10%] py-24 z-10 space-y-8 bg-dark relative">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                <span className="font-bebas text-crimson-l text-sm tracking-[0.4em] uppercase block">Exclusive Partnership</span>
                <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl text-white font-black leading-[0.9] tracking-tighter">
                  Anna <span className="font-cormorant italic font-light text-gold text-5xl md:text-7xl">&</span> <br />
                  <span className="italic text-crimson-l">Marek</span>
                </h1>
                <p className="text-dim text-xl md:text-2xl font-light italic leading-relaxed max-w-md">
                  Sztuka intymności uchwycona w najwyższej jakości 4K. Poznaj parę, która redefiniuje standardy branży premium.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap items-center gap-8 pt-8"
              >
                <button className="px-12 py-5 bg-crimson-l text-white font-bebas text-lg tracking-widest hover:bg-crimson transition-all shadow-[0_0_40px_rgba(212,48,74,0.2)]">
                  Zobacz Profil
                </button>
                <button className="text-gold italic text-xl border-b border-gold/30 hover:text-gold-l hover:border-gold transition-all">
                  Umów Wspólną Sesję
                </button>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex gap-12 pt-16 border-t border-gold/10"
              >
                <div>
                  <span className="block font-playfair text-4xl text-white font-bold">150+</span>
                  <span className="text-[10px] text-dim uppercase tracking-widest font-bebas">Zrealizowanych Sesji</span>
                </div>
                <div>
                  <span className="block font-playfair text-4xl text-white font-bold">10k+</span>
                  <span className="text-[10px] text-dim uppercase tracking-widest font-bebas">Zadowolonych Fanów</span>
                </div>
              </motion.div>
            </div>

            {/* Right Media */}
            <div className="relative overflow-hidden min-h-[50vh] lg:min-h-screen">
              <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-transparent z-10 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent z-10 lg:hidden" />
              
              <div className="absolute inset-0 bg-dark-4 flex items-center justify-center overflow-hidden">
                {/* Image Placeholder */}
                <div className="w-full h-full flex flex-col items-center justify-center gap-6 border-l border-gold/10">
                  <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center text-4xl opacity-20">📸</div>
                  <span className="font-bebas text-xs tracking-[0.5em] text-gold/20 uppercase">Featured Visual Content</span>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-12 right-12 bg-dark-2/80 backdrop-blur-xl border border-gold/20 p-8 z-20 max-w-[240px] hidden md:block">
                <span className="text-[9px] text-gold uppercase tracking-widest block mb-4">Latest Update</span>
                <p className="text-white italic text-lg leading-snug">"Nowa sesja w stylu Parisian Night już dostępna na profilu."</p>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section className="py-32 px-[10%] bg-dark-2 relative">
            <div className="max-w-4xl mx-auto space-y-16 text-center">
              <div className="space-y-4">
                <span className="text-gold text-[10px] tracking-[0.5em] uppercase">O Nas</span>
                <h2 className="font-playfair text-5xl md:text-7xl text-white">Pasja i Profesjonalizm</h2>
              </div>
              <p className="text-dim text-xl md:text-2xl font-light leading-relaxed italic">
                Jako para w życiu i na planie, Anna i Marek tworzą autentyczne, pełne emocji treści, 
                które wyróżniają się na tle masowej produkcji. Ich misją jest pokazanie, że branża adult 
                może być elegancka, artystyczna i pełna szacunku.
              </p>
              <div className="flex justify-center pt-8">
                <div className="w-2 h-2 bg-crimson rotate-45 shadow-[0_0_15px_rgba(212,48,74,0.5)]" />
              </div>
            </div>
          </section>
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&display=swap');
        .font-playfair { font-family: 'Playfair Display', serif; }
      `}</style>
    </>
  );
};

export default LandingPara;
