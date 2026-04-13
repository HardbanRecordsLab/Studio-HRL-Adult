import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success) setStats(data.stats);
      })
      .catch(err => console.error('Stats fetch error:', err));
  }, []);

  const playVideo = (id: string) => {
    setActiveVideo(id);
    const video = document.getElementById(id + '-src') as HTMLVideoElement;
    if (video) {
      video.play();
    }
  };

  return (
    <>
      <Head>
        <title>Studio HRL Adult - Premium Adult Content Production</title>
        <meta name="description" content="Poland's foremost platform for independent adult production and distribution. Where artistry meets professional excellence." />
      </Head>

      <style jsx global>{`
        :root {
          --gold: #c9a84c;
          --gold-light: #e8c97a;
          --gold-italic: #d4a847;
          --dark-bg: #0a0a0a;
          --dark-card: #111111;
          --dark-card2: #161616;
          --dark-card3: #1a1a1a;
          --crimson: #8b1a2e;
          --crimson-btn: #9b1f35;
          --text-muted: #888;
          --text-light: #ccc;
          --border-dark: #2a2a2a;
        }
        html { scroll-behavior: smooth; }
        .font-arial { font-family: 'Arial', sans-serif; }
        .font-georgia { font-family: 'Georgia', serif; }
      `}</style>

      <div className="min-h-screen bg-[#0a0a0a] text-white font-georgia overflow-x-hidden">
        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,10,0.95)] backdrop-blur-md border-b border-[#1a1a1a] flex items-center justify-between px-10 h-16">
          <Link href="/" className="flex items-center gap-3 no-underline">
            <img 
              src="/logo/studio hrl adultbezła logo.png" 
              alt="Studio HRL Adult Logo" 
              className="h-10 w-auto object-contain"
            />
            <span className="text-sm tracking-[3px] text-white font-arial font-normal">STUDIO HRL ADULT</span>
          </Link>
          <ul className="flex gap-8 list-none">
            <li><Link href="#hero" className="no-underline text-[#ccc] text-xs tracking-[2px] font-arial hover:text-white transition-colors">START</Link></li>
            <li><Link href="#about" className="no-underline text-[#ccc] text-xs tracking-[2px] font-arial hover:text-white transition-colors">O STUDIU</Link></li>
            <li><Link href="#contact" className="no-underline text-[#ccc] text-xs tracking-[2px] font-arial hover:text-white transition-colors">KONTAKT</Link></li>
            <li><Link href="#casting" className="no-underline text-[#ccc] text-xs tracking-[2px] font-arial hover:text-white transition-colors">CASTING</Link></li>
            <li><Link href="/academy" className="no-underline text-[#ccc] text-xs tracking-[2px] font-arial hover:text-white transition-colors">AKADEMIA</Link></li>
            <li><Link href="/portfolio" className="no-underline text-[#ccc] text-xs tracking-[2px] font-arial hover:text-white transition-colors">PORTFOLIO</Link></li>
          </ul>
          <div className="flex gap-3 items-center">
            <Link href="/admin">
              <button className="bg-transparent border border-[#444] text-[#ccc] px-5 py-2 text-xs tracking-[2px] font-arial cursor-pointer hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all">ADMIN</button>
            </Link>
            <button className="bg-[var(--crimson-btn)] border-none text-white px-6 py-2.5 text-xs tracking-[2px] font-arial font-semibold cursor-pointer hover:bg-[#b0243c] transition-colors">DOŁĄCZ TERAZ</button>
          </div>
        </nav>

        <main>
          {/* HERO */}
          <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-10 pt-20 bg-[radial-gradient(ellipse_at_center_top,#1a0a0f_0%,#0a0a0a_60%)]">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mx-auto mb-8">
              <img 
                src="/logo/studio hrl adultbezła logo.png" 
                alt="Studio HRL Adult Logo" 
                className="h-20 w-auto object-contain"
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex items-center gap-4 mb-4 text-[var(--gold)] text-xs tracking-[4px] font-arial justify-center">
              <span className="flex-1 max-w-[80px] h-px bg-[var(--gold)] opacity-50"></span>STUDIO HRL ADULT<span className="flex-1 max-w-[80px] h-px bg-[var(--gold)] opacity-50"></span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="text-[clamp(52px,8vw,96px)] font-normal tracking-[4px] leading-none mb-2 font-georgia">ELEVATE YOUR<em className="block italic text-[var(--gold)] text-[clamp(52px,8vw,96px)]">EXPERIENCE</em></motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-xs tracking-[5px] text-[#aaa] my-6 font-arial">REDEFINE ENTERTAINMENT</motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="max-w-md text-sm text-[#888] leading-7 italic mb-12">Discover Poland&apos;s foremost platform for independent adult production and distribution. Where artistry meets professional excellence.</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="mt-16 flex justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[var(--crimson)] animate-bounce"></div></motion.div>
          </section>

          {/* STATS */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="bg-[#0d0d0d] py-16 px-10 grid grid-cols-4 gap-0 border-t border-[#1a1a1a]">
            {[
              { num: '60%', label: 'DLA PARTNERKI' },
              { num: '30%', label: 'DLA MODELA' },
              { num: '10%', label: 'DLA STUDIA' },
              { num: '4K', label: 'JAKOŚĆ HDR' }
            ].map((stat, i) => (
              <div key={i} className="text-center border-r border-[#1a1a1a] last:border-r-0 py-5">
                <div className="text-[52px] text-[var(--gold)] font-georgia leading-none">{stat.num}</div>
                <div className="text-[10px] tracking-[3px] text-[var(--gold)] mt-2 font-arial">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* ABOUT */}
          <section id="about" className="py-24 px-10">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center gap-4 text-[var(--gold)] text-[10px] tracking-[4px] font-arial mb-10"><span className="w-[30px] h-px bg-[var(--gold)]"></span>NASZA HISTORIA</div>
              <div className="grid grid-cols-2 gap-20 items-start">
                <div className="space-y-5">
                  <h2 className="text-[clamp(36px,5vw,64px)] font-normal leading-tight text-white font-georgia">Od Wizji do<br /><em className="italic text-[var(--gold)]">Lidera Branży</em></h2>
                  <p className="text-sm text-[#888] leading-7">Studio HRL Adult powstało z potrzeby wprowadzenia nowej jakości do świata cyfrowej intymności. Zaczynaliśmy jako niewielka grupa pasjonatów technologii i marketingu, która dostrzegła ogromną lukę między amatorską twórczością a profesjonalną produkcją filmową.</p>
                  <p className="text-sm text-[#888] leading-7">Przez lata ewolucji, stworzyliśmy ekosystem, który nie tylko produkuje treści, ale buduje trwałe i luksusowe marki osobiste. Nasza historia to ciągłe dążenie do perfekcji, inwestycje w najnowocześniejszy sprzęt 4K/8K oraz budowanie zespołu ekspertów.</p>
                  <p className="text-sm text-[#888] leading-7">Dziś jesteśmy dumni, że możemy nazywać się domem dla najbardziej utalentowanych twórców w Europie.</p>
                </div>
                <div className="bg-[#111] border border-[#222] rounded min-h-[400px] flex flex-col items-center justify-center gap-5">
                  <div className="text-5xl">🏛️</div><div className="w-3 h-3 bg-[var(--crimson)] rounded-full"></div>
                  <div className="text-xl text-[var(--gold)] italic text-center px-8 leading-normal">&quot;Luksus to nasza waluta, profesjonalizm to nasz język.&quot;</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-px mt-16 bg-[#1a1a1a]">
                {[{ icon: '🎯', title: 'Nasza Misja', text: 'Demokratyzacja luksusu i profesjonalizmu w branży adult. Chcemy, aby każda twórczyni miała dostęp do narzędzi klasy kinowej i globalnego marketingu.' }, { icon: '👁️', title: 'Nasza Wizja', text: 'Stać się globalnym punktem odniesienia dla jakości w produkcji treści dla dorosłych. Budujemy przyszłość, w której twórca jest artystą i biznesmenem.' }, { icon: '💎', title: 'Nasze Wartości', text: 'Dyskrecja. Transparentność. Innowacja. Wierzymy, że tylko jasne zasady współpracy pozwalają na budowanie trwałych sukcesów rynkowych.' }].map((m, i) => (
                  <div key={i} className="bg-[#111] p-10"><div className="text-2xl mb-4">{m.icon}</div><div className="text-lg italic text-[var(--gold)] mb-3">{m.title}</div><div className="text-[13px] text-[#888] leading-7">{m.text}</div></div>
                ))}
              </div>
            </div>
          </section>

          {/* PHILOSOPHY */}
          <section id="philosophy" className="py-24 px-10 bg-[#080808]">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center gap-4 text-[var(--gold)] text-[10px] tracking-[4px] font-arial mb-10"><span className="w-[30px] h-px bg-[var(--gold)]"></span>OUR PHILOSOPHY</div>
              <h2 className="text-[clamp(28px,4vw,52px)] tracking-[4px] uppercase font-normal text-center mb-16 font-georgia">THE ART OF ADULT<br /><em className="italic text-[var(--gold)]">ENTERTAINMENT</em></h2>
              <div className="grid grid-cols-2 gap-20 items-start">
                <div>
                  <blockquote className="text-base italic text-[#ccc] leading-7 border-l-2 border-[var(--gold)] pl-6 my-10">&quot;We believe that adult content creation is a form of art that requires both artistic vision and business professionalism. Great content is neither purely commercial nor purely artistic – it's a perfect synthesis.&quot;</blockquote>
                  <p className="text-sm text-[#888] leading-7 mb-5">At Studio HRL Adult, we combine high-end aesthetics with operational efficiency. Our approach is built on four core pillars: absolute respect, peak professionalism, full transparency, and sustainable growth.</p>
                  <div className="grid grid-cols-2 gap-8 mt-10">
                    {[{ num: '01.', title: 'EXCELLENCE', desc: 'Uncompromising quality in every frame, from 4K cinematography to pixel-perfect editing.' }, { num: '02.', title: 'PRIVACY', desc: 'Your security, anonymity, and data protection are non-negotiable operational priorities.' }, { num: '03.', title: 'EARNINGS', desc: 'Transparent partnership model ensures you keep what you earn with guaranteed startup support.' }, { num: '04.', title: 'SUPPORT', desc: '24/7 professional team dedicated to your growth, marketing, and platform optimization.' }].map((p, i) => (
                      <div key={i}><div className="text-[13px] text-[var(--gold)] tracking-[2px] font-arial mb-1.5">{p.num}</div><div className="text-[11px] tracking-[3px] uppercase text-white font-arial font-semibold mb-2">{p.title}</div><div className="text-xs text-[#666] leading-relaxed">{p.desc}</div></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[15px] italic text-[var(--gold)] mb-4">Production Showcase</div>
                  <div className="grid grid-cols-3 gap-0.5">
                    {['#1a1a1a', '#1e1814', '#161616', '#181818', '#141414', '#1c1c1c', '#161616', '#1a1510', '#0e0e0e'].map((bg, i) => (
                      <div key={i} className="aspect-square bg-[#1a1a1a] overflow-hidden relative" style={{ background: bg }}>
                        <div className="w-full h-full flex items-center justify-center text-[#333] text-xs font-arial"></div>
                        {i === 1 && <div className="absolute bottom-2.5 left-2.5 text-[var(--gold)] text-[13px] italic">Velvet Intimacy</div>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* GOALS */}
          <section id="goals" className="py-24 px-10">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center gap-4 text-[var(--gold)] text-[10px] tracking-[4px] font-arial mb-10"><span className="w-[30px] h-px bg-[var(--gold)]"></span>NASZE CELE</div>
              <div className="grid grid-cols-2 gap-16">
                <div>
                  <h2 className="text-[clamp(36px,5vw,64px)] font-normal leading-tight text-white font-georgia mb-5">Gdzie <em className="italic text-[var(--gold)]">Zmierzamy</em></h2>
                  <p className="text-sm text-[#888] leading-7 mb-5">Studio HRL Adult nie jest zwykłą produkcownią. Jesteśmy misją transformowania branży adult content z amatorskiego chaosu w profesjonalny ekosystem.</p>
                  <p className="text-sm text-[#888] leading-7 mb-5">Naszym celem na rok 2026 jest osiągnięcie:</p>
                  <div className="flex flex-col gap-3 mt-10">
                    {[{ icon: '🎯', title: '$5M+ ROCZNYCH PRZYCHODÓW PORTFELU', desc: 'Wygenerowanie tej kwoty dla wszystkich naszych partnerów łącznie.' }, { icon: '🎯', title: '50+ TWÓRCZYCH PARTNERÓW', desc: 'Budowa stabilnego ekosystemu talentów z całej Europy.' }, { icon: '🎯', title: '100M+ MIESIĘCZNYCH WYŚWIETLEŃ', desc: 'Organiczny ruch na wszystkie platformy i kanały.' }, { icon: '🎯', title: 'GLOBALNEJ ROZPOZNAWALNOŚCI', desc: 'Być referencją dla jakości w branży na świecie.' }].map((g, i) => (
                      <div key={i} className="bg-[#111] border border-[#222] p-5 flex items-start gap-4"><span className="text-base mt-0.5">{g.icon}</span><div><div className="text-[13px] tracking-[2px] uppercase text-white font-arial font-semibold">{g.title}</div><div className="text-xs text-[#666] mt-1">{g.desc}</div></div></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="bg-[#111] border border-[#222] p-8 mb-5">
                    <div className="text-[9px] tracking-[3px] text-[#555] font-arial mb-5">STUDIO INFO</div>
                    <div className="border-b border-[#1a1a1a] py-4"><div className="flex items-center gap-2 text-[9px] tracking-[3px] uppercase text-[#555] font-arial mb-1.5"><span className="w-2 h-2 rounded-full bg-[#8b1a2e]"></span>ZAŁOŻONA</div><div className="text-lg text-white font-arial">2026</div></div>
                    <div className="border-b border-[#1a1a1a] py-4"><div className="flex items-center gap-2 text-[9px] tracking-[3px] uppercase text-[#555] font-arial mb-1.5"><span className="w-2 h-2 rounded-full bg-[#b8680a]"></span>SIEDZIBA</div><div className="text-lg text-white font-arial">Cypr (Cyprus)</div></div>
                    <div className="py-4"><div className="flex items-center gap-2 text-[9px] tracking-[3px] uppercase text-[#555] font-arial mb-1.5"><span className="w-2 h-2 rounded-full bg-[#1a6b2e]"></span>STATUS</div><div className="text-lg text-white font-arial">Operational</div></div>
                  </div>
                  <div className="bg-[#1a0810] border border-[#3a1020] p-8">
                    <div className="text-[10px] tracking-[3px] text-[var(--crimson)] font-arial mb-3">WIZJA 2026+</div>
                    <div className="text-[13px] text-[#ccc] leading-7">Chcemy być studio, które zmienia życia poprzez wolność finansową. Każdy twórca z nami osiąga więcej niż zarabia – osiąga bezpieczeństwo, wsparcie i szacunek.</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PRIORITIES */}
          <section id="priorities" className="py-24 px-10 bg-[#080808]">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center justify-center gap-4 text-[var(--gold)] text-[10px] tracking-[4px] font-arial mb-10"><span className="w-[30px] h-px bg-[var(--gold)]"></span>PRIORYTETY<span className="w-[30px] h-px bg-[var(--gold)]"></span></div>
              <h2 className="text-[clamp(32px,5vw,60px)] font-normal text-center text-white font-georgia mb-5">To Nas <em className="italic text-[var(--gold)]">Definiuje</em></h2>
              <p className="text-center text-sm text-[#777] max-w-xl mx-auto mb-16 leading-7">W Studio HRL Adult mamy jasne priorytety. Wszystko, co robimy, wynika z tych pięciu filarów strategicznych.</p>
              <div className="grid grid-cols-5 gap-4">
                {[{ num: '#1', icon: '🔒', title: 'DYSKRECJA', desc: 'Prywatność twoja to numer jeden. Zero kompromisów w kwestii bezpieczeństwa danych i anonimowości.' }, { num: '#2', icon: '📋', title: 'TRANSPARENTNOŚĆ', desc: 'Jasne zasady współpracy nie zmieniają się. Co zarabiasz, to widzisz. Dokumentacja na każdym etapie.' }, { num: '#3', icon: '💎', title: 'JAKOŚĆ', desc: 'Każdy projekt musi być doskonały: 4K minimum, profesjonalna obsługa, perfekcja w każdym stopniu.' }, { num: '#4', icon: '📚', title: 'EDUKACJA', desc: 'Uczymy twórców business modelu, marketingu, regulacji prawnych – nie tylko produkcji.' }, { num: '#5', icon: '🚀', title: 'INNOWACJA', desc: 'VR, AI, blockchain, nowe platformy – zawsze na przeszkolu technologicznym branży.' }].map((p, i) => (
                  <div key={i} className="bg-[#111] border border-[#222] p-7 text-center">
                    <div className="text-[11px] text-[var(--gold)] tracking-[2px] font-arial mb-3">{p.num}</div>
                    <div className="text-xl mb-3">{p.icon}</div>
                    <div className="text-[10px] tracking-[3px] uppercase text-white font-arial font-semibold mb-2.5">{p.title}</div>
                    <div className="text-[11px] text-[#666] leading-relaxed">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* WHY US */}
          <section id="why" className="py-24 px-10">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center justify-center gap-4 text-[var(--gold)] text-[10px] tracking-[4px] font-arial mb-10"><span className="w-[30px] h-px bg-[var(--gold)]"></span>TWOJA DECYZJA<span className="w-[30px] h-px bg-[var(--gold)]"></span></div>
              <h2 className="text-[clamp(36px,5vw,64px)] font-normal text-center text-white font-georgia mb-5">Dlaczego Wybrać <em className="italic text-[var(--gold)]">Studio HRL Adult</em></h2>
              <p className="text-center text-[13px] text-[#777] italic mb-16">To nie jest pytanie &quot;dlaczego my?&quot; ale raczej &quot;co ci możemy dać co inni nie mogą?&quot;</p>
              <div className="grid grid-cols-2 gap-5">
                {[{ icon: '💰', title: 'FINANSOWE WSPARCIE', items: ['Nasz model gwarantuje maksymalny zwrot', 'Advance payments dostępne dla commitment partnerów', 'Bonus na performance (1M+ rocznie = premium split)', 'Bonus na referrale (+7% za każdego nowego twórcę)', 'Gwarantowany income floor przez pierwsze 90 dni'] }, { icon: '⚙️', title: 'WSPARCIE TECHNICZNE', items: ['Dostęp do naszych 4 profesjonalnych studiów 24/7', 'Dedykowany production director dla każdego projektu', 'Unlimited post-production hours (color, sound, edit)', 'Multi-platform export i optimization (28 platform)', 'Technical support 24/7 – zawsze dostępny monitor'] }, { icon: '📊', title: 'WSPARCIE BIZNESOWE', items: ['Strategia dystrybucji na wszystkie platformy', 'Marketing manager do promocji Twoich treści', 'Negocjacje z partnerami i sponsorami', 'Legal support w kwestii compliance i kontraktów', 'Quarterly business reviews i strategy sessions'] }, { icon: '🛡️', title: 'BEZPIECZEŃSTWO & DYSKRECJA', items: ['Full NDA + polityka zero dzielenia', 'Encrypted storage i geo-locked archive', 'Anonimowy branding option (jesli chcesz)', 'Usuwanie treści w każdej chwili bez konsekwencji', 'EU-GDPR compliant – Twoje dane to twoja, nie nasze'] }, { icon: '👩‍🏫', title: 'EDUKACJA & MENTORSTWO', items: ['Akademia HRL – kursy online (prywatne dla partnerów)', 'Monthly masterclasss z top cammerami', 'Networking events z innymi twórcami', '1-on-1 coaching sessions (8 godzin/Miesiac)', 'Access do exclusive industry reports i data'] }, { icon: '⭐', title: 'COMMUNITY & STATUS', items: ['VIP lounge access w każdych promotionach', 'Studio HRL badge na profilach (prestige)', 'Featured status na naszej stronie (top kamery)', 'Networking z najlepszymi twórcami Europy', 'Invitation-only events i partie premium'] }].map((w, i) => (
                  <div key={i} className="bg-[#111] border border-[#1e1e1e] p-9">
                    <div className="text-xl mb-4">{w.icon}</div>
                    <div className="text-[11px] tracking-[3px] uppercase text-white font-arial font-semibold mb-5 pb-4 border-b border-[#1e1e1e]">{w.title}</div>
                    <ul className="flex flex-col gap-2.5">
                      {w.items.map((item, j) => (
                        <li key={j} className="text-xs text-[#888] leading-relaxed flex gap-2.5 items-start"><span className="text-[var(--gold)] text-[11px] mt-0.5">✓</span>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PLATFORMS */}
          <section id="platforms" className="py-24 px-10 bg-[#080808]">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center gap-4 text-[var(--gold)] text-[10px] tracking-[4px] font-arial mb-10"><span className="w-[30px] h-px bg-[var(--gold)]"></span>ZASIĘG DYSTRYBUCJI</div>
              <h2 className="text-[clamp(36px,5vw,64px)] font-normal leading-tight text-white font-georgia mb-5">Twoje treści na<br /><em className="italic text-[var(--gold)]">Najlepszych Platformach</em></h2>
              <p className="text-sm text-[#888] max-w-md leading-7 mb-16">Zajmujemy się pełną konfiguracją, zarządzaniem i promocją Twoich profili na wiodących platformach adult na świecie. Najedź kursorem na kartę, aby zobaczyć szczegóły platformy.</p>
              
              {/* Live Cam */}
              <div className="text-[15px] italic text-[var(--gold)] my-10">Live Cam</div>
              <div className="grid grid-cols-4 gap-3 mb-8">
                {[{ name: 'Chaturbate', tag: '#1 ŚWIAT', short: 'Największa platforma live cam na świecie.', details: ['Ponad 6 mln unikalnych widzów dziennie', 'Prowizja do 80% dla modeli z token tips', 'Automatyczne linki afiliacyjne i fanclub', 'Funkcja Spy Shows i Private Shows', 'Płatności co tydzień lub dwa razy w miesiącu'] }, { name: 'MyFreeCams', tag: '#2 ŚWIAT', short: 'Lojalna społeczność, wysoki payout.', details: ['Stała baza lojalnych widzów premium', 'System Miss MFC – ranking i bonusy', 'Wysoki payout: do 60% netto', 'Własny player i strona profilu', 'Platforma tylko dla kobiet'] }, { name: 'LiveJasmin', tag: 'PREMIUM', short: 'Najwyższe stawki w private shows.', details: ['Najbardziej premium platforma live cam', 'Private show od $2.99/min – wyższe stawki', 'Wyselekcjonowani, płacący widzowie', 'Profesjonalne wsparcie i dedykowany manager', 'Certyfikat jakości studia HRL'] }, { name: 'StripChat', tag: 'VR LEADER', short: 'Fan Club, VR shows, do 80% prowizji.', details: ['Lider technologii VR w live cam', 'Fan Club z miesięczną subskrypcją', 'Ultra HD i VR stream 180°', 'Do 80% prowizji dla top modeli', 'Silny algorytm organiczny dla nowych modeli'] }].map((p, i) => (
                  <div key={i} className="h-[180px] perspective-[1000px] cursor-pointer group">
                    <div className="relative w-full h-full transition-transform duration-[550ms] transform-style-preserve-3d group-hover:rotate-y-180">
                      <div className="absolute inset-0 bg-[#0d0d0d] border border-[#222] p-5 flex flex-col justify-center items-center text-center backface-hidden">
                        <div className="text-[15px] text-white mb-1.5 font-georgia">{p.name}</div>
                        <div className="text-[8px] tracking-[3px] uppercase text-[var(--gold)] font-arial mb-2.5">{p.tag}</div>
                        <div className="text-[11px] text-[#666] leading-relaxed">{p.short}</div>
                        <div className="text-[9px] text-[#444] tracking-wider font-arial mt-auto italic">najedź aby zobaczyć więcej</div>
                      </div>
                      <div className="absolute inset-0 bg-[#140a10] border border-[#3a1520] p-5 flex flex-col justify-start rotate-y-180 backface-hidden">
                        <div className="text-[12px] text-[var(--gold)] tracking-wider font-arial font-semibold mb-2.5 pb-2 border-b border-[#2a1020]">{p.name.toUpperCase()}</div>
                        <ul className="text-[11px] text-[#aaa] leading-relaxed">
                          {p.details.map((d, j) => (<li key={j} className="mb-1 pl-3 relative before:content-['›'] before:absolute before:left-0 before:text-[var(--gold)]">{d}</li>))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* GALLERY */}
          <section id="portfolio" className="pt-16 pb-24 px-10">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center justify-center gap-4 text-[var(--gold)] text-[10px] tracking-[4px] font-arial mb-10"><span className="w-[30px] h-px bg-[var(--gold)]"></span>NASZE PRODUKCJE<span className="w-[30px] h-px bg-[var(--gold)]"></span></div>
              <h2 className="text-[clamp(28px,4vw,52px)] tracking-[4px] uppercase text-center text-white font-georgia mb-5">SPACES CRAFTED FOR<br /><em className="italic text-[var(--gold)]">EXCELLENCE</em></h2>
              <p className="text-center text-[#555] text-xs italic mb-12 tracking-wider">← Podmień src na własne pliki →</p>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <div key={n} className={`relative cursor-pointer overflow-hidden bg-[#111] rounded-sm ${n === 1 || n === 5 ? 'col-span-2 aspect-video' : 'aspect-square'}`} onClick={() => n === 1 || n === 5 ? playVideo(`vid${n === 1 ? 1 : 2}`) : null}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(45deg,#0d0d0d_0px,#0d0d0d_10px,#111_10px,#111_20px)] border-2 border-dashed border-[#2a2a2a] z-[2]">
                      <div className="text-[28px] opacity-50">{n === 1 || n === 5 ? '▶' : '📷'}</div>
                      <div className="text-[11px] tracking-[3px] text-[var(--gold)] font-arial opacity-70">{n === 1 || n === 5 ? `WIDEO ${n === 1 ? 1 : 2}` : `ZDJĘCIE ${n === 5 ? 5 : n}`}</div>
                    </div>
                    {activeVideo === `vid${n === 1 ? 1 : 2}` && (n === 1 || n === 5) && <video id={`vid${n === 1 ? 1 : 2}-src`} src={`/video${n === 1 ? 1 : 2}.mp4`} controls className="absolute inset-0 w-full h-full object-cover z-10" />}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PROCESS & SECURITY */}
          <section id="casting" className="py-24 px-10 bg-[#080808]">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center gap-4 text-[var(--gold)] text-[10px] tracking-[4px] font-arial mb-10"><span className="w-[30px] h-px bg-[var(--gold)]"></span>JAK TO DZIAŁA</div>
              <h2 className="text-[clamp(36px,5vw,64px)] font-normal leading-tight text-white font-georgia mb-10">Prosta droga do<br /><em className="italic text-[var(--gold)]">Profesjonalizmu</em></h2>
              <div className="flex justify-between gap-5 my-16">
                {[{ num: '01', title: 'CASTING', desc: 'Wypełniasz formularz i przechodzisz weryfikację wstępną.' }, { num: '02', title: 'ONBOARDING', desc: 'Podpisujemy umowę i ustalamy strategię Twoim nawozu.' }, { num: '03', title: 'PRODUKCJA', desc: 'Realizujemy pierwsze sesje fotograficzo w naszych studiach.' }, { num: '04', title: 'DYSTRYBUCJA', desc: 'Uruchamiamy i konfigurujemy Twoje profile na platformach.' }, { num: '05', title: 'SKALOWANIE', desc: 'Zarządzamy systemem, marketingiem i optymalizujemy zyski.' }].map((s, i) => (
                  <div key={i} className="text-center flex-1">
                    <div className="w-16 h-16 rounded-full border border-[#333] flex items-center justify-center mx-auto mb-4 text-[13px] text-[#666] font-georgia">{s.num}</div>
                    <div className="text-[9px] tracking-[3px] uppercase text-white font-arial font-semibold mb-2">{s.title}</div>
                    <div className="text-[11px] text-[#666] leading-relaxed">{s.desc}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4 text-[var(--gold)] text-[10px] tracking-[4px] font-arial mb-10 mt-20"><span className="w-[30px] h-px bg-[var(--gold)]"></span>BEZPIECZEŃSTWO I PRAWO</div>
              <div className="grid grid-cols-2 gap-16 items-start mt-20">
                <div>
                  <h2 className="text-[clamp(36px,5vw,64px)] font-normal leading-tight text-white font-georgia mb-5">Twoja Ochrona jest<br /><em className="italic text-[var(--gold)]">Naszym Priorytetem</em></h2>
                  <p className="text-sm text-[#888] leading-7 max-w-md mb-5">Rozumiemy specyfikę branży adult i wyzwania, przed którymi stają twórcy. Naszym celem jest stworzenie środowiska, w którym możesz skupić się wyłącznie na swojej sztuce.</p>
                  <div className="flex flex-col gap-3 mt-5">
                    <div className="bg-[#111] border border-[#1e1e1e] px-5 py-4 flex gap-3 items-center text-xs text-[#888]"><span className="text-sm">🔒</span>Systemy szyfrowania danych i najwyższe standardy cyberbezpieczeństwa.</div>
                    <div className="bg-[#111] border border-[#1e1e1e] px-5 py-4 flex gap-3 items-center text-xs text-[#888]"><span className="text-sm">⚖️</span>Jasne warunki finansowe i wypłaty realizowane zawsze terminowo.</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[{ title: 'Dyskrecja i Anonimowość', text: 'Zapewniamy pełną ochronę wizerunku przez zaawansowane narzędzia do geoblokowania.' }, { title: 'Zgodność Prawna (2257)', text: 'Pełna legalność współpracy. Przejrzyste umowy, weryfikacja wieku zgodnie z 18 U.S.C. § 2257.' }, { title: 'Bezpieczeństwo Fizyczne', text: 'Studia znajdują się w chronionych, monitorowanych budynkach. Własne systemy i personel medyczny.' }, { title: 'Opieka Psychologiczna', text: 'Dostęp do profesjonalnego wsparcia, coachingu i części mentorskiej na każdym etapie.' }].map((c, i) => (
                    <div key={i} className="bg-[#111] border border-[#1e1e1e] p-6"><div className="text-sm text-[var(--gold)] mb-2.5 font-georgia">{c.title}</div><div className="text-xs text-[#777] leading-relaxed">{c.text}</div></div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CASTING CTA BANNER */}
          <section className="py-20 px-10">
            <div className="max-w-[1200px] mx-auto">
              <div className="relative bg-gradient-to-br from-[#110008] via-[#1a0010] to-[#0a0a0a] border border-[#3a1525] overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
                <div className="absolute -right-24 -top-24 w-96 h-96 bg-[var(--crimson)] opacity-[0.06] rounded-full blur-3xl" />
                <div className="relative z-10 grid grid-cols-[1fr_auto] items-center gap-12 p-16">
                  <div>
                    <div className="flex items-center gap-3 text-[var(--gold)] text-[9px] tracking-[4px] font-arial mb-5">
                      <span className="w-6 h-px bg-[var(--gold)]" />APLIKUJ DO STUDIA
                    </div>
                    <h2 className="font-georgia text-[clamp(32px,4vw,56px)] font-normal text-white leading-[1.1] mb-4">
                      Zostań Partnerką<br />
                      <em className="italic text-[var(--gold)]">Studio HRL Adult</em>
                    </h2>
                    <p className="text-sm text-[#888] leading-7 max-w-xl mb-8">
                      Pracuj ze studiem, które daje Ci 60% przychodów, profesjonalny sprzęt 4K, kompleksowy marketing i prawną ochronę wizerunku. Otwarte casting — aplikuj online już dziś.
                    </p>
                    <div className="flex flex-wrap gap-6 mb-10">
                      {[
                        { ico: '💰', val: '60%', label: 'Twoje przychody' },
                        { ico: '🎥', val: stats?.experience || '4K', label: stats?.experienceLabel || 'Produkcja' },
                        { ico: '🌍', val: stats?.models || '5+', label: stats?.modelsLabel || 'Platform' },
                        { ico: '⚖️', val: stats?.content || '2K+', label: stats?.contentLabel || 'Legalnie' },
                      ].map((s) => (
                        <div key={s.val} className="text-center">
                          <div className="text-2xl mb-1">{s.ico}</div>
                          <div className="text-[var(--gold)] font-georgia text-2xl font-bold">{s.val}</div>
                          <div className="text-[#666] text-[9px] tracking-[2px] uppercase font-arial">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Link href="/casting" className="no-underline bg-[var(--crimson-btn)] text-white px-10 py-4 text-[10px] tracking-[3px] uppercase font-arial font-semibold hover:bg-[#b0243c] transition-colors inline-block">APLIKUJ NA CASTING →</Link>
                      <Link href="/academy" className="no-underline border border-[#333] text-[#888] px-10 py-4 text-[10px] tracking-[3px] uppercase font-arial hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all inline-block">POZNAJ AKADEMIĘ</Link>
                    </div>
                  </div>
                  <div className="min-w-[200px] space-y-4">
                    {[{ n: '01', t: 'Formularz online' }, { n: '02', t: 'Weryfikacja wstępna' }, { n: '03', t: 'Rozmowa z managerem' }, { n: '04', t: 'Umowa & onboarding' }, { n: '05', t: 'Start & zarobki' }].map((step) => (
                      <div key={step.n} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-[11px] text-[#555] font-georgia flex-shrink-0">{step.n}</div>
                        <div className="text-[11px] text-[#777] font-arial tracking-wide">{step.t}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* COUNTERS */}
          <div className="bg-[#0a0a0a] py-20 px-10 grid grid-cols-4 gap-0 text-center border-t border-b border-[#1a1a1a]">
            {[{ num: '18+', label: 'ADULT VERIFY' }, { num: '4K', label: 'PRODUCTION' }, { num: 'Premium', label: 'PARTNERSHIP', italic: true }, { num: '24/7', label: 'SUPPORT' }].map((c, i) => (
              <div key={i} className="border-r border-[#1a1a1a] last:border-r-0">
                <div className={`text-[40px] text-[var(--gold)] font-georgia ${c.italic ? 'italic' : ''}`}>{c.num}</div>
                <div className="text-[9px] tracking-[3px] uppercase text-[#555] font-arial mt-2">{c.label}</div>
              </div>
            ))}
          </div>

          {/* CONTACT SECTION */}
          <section id="contact" className="py-24 px-10 bg-[#080808]">
            <div className="max-w-[1200px] mx-auto">
              <div className="flex items-center justify-center gap-4 text-[var(--gold)] text-[10px] tracking-[4px] font-arial mb-10"><span className="w-[30px] h-px bg-[var(--gold)]"></span>KONTAKT<span className="w-[30px] h-px bg-[var(--gold)]"></span></div>
              <h2 className="text-[clamp(36px,5vw,64px)] font-normal text-center text-white font-georgia mb-5">Skontaktuj Się <em className="italic text-[var(--gold)]">Z Nami</em></h2>
              <p className="text-center text-[13px] text-[#777] italic mb-16 max-w-lg mx-auto">Masz pytania? Chcesz dołączyć do naszego studia? Wypełnij formularz lub skontaktuj się bezpośrednio.</p>
              <div className="grid grid-cols-2 gap-16">
                <div>
                  <h3 className="text-xl text-white mb-6 font-georgia">Formularz Kontaktowy</h3>
                  <form className="flex flex-col gap-4">
                    <input type="text" placeholder="Imię i Nazwisko" className="bg-[#111] border border-[#222] px-5 py-3.5 text-sm text-white font-arial outline-none focus:border-[var(--gold)] transition-colors" />
                    <input type="email" placeholder="Email" className="bg-[#111] border border-[#222] px-5 py-3.5 text-sm text-white font-arial outline-none focus:border-[var(--gold)] transition-colors" />
                    <input type="tel" placeholder="Telefon (opcjonalnie)" className="bg-[#111] border border-[#222] px-5 py-3.5 text-sm text-white font-arial outline-none focus:border-[var(--gold)] transition-colors" />
                    <select className="bg-[#111] border border-[#222] px-5 py-3.5 text-sm text-[#888] font-arial outline-none focus:border-[var(--gold)] transition-colors">
                      <option>Interesuje mnie...</option>
                      <option>Casting / Dołączenie do studia</option>
                      <option>Współpraca partnerska</option>
                      <option>Produkcja treści</option>
                      <option>Inne zapytanie</option>
                    </select>
                    <textarea placeholder="Twoja wiadomość..." rows={5} className="bg-[#111] border border-[#222] px-5 py-3.5 text-sm text-white font-arial outline-none focus:border-[var(--gold)] transition-colors resize-none"></textarea>
                    <button type="submit" className="bg-[var(--crimson-btn)] border-none text-white px-8 py-4 text-[11px] tracking-[3px] uppercase font-arial font-semibold cursor-pointer hover:bg-[#b0243c] transition-colors mt-2">WYŚLIJ WIADOMOŚĆ</button>
                  </form>
                </div>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl text-white mb-4 font-georgia">Dane Kontaktowe</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4"><span className="text-[var(--gold)] text-lg">📍</span><div><div className="text-xs text-[#666] uppercase tracking-wider mb-1">Siedziba</div><div className="text-sm text-[#ccc]">Cypr (Cyprus)</div></div></div>
                      <div className="flex items-start gap-4"><span className="text-[var(--gold)] text-lg">📧</span><div><div className="text-xs text-[#666] uppercase tracking-wider mb-1">Email</div><div className="text-sm text-[#ccc]">hrl-adult-studio@hardbanrecordslab.online</div></div></div>
                      <div className="flex items-start gap-4">
                        <span className="text-[var(--gold)] text-lg">💬</span>
                        <div>
                          <div className="text-xs text-[#666] uppercase tracking-wider mb-1">WhatsApp</div>
                          <a href="https://wa.me/48725663741" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ccc] hover:text-[var(--gold)] transition-colors flex items-center gap-2">
                             Napisz do nas
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-4 font-georgia">Godziny Pracy</h3>
                    <div className="space-y-2 text-sm text-[#888]">
                      <div className="flex justify-between"><span>Poniedziałek - Piątek:</span><span className="text-[#ccc]">9:00 - 18:00</span></div>
                      <div className="flex justify-between"><span>Sobota:</span><span className="text-[#ccc]">10:00 - 14:00</span></div>
                      <div className="flex justify-between"><span>Niedziela:</span><span className="text-[#ccc]">Zamknięte</span></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-4 font-georgia">Social Media</h3>
                    <div className="flex gap-3">
                      {['Twitter/X', 'Instagram', 'Telegram'].map((s, i) => (<div key={i} className="px-4 py-2 border border-[#333] text-[10px] text-[#888] font-arial tracking-wider cursor-pointer hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all">{s}</div>))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="bg-[#050505] py-16 px-10 pb-8 border-t border-[#1a1a1a]">
            <div className="grid grid-cols-[2fr_1.5fr_1.5fr_2fr] gap-16 mb-16">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <img 
                    src="/logo/studio hrl adultbezła logo.png" 
                    alt="Studio HRL Adult Logo" 
                    className="h-9 w-auto object-contain"
                  />
                  <span className="text-xs tracking-[2px] text-white font-arial">HRL ADULT</span>
                </div>
                <p className="text-xs text-[#555] leading-relaxed max-w-[220px] mb-5 italic">Poland&apos;s foremost platform for independent adult production and distribution. Defined by quality, driven by success.</p>
                <div className="flex gap-2">
                  {['X', 'IG', 'TG'].map((s, i) => (<div key={i} className="w-8 h-8 border border-[#333] flex items-center justify-center text-[10px] text-[#777] font-arial cursor-pointer hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all">{s}</div>))}
                </div>
              </div>
              <div>
                <div className="text-[9px] tracking-[3px] uppercase text-[var(--text-muted)] font-arial mb-5">QUICK LINKS</div>
                <ul className="flex flex-col gap-2.5 list-none">
                  {['HOME', 'ABOUT US', 'STUDIOS', 'ACADEMY', 'CASTING'].map((l, i) => (<li key={i}><Link href={i === 0 ? '/' : i === 1 ? '#about' : i === 2 ? '#portfolio' : i === 3 ? '/academy' : '#casting'} className="no-underline text-[#666] text-xs font-arial tracking-wider hover:text-[var(--gold)] transition-colors">{l}</Link></li>))}
                </ul>
              </div>
              <div>
                <div className="text-[9px] tracking-[3px] uppercase text-[var(--text-muted)] font-arial mb-5">LEGAL</div>
                <ul className="flex flex-col gap-2.5 list-none">
                  {['PRIVACY POLICY', 'TERMS OF SERVICE', 'RODO / GDPR', 'UMOWA Z TWÓRCĄ'].map((l, i) => (<li key={i}><Link href="#" className="no-underline text-[#666] text-xs font-arial tracking-wider hover:text-[var(--gold)] transition-colors">{l}</Link></li>))}
                </ul>
              </div>
              <div>
                <div className="text-[9px] tracking-[3px] uppercase text-[var(--text-muted)] font-arial mb-5">PARTNER WITH US</div>
                <p className="text-xs text-[#555] leading-relaxed mb-3">Stay updated with our latest membership plans and production news.</p>
                <div className="flex mt-3">
                  <input type="email" placeholder="YOUR EMAIL" className="flex-1 bg-[#111] border border-[#222] border-r-0 px-3.5 py-2.5 text-[11px] text-[#ccc] font-arial outline-none placeholder:text-[#444]" />
                  <button className="bg-transparent border border-[#222] px-4 py-2.5 text-[10px] tracking-[2px] text-[var(--gold)] font-arial cursor-pointer">SEND</button>
                </div>
              </div>
            </div>
            <div className="border-t border-[#1a1a1a] pt-6 flex justify-between items-center">
              <span className="text-[11px] text-[#444] font-arial">© 2026 STUDIO HRL ADULT. ALL RIGHTS RESERVED.</span>
              <div className="flex gap-5">
                <span className="text-[9px] tracking-[3px] uppercase text-[var(--crimson)] border border-[var(--crimson)] px-2.5 py-1">18+ ONLY</span>
                <span className="text-[9px] tracking-[3px] uppercase text-[#444] font-arial">——— DESIGNED FOR EXCELLENCE</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default HomePage;
