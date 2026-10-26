import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLocale, useMessages } from '@/i18n';
import { common } from '@/i18n/common';
import { home } from '@/i18n/home';
import { homePlatforms, PlatformCardData } from '@/i18n/homePlatforms';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

const navLinkClass = 'no-underline text-[#ccc] text-xs tracking-[2px] font-arial hover:text-white transition-colors';
const sectionTagClass = 'flex items-center gap-4 text-[var(--gold)] text-[10px] tracking-[4px] font-arial mb-10';
const centeredSectionTagClass = `justify-center ${sectionTagClass}`;
const inputClass = 'bg-[#111] border border-[#222] px-5 py-3.5 text-sm text-white font-arial outline-none focus:border-[var(--gold)] transition-colors';
const footerLinkClass = 'no-underline text-[#666] text-xs font-arial tracking-wider hover:text-[var(--gold)] transition-colors';

const PlatformFlipCard: React.FC<{ platform: PlatformCardData; hint: string; large?: boolean }> = ({ platform: p, hint, large = false }) => (
  <div className={`${large ? 'h-[180px]' : 'h-[160px]'} perspective-[1000px] cursor-pointer group`}>
    <div className="relative w-full h-full transition-transform duration-[550ms] transform-style-preserve-3d group-hover:rotate-y-180">
      <div className={`absolute inset-0 bg-[#0d0d0d] border border-[#222] ${large ? 'p-5' : 'p-3'} flex flex-col justify-center items-center text-center backface-hidden`}>
        <div className={`${large ? 'text-[15px] mb-1.5' : 'text-[13px] mb-0.5'} text-white font-georgia`}>{p.name}</div>
        <div className={`${large ? 'text-[8px] tracking-[3px] mb-2.5' : 'text-[7px] tracking-[2px] mb-1.5'} uppercase text-[var(--gold)] font-arial`}>{p.tag}</div>
        <div className={`${large ? 'text-[11px]' : 'text-[10px]'} text-[#666] leading-relaxed`}>{p.short}</div>
        <div className={`${large ? 'text-[9px]' : 'text-[7px]'} text-[#444] tracking-wider font-arial mt-auto italic`}>{hint}</div>
      </div>
      <div className={`absolute inset-0 bg-[#140a10] border border-[#3a1520] ${large ? 'p-5' : 'p-3'} flex flex-col justify-start rotate-y-180 backface-hidden overflow-y-auto`}>
        <div className={`${large ? 'text-[12px] mb-2.5 pb-2' : 'text-[10px] mb-1.5 pb-1'} text-[var(--gold)] tracking-wider font-arial font-semibold border-b border-[#2a1020]`}>{p.name.toUpperCase()}</div>
        <ul className={`${large ? 'text-[11px]' : 'text-[9px]'} text-[#aaa] leading-relaxed`}>
          {p.details.map((d, j) => (
            <li key={j} className={`${large ? 'mb-1 pl-3' : 'mb-0.5 pl-2.5'} relative before:content-['›'] before:absolute before:left-0 before:text-[var(--gold)]`}>{d}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const HomePage: React.FC = () => {
  const locale = useLocale();
  const t = useMessages(home);
  const { nav, footer } = useMessages(common);
  const platforms = useMessages(homePlatforms);

  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const [stats, setStats] = useState<any>(null);

  const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', topic: '', message: '' });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactForm, locale }),
      });
      if (res.ok) {
        setContactStatus('sent');
        setContactForm({ name: '', email: '', phone: '', topic: '', message: '' });
        setTimeout(() => setContactStatus('idle'), 5000);
      } else {
        setContactStatus('error');
      }
    } catch {
      setContactStatus('error');
    }
  };

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

  const platformGroups = [
    { title: t.platforms.live, items: platforms.liveCam, cols: 'grid-cols-4', large: true },
    { title: t.platforms.sub, items: platforms.subscription, cols: 'grid-cols-5', large: false },
    { title: t.platforms.tube, items: platforms.tube, cols: 'grid-cols-4', large: false },
    { title: t.platforms.marketing, items: platforms.marketing, cols: 'grid-cols-5', large: false },
  ];

  const bannerStats = [
    { ico: '💰', val: '60%', label: t.castingBanner.statLabels.revenue },
    { ico: '🎥', val: stats?.experience || '4K', label: t.castingBanner.statLabels.production },
    { ico: '🌍', val: stats?.models || '5+', label: t.castingBanner.statLabels.creators },
    { ico: '⚖️', val: stats?.content || '2K+', label: t.castingBanner.statLabels.content },
  ];

  const topNavLinks = [
    { label: nav.home, href: '#hero' },
    { label: nav.about, href: '#about' },
    { label: nav.contact, href: '#contact' },
    { label: nav.casting, href: '#casting' },
    { label: nav.academy, href: '/academy' },
    { label: nav.portfolio, href: '/portfolio' },
  ];

  const footerQuickLinks = [
    { label: footer.quickLinkItems.home, href: '/' },
    { label: footer.quickLinkItems.about, href: '#about' },
    { label: footer.quickLinkItems.studios, href: '#portfolio' },
    { label: footer.quickLinkItems.academy, href: '/academy' },
    { label: footer.quickLinkItems.casting, href: '#casting' },
  ];

  const footerLegalLinks = [
    { label: footer.legalItems.privacy, href: '/privacy' },
    { label: footer.legalItems.terms, href: '/regulamin' },
    { label: footer.legalItems.gdpr, href: '/rodo' },
    { label: footer.legalItems.creatorAgreement, href: '/umowa-tworca' },
  ];

  const up = (text: string) => text.toLocaleUpperCase(locale);

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
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
            {topNavLinks.map((link) => (
              <li key={link.href}><Link href={link.href} className={navLinkClass}>{up(link.label)}</Link></li>
            ))}
          </ul>
          <div className="flex gap-3 items-center">
            <LanguageSwitcher />
            <Link href="/admin">
              <button className="bg-transparent border border-[#444] text-[#ccc] px-5 py-2 text-xs tracking-[2px] font-arial cursor-pointer hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all">{up(nav.admin)}</button>
            </Link>
            <Link href="/casting">
              <button className="bg-[var(--crimson-btn)] border-none text-white px-6 py-2.5 text-xs tracking-[2px] font-arial font-semibold cursor-pointer hover:bg-[#b0243c] transition-colors">{up(nav.joinNow)}</button>
            </Link>
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
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="max-w-md text-sm text-[#888] leading-7 italic mb-12">{t.hero.text}</motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="mt-16 flex justify-center"><div className="w-2.5 h-2.5 rounded-full bg-[var(--crimson)] animate-bounce"></div></motion.div>
          </section>

          {/* STATS */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="bg-[#0d0d0d] py-16 px-10 grid grid-cols-4 gap-0 border-t border-[#1a1a1a]">
            {t.stats.map((stat, i) => (
              <div key={i} className="text-center border-r border-[#1a1a1a] last:border-r-0 py-5">
                <div className="text-[52px] text-[var(--gold)] font-georgia leading-none">{stat.num}</div>
                <div className="text-[10px] tracking-[3px] text-[var(--gold)] mt-2 font-arial">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* ABOUT */}
          <section id="about" className="py-24 px-10">
            <div className="max-w-[1200px] mx-auto">
              <div className={sectionTagClass}><span className="w-[30px] h-px bg-[var(--gold)]"></span>{t.about.tag}</div>
              <div className="grid grid-cols-2 gap-20 items-start">
                <div className="space-y-5">
                  <h2 className="text-[clamp(36px,5vw,64px)] font-normal leading-tight text-white font-georgia">{t.about.titleA}<br /><em className="italic text-[var(--gold)]">{t.about.titleB}</em></h2>
                  {t.about.paragraphs.map((text, i) => (
                    <p key={i} className="text-sm text-[#888] leading-7">{text}</p>
                  ))}
                </div>
                <div className="bg-[#111] border border-[#222] rounded min-h-[400px] flex flex-col items-center justify-center gap-5">
                  <div className="text-5xl">🏛️</div><div className="w-3 h-3 bg-[var(--crimson)] rounded-full"></div>
                  <div className="text-xl text-[var(--gold)] italic text-center px-8 leading-normal">&quot;{t.about.quote}&quot;</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-px mt-16 bg-[#1a1a1a]">
                {t.about.cards.map((m, i) => (
                  <div key={i} className="bg-[#111] p-10"><div className="text-2xl mb-4">{m.icon}</div><div className="text-lg italic text-[var(--gold)] mb-3">{m.title}</div><div className="text-[13px] text-[#888] leading-7">{m.text}</div></div>
                ))}
              </div>
            </div>
          </section>

          {/* PHILOSOPHY */}
          <section id="philosophy" className="py-24 px-10 bg-[#080808]">
            <div className="max-w-[1200px] mx-auto">
              <div className={sectionTagClass}><span className="w-[30px] h-px bg-[var(--gold)]"></span>{t.philosophy.tag}</div>
              <h2 className="text-[clamp(28px,4vw,52px)] tracking-[4px] uppercase font-normal text-center mb-16 font-georgia">{t.philosophy.titleA}<br /><em className="italic text-[var(--gold)]">{t.philosophy.titleB}</em></h2>
              <div className="grid grid-cols-2 gap-20 items-start">
                <div>
                  <blockquote className="text-base italic text-[#ccc] leading-7 border-l-2 border-[var(--gold)] pl-6 my-10">&quot;{t.philosophy.quote}&quot;</blockquote>
                  <p className="text-sm text-[#888] leading-7 mb-5">{t.philosophy.intro}</p>
                  <div className="grid grid-cols-2 gap-8 mt-10">
                    {t.philosophy.pillars.map((p, i) => (
                      <div key={i}><div className="text-[13px] text-[var(--gold)] tracking-[2px] font-arial mb-1.5">{p.num}</div><div className="text-[11px] tracking-[3px] uppercase text-white font-arial font-semibold mb-2">{p.title}</div><div className="text-xs text-[#666] leading-relaxed">{p.desc}</div></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="bg-[#111] border border-[#222] p-8">
                    <div className="text-[9px] tracking-[3px] text-[#555] font-arial mb-4">{t.philosophy.approachLabel}</div>
                    <div className="text-[13px] text-[#ccc] leading-7 mb-4">{t.philosophy.approach[0]}</div>
                    <div className="text-[13px] text-[#ccc] leading-7">{t.philosophy.approach[1]}</div>
                  </div>
                  <div className="bg-[#1a0810] border border-[#3a1020] p-8">
                    <div className="text-[10px] tracking-[3px] text-[var(--crimson)] font-arial mb-3">{t.philosophy.promiseLabel}</div>
                    <div className="text-[13px] text-[#ccc] leading-7">{t.philosophy.promise}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {t.philosophy.values.map((v, i) => (
                      <div key={i} className="bg-[#0d0d0d] border border-[#1a1a1a] p-5">
                        <div className="text-lg mb-2">{v.icon}</div>
                        <div className="text-[10px] tracking-[2px] uppercase text-white font-arial font-semibold mb-1.5">{v.title}</div>
                        <div className="text-[11px] text-[#666] leading-relaxed">{v.desc}</div>
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
              <div className={sectionTagClass}><span className="w-[30px] h-px bg-[var(--gold)]"></span>{t.goals.tag}</div>
              <div className="grid grid-cols-2 gap-16">
                <div>
                  <h2 className="text-[clamp(36px,5vw,64px)] font-normal leading-tight text-white font-georgia mb-5">{t.goals.titleA} <em className="italic text-[var(--gold)]">{t.goals.titleB}</em></h2>
                  <p className="text-sm text-[#888] leading-7 mb-5">{t.goals.paragraphs[0]}</p>
                  <p className="text-sm text-[#888] leading-7 mb-5">{t.goals.paragraphs[1]}</p>
                  <div className="flex flex-col gap-3 mt-10">
                    {t.goals.items.map((g, i) => (
                      <div key={i} className="bg-[#111] border border-[#222] p-5 flex items-start gap-4"><span className="text-base mt-0.5">{g.icon}</span><div><div className="text-[13px] tracking-[2px] uppercase text-white font-arial font-semibold">{g.title}</div><div className="text-xs text-[#666] mt-1">{g.desc}</div></div></div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="bg-[#111] border border-[#222] p-8 mb-5">
                    <div className="text-[9px] tracking-[3px] text-[#555] font-arial mb-5">{t.goals.infoLabel}</div>
                    <div className="border-b border-[#1a1a1a] py-4"><div className="flex items-center gap-2 text-[9px] tracking-[3px] uppercase text-[#555] font-arial mb-1.5"><span className="w-2 h-2 rounded-full bg-[#8b1a2e]"></span>{t.goals.founded}</div><div className="text-lg text-white font-arial">{t.goals.foundedValue}</div></div>
                    <div className="border-b border-[#1a1a1a] py-4"><div className="flex items-center gap-2 text-[9px] tracking-[3px] uppercase text-[#555] font-arial mb-1.5"><span className="w-2 h-2 rounded-full bg-[#b8680a]"></span>{t.goals.hq}</div><div className="text-lg text-white font-arial">{t.goals.hqValue}</div></div>
                    <div className="py-4"><div className="flex items-center gap-2 text-[9px] tracking-[3px] uppercase text-[#555] font-arial mb-1.5"><span className="w-2 h-2 rounded-full bg-[#1a6b2e]"></span>{t.goals.status}</div><div className="text-lg text-white font-arial">{t.goals.statusValue}</div></div>
                  </div>
                  <div className="bg-[#1a0810] border border-[#3a1020] p-8">
                    <div className="text-[10px] tracking-[3px] text-[var(--crimson)] font-arial mb-3">{t.goals.visionLabel}</div>
                    <div className="text-[13px] text-[#ccc] leading-7">{t.goals.vision}</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PRIORITIES */}
          <section id="priorities" className="py-24 px-10 bg-[#080808]">
            <div className="max-w-[1200px] mx-auto">
              <div className={centeredSectionTagClass}><span className="w-[30px] h-px bg-[var(--gold)]"></span>{t.priorities.tag}<span className="w-[30px] h-px bg-[var(--gold)]"></span></div>
              <h2 className="text-[clamp(32px,5vw,60px)] font-normal text-center text-white font-georgia mb-5">{t.priorities.titleA} <em className="italic text-[var(--gold)]">{t.priorities.titleB}</em>{t.priorities.titleC && ` ${t.priorities.titleC}`}</h2>
              <p className="text-center text-sm text-[#777] max-w-xl mx-auto mb-16 leading-7">{t.priorities.intro}</p>
              <div className="grid grid-cols-5 gap-4">
                {t.priorities.items.map((p, i) => (
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
              <div className={centeredSectionTagClass}><span className="w-[30px] h-px bg-[var(--gold)]"></span>{t.why.tag}<span className="w-[30px] h-px bg-[var(--gold)]"></span></div>
              <h2 className="text-[clamp(36px,5vw,64px)] font-normal text-center text-white font-georgia mb-5">{t.why.titleA} <em className="italic text-[var(--gold)]">{t.why.titleB}</em></h2>
              <p className="text-center text-[13px] text-[#777] italic mb-16">{t.why.sub}</p>
              <div className="grid grid-cols-2 gap-5">
                {t.why.cards.map((w, i) => (
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
              <div className={sectionTagClass}><span className="w-[30px] h-px bg-[var(--gold)]"></span>{t.platforms.tag}</div>
              <h2 className="text-[clamp(36px,5vw,64px)] font-normal leading-tight text-white font-georgia mb-5">{t.platforms.titleA}<br /><em className="italic text-[var(--gold)]">{t.platforms.titleB}</em></h2>
              <p className="text-sm text-[#888] max-w-md leading-7 mb-16">{t.platforms.intro}</p>

              {platformGroups.map((group) => (
                <React.Fragment key={group.title}>
                  <div className="text-[15px] italic text-[var(--gold)] my-10">{group.title}</div>
                  <div className={`grid ${group.cols} gap-3 mb-8`}>
                    {group.items.map((p) => (
                      <PlatformFlipCard key={p.name} platform={p} hint={t.platforms.hover} large={group.large} />
                    ))}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* GALLERY */}
          <section id="portfolio" className="pt-16 pb-24 px-10">
            <div className="max-w-[1200px] mx-auto">
              <div className={centeredSectionTagClass}><span className="w-[30px] h-px bg-[var(--gold)]"></span>{t.gallery.tag}<span className="w-[30px] h-px bg-[var(--gold)]"></span></div>
              <h2 className="text-[clamp(28px,4vw,52px)] tracking-[4px] uppercase text-center text-white font-georgia mb-5">{t.gallery.titleA}<br /><em className="italic text-[var(--gold)]">{t.gallery.titleB}</em></h2>
              <p className="text-center text-[#555] text-xs italic mb-12 tracking-wider">{t.gallery.note}</p>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                  <div key={n} className={`relative cursor-pointer overflow-hidden bg-[#111] rounded-sm ${n === 1 || n === 5 ? 'col-span-2 aspect-video' : 'aspect-square'}`} onClick={() => n === 1 || n === 5 ? playVideo(`vid${n === 1 ? 1 : 2}`) : null}>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[repeating-linear-gradient(45deg,#0d0d0d_0px,#0d0d0d_10px,#111_10px,#111_20px)] border-2 border-dashed border-[#2a2a2a] z-[2]">
                      <div className="text-[28px] opacity-50">{n === 1 || n === 5 ? '▶' : '📷'}</div>
                      <div className="text-[11px] tracking-[3px] text-[var(--gold)] font-arial opacity-70">{n === 1 || n === 5 ? `${t.gallery.video} ${n === 1 ? 1 : 2}` : `${t.gallery.photo} ${n === 5 ? 5 : n}`}</div>
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
              <div className={sectionTagClass}><span className="w-[30px] h-px bg-[var(--gold)]"></span>{t.process.tag}</div>
              <h2 className="text-[clamp(36px,5vw,64px)] font-normal leading-tight text-white font-georgia mb-10">{t.process.titleA}<br /><em className="italic text-[var(--gold)]">{t.process.titleB}</em></h2>
              <div className="flex justify-between gap-5 my-16">
                {t.process.steps.map((s, i) => (
                  <div key={i} className="text-center flex-1">
                    <div className="w-16 h-16 rounded-full border border-[#333] flex items-center justify-center mx-auto mb-4 text-[13px] text-[#666] font-georgia">{s.num}</div>
                    <div className="text-[9px] tracking-[3px] uppercase text-white font-arial font-semibold mb-2">{s.title}</div>
                    <div className="text-[11px] text-[#666] leading-relaxed">{s.desc}</div>
                  </div>
                ))}
              </div>

              <div className={`${sectionTagClass} mt-20`}><span className="w-[30px] h-px bg-[var(--gold)]"></span>{t.security.tag}</div>
              <div className="grid grid-cols-2 gap-16 items-start mt-20">
                <div>
                  <h2 className="text-[clamp(36px,5vw,64px)] font-normal leading-tight text-white font-georgia mb-5">{t.security.titleA}<br /><em className="italic text-[var(--gold)]">{t.security.titleB}</em></h2>
                  <p className="text-sm text-[#888] leading-7 max-w-md mb-5">{t.security.intro}</p>
                  <div className="flex flex-col gap-3 mt-5">
                    {t.security.notes.map((note, i) => (
                      <div key={i} className="bg-[#111] border border-[#1e1e1e] px-5 py-4 flex gap-3 items-center text-xs text-[#888]"><span className="text-sm">{note.icon}</span>{note.text}</div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {t.security.cards.map((c, i) => (
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
                      <span className="w-6 h-px bg-[var(--gold)]" />{t.castingBanner.tag}
                    </div>
                    <h2 className="font-georgia text-[clamp(32px,4vw,56px)] font-normal text-white leading-[1.1] mb-4">
                      {t.castingBanner.titleA}<br />
                      <em className="italic text-[var(--gold)]">{t.castingBanner.titleB}</em>
                    </h2>
                    <p className="text-sm text-[#888] leading-7 max-w-xl mb-8">
                      {t.castingBanner.text}
                    </p>
                    <div className="flex flex-wrap gap-6 mb-10">
                      {bannerStats.map((s) => (
                        <div key={s.label} className="text-center">
                          <div className="text-2xl mb-1">{s.ico}</div>
                          <div className="text-[var(--gold)] font-georgia text-2xl font-bold">{s.val}</div>
                          <div className="text-[#666] text-[9px] tracking-[2px] uppercase font-arial">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Link href="/casting" className="no-underline bg-[var(--crimson-btn)] text-white px-10 py-4 text-[10px] tracking-[3px] uppercase font-arial font-semibold hover:bg-[#b0243c] transition-colors inline-block">{t.castingBanner.apply}</Link>
                      <Link href="/academy" className="no-underline border border-[#333] text-[#888] px-10 py-4 text-[10px] tracking-[3px] uppercase font-arial hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all inline-block">{t.castingBanner.academy}</Link>
                    </div>
                  </div>
                  <div className="min-w-[200px] space-y-4">
                    {t.castingBanner.steps.map((label, i) => (
                      <div key={label} className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center text-[11px] text-[#555] font-georgia flex-shrink-0">{String(i + 1).padStart(2, '0')}</div>
                        <div className="text-[11px] text-[#777] font-arial tracking-wide">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* COUNTERS */}
          <div className="bg-[#0a0a0a] py-20 px-10 grid grid-cols-4 gap-0 text-center border-t border-b border-[#1a1a1a]">
            {t.counters.map((c, i) => (
              <div key={i} className="border-r border-[#1a1a1a] last:border-r-0">
                <div className={`text-[40px] text-[var(--gold)] font-georgia ${'italic' in c && c.italic ? 'italic' : ''}`}>{c.num}</div>
                <div className="text-[9px] tracking-[3px] uppercase text-[#555] font-arial mt-2">{c.label}</div>
              </div>
            ))}
          </div>

          {/* CONTACT SECTION */}
          <section id="contact" className="py-24 px-10 bg-[#080808]">
            <div className="max-w-[1200px] mx-auto">
              <div className={centeredSectionTagClass}><span className="w-[30px] h-px bg-[var(--gold)]"></span>{t.contact.tag}<span className="w-[30px] h-px bg-[var(--gold)]"></span></div>
              <h2 className="text-[clamp(36px,5vw,64px)] font-normal text-center text-white font-georgia mb-5">{t.contact.titleA} <em className="italic text-[var(--gold)]">{t.contact.titleB}</em></h2>
              <p className="text-center text-[13px] text-[#777] italic mb-16 max-w-lg mx-auto">{t.contact.intro}</p>
              <div className="grid grid-cols-2 gap-16">
                <div>
                  <h3 className="text-xl text-white mb-6 font-georgia">{t.contact.formTitle}</h3>
                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                    <input type="text" value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})} placeholder={t.contact.name} className={inputClass} />
                    <input type="email" value={contactForm.email} onChange={(e) => setContactForm({...contactForm, email: e.target.value})} placeholder={t.contact.email} className={inputClass} />
                    <input type="tel" value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})} placeholder={t.contact.phone} className={inputClass} />
                    <select value={contactForm.topic} onChange={(e) => setContactForm({...contactForm, topic: e.target.value})} className={`${inputClass} text-[#888]`}>
                      <option value="">{t.contact.topicPlaceholder}</option>
                      <option value="casting">{t.contact.topics.casting}</option>
                      <option value="partnership">{t.contact.topics.partnership}</option>
                      <option value="production">{t.contact.topics.production}</option>
                      <option value="other">{t.contact.topics.other}</option>
                    </select>
                    <textarea value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})} placeholder={t.contact.message} rows={5} className={`${inputClass} resize-none`}></textarea>
                    <button type="submit" disabled={contactStatus === 'sending'} className="bg-[var(--crimson-btn)] border-none text-white px-8 py-4 text-[11px] tracking-[3px] uppercase font-arial font-semibold cursor-pointer hover:bg-[#b0243c] transition-colors mt-2 disabled:opacity-50">
                      {contactStatus === 'sending' ? t.contact.sending : contactStatus === 'sent' ? t.contact.sent : t.contact.submit}
                    </button>
                    {contactStatus === 'error' && <div className="text-red-500 text-xs mt-2">{t.contact.error}</div>}
                  </form>
                </div>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl text-white mb-4 font-georgia">{t.contact.detailsTitle}</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4"><span className="text-[var(--gold)] text-lg">📍</span><div><div className="text-xs text-[#666] uppercase tracking-wider mb-1">{t.contact.hq}</div><div className="text-sm text-[#ccc]">{t.contact.hqValue}</div></div></div>
                      <div className="flex items-start gap-4"><span className="text-[var(--gold)] text-lg">📧</span><div><div className="text-xs text-[#666] uppercase tracking-wider mb-1">{t.contact.emailLabel}</div><div className="text-sm text-[#ccc]">hrl-adult-studio@hardbanrecordslab.online</div></div></div>
                      <div className="flex items-start gap-4">
                        <span className="text-[var(--gold)] text-lg">💬</span>
                        <div>
                          <div className="text-xs text-[#666] uppercase tracking-wider mb-1">{t.contact.whatsapp}</div>
                          <a href="https://wa.me/48725663741" target="_blank" rel="noopener noreferrer" className="text-sm text-[#ccc] hover:text-[var(--gold)] transition-colors flex items-center gap-2">
                             {t.contact.whatsappCta}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-4 font-georgia">{t.contact.hoursTitle}</h3>
                    <div className="space-y-2 text-sm text-[#888]">
                      <div className="flex justify-between"><span>{t.contact.weekdays}</span><span className="text-[#ccc]">9:00 - 18:00</span></div>
                      <div className="flex justify-between"><span>{t.contact.saturday}</span><span className="text-[#ccc]">10:00 - 14:00</span></div>
                      <div className="flex justify-between"><span>{t.contact.sunday}</span><span className="text-[#ccc]">{t.contact.closed}</span></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl text-white mb-4 font-georgia">{t.contact.socialTitle}</h3>
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
                <p className="text-xs text-[#555] leading-relaxed max-w-[220px] mb-5 italic">{footer.tagline}</p>
                <div className="flex gap-2">
                  {['X', 'IG', 'TG'].map((s, i) => (<div key={i} className="w-8 h-8 border border-[#333] flex items-center justify-center text-[10px] text-[#777] font-arial cursor-pointer hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all">{s}</div>))}
                </div>
              </div>
              <div>
                <div className="text-[9px] tracking-[3px] uppercase text-[var(--text-muted)] font-arial mb-5">{up(footer.quickLinks)}</div>
                <ul className="flex flex-col gap-2.5 list-none">
                  {footerQuickLinks.map((l) => (<li key={l.href}><Link href={l.href} className={footerLinkClass}>{up(l.label)}</Link></li>))}
                </ul>
              </div>
              <div>
                <div className="text-[9px] tracking-[3px] uppercase text-[var(--text-muted)] font-arial mb-5">{up(footer.legal)}</div>
                <ul className="flex flex-col gap-2.5 list-none">
                  {footerLegalLinks.map((l) => (<li key={l.href}><Link href={l.href} className={footerLinkClass}>{up(l.label)}</Link></li>))}
                </ul>
              </div>
              <div>
                <div className="text-[9px] tracking-[3px] uppercase text-[var(--text-muted)] font-arial mb-5">{up(footer.partner)}</div>
                <p className="text-xs text-[#555] leading-relaxed mb-3">{footer.partnerText}</p>
                <div className="flex mt-3">
                  <input type="email" placeholder={footer.emailPlaceholder} className="flex-1 bg-[#111] border border-[#222] border-r-0 px-3.5 py-2.5 text-[11px] text-[#ccc] font-arial outline-none placeholder:text-[#444]" />
                  <button className="bg-transparent border border-[#222] px-4 py-2.5 text-[10px] tracking-[2px] text-[var(--gold)] font-arial cursor-pointer">{up(footer.send)}</button>
                </div>
              </div>
            </div>
            <div className="border-t border-[#1a1a1a] pt-6 flex justify-between items-center">
              <span className="text-[11px] text-[#444] font-arial">{up(`© 2026 Studio HRL Adult. ${footer.rights}`)}</span>
              <div className="flex gap-5">
                <span className="text-[9px] tracking-[3px] uppercase text-[var(--crimson)] border border-[var(--crimson)] px-2.5 py-1">{up(footer.adultOnly)}</span>
                <span className="text-[9px] tracking-[3px] uppercase text-[#444] font-arial">——— {up(footer.designed)}</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
};

export default HomePage;
