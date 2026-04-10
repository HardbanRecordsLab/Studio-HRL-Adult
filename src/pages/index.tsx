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
          {/* Full Page Section - Reconstructed from Screenshots */}
          <section className="min-h-screen">
            <div className="relative w-full h-screen">
              {/* Hero Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-2 to-dark">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,85,106,0.1),transparent_70%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,215,0,0.05),transparent)]" />
              </div>

              {/* Content Container */}
              <div className="relative z-10 h-full flex items-center justify-center px-[10%]">
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Content - Text Section */}
                    <motion.div 
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8 }}
                      className="space-y-8"
                    >
                      <div className="space-y-6">
                        <span className="font-bebas text-crimson-l text-sm tracking-[0.4em] uppercase block">Studio HRL Adult</span>
                        <h1 className="font-playfair text-6xl md:text-7xl lg:text-8xl text-white font-black leading-[0.9]">
                          <span className="italic text-crimson-l">START</span> <br />
                          <span className="text-gold">Twojej</span> <br />
                          <span className="text-white">Kariery</span>
                        </h1>
                        <p className="text-dim text-xl md:text-2xl font-light italic leading-relaxed">
                          Profesjonalny management dla twórców tre adult. Zosta gwiazd branzy z naszym wsparciem i eksperck wiedz.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-8 pt-8">
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-12 py-5 bg-crimson-l text-white font-bebas text-lg tracking-widest hover:bg-crimson transition-all shadow-[0_0_40px_rgba(212,48,74,0.2)]"
                        >
                          Rozpocznij
                        </motion.button>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-gold italic text-xl border-b border-gold/30 hover:text-gold-l hover:border-gold transition-all"
                        >
                          Dowiedz si wicej
                        </motion.button>
                      </div>

                      <div className="flex gap-12 pt-16 border-t border-gold/10">
                        <div>
                          <span className="block font-playfair text-4xl text-white font-bold">50+</span>
                          <span className="text-[10px] text-dim uppercase tracking-widest font-bebas">Aktywnych Twórców</span>
                        </div>
                        <div>
                          <span className="block font-playfair text-4xl text-white font-bold">100+</span>
                          <span className="text-[10px] text-dim uppercase tracking-widest font-bebas">Platform</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Right Content - Visual Section */}
                    <motion.div 
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="relative"
                    >
                      <div className="relative">
                        {/* Main Visual Element */}
                        <div className="relative w-full h-[600px] bg-gradient-to-br from-gold/10 to-crimson-l/10 rounded-2xl border border-gold/20 overflow-hidden">
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.1),transparent_70%)]" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center space-y-8">
                              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gold to-crimson-l rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(255,215,0,0.3)]">
                                <span className="text-6xl">??</span>
                              </div>
                              <div className="space-y-4">
                                <h3 className="font-playfair text-3xl text-white font-bold">Premium Management</h3>
                                <p className="text-dim text-lg font-light italic max-w-md mx-auto">
                                  Dojcz do najlepszych w branzy z naszym kompleksowym wsparciem
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Floating Elements */}
                          <div className="absolute top-8 right-8 w-16 h-16 bg-gold/20 rounded-full animate-pulse" />
                          <div className="absolute bottom-8 left-8 w-12 h-12 bg-crimson-l/20 rounded-full animate-pulse delay-1000" />
                          <div className="absolute top-1/2 right-16 w-8 h-8 bg-gold/30 rounded-full animate-pulse delay-500" />
                        </div>

                        {/* Stats Cards */}
                        <div className="absolute -bottom-8 -left-8 bg-dark-2/90 backdrop-blur-xl border border-gold/20 p-6 rounded-xl shadow-2xl">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center">
                              <span className="text-xl">??</span>
                            </div>
                            <div>
                              <span className="text-[9px] text-gold uppercase tracking-widest block">Nowy Projekt</span>
                              <p className="text-white italic text-sm">"Do naszego zespou doczay nowi topowi twórcy."</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-32 px-[10%] bg-dark-2">
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
