import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-6 bg-dark" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(155,31,53,0.2),rgba(90,15,30,0.08)_50%,transparent_70%),radial-gradient(ellipse_40%_40%_at_15%_75%,rgba(201,168,76,0.04),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_110%_at_50%_50%,transparent_25%,rgba(7,5,10,0.5)_70%,rgba(7,5,10,0.95)_100%)]" />
      
      {/* Orbs */}
      <div className="absolute w-[450px] h-[450px] bg-crimson/10 rounded-full blur-[90px] -top-[15%] -left-[8%] animate-pulse" />
      <div className="absolute w-[320px] h-[320px] bg-gold/5 rounded-full blur-[90px] top-[25%] -right-[8%] animate-pulse delay-1000" />
      <div className="absolute w-[380px] h-[380px] bg-crimson/10 rounded-full blur-[90px] -bottom-[15%] left-[25%] animate-pulse delay-2000" />

      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <span className="text-gold font-montserrat text-[10px] tracking-[0.42em] uppercase block">
            PREMIUM CONTENT STUDIO 18+
          </span>
          <h1 className="text-white font-bebas text-6xl md:text-8xl tracking-tight leading-none uppercase">
            Studio HRL Adult
          </h1>
          <p className="text-gold font-montserrat text-lg md:text-xl tracking-wide">
            Sztuka i profesjonalizm w produkcji treści dla dorosłych
          </p>
        </div>

        <p className="text-dim font-montserrat text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Kompleksowe usługi produkcyjno-dystrybucyjne. Od koncepcji po realizację i zarządzanie karierą. 
          Partnerka przychodzi i tworzy — reszta leży po naszej stronie.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href={ROUTES.CASTING}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-br from-crimson to-crimson-dark text-white text-[10px] font-bold tracking-[0.28em] uppercase transition-all hover:opacity-90 hover:-translate-y-1 text-center"
          >
            Dołącz do Nas
          </Link>
          <a 
            href="#philosophy"
            className="w-full sm:w-auto px-10 py-4 border border-gold/40 text-gold text-[10px] font-medium tracking-[0.28em] uppercase transition-all hover:bg-gold/5 hover:border-gold text-center"
          >
            Poznaj Nas
          </a>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent" />
        <span className="text-dim text-[10px] tracking-widest uppercase">Zjedź niżej</span>
      </div>
    </section>
  );
};

export default Hero;
