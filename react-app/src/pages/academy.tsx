import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import CTA from '@/components/sections/CTA';

const AcademyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Akademia - Studio HRL Adult</title>
        <meta name="description" content="Edukacja i rozwój w branży adult. Wiedza, podcasty i materiały szkoleniowe." />
      </Head>

      <div className="min-h-screen bg-dark text-text">
        <Navigation currentPage="/academy" />
        
        <main className="pt-24">
          <section className="py-24 px-[6%] text-center max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <span className="text-gold font-montserrat text-[10px] tracking-[0.42em] uppercase block">
                WIEDZA I ROZWÓJ
              </span>
              <h1 className="text-white font-bebas text-6xl md:text-8xl tracking-tight leading-none uppercase">
                Akademia
              </h1>
              <p className="text-gold font-montserrat text-lg md:text-xl tracking-wide italic">
                Twój przewodnik po branży treści dla dorosłych
              </p>
            </div>

            <p className="text-dim font-montserrat text-sm md:text-base leading-relaxed">
              Dostęp do ekskluzywnych materiałów, podcastów i poradników przygotowanych przez ekspertów. 
              Uczymy, jak budować markę, zarządzać treściami i osiągać sukces finansowy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {/* Media Card - Video */}
              <div className="p-8 bg-dark3 border border-gold/10 hover:border-gold/30 transition-all group">
                <div className="aspect-video bg-dark4 flex items-center justify-center text-gold opacity-40 mb-6 group-hover:scale-105 transition-transform cursor-pointer">
                  ▶
                </div>
                <h3 className="text-gold font-bebas text-2xl tracking-wide mb-3">Kurs: Podstawy Streamingu</h3>
                <p className="text-dim text-sm">Naucz się, jak skonfigurować sprzęt i zacząć zarabiać na transmisjach live.</p>
              </div>

              {/* Media Card - Podcast */}
              <div className="p-8 bg-dark3 border border-gold/10 hover:border-gold/30 transition-all group">
                <div className="aspect-video bg-dark4 flex items-center justify-center text-gold opacity-40 mb-6 group-hover:scale-105 transition-transform cursor-pointer">
                  🎙️
                </div>
                <h3 className="text-gold font-bebas text-2xl tracking-wide mb-3">Podcast: Psychologia Widza</h3>
                <p className="text-dim text-sm">Odkryj sekrety budowania relacji i monetyzacji bez tajemnic.</p>
              </div>
            </div>
          </section>

          <CTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default AcademyPage;
