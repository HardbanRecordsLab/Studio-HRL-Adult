import React, { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import CTA from '@/components/sections/CTA';
import { getCloudinaryVideoUrl } from '@/utils/cloudinary';
import Link from 'next/link';
import { intlLocale, useLocale, useMessages } from '@/i18n';
import { academy } from '@/i18n/academy';

const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dfn5qgvpy';

// ─── MEDIA ───────────────────────────────────────────────────────────────────
interface VideoResource {
  id: string;
  title: string;
  dur: string;
  level: string;
  desc: string;
  cloudinaryId: string;
  localPath: string;
  thumb: string | null;
}

interface PodcastResource {
  id: string;
  title: string;
  dur: string;
  desc: string;
  file: string;
  ep: string;
}

interface LegalDocResource {
  id: string;
  title: string;
  type: string;
  size: string;
  desc: string;
  file: string;
  icon: string;
  cat: string;
}

// Language-neutral platform data; the descriptions live in @/i18n/academy.
const PLATFORM_META = [
  { cat: 'live', name: 'Chaturbate', ico: '🔴', badge: 'CAM GIANT' },
  { cat: 'live', name: 'Stripchat', ico: '🎭', badge: 'VR LEADER' },
  { cat: 'live', name: 'LiveJasmin', ico: '💎', badge: 'ELITE' },
  { cat: 'live', name: 'BongaCams', ico: '🌟', badge: 'EU FOCUS' },
  { cat: 'live', name: 'MyFreeCams', ico: '🎪', badge: 'CLASSIC' },
  { cat: 'live', name: 'Cam4', ico: '🎨', badge: 'NEWBIE' },
  { cat: 'live', name: 'Flirt4Free', ico: '🎯', badge: 'VIP CAM' },
  { cat: 'live', name: 'Streamate', ico: '🌙', badge: 'US MARKET' },
  { cat: 'sub', name: 'OnlyFans', ico: '🔥', badge: 'PREMIUM #1' },
  { cat: 'sub', name: 'Fansly', ico: '💫', badge: 'GROWING' },
  { cat: 'sub', name: 'ManyVids', ico: '📹', badge: 'VOD PASSIVE' },
  { cat: 'sub', name: 'JustForFans', ico: '🔞', badge: 'CREATOR FIRST' },
  { cat: 'sub', name: 'FanCentro', ico: '🌐', badge: 'MULTI-PLATFORM' },
  { cat: 'sub', name: 'Patreon', ico: '🏛️', badge: 'CREATOR ECONOMY' },
  { cat: 'tube', name: 'Pornhub', ico: '🖥️', badge: 'TUBE #1' },
  { cat: 'tube', name: 'xVideos', ico: '🖥️', badge: 'GLOBAL REACH' },
  { cat: 'tube', name: 'xHamster', ico: '🖥️', badge: 'COMMUNITY' },
  { cat: 'tube', name: 'AVN Stars', ico: '⭐', badge: 'INDUSTRY CRED' },
  { cat: 'marketing', name: 'Twitter / X', ico: '🐦', badge: 'ESSENTIAL' },
  { cat: 'marketing', name: 'Reddit', ico: '🤖', badge: 'ORGANIC' },
  { cat: 'marketing', name: 'TikTok / Instagram', ico: '📱', badge: 'AWARENESS' },
];

type PlatformMeta = typeof PLATFORM_META[0];

const CAT_IDS = ['all', 'live', 'sub', 'tube', 'marketing', 'videos', 'podcasts', 'guides', 'blog'] as const;

// Category values as stored in the database (used for filtering, so they are not translated here).
const DOC_FILTERS = ['Prawny', 'Operacyjny', 'Biznesowy', 'Strategia', 'Compliance', 'Casting'];

// ─── AUDIO PLAYER ────────────────────────────────────────────────────────────
const AudioPlayer: React.FC<{ src: string; title: string }> = ({ src, title }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); } else { audioRef.current.play(); }
    setPlaying(!playing);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    const pct = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(isNaN(pct) ? 0 : pct);
    const m = Math.floor(audioRef.current.currentTime / 60);
    const s = Math.floor(audioRef.current.currentTime % 60);
    setCurrentTime(`${m}:${s.toString().padStart(2, '0')}`);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = pct * audioRef.current.duration;
  };

  return (
    <div className="flex items-center gap-3 mt-3">
      <audio ref={audioRef} src={src} onTimeUpdate={onTimeUpdate} onEnded={() => setPlaying(false)} />
      <button onClick={toggle}
        className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold/10 transition-all flex-shrink-0 text-xs">
        {playing ? '⏸' : '▶'}
      </button>
      <div className="flex-1 space-y-1">
        <div className="h-1 bg-dark-4 cursor-pointer rounded-full overflow-hidden" onClick={seek}>
          <div className="h-full bg-gold transition-all" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-[8px] text-dim/60">{currentTime}</div>
      </div>
    </div>
  );
};

// ─── VIDEO CARD ───────────────────────────────────────────────────────────────
const VideoCard: React.FC<{ v: VideoResource; locked: boolean }> = ({ v, locked }) => {
  const { card } = useMessages(academy);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggle = () => {
    if (locked) return;
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); } else { videoRef.current.play(); }
    setPlaying(!playing);
  };

  return (
    <div className="bg-dark-3/40 border border-gold/10 group overflow-hidden hover:border-gold/30 transition-all">
      <div className="aspect-video bg-dark-4 relative overflow-hidden cursor-pointer" onClick={toggle}>
        {!locked ? (
          <video ref={videoRef} src={v.localPath} className="w-full h-full object-cover"
            onEnded={() => setPlaying(false)} playsInline />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-dark-4 to-dark-3 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="text-3xl opacity-30">🔒</div>
              <div className="text-[8px] text-dim uppercase tracking-widest">{card.partnersOnly}</div>
            </div>
          </div>
        )}
        {!locked && !playing && (
          <div className="absolute inset-0 flex items-center justify-center bg-dark/40">
            <div className="w-12 h-12 border border-gold/50 rounded-full flex items-center justify-center text-gold group-hover:scale-110 transition-transform pl-1 bg-dark/60">▶</div>
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-dark/80 text-[7px] text-white px-2 py-1">{v.dur}</div>
        <div className="absolute top-2 left-2 text-[7px] text-gold tracking-widest uppercase bg-dark/80 px-2 py-1 border border-gold/20">{v.level}</div>
      </div>
      <div className="p-5 space-y-3">
        <h3 className="font-cormorant text-lg text-white italic leading-tight">{v.title}</h3>
        <p className="text-dim text-[9px] leading-relaxed font-light">{v.desc}</p>
      </div>
    </div>
  );
};

// ─── PLATFORM CARD ────────────────────────────────────────────────────────────
const PlatformCard: React.FC<{ plat: PlatformMeta }> = ({ plat }) => {
  const { card, platforms } = useMessages(academy);
  const copy = platforms[plat.name];
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[400px] w-full perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden bg-dark-2 border border-gold/10 p-8 flex flex-col justify-between overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start">
            <div className="text-4xl">{plat.ico}</div>
            <div className="text-[7px] tracking-[0.15em] uppercase bg-gold/10 text-gold px-2 py-1 border border-gold/20 font-bold">
              {plat.badge}
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-cormorant text-3xl text-white italic">{plat.name}</h3>
            <div className="h-px w-12 bg-gold/30" />
            <p className="text-dim text-[11px] leading-relaxed font-light line-clamp-4">
              {copy.desc}
            </p>
          </div>

          <div className="pt-6 flex items-center gap-2 text-[8px] text-gold uppercase tracking-[0.2em] font-bold">
            {card.readMore} <span className="text-lg">→</span>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className="absolute inset-0 backface-hidden bg-dark-3 border border-gold/30 p-8 flex flex-col justify-between rotate-y-180"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="space-y-6">
            <h4 className="font-cormorant text-xl text-gold italic border-b border-gold/10 pb-2">{card.keyFeatures}</h4>
            <ul className="space-y-3">
              {copy.features.map(f => (
                <li key={f} className="flex items-start gap-3 text-[10px] text-dim/90 font-light leading-snug">
                  <span className="text-gold mt-1 text-xs">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-cormorant text-xl text-gold italic border-b border-gold/10 pb-2">{card.about}</h4>
            <p className="text-dim text-[10px] leading-relaxed font-light italic">
              {copy.desc}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
const AcademyPage: React.FC = () => {
  const locale = useLocale();
  const t = useMessages(academy);
  const [activeCat, setActiveCat] = useState('all');
  const [docFilter, setDocFilter] = useState('all');
  
  // Dynamic Content States
  const [videos, setVideos] = useState<VideoResource[]>([]);
  const [podcasts, setPodcasts] = useState<PodcastResource[]>([]);
  const [legalDocs, setLegalDocs] = useState<LegalDocResource[]>([]);
  const [blogArticles, setBlogArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllContent = async () => {
      setLoading(true);
      try {
        // Fetch resources in parallel
        const [vRes, pRes, dRes, aRes] = await Promise.all([
          fetch('/api/admin/academy/videos'),
          fetch('/api/admin/academy/podcasts'),
          fetch('/api/admin/academy/documents'),
          fetch('/api/academy/content?type=articles')
        ]);

        if (vRes.ok) {
          const vData = await vRes.json();
          setVideos(vData.map((v: any) => ({
            id: v.id, title: v.title, dur: v.duration, level: v.level,
            desc: v.description, cloudinaryId: v.cloudinaryId,
            localPath: v.url, thumb: v.thumbnail
          })));
        }

        if (pRes.ok) {
          const pData = await pRes.json();
          setPodcasts(pData.map((p: any) => ({
            id: p.id, title: p.title, dur: p.duration,
            desc: p.description, file: p.url, ep: p.episodeNumber
          })));
        }

        if (dRes.ok) {
          const dData = await dRes.json();
          setLegalDocs(dData.map((d: any) => ({
            id: d.id, title: d.title, type: d.type, size: d.size,
            desc: d.description, file: d.url, icon: d.icon, cat: d.category
          })));
        }

        if (aRes.ok) {
          const data = await aRes.json();
          const transformed = data.map((article: any) => ({
            slug: article.slug,
            cat: article.category,
            tag: article.tag,
            title: article.title,
            excerpt: article.excerpt,
            readTime: article.readTime,
            publishedAt: article.publishedAt,
            tags: article.tag.toLowerCase().split(' '),
            content: article.content,
          }));
          setBlogArticles(transformed);
        }
      } catch (error) {
        console.error('Error fetching academy content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllContent();
  }, []);

  const formatDate = (value?: string) =>
    value
      ? new Date(value).toLocaleDateString(intlLocale(locale), { year: 'numeric', month: 'short', day: 'numeric' })
      : t.blog.noDate;

  return (
    <>
      <Head>
        <title>{t.meta.title}</title>
        <meta name="description" content={t.meta.description} />
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-24 pb-24">

          {/* ── HERO ── */}
          <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden px-[7%]">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_40%,rgba(155,31,53,0.18),rgba(90,15,30,0.08)_50%,transparent_70%)]" />
            <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-20 pointer-events-none">
              <div className="flex gap-1 h-full">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-crimson/30 to-transparent border-r border-gold/5" />
                ))}
              </div>
            </div>
            <div className="relative z-10 text-center max-w-4xl mx-auto space-y-8">
              <div className="flex items-center justify-center gap-4 text-gold/60 text-[8.5px] tracking-[0.5em] uppercase">
                <div className="w-12 h-px bg-gold/30" />
                {t.hero.tag}
                <div className="w-12 h-px bg-gold/30" />
              </div>
              <h1 className="h1-premium text-white">
                {t.hero.titleA}<br />
                <span className="italic bg-gold-gradient bg-clip-text text-transparent">{t.hero.titleB}</span>
              </h1>
              <p className="font-cormorant text-2xl italic text-dim">
                {t.hero.subtitle}
              </p>
              <p className="text-dim text-sm leading-loose font-light max-w-2xl mx-auto">
                {t.hero.text}
              </p>
              <div className="flex flex-wrap justify-center gap-8 pt-4">
                {[
                  { val: '28', label: t.hero.stats[0] },
                  { val: '6', label: t.hero.stats[1] },
                  { val: '7', label: t.hero.stats[2] },
                  { val: '11', label: t.hero.stats[3] },
                  { val: '9', label: t.hero.stats[4] },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="font-cormorant text-3xl text-gold">{s.val}</div>
                    <div className="text-[8px] text-dim uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-4 pt-2">
                <a href="#login" className="btn-gold">{t.hero.login}</a>
                <Link href="/casting" className="btn-outline">{t.hero.becomePartner}</Link>
              </div>
            </div>
          </section>

          {/* ── PROMO MEDIA STRIP ── */}
          <section className="py-8 overflow-hidden border-y border-gold/10 bg-dark-2">
            <div className="flex gap-3 px-[7%] overflow-x-auto scrollbar-hide">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex-shrink-0 w-40 h-24 bg-dark-3 border border-gold/10 relative overflow-hidden group cursor-pointer hover:border-gold/30 transition-all">
                  <div className="absolute inset-0 bg-gradient-to-br from-crimson/20 to-dark-4 flex items-center justify-center">
                    <div className="text-gold/30 text-2xl group-hover:text-gold/60 transition-colors">▶</div>
                  </div>
                  <div className="absolute bottom-1 left-2 text-[7px] text-dim/50 uppercase tracking-widest">{t.preview} {i + 1}</div>
                  <div className="absolute top-1 right-1 text-[6px] text-gold/40 border border-gold/20 px-1">+18</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="px-[7%] max-w-4xl mx-auto my-20">
            <div className="bg-dark-3/50 border border-gold/20 p-12 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient" />
              <div className="section-tag justify-center">{t.cta.tag}</div>
              <h3 className="font-cormorant text-3xl text-white italic">{t.cta.title}</h3>
              <p className="text-dim text-xs font-light max-w-md mx-auto">
                {t.cta.text}
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/casting" className="btn-gold">{t.cta.apply}</Link>
                <Link href="/contact" className="btn-outline">{t.cta.contact}</Link>
              </div>
            </div>
          </section>

          {/* ── FILTERS ── */}
          <section className="px-[7%] mb-16">
            <div className="flex flex-wrap justify-center gap-2">
              {CAT_IDS.map(id => (
                <button key={id} onClick={() => setActiveCat(id)}
                  className={`px-5 py-2.5 text-[9px] tracking-[0.2em] uppercase transition-all duration-300 border ${
                    activeCat === id
                      ? 'bg-gold text-dark border-gold font-bold'
                      : 'bg-dark-3/40 text-dim border-gold/10 hover:border-gold/30'
                  }`}>
                  {t.categories[id]}
                </button>
              ))}
            </div>
          </section>

          {/* ── CONTENT ── */}
          <div className="px-[7%] space-y-28 max-w-7xl mx-auto">

            {/* VIDEOS */}
            {(activeCat === 'all' || activeCat === 'videos') && (
              <section className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.length === 0 && !loading ? (
                    <div className="col-span-full py-20 text-center text-dim uppercase tracking-widest opacity-30">{t.empty.videos}</div>
                  ) : (
                    videos.map(v => <VideoCard key={v.id} v={v} locked={false} />)
                  )}
                </div>
              </section>
            )}

            {/* PODCASTS */}
            {(activeCat === 'all' || activeCat === 'podcasts') && (
              <section className="space-y-10">
                <div className="flex items-center justify-between">
                  <div className="section-tag">{t.podcasts.title}</div>
                  <span className="text-[8px] text-dim uppercase tracking-widest">{podcasts.length} {t.podcasts.episodes}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {podcasts.length === 0 && !loading ? (
                    <div className="col-span-full py-20 text-center text-dim uppercase tracking-widest opacity-30">{t.empty.podcasts}</div>
                  ) : (
                    podcasts.map(pod => (
                      <div key={pod.id} className="bg-dark-2 border border-gold/10 p-6 hover:border-gold/30 transition-all group">
                        <div className="flex gap-5 items-start">
                          <div className="w-16 h-16 bg-gradient-to-br from-crimson/30 to-dark-4 border border-gold/20 flex items-center justify-center flex-shrink-0">
                            <span className="font-cormorant text-gold text-sm font-bold">{pod.ep}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-cormorant text-lg text-white italic leading-tight mb-2 group-hover:text-gold transition-colors">{pod.title}</h3>
                            <p className="text-dim text-[9px] leading-relaxed font-light mb-1">{pod.desc}</p>
                            <div className="text-[8px] text-dim/50 uppercase tracking-widest">{pod.dur}</div>
                            <AudioPlayer src={pod.file} title={pod.title} />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* PLATFORMS */}
            {['all', 'live', 'sub', 'tube', 'marketing'].includes(activeCat) && (
              <>
                {['live', 'sub', 'tube', 'marketing'].filter(c => activeCat === 'all' || activeCat === c).map(cat => {
                  const labels = t.platformSections as Record<string, string>;
                  const filtered = PLATFORM_META.filter(p => p.cat === cat);
                  if (filtered.length === 0) return null;
                  return (
                    <section key={cat} className="space-y-10">
                      <div className="section-tag">{labels[cat]}</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filtered.map(plat => (
                          <PlatformCard key={plat.name} plat={plat} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </>
            )}

            {/* DOCUMENTS */}
            {(activeCat === 'all' || activeCat === 'guides') && (
              <section className="space-y-10">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="section-tag">{t.documents.title}</div>
                  <div className="flex flex-wrap gap-2">
                    {['all', ...DOC_FILTERS].map(f => (
                      <button key={f} onClick={() => setDocFilter(f)}
                        className={`px-3 py-1 text-[8px] uppercase tracking-widest border transition-all ${
                          docFilter === f ? 'bg-gold text-dark border-gold' : 'text-dim border-gold/10 hover:border-gold/30'
                        }`}>
                        {f === 'all' ? t.documents.all : t.documents.categories[f]}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {legalDocs.length === 0 && !loading ? (
                    <div className="col-span-full py-20 text-center text-dim uppercase tracking-widest opacity-30">{t.empty.documents}</div>
                  ) : (
                    legalDocs.filter(d => docFilter === 'all' || d.cat === docFilter).map(doc => (
                      <div key={doc.id} className="bg-dark-2 border border-gold/10 p-6 hover:border-gold/30 transition-all group relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-start justify-between mb-4">
                          <div className="text-3xl">{doc.icon}</div>
                          <div className="flex gap-2">
                            <span className="text-[7px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 uppercase">{doc.type}</span>
                            <span className="text-[7px] bg-gold/10 text-gold border border-gold/20 px-2 py-0.5 uppercase">{t.documents.categories[doc.cat] ?? doc.cat}</span>
                          </div>
                        </div>
                        <h3 className="font-cormorant text-lg text-white italic mb-2">{doc.title}</h3>
                        <p className="text-dim text-[9px] leading-relaxed font-light mb-4">{doc.desc}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] text-dim/50 uppercase tracking-widest">{doc.size}</span>
                          <a href={doc.file} target="_blank" rel="noopener noreferrer"
                            className="text-[8px] text-gold uppercase tracking-widest border border-gold/20 px-3 py-1.5 hover:bg-gold hover:text-dark transition-all">
                            {t.documents.download}
                          </a>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </section>
            )}

            {/* BLOG */}
            {(activeCat === 'all' || activeCat === 'blog') && (
              <section className="space-y-10">
                <div className="flex items-center justify-between">
                  <div className="section-tag">{t.blog.title}</div>
                  <span className="text-[8px] text-dim uppercase tracking-widest">{blogArticles.length} {t.blog.articles}</span>
                </div>
                {loading ? (
                  <div className="text-center text-dim py-20 animate-pulse tracking-[5px] uppercase text-[10px]">{t.blog.loading}</div>
                ) : blogArticles.length === 0 ? (
                  <div className="text-center text-dim py-20">{t.empty.articles}</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogArticles.map(article => (
                      <motion.div key={article.slug} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                        className="bg-dark-2 border border-gold/10 hover:border-gold/30 transition-all group overflow-hidden flex flex-col">
                        <div className="aspect-video bg-gradient-to-br from-dark-4 to-dark-3 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-[8px] text-dim/30 uppercase tracking-widest">{t.blog.image}</div>
                          </div>
                          <div className="absolute top-3 left-3 text-[7px] tracking-[0.15em] uppercase bg-crimson/80 text-white px-2 py-0.5">{article.cat}</div>
                          <div className="absolute top-3 right-3 text-[7px] tracking-[0.15em] uppercase bg-gold/80 text-dark px-2 py-0.5 font-bold">{article.tag}</div>
                        </div>
                        <div className="p-6 flex flex-col flex-1 space-y-3">
                          <h3 className="font-cormorant text-xl text-white italic leading-tight group-hover:text-gold transition-colors">{article.title}</h3>
                          <p className="text-dim text-[10px] leading-relaxed font-light flex-1">{article.excerpt}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {article.tags.slice(0, 3).map((tag: string) => (
                              <span key={tag} className="text-[7px] text-dim/50 border border-gold/10 px-2 py-0.5 uppercase tracking-widest">#{tag}</span>
                            ))}
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-gold/10">
                            <div className="text-[8px] text-dim/50">{formatDate(article.publishedAt)} · {article.readTime}</div>
                            <button className="text-[8px] text-gold uppercase tracking-widest border-b border-gold/20 hover:border-gold transition-all">{t.blog.read}</button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </section>
            )}

          </div>

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
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </>
  );
};

export default AcademyPage;
