import React from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Studio HRL Adult - Profesjonalny Management dla Twórców</title>
        <meta name="description" content="Studio HRL Adult oferuje profesjonalny management dla twórców tre adult. Zosta gwiazd branzy z naszym wsparciem." />
      </Head>

      <div className="min-h-screen bg-dark text-text relative font-cormorant overflow-x-hidden">
        <Navigation />

        <main>
          {/* START Section - Combined Home Page and O Studio */}
          <section id="start" className="min-h-screen">
            {/* Hero Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 relative">
              {/* Left Content */}
              <div className="flex flex-col justify-center px-[10%] py-24 z-10 space-y-8 bg-dark relative">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-6"
                >
                  <span className="font-bebas text-crimson-l text-sm tracking-[0.4em] uppercase block">Studio HRL Adult</span>
                  <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl text-white font-black leading-[0.9] tracking-tighter">
                    <span className="italic text-crimson-l">START</span>
                  </h1>
                  <p className="text-dim text-xl md:text-2xl font-light italic leading-relaxed max-w-md">
                    Profesjonalny management dla twórców tre adult. Zosta gwiazd branzy z naszym wsparciem i eksperck wiedz.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-8 pt-8"
                >
                  <button className="px-12 py-5 bg-crimson-l text-white font-bebas text-lg tracking-widest hover:bg-crimson transition-all shadow-[0_0_40px_rgba(212,48,74,0.2)]">
                    Rozpocznij
                  </button>
                  <button className="text-gold italic text-xl border-b border-gold/30 hover:text-gold-l hover:border-gold transition-all">
                    Dowiedz si wicej
                  </button>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex gap-12 pt-16 border-t border-gold/10"
                >
                  <div>
                    <span className="block font-playfair text-4xl text-white font-bold">50+</span>
                    <span className="text-[10px] text-dim uppercase tracking-widest font-bebas">Aktywnych Twórców</span>
                  </div>
                  <div>
                    <span className="block font-playfair text-4xl text-white font-bold">100+</span>
                    <span className="text-[10px] text-dim uppercase tracking-widest font-bebas">Platform</span>
                  </div>
                </motion.div>
              </div>

              {/* Right Media - Screenshots */}
              <div className="relative overflow-hidden min-h-[50vh] lg:min-h-screen">
                <div className="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-transparent z-10 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent z-10 lg:hidden" />
                
                <div className="absolute inset-0 bg-dark-4 flex items-center justify-center overflow-hidden">
                  {/* Screenshots Grid */}
                  <div className="grid grid-cols-2 gap-4 p-8 w-full max-w-2xl">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <motion.div
                        key={num}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: num * 0.1 }}
                        className="relative overflow-hidden rounded-lg border border-gold/10 hover:border-gold/30 transition-all group cursor-pointer"
                      >
                        <img
                          src={`/strona  Start i O studio/${num}.png`}
                          alt={`Studio HRL Adult ${num}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute bottom-12 right-12 bg-dark-2/80 backdrop-blur-xl border border-gold/20 p-8 z-20 max-w-[240px] hidden md:block">
                  <span className="text-[9px] text-gold uppercase tracking-widest block mb-4">Nowy Projekt</span>
                  <p className="text-white italic text-lg leading-snug">"Do naszego zespou doczay nowi topowi twórcy."</p>
                </div>
              </div>
            </div>
          </section>

          {/* O Studio Section - Integrated */}
          <section id="studio" className="py-32 px-[10%] bg-dark-2 relative">
            <div className="max-w-6xl mx-auto space-y-24">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center space-y-8"
              >
                <span className="text-gold text-[10px] tracking-[0.5em] uppercase">O Studio</span>
                <h2 className="font-playfair text-5xl md:text-7xl text-white">Studio HRL Adult</h2>
                <p className="text-dim text-xl md:text-2xl font-light leading-relaxed italic max-w-4xl mx-auto">
                  Profesjonalny management dla twórców tre adult. Oferujemy kompleksowe wsparcie, 
                  od produkcji po promocj, pomagajc Ci osign sukces w branzy premium.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    title: "Management",
                    description: "Personalny manager 24/7 i indywidualna strategia rozwoju",
                    icon: "??"
                  },
                  {
                    title: "Produkcja",
                    description: "Profesjonalne zdjcia, wideo i edycja materiaów",
                    icon: "??"
                  },
                  {
                    title: "Marketing",
                    description: "Promocja na platformach i budowanie marki",
                    icon: "??"
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center space-y-6"
                  >
                    <div className="text-4xl">{service.icon}</div>
                    <h3 className="font-playfair text-2xl text-white">{service.title}</h3>
                    <p className="text-dim font-light">{service.description}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-center pt-16 border-t border-gold/10"
              >
                <div className="grid md:grid-cols-4 gap-8">
                  <div>
                    <span className="block font-playfair text-4xl text-white font-bold">50+</span>
                    <span className="text-[10px] text-dim uppercase tracking-widest font-bebas">Aktywnych Twórców</span>
                  </div>
                  <div>
                    <span className="block font-playfair text-4xl text-white font-bold">100+</span>
                    <span className="text-[10px] text-dim uppercase tracking-widest font-bebas">Platform</span>
                  </div>
                  <div>
                    <span className="block font-playfair text-4xl text-white font-bold">24/7</span>
                    <span className="text-[10px] text-dim uppercase tracking-widest font-bebas">Wsparcie</span>
                  </div>
                  <div>
                    <span className="block font-playfair text-4xl text-white font-bold">98%</span>
                    <span className="text-[10px] text-dim uppercase tracking-widest font-bebas">Zadowolenie</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>

      <style jsx global>{`
        .font-playfair { font-family: 'Playfair Display', serif; }
      `}</style>
    </>
  );
};

export default HomePage;
