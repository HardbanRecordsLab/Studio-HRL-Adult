import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  return (
    <section className="py-32 px-[7%] bg-dark-2 overflow-hidden relative" id="philosophy">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        {/* Tag */}
        <div className="section-tag">O Studiu HRL Adult</div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <h2 className="h1-premium">
              Wizja spotyka <br />
              <span className="italic bg-gold-gradient bg-clip-text text-transparent">profesjonalizm</span>
            </h2>
            
            <div className="space-y-8">
              <p className="text-dim text-sm md:text-base leading-loose font-light italic border-l-2 border-gold/30 pl-8">
                Studio HRL Adult to nie tylko miejsce produkcji – to kompletny ekosystem wsparcia dla Twórczyń treści dla dorosłych. 
                Nasza historia sięga 2026 roku, kiedy postanowiliśmy zdefiniować na nowo standardy profesjonalizmu w branży adult.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                {[
                  { title: 'Transparentność', desc: 'Pełny wgląd w statystyki, przychody i model 60/30/10.', ico: '💎' },
                  { title: 'Bezpieczeństwo', desc: 'Ochrona tożsamości, geo-blocking i wsparcie prawne.', ico: '🛡️' },
                  { title: 'Partnerstwo', desc: 'Indywidualne podejście i wspólny rozwój marki.', ico: '🤝' },
                ].map((val) => (
                  <div key={val.title} className="space-y-3">
                    <div className="text-2xl">{val.ico}</div>
                    <h4 className="text-[10px] text-gold font-bold tracking-widest uppercase">{val.title}</h4>
                    <p className="text-[9px] text-dim/80 leading-relaxed font-light">{val.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-dark-3/50 border border-gold/10 p-10 space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <h3 className="font-cormorant text-2xl text-white italic">Zakres działań Studia</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Produkcja wideo 4K i sesje foto',
                    'Dystrybucja na 8+ platformach',
                    'Marketing i budowa marki',
                    'Zarządzanie czatami i fanami',
                    'Pełna obsługa finansowa',
                    'Szkolenia i rozwój (Akademia)'
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[10px] text-dim italic">
                      <span className="w-1 h-1 bg-gold rotate-45" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative pt-12">
            {/* Main Visual */}
            <div className="aspect-[4/5] bg-dark-3 border border-gold/10 overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent z-10" />
              <img 
                src="/images/studio-interior.jpg" 
                alt="Studio Interior" 
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute bottom-10 left-10 z-20 space-y-2">
                <div className="text-gold text-[8px] tracking-[0.4em] uppercase font-bold">Infrastruktura</div>
                <div className="font-cormorant text-3xl text-white italic">Studio Klasy Premium</div>
              </div>
              
              {/* Decorative Frame */}
              <div className="absolute inset-4 border border-gold/10 pointer-events-none" />
            </div>
            
            {/* Experience Card */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="absolute -top-6 -right-6 bg-gold p-8 shadow-2xl hidden md:block"
            >
              <div className="text-dark space-y-1">
                <div className="text-4xl font-cormorant italic font-bold">100%</div>
                <div className="text-[8px] font-bold tracking-widest uppercase leading-tight">Gwarancja<br />Dyskrecji</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
