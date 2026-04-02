import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import CTA from '@/components/sections/CTA';

const PortfolioPage: React.FC = () => {
  const profiles = [
    { name: 'Modelka #01', tags: ['OnlyFans', 'Premium'], ico: '📸', href: '#' },
    { name: 'Modelka #02', tags: ['Chaturbate', 'Top Tier'], ico: '📹', href: '#' },
    { name: 'Para #01', tags: ['ManyVids', 'Fansly'], ico: '👩‍❤️‍👨', href: ROUTES.PARA },
    { name: 'Modelka #03', tags: ['Stripchat', 'New'], ico: '🔥', href: '#' },
    { name: 'Modelka #04', tags: ['OnlyFans', 'Bestseller'], ico: '💎', href: '#' },
    { name: 'Para #02', tags: ['Chaturbate', 'Couple'], ico: '✨', href: ROUTES.PARA },
  ];

  return (
    <>
      <Head>
        <title>Portfolio - Studio HRL Adult</title>
        <meta name="description" content="Portfolio i szablony profili partnerek Studio HRL Adult. Zobacz nasze realizacje." />
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-24 pb-24">
          {/* Hero Portfolio */}
          <section className="relative h-[70vh] flex items-center justify-center overflow-hidden px-[7%]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(200,85,106,0.12),rgba(139,26,46,0.06)_50%,transparent_70%)] z-0" />
            <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
              <div className="hero-academy-pre flex items-center justify-center gap-4 text-gold/60 text-[8.5px] tracking-[0.5em] uppercase">
                <div className="w-8 h-px bg-gold/30" />
                Premium Models & Profiles
                <div className="w-8 h-px bg-gold/30" />
              </div>
              <h1 className="h1-premium text-white">Portfolio <br /><span className="italic bg-gold-gradient bg-clip-text text-transparent">Studio HRL</span></h1>
              <p className="font-cormorant text-lg italic text-dim">Profesjonalne szablony i profile naszych partnerek</p>
              <p className="text-dim text-xs leading-loose font-light max-w-xl mx-auto">
                Zajmujemy się profesjonalnym przygotowaniem, optymalizacją i promocją profili na najważniejszych platformach. 
                Poniżej zobaczysz przykładowe realizacje i szablony, które budujemy dla naszych twórczyń.
              </p>
            </div>
          </section>

          {/* Profiles Grid */}
          <section className="px-[7%] max-w-7xl mx-auto space-y-12">
            <div className="section-tag">Nasze Realizacje</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {profiles.map((profile, i) => (
                <Link key={i} href={profile.href} className="group relative aspect-[3/4] bg-dark-3/40 border border-gold/10 overflow-hidden hover:border-gold/30 transition-all duration-700">
                  {/* Image Placeholder with Blur effect */}
                  <div className="absolute inset-0 bg-dark-4 flex items-center justify-center text-6xl opacity-20 group-hover:scale-110 transition-transform duration-700">
                    {profile.ico}
                  </div>
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-80" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex gap-2">
                      {profile.tags.map(tag => (
                        <span key={tag} className="text-[7px] tracking-[0.1em] uppercase px-2 py-0.5 bg-gold/10 text-gold border border-gold/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-cormorant text-2xl text-white italic">{profile.name}</h3>
                    <div className="h-px w-0 group-hover:w-full bg-gold/30 transition-all duration-700" />
                    <button className="text-[8px] text-gold tracking-widest uppercase font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      Zobacz Case Study
                    </button>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/20" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/20" />
                </div>
              ))}
            </div>
          </section>

          {/* Anna & Marek Special Section */}
          <section className="py-24 px-[7%] max-w-7xl mx-auto mt-24">
            <div className="bg-dark-3/40 border border-gold/10 p-12 md:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center gap-16">
              <div className="absolute inset-0 bg-grain opacity-[0.02] pointer-events-none" />
              
              <div className="lg:w-1/2 space-y-8 relative z-10">
                <div className="section-tag">Special Edition</div>
                <h2 className="h2-premium">
                  Styl <span className="italic bg-gold-gradient bg-clip-text text-transparent">Anna & Marek</span>
                </h2>
                <p className="text-dim text-sm leading-loose font-light">
                  Nasz unikalny szablon dedykowany dla par, które chcą budować markę premium. 
                  Łączy w sobie elegancję, intymność i profesjonalne podejście do marketingu treści.
                </p>
                <ul className="space-y-4">
                  {['Pełna integracja z ManyVids & Fansly', 'Zautomatyzowany lejek sprzedażowy', 'Ekskluzywna oprawa wizualna 4K'].map(f => (
                    <li key={f} className="flex items-center gap-4 text-xs text-dim/80 font-light">
                      <span className="w-1.5 h-1.5 bg-gold rotate-45" /> {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:w-1/2 relative z-10">
                <div className="aspect-video bg-dark-4 border border-gold/20 flex items-center justify-center text-4xl italic font-cormorant text-gold/30">
                  Preview: Anna & Marek Style
                </div>
              </div>
            </div>
          </section>

          <CTA />
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>
    </>
  );
};

export default PortfolioPage;
