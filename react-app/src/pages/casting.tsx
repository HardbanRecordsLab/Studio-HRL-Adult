import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import CTA from '@/components/sections/CTA';

const CastingPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Casting - Studio HRL Adult</title>
        <meta name="description" content="Dołącz do Studio HRL Adult. Aplikuj na casting i zacznij karierę." />
      </Head>

      <div className="min-h-screen bg-dark text-text">
        <Navigation currentPage="/casting" />
        
        <main className="pt-24">
          <section className="py-24 px-[6%] text-center max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <span className="text-gold font-montserrat text-[10px] tracking-[0.42em] uppercase block">
                DOŁĄCZ DO NAS
              </span>
              <h1 className="text-white font-bebas text-6xl md:text-8xl tracking-tight leading-none uppercase">
                Casting
              </h1>
              <p className="text-gold font-montserrat text-lg md:text-xl tracking-wide italic">
                Twoja droga do sukcesu w branży adult
              </p>
            </div>

            <p className="text-dim font-montserrat text-sm md:text-base leading-relaxed">
              Szukamy ambitnych osób, które chcą profesjonalnie rozwijać swoją karierę. 
              Zapewniamy pełne wsparcie, sprzęt 4K i bezpieczne środowisko pracy.
            </p>

            <div className="bg-dark3 border border-gold/10 p-8 md:p-12 text-left space-y-8 mt-12">
              <h2 className="text-white font-bebas text-3xl tracking-wide uppercase border-b border-gold/20 pb-4">
                Formularz Aplikacyjny
              </h2>
              <p className="text-dim text-sm italic">
                Wypełnij poniższe dane, a nasz zespół skontaktuje się z Tobą w ciągu 24h.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-gold text-[10px] uppercase tracking-widest font-bold">Imię / Pseudonim</label>
                  <input type="text" className="w-full bg-dark2 border border-gold/10 p-4 text-white focus:border-gold outline-none transition-colors" placeholder="Twoje imię..." />
                </div>
                <div className="space-y-2">
                  <label className="text-gold text-[10px] uppercase tracking-widest font-bold">Email</label>
                  <input type="email" className="w-full bg-dark2 border border-gold/10 p-4 text-white focus:border-gold outline-none transition-colors" placeholder="Twój email..." />
                </div>
                <div className="space-y-2">
                  <label className="text-gold text-[10px] uppercase tracking-widest font-bold">Wiek</label>
                  <input type="number" className="w-full bg-dark2 border border-gold/10 p-4 text-white focus:border-gold outline-none transition-colors" placeholder="Twój wiek..." />
                </div>
                <div className="space-y-2">
                  <label className="text-gold text-[10px] uppercase tracking-widest font-bold">Telegram / WhatsApp</label>
                  <input type="text" className="w-full bg-dark2 border border-gold/10 p-4 text-white focus:border-gold outline-none transition-colors" placeholder="Twój kontakt..." />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-gold text-[10px] uppercase tracking-widest font-bold">Kilka słów o Tobie / Doświadczenie</label>
                <textarea className="w-full bg-dark2 border border-gold/10 p-4 text-white focus:border-gold outline-none transition-colors h-32" placeholder="Napisz coś o sobie..."></textarea>
              </div>

              <button className="w-full py-4 bg-gradient-to-br from-crimson to-crimson-dark text-white font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-opacity">
                Wyślij Aplikację
              </button>
            </div>
          </section>

          <CTA />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default CastingPage;
