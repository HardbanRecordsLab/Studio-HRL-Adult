import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Philosophy from '@/components/sections/Philosophy';
import RevenueModel from '@/components/sections/RevenueModel';
import Platforms from '@/components/sections/Platforms';
import Studios from '@/components/sections/Studios';
import World from '@/components/sections/World';
import Process from '@/components/sections/Process';
import Safety from '@/components/sections/Safety';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/common/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Studio HRL Adult – Premium Adult Content Production</title>
        <meta name="description" content="Studio HRL Adult - profesjonalna produkcja i dystrybucja treści dla dorosłych. Model 60/30/10, studia 4K, pełne wsparcie i dyskrecja." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />
        
        <main>
          <Hero />
          <Stats />

          {/* ─── DETAILED STUDIO INFO (5X CONTENT) ─── */}
          <section className="py-32 px-[7%] max-w-7xl mx-auto space-y-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-10">
                <div className="section-tag">Nasza Historia</div>
                <h2 className="h1-premium leading-tight">Od Wizji do <br /><span className="italic bg-gold-gradient bg-clip-text text-transparent">Lidera Branży</span></h2>
                <div className="space-y-6 text-dim text-sm leading-loose font-light">
                  <p>
                    Studio HRL Adult powstało z potrzeby wprowadzenia nowej jakości do świata cyfrowej intymności. Zaczynaliśmy jako niewielka grupa pasjonatów technologii i marketingu, która dostrzegła ogromną lukę między amatorską twórczością a profesjonalną produkcją filmową.
                  </p>
                  <p>
                    Przez lata ewolucji, stworzyliśmy ekosystem, który nie tylko produkuje treści, ale buduje trwałe i luksusowe marki osobiste. Nasza historia to ciągłe dążenie do perfekcji, inwestycje w najnowocześniejszy sprzęt 4K/8K oraz budowanie zespołu ekspertów, którzy rozumieją psychologię widza tak dobrze, jak algorytmy OnlyFans czy Chaturbate.
                  </p>
                  <p>
                    Dziś jesteśmy dumni, że możemy nazywać się domem dla najbardziej utalentowanych twórców w Europie, oferując im bezpieczeństwo, wsparcie i zarobki, które zmieniają życie.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] bg-dark-2 border border-gold/10 overflow-hidden group">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(155,31,53,0.1),transparent_70%)]" />
                  <div className="w-full h-full flex items-center justify-center text-8xl grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000">🏛️</div>
                  <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-dark to-transparent">
                    <p className="font-cormorant text-2xl italic text-gold">"Luksus to nasza waluta, profesjonalizm to nasz język."</p>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 w-32 h-32 border border-gold/20 -z-10 animate-pulse" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: 'Nasza Misja', desc: 'Demokratyzacja luksusu i profesjonalizmu w branży adult. Chcemy, aby każda twórczyni miała dostęp do narzędzi klasy kinowej i globalnego marketingu, który pozwoli jej osiągnąć szczyt bez kompromisów w kwestii bezpieczeństwa.', ico: '🎯' },
                { title: 'Nasza Wizja', desc: 'Stać się globalnym punktem odniesienia dla jakości w produkcji treści dla dorosłych. Budujemy przyszłość, w której twórca jest artystą i biznesmenem, a studio jego najpotężniejszym sojusznikiem w drodze do wolności finansowej.', ico: '👁️' },
                { title: 'Nasze Wartości', desc: 'Dyskrecja, Transparentność, Innowacja. Wierzymy, że tylko jasne zasady współpracy (model 60/30/10) i ciągłe wdrażanie nowych technologii (VR, AI, 4K) pozwalają na budowanie trwałych sukcesów rynkowych.', ico: '💎' }
              ].map(v => (
                <div key={v.title} className="bg-dark-2 border border-gold/5 p-10 space-y-6 hover:border-gold/20 transition-all group">
                  <div className="text-4xl group-hover:scale-110 transition-transform">{v.ico}</div>
                  <h3 className="font-cormorant text-2xl text-white italic">{v.title}</h3>
                  <p className="text-xs text-dim leading-relaxed font-light">{v.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <Philosophy />

          {/* ─── MINI GALLERY ─── */}
          <section className="py-32 bg-dark-2 border-y border-gold/5 px-[7%] overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-16">
              <div className="text-center space-y-4">
                <div className="section-tag justify-center">Studio Showcase</div>
                <h2 className="h2-premium">Galeria <span className="italic">Luksusu</span></h2>
                <p className="text-dim text-xs font-light max-w-xl mx-auto leading-loose">
                  Zobacz, jak pracujemy. Nasze przestrzenie są zaprojektowane tak, aby inspirować i zapewniać najwyższy komfort podczas każdej sesji.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { type: 'photo', ico: '📸', label: 'Main Studio A' },
                  { type: 'video', ico: '🎥', label: 'Boutique Room' },
                  { type: 'photo', ico: '📸', label: 'Dark Aesthetic' },
                  { type: 'photo', ico: '📸', label: 'Gold Lounge' },
                  { type: 'video', ico: '🎥', label: 'Neon Cyber' },
                  { type: 'photo', ico: '📸', label: 'Minimalist White' },
                  { type: 'video', ico: '🎥', label: 'Vintage Velvet' },
                  { type: 'photo', ico: '📸', label: 'Technical Hub' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="relative aspect-square bg-dark-3 border border-gold/10 overflow-hidden group cursor-pointer"
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-4xl grayscale opacity-20 group-hover:opacity-50 transition-opacity">
                      {item.ico}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      <span className="text-[7px] tracking-[0.2em] uppercase text-gold font-bold">{item.type}</span>
                      <p className="text-[10px] text-white font-medium">{item.label}</p>
                    </div>
                    {item.type === 'video' && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-crimson/80 flex items-center justify-center text-[10px] animate-pulse">▶</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <RevenueModel />
          <Platforms />
          <Studios />
          <World />
          <Process />
          <Safety />
          <CTA />
        </main>
        
        <Footer />
        <div className="grain-overlay" />
      </div>

      <style jsx global>{`
        .grain-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 1; opacity: 0.35;
        }
      `}</style>
    </>
  );
};

export default HomePage;
