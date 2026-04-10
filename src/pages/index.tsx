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
          {/* START Section - Screenshots Only */}
          <section id="start" className="min-h-screen">
            <div className="flex flex-col items-center justify-center px-[10%] py-24">
              <div className="max-w-6xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h1 className="font-playfair text-6xl md:text-8xl lg:text-9xl text-white font-black leading-[0.9] mb-6">
                    <span className="italic text-crimson-l">START</span>
                  </h1>
                  <p className="text-dim text-xl md:text-2xl font-light italic leading-relaxed max-w-4xl mx-auto">
                    Profesjonalny management dla twórców tre adult. Zosta gwiazd branzy z naszym wsparciem.
                  </p>
                </motion.div>

                {/* Screenshots Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
