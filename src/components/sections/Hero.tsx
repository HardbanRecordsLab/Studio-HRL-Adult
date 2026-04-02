import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-6 bg-dark">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-hero-bg pointer-events-none" />
      <div className="absolute inset-0 bg-hero-vign pointer-events-none" />
      
      {/* Floating Orbs */}
      <div className="orb o1 animate-orb-float" />
      <div className="orb o2 animate-orb-float" />
      <div className="orb o3 animate-orb-float" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Supertag */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-8 h-px bg-gold/40" />
          <span className="text-gold/65 text-[8.5px] font-semibold tracking-[0.5em] uppercase">
            Premium Content Studio 18+
          </span>
          <div className="w-8 h-px bg-gold/40" />
        </div>

        {/* Floating Logo */}
        <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-8 border border-gold/22 animate-logo-pulse">
          <img 
            src="/logo/studio hrl adult.jpeg" 
            alt="Studio HRL Adult" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Heading */}
        <h1 className="font-cormorant text-6xl md:text-9xl font-light leading-[0.88] tracking-wider text-white mb-2">
          Studio HRL <br />
          <span className="bg-gold-gradient bg-clip-text text-transparent italic">Adult</span>
        </h1>

        {/* Subtitle */}
        <p className="font-cormorant text-lg md:text-xl italic text-dim tracking-wide mb-10">
          Sztuka spotyka profesjonalizm w produkcji treści premium
        </p>

        {/* Description */}
        <p className="text-dim text-xs md:text-sm leading-relaxed max-w-lg mx-auto mb-12 font-light">
          Kompleksowa produkcja i dystrybucja treści dla dorosłych. 
          Ty tworzysz — my zajmujemy się technologią, marketingiem i Twoim sukcesem.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={ROUTES.CASTING} className="btn-crimson w-full sm:w-auto">
            Dołącz do Nas
          </Link>
          <Link href="/#philosophy" className="btn-outline w-full sm:w-auto">
            Poznaj Naszą Wizję
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-scroll-bounce opacity-40">
        <div className="w-px h-11 bg-gradient-to-b from-gold to-transparent" />
        <span className="text-gold text-[7.5px] tracking-[0.28em] uppercase">Zjedź niżej</span>
      </div>

      <style jsx>{`
        .bg-hero-bg {
          background: radial-gradient(ellipse 70% 60% at 50% 45%, rgba(155,31,53,0.2), rgba(90,15,30,0.08) 50%, transparent 70%),
                      radial-gradient(ellipse 40% 40% at 15% 75%, rgba(201,168,76,0.04), transparent);
        }
        .bg-hero-vign {
          background: radial-gradient(ellipse 110% 110% at 50% 50%, transparent 25%, rgba(7,5,10,0.5) 70%, rgba(7,5,10,0.95) 100%);
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
        }
        .o1 { width: 450px; height: 450px; background: rgba(155,31,53,0.1); top: -15%; left: -8%; }
        .o2 { width: 320px; height: 320px; background: rgba(201,168,76,0.06); top: 25%; right: -8%; }
        .o3 { width: 380px; height: 380px; background: rgba(90,15,30,0.12); bottom: -15%; left: 25%; }
      `}</style>
    </section>
  );
};

export default Hero;
