import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import CTA from '@/components/sections/CTA';

const PortfolioPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Portfolio - Studio HRL Adult</title>
        <meta name="description" content="Zobacz profile naszych twórczyń i szablony portfolio." />
      </Head>

      <div className="min-h-screen bg-dark text-text">
        <Navigation currentPage="/portfolio" />
        
        <main className="pt-24">
          <section className="py-24 px-[6%] text-center max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <span className="text-gold font-montserrat text-[10px] tracking-[0.42em] uppercase block">
                ZOBACZ NASZE PRACE
              </span>
              <h1 className="text-white font-bebas text-6xl md:text-8xl tracking-tight leading-none uppercase">
                Portfolio
              </h1>
              <p className="text-gold font-montserrat text-lg md:text-xl tracking-wide italic">
                Prezentacja profili naszych partnerek
              </p>
            </div>

            <p className="text-dim font-montserrat text-sm md:text-base leading-relaxed">
              Zajmujemy się profesjonalnym przygotowaniem i promocją profili na najważniejszych platformach. 
              Poniżej zobaczysz przykładowe realizacje i szablony, które budujemy dla naszych twórczyń.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-[3/4] bg-dark3 border border-gold/10 hover:border-gold/30 transition-all group overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60 z-10" />
                  <div className="absolute inset-0 flex items-center justify-center text-gold opacity-10 text-4xl group-hover:scale-110 transition-transform">
                    📸
                  </div>
                  <div className="absolute bottom-6 left-6 z-20 space-y-2 text-left">
                    <span className="text-gold font-bebas text-2xl tracking-wide uppercase">Modelka #{i}</span>
                    <p className="text-dim text-[10px] uppercase tracking-widest">OnlyFans / Chaturbate</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <CTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default PortfolioPage;
