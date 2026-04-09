import React, { useState } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import Philosophy from '@/components/sections/Philosophy';
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
        <meta name="description" content="Studio HRL Adult - profesjonalna produkcja i dystrybucja treści dla dorosłych. Studia 4K, pełne wsparcie i dyskrecja." />
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
                { title: 'Nasze Wartości', desc: 'Dyskrecja, Transparentność, Innowacja. Wierzymy, że tylko jasne zasady współpracy i ciągłe wdrażanie nowych technologii (VR, AI, 4K) pozwalają na budowanie trwałych sukcesów rynkowych.', ico: '💎' }
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

              {/* ─── CONTENT 1: NASZE CELE ─── */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20 border-t border-gold/10">
                <div className="space-y-8">
                  <div className="section-tag">Nasze Cele</div>
                  <h3 className="h2-premium">Gdzie <span className="italic">Zmierzamy</span></h3>
                  <div className="space-y-4 text-dim text-sm leading-relaxed font-light">
                    <p>
                      Studio HRL Adult nie jest zwykłą produkcownią. Jesteśmy misją transformowania branży adult content z amatorskiego chaosu w profesjonalny ekosystem, który traktuje twórce jako artystów i przedsiębiorców.
                    </p>
                    <p>
                      Naszym celem na rok 2026 jest osiągnięcie:</p>
                    <div className="space-y-3 pt-4">
                      {[
                        { goal: '$5M+ Rocznych Przychodów Portfelu', desc: 'Wygenerowanie tej kwoty dla wszystkich naszych partnerów łącznie' },
                        { goal: '50+ Twórczych Partnerów', desc: 'Budowa stabilnego ekosystemu talentów z całej Europy' },
                        { goal: '100M+ Miesięcznych Wyświetleń', desc: 'Organiczny ruch na wszystkie platformy i kanały' },
                        { goal: 'Globalnej Rozpoznawalności', desc: 'Bycie referencją dla jakości w branży na świecie' },
                      ].map((item, i) => (
                        <div key={i} className="flex gap-4 bg-dark-3 border border-gold/10 p-4 hover:border-gold/20 transition-all">
                          <div className="text-gold text-lg font-bold flex-shrink-0">🎯</div>
                          <div>
                            <p className="text-white font-bold text-xs uppercase tracking-widest">{item.goal}</p>
                            <p className="text-[10px] text-dim/80 mt-1">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative space-y-6">
                  <div className="bg-dark-3 border border-gold/10 p-8 space-y-4">
                    <p className="text-[10px] text-gold uppercase tracking-[0.2em] font-bold">Studio Info</p>
                    <div className="space-y-4 text-sm">
                      <div>
                        <p className="text-dim text-[9px] uppercase tracking-widest mb-1">📅 Założona</p>
                        <p className="text-white font-bold">2026</p>
                      </div>
                      <div className="border-t border-gold/10 pt-4">
                        <p className="text-dim text-[9px] uppercase tracking-widest mb-1">📍 Siedziba</p>
                        <p className="text-white font-bold">Cypr (Cyprus)</p>
                      </div>
                      <div className="border-t border-gold/10 pt-4">
                        <p className="text-dim text-[9px] uppercase tracking-widest mb-1">🌍 Status</p>
                        <p className="text-white font-bold">48 Godzin od Startu</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-crimson/10 border border-crimson/20 p-6 space-y-3">
                    <p className="text-crimson font-bold text-xs uppercase tracking-widest">Wizja 2026+</p>
                    <p className="text-white text-[11px] leading-relaxed">
                      Chcemy być studio, które zmienia życia poprzez wolność finansową. Każdy twórca z nami osiąga więcej niż zarabia - osiąga bezpieczeństwo, wsparcie i szacunek.
                    </p>
                  </div>
                </div>
              </div>

              {/* ─── CONTENT 2: NASZE PRIORYTETY ─── */}
              <div className="space-y-12 pt-20 border-t border-gold/10">
                <div className="text-center space-y-4">
                  <div className="section-tag justify-center">Priorytety</div>
                  <h3 className="h2-premium">To Nas <span className="italic">Definiuje</span></h3>
                  <p className="text-dim text-xs font-light max-w-2xl mx-auto leading-loose">
                    W Studio HRL Adult mamy jasne priorytety. Wszystko, co robimy, wynika z tych pięciu filarów strategicznych.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    { 
                      rank: '#1', 
                      priority: 'Dyskrecja', 
                      desc: 'Prywatność twórcy to numer jeden. Zero kompromisów w kwestii bezpieczeństwa danych i anonimowości',
                      icon: '🔐'
                    },
                    { 
                      rank: '#2', 
                      priority: 'Transparentność', 
                      desc: 'Jasne zasady współpracy nie zmieniają się. Co zarabiasz, to widzisz. Dokumentacja na każdym etapie',
                      icon: ''
                    },
                    { 
                      rank: '#3', 
                      priority: 'Jakość', 
                      desc: 'Każdy projekt musi być doskonały. 4K minimum, profesjonalna obsługa, perfekcja w każdym szczególe',
                      icon: '💎'
                    },
                    { 
                      rank: '#4', 
                      priority: 'Edukacja', 
                      desc: 'Uczymy twórców business modelom, marketingu, regulacjach prawnych - nie tylko produkcji',
                      icon: '📚'
                    },
                    { 
                      rank: '#5', 
                      priority: 'Innowacja', 
                      desc: 'VR, AI, blockchain, nowe platformy - zawsze na przedzie technologicznych trendów branży',
                      icon: '🚀'
                    }
                  ].map((priority, i) => (
                    <div key={i} className="bg-dark-3 border border-gold/10 p-6 space-y-4 hover:border-gold/30 hover:bg-dark-3/80 transition-all group">
                      <div className="flex items-center justify-between">
                        <p className="text-gold font-bold text-lg">{priority.rank}</p>
                        <p className="text-3xl">{priority.icon}</p>
                      </div>
                      <h4 className="text-white font-bold text-xs uppercase tracking-widest group-hover:text-gold transition-colors">{priority.priority}</h4>
                      <p className="text-[9px] text-dim leading-relaxed font-light">{priority.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── CONTENT 3: DLACZEGO Z NAMI ─── */}
              <div className="space-y-12 pt-20 border-t border-gold/10">
                <div className="text-center space-y-4">
                  <div className="section-tag justify-center">Twoja Decyzja</div>
                  <h3 className="h2-premium">Dlaczego Wybrać <span className="italic">Studio HRL Adult</span></h3>
                  <p className="text-dim text-xs font-light max-w-2xl mx-auto leading-loose">
                    To nie jest pytanie „dlaczego my?" ale raczej „co ci możemy dać co inni nie mogą?"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { 
                      title: 'Finansowe Wsparcie', 
                      items: [
                        'Nasz model gwarantuje maksymalny zwrot',
                        'Advance payments dostępne dla commitment partnerów',
                        'Bonus za performance (5M+ roczne = premium split)',
                        'Bonus za referrals (+2% za każdego nowego twórcę)',
                        'Gwarantowany income floor przez pierwsze 90 dni'
                      ],
                      icon: '💰'
                    },
                    { 
                      title: 'Wsparcie Techniczne', 
                      items: [
                        'Dostęp do naszych 4 profesjonalnych studiów 24/7',
                        'Dedykowany production director dla każdego projektu',
                        'Unlimited post-production hours (color, sound, edit)',
                        'Multi-platform export i optimization (28 platform)',
                        'Technical support 24/7 - zawsze dostępny mentor'
                      ],
                      icon: '⚙️'
                    },
                    { 
                      title: 'Wsparcie Biznesowe', 
                      items: [
                        'Strategia dystrybucji na wszystkie platformy',
                        'Marketing manager do promocji twoich treści',
                        'Negocjacje z partnerami i sponsorami',
                        'Legal support w kwestii compliance i kontraktów',
                        'Quarterly business reviews i strategy sessions'
                      ],
                      icon: '📈'
                    },
                    { 
                      title: 'Bezpieczeństwo & Dyskrecja', 
                      items: [
                        'Full NDA z polityką zero-disclosure',
                        'Encrypted storage i geo-locked archives',
                        'Anonimowy branding option (jeśli chcesz)',
                        'Usuwanie treści w każdej chwili bez konsekwencji',
                        'EU GDPR compliant - twoje dane to twoja, a nie nasze'
                      ],
                      icon: '🛡️'
                    },
                    { 
                      title: 'Edukacja & Mentorstwo', 
                      items: [
                        'Akademia HRL - kursy online (prywatne dla partnerów)',
                        'Monthly masterclasses z top earnerami',
                        'Networking events z innymi twórcami',
                        '1-on-1 coaching sessions (10 godzin/miesiąc)',
                        'Access do exclusive industry reports i data'
                      ],
                      icon: '👨‍🏫'
                    },
                    { 
                      title: 'Community & Status', 
                      items: [
                        'VIP lounge access w naszych przestrzeniach',
                        'Studio HRL badge na profilach (prestiż)',
                        'Featured status na naszej stronie (top earners)',
                        'Networking z najlepszymi twórcami Europy',
                        'Invitation-only events i partie premium'
                      ],
                      icon: '🌟'
                    }
                  ].map((category, i) => (
                    <div key={i} className="bg-dark-3 border border-gold/10 p-8 space-y-6 hover:border-gold/20 transition-all group">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-2xl mb-2">{category.icon}</p>
                          <h4 className="text-white font-bold text-sm uppercase tracking-widest">{category.title}</h4>
                        </div>
                      </div>
                      <ul className="space-y-3">
                        {category.items.map((item, j) => (
                          <li key={j} className="text-[9px] text-dim flex gap-3 leading-relaxed">
                            <span className="text-gold flex-shrink-0 font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-crimson/20 to-gold/20 border border-gold/20 p-12 text-center space-y-6 rounded-lg">
                  <h3 className="font-cormorant text-3xl italic text-white">
                    Gotowy na zmianę?
                  </h3>
                  <p className="text-dim text-sm max-w-2xl mx-auto leading-relaxed">
                    Studio HRL Adult to nie tylko produkownia. To partnerstwo, które zmieni twoją karierę. Dołącz do nas i zostań częścią rewolucji w branży adult content.
                  </p>
                  <div className="flex gap-4 justify-center pt-6">
                    <button className="bg-gold text-dark font-bold py-3 px-8 hover:bg-gold/80 transition-colors uppercase tracking-widest text-sm">
                      💬 Konsultacja
                    </button>
                    <button className="border border-gold text-gold font-bold py-3 px-8 hover:bg-gold/10 transition-colors uppercase tracking-widest text-sm">
                      📧 Aplikacja
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
