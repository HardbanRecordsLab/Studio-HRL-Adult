import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useMessages } from '@/i18n';
import { profileCopy } from '@/i18n/profiles';
import { ProfileModel, averageRating, formatCountdown, nextSlot } from '@/lib/profileModel';
import type { PublicLiveStatus } from '@/pages/api/live/[handle]';
import ProfileNav from '@/components/profile/ProfileNav';
import ScheduleCard from '@/components/profile/ScheduleCard';
import Gallery from '@/components/profile/Gallery';
import MobileActionBar from '@/components/profile/MobileActionBar';
import Reveal from '@/components/profile/Reveal';

interface ProfileTemplateProps {
  data: ProfileModel;
}

const cinzel = { fontFamily: 'Cinzel, serif' } as const;
const cardClass = 'relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl';
const cardTopLine = 'absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent';
const cardTitle = 'font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6 uppercase tracking-wider text-sm';
const sectionClass = 'scroll-mt-28 py-16 md:py-24 relative z-10';

/** "Title | description" strings (the format profile bullet points are stored in). */
const splitItem = (item: string) => {
  const [title, desc] = item.split('|');
  return { title: title?.trim() || item, desc: desc?.trim() };
};

const platformName = (id?: string) => (id ? id.charAt(0).toUpperCase() + id.slice(1) : '');

/** Polls the public live status so the profile can show "on air" and link to /live/<handle>. */
function useLiveStatus(handle: string) {
  const [status, setStatus] = useState<PublicLiveStatus | null>(null);
  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const res = await fetch(`/api/live/${encodeURIComponent(handle)}`);
        if (res.ok && !cancelled) setStatus(await res.json());
      } catch {
        /* keep the last known status */
      }
    };
    void load();
    const timer = setInterval(() => void load(), 15000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [handle]);
  return status;
}

const SectionHeader: React.FC<{ eyebrow: string; title: string; center?: boolean }> = ({ eyebrow, title, center }) => (
  <div className={`mb-10 md:mb-14 ${center ? 'text-center' : ''}`}>
    <p className="text-[10px] uppercase tracking-[0.35em] text-purple-300/80 mb-3">{eyebrow}</p>
    <h2 className="text-3xl md:text-4xl font-bold text-white" style={cinzel}>{title}</h2>
    <div className={`mt-4 h-px w-16 bg-gradient-to-r from-purple-400 to-transparent ${center ? 'mx-auto' : ''}`} />
  </div>
);

const Stars: React.FC<{ rating: number }> = ({ rating }) => {
  const full = Math.round(rating);
  return (
    <span aria-label={`${rating}/5`} className="text-amber-400 tracking-widest text-sm">
      {'★'.repeat(full)}
      <span className="text-white/20">{'★'.repeat(5 - full)}</span>
    </span>
  );
};

export const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ data }) => {
  const { profileTemplate: t } = useMessages(profileCopy);
  const live = useLiveStatus(data.handle);
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState(() => new Date());

  // Re-evaluate the "next live" countdown once a minute.
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const pd = data.profileData ?? {};
  const timezone = pd.timezone || 'Europe/Warsaw';
  const schedule = data.liveSchedule ?? [];
  const upcoming = useMemo(() => nextSlot(schedule, timezone, now), [schedule, timezone, now]);

  const gallery = (pd.gallery ?? []).slice(0, 9);
  const videos = pd.videos ?? [];
  const heroImage = data.heroImage || data.avatar || '/images/default-profile.jpg';
  const platformLinks = Object.entries(data.platforms ?? {}).filter(([, link]) => link?.url);
  const rating = averageRating(data.testimonials);
  const onAir = Boolean(live?.live);
  const statEntries = (['subscribers', 'content', 'satisfaction', 'sessions'] as const).filter((key) => {
    const value = data.stats?.[key];
    return value !== undefined && value !== '';
  });

  const [measure1, measure2, measure3] = (data.measurements ?? '').split('/').map((part) => part.trim());
  const facts: Array<[string, string]> = (
    [
      [t.height, data.height ? `${data.height} cm` : ''],
      [t.weight, data.weight ? `${data.weight} kg` : ''],
      [t.bust, measure1 ?? ''],
      [t.waist, measure2 ? `${measure2} cm` : ''],
      [t.hips, measure3 ? `${measure3} cm` : ''],
      [t.size, pd.size ?? ''],
      [t.age, pd.age ? String(pd.age) : ''],
      [t.nationality, pd.nationality ?? ''],
      [t.facts.languages, pd.languages?.join(', ') ?? ''],
      [t.facts.location, pd.location ?? ''],
    ] as Array<[string, string]>
  ).filter(([, value]) => value);

  const primaryPlatform = platformLinks[0];
  const primaryAction = onAir
    ? { label: `● ${t.live.watchNow}`, href: `/live/${data.handle}`, live: true }
    : primaryPlatform
      ? { label: `${t.hero.followOn} ${platformName(primaryPlatform[0])}`, href: primaryPlatform[1].url as string, external: true }
      : null;

  const share = useCallback(async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: data.name, url }).catch(() => undefined);
    } else {
      await navigator.clipboard.writeText(url).catch(() => undefined);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [data.name]);

  const navItems = [
    { id: 'about', label: t.nav.about },
    ...(schedule.length || platformLinks.length ? [{ id: 'live', label: t.nav.live }] : []),
    ...(gallery.length || videos.length ? [{ id: 'gallery', label: t.nav.gallery }] : []),
    ...(rating ? [{ id: 'reviews', label: t.nav.reviews }] : []),
    ...(pd.faq?.length ? [{ id: 'faq', label: t.nav.faq }] : []),
    { id: 'contact', label: t.nav.contact },
  ];

  const milestones = [...(pd.milestones ?? [])].sort((a, b) => Number(b.year) - Number(a.year));

  return (
    <>
      <Head>
        <title>{data.name} - Studio HRL Adult</title>
        <meta name="description" content={data.bio} />
        <meta property="og:title" content={`${data.name} - Studio HRL Adult`} />
        <meta property="og:description" content={data.bio} />
        {!heroImage.startsWith('data:') && <meta property="og:image" content={heroImage} />}
        {data.handle === 'demo' && <meta name="robots" content="noindex" />}
      </Head>

      <main className="bg-[#0a0a0c] text-gray-200 min-h-screen font-sans relative overflow-x-clip pb-24 md:pb-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-900/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-[60vh] right-[-15%] w-[600px] h-[600px] bg-rose-900/10 rounded-full blur-[110px] pointer-events-none" />

        <ProfileNav backLabel={t.back} items={navItems} shareLabel={copied ? t.copied : t.share} onShare={() => void share()} />

        {/* HERO */}
        <section className="relative z-10 border-b border-white/5 overflow-hidden">
          <img src={heroImage} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-20 blur-3xl scale-125 pointer-events-none" />
          <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-20 grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              {(pd.badges?.length ?? 0) > 0 && (
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                  {pd.badges?.map((badge) => (
                    <span key={badge} className="px-3 py-1 text-[10px] uppercase tracking-widest border border-amber-400/40 text-amber-300 bg-amber-400/5">✓ {badge}</span>
                  ))}
                </div>
              )}
              <h1 className="text-6xl md:text-7xl xl:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-5 tracking-tight" style={cinzel}>
                {data.name || 'Alexia'}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-xl mx-auto lg:mx-0 leading-relaxed">{data.bio || t.bioFallback}</p>
              {(pd.location || pd.languages?.length) && (
                <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-8">
                  {[pd.location, pd.languages?.join(' · ')].filter(Boolean).join('  ·  ')}
                </p>
              )}

              <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                {primaryAction &&
                  (primaryAction.external ? (
                    <a href={primaryAction.href} target="_blank" rel="noopener noreferrer nofollow" className="px-8 py-4 bg-gradient-to-r from-purple-600 to-rose-600 text-white text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(168,85,247,0.25)] hover:scale-[1.03] transition-transform">
                      {primaryAction.label}
                    </a>
                  ) : (
                    <Link href={primaryAction.href} className="px-8 py-4 bg-gradient-to-r from-rose-600 to-purple-600 text-white text-xs font-bold uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(225,29,72,0.35)] hover:scale-[1.03] transition-transform">
                      {primaryAction.label}
                    </Link>
                  ))}
                {schedule.length > 0 && (
                  <a href="#live" className="px-8 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/5">
                    {t.hero.schedule}
                  </a>
                )}
                <a href="#contact" className="px-6 py-4 text-gray-400 text-xs uppercase tracking-[0.2em] hover:text-white">
                  {t.hero.collab} →
                </a>
              </div>

              {!onAir && upcoming && (
                <p className="mt-8 text-xs uppercase tracking-[0.25em] text-gray-400">
                  {upcoming.live ? (
                    <span className="text-white">● {t.nextShow.now}</span>
                  ) : (
                    <>
                      {t.nextShow.title}: <span className="text-white">{t.days[upcoming.slot.day]} {upcoming.slot.from}</span> · {t.nextShow.inTime} {formatCountdown(upcoming.startsInMinutes)}
                    </>
                  )}
                </p>
              )}
              {onAir && live && live.platforms.length > 0 && (
                <p className="mt-6 text-xs text-gray-400">
                  {t.live.alsoOn}:{' '}
                  {live.platforms.map((p, i) => (
                    <React.Fragment key={p.profileUrl}>
                      {i > 0 && ' · '}
                      <a href={p.profileUrl} target="_blank" rel="noopener noreferrer nofollow" className="text-white underline underline-offset-4">{p.label}</a>
                    </React.Fragment>
                  ))}
                </p>
              )}
            </div>

            <div className="order-1 lg:order-2 mx-auto w-full max-w-[210px] sm:max-w-xs lg:max-w-none">
              <div className="relative rounded-3xl p-[2px] bg-gradient-to-b from-purple-400/60 via-white/10 to-rose-500/40 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <div className="relative rounded-[22px] overflow-hidden aspect-[4/5] bg-[#111113]">
                  <img src={heroImage} alt={data.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {onAir && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-rose-600 text-white text-[10px] font-bold tracking-[0.3em] animate-pulse shadow-lg">
                      {t.live.onAir.toUpperCase()}
                    </span>
                  )}
                  {rating && (
                    <div className="absolute bottom-4 left-4 right-4 hidden sm:flex items-end justify-between gap-3">
                      <div className="px-3 py-2 bg-black/60 backdrop-blur-md border border-white/10">
                        <Stars rating={rating.average} />
                        <p className="text-[10px] uppercase tracking-widest text-gray-300 mt-1">{rating.average} · {rating.count} {t.reviews.reviews}</p>
                      </div>
                      {data.stats?.subscribers && (
                        <div className="px-3 py-2 bg-black/60 backdrop-blur-md border border-white/10 text-right">
                          <p className="text-lg font-bold text-white leading-none" style={cinzel}>{data.stats.subscribers}</p>
                          <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1">{t.stats.subscribers}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        {statEntries.length > 0 && (
          <section className="relative z-10 border-b border-white/5 bg-black/30">
            <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {statEntries.map((key) => (
                <div key={key}>
                  <div className="text-3xl font-bold text-white" style={cinzel}>{data.stats?.[key]}</div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mt-1">{t.stats[key]}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ABOUT */}
        <section id="about" className={sectionClass}>
          <div className="max-w-6xl mx-auto px-4">
            <Reveal><SectionHeader eyebrow={t.aboutMe} title={t.professional} /></Reveal>
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <Reveal className="lg:col-span-2 space-y-8">
                <div className={`${cardClass} p-8 md:p-10`}>
                  <div className={cardTopLine} />
                  <p className="text-lg text-gray-200 leading-relaxed font-light">{pd.experience || data.characteristics || t.characteristicsFallback}</p>
                  {pd.experience && data.characteristics && (
                    <p className="mt-6 pt-6 border-t border-white/10 text-gray-400 leading-relaxed font-light italic">“{data.characteristics}”</p>
                  )}
                  {(pd.tags?.length ?? 0) > 0 && (
                    <div className="mt-8 flex flex-wrap gap-2">
                      {pd.tags?.map((tag) => (
                        <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-widest border border-white/15 text-gray-300">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>

                {milestones.length > 0 && (
                  <div className={`${cardClass} p-8 md:p-10`}>
                    <div className={cardTopLine} />
                    <h3 className={cardTitle}>{t.career}</h3>
                    <ol className="relative border-l border-white/10 ml-2 space-y-8">
                      {milestones.map((m) => (
                        <li key={`${m.year}-${m.title}`} className="pl-6 relative">
                          <span className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(192,132,252,0.8)]" />
                          <p className="text-xs tracking-[0.25em] text-purple-300">{m.year}</p>
                          <p className="text-white font-medium mt-1">{m.title}</p>
                          {m.desc && <p className="text-sm text-gray-500 mt-1">{m.desc}</p>}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </Reveal>

              <Reveal delay={0.1} className="lg:sticky lg:top-32">
                <div className={`${cardClass} p-8`}>
                  <div className={cardTopLine} />
                  <h3 className={cardTitle}>{t.measurements}</h3>
                  <dl className="divide-y divide-white/5">
                    {facts.map(([label, value]) => (
                      <div key={label} className="flex items-baseline justify-between gap-4 py-3">
                        <dt className="text-[11px] uppercase tracking-wider text-gray-500">{label}</dt>
                        <dd className="text-sm text-white text-right">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* LIVE + PLATFORMS */}
        {(schedule.length > 0 || platformLinks.length > 0) && (
          <section id="live" className={`${sectionClass} bg-black/25 border-y border-white/5`}>
            <div className="max-w-6xl mx-auto px-4">
              <Reveal><SectionHeader eyebrow={t.nav.live} title={schedule.length ? t.schedule.title : t.findMe} /></Reveal>
              <div className="grid lg:grid-cols-5 gap-8 items-start">
                {schedule.length > 0 && (
                  <Reveal className="lg:col-span-3">
                    <ScheduleCard
                      slots={schedule}
                      timezone={timezone}
                      upcoming={upcoming}
                      now={now}
                      dayLabels={t.days}
                      platformName={platformName}
                      labels={t.schedule}
                    />
                  </Reveal>
                )}
                {platformLinks.length > 0 && (
                  <Reveal delay={0.1} className={schedule.length ? 'lg:col-span-2' : 'lg:col-span-5'}>
                    <div className={`${cardClass} p-6 md:p-8`}>
                      <div className={cardTopLine} />
                      <h3 className={cardTitle}>{t.findMe}</h3>
                      <ul className={schedule.length ? 'space-y-2' : 'grid sm:grid-cols-2 lg:grid-cols-3 gap-2'}>
                        {platformLinks.map(([id, link]) => (
                          <li key={id}>
                            <a href={link.url} target="_blank" rel="noopener noreferrer nofollow" className="flex items-center justify-between gap-3 px-4 py-3 border border-white/10 hover:border-purple-400/60 hover:bg-white/5 transition-colors">
                              <span>
                                <span className="block text-sm text-white font-medium">{platformName(id)}</span>
                                {link.username && <span className="block text-[11px] text-gray-500">{link.username}</span>}
                              </span>
                              <span aria-hidden className="text-gray-500">↗</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                )}
              </div>
            </div>
          </section>
        )}

        {/* PREFERENCES & BOUNDARIES */}
        <section className={sectionClass}>
          <div className="max-w-6xl mx-auto px-4">
            <Reveal><SectionHeader eyebrow={t.nav.about} title={t.preferences} /></Reveal>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: t.likesTitle, items: pd.likes?.length ? pd.likes : t.likesFallback, tone: 'emerald', mark: '✓' },
                { title: t.boundariesTitle, items: pd.boundaries?.length ? pd.boundaries : t.boundariesFallback, tone: 'rose', mark: '✕' },
              ].map((block) => (
                <Reveal key={block.title}>
                  <div className={`h-full bg-[#111113]/80 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:bg-white/5 transition-colors ${block.tone === 'emerald' ? 'border-t-emerald-500/50' : 'border-t-rose-500/50'}`}>
                    <div className="flex items-center mb-6">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 border ${block.tone === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                        <span className="font-bold">{block.mark}</span>
                      </div>
                      <h3 className={`text-xl font-medium ${block.tone === 'emerald' ? 'text-emerald-400' : 'text-rose-400'}`}>{block.title}</h3>
                    </div>
                    <div className="space-y-5">
                      {block.items.map((item, i) => {
                        const { title, desc } = splitItem(item);
                        return (
                          <div key={i} className="flex items-start">
                            <div className={`w-1.5 h-1.5 rounded-full mt-2 mr-4 flex-shrink-0 ${block.tone === 'emerald' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'}`} />
                            <div>
                              <h4 className="font-semibold text-gray-200 text-sm">{title}</h4>
                              {desc && <p className="text-gray-500 text-xs mt-1">{desc}</p>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              ))}
              {[
                { title: t.bestTitle, items: pd.bestInMe?.length ? pd.bestInMe : t.bestFallback, purple: true, icon: '✨' },
                { title: t.whyTitle, items: pd.whyWatchMe?.length ? pd.whyWatchMe : t.whyFallback, purple: false, icon: '★' },
              ].map((block) => (
                <Reveal key={block.title}>
                  <div className={`h-full bg-[#111113]/80 backdrop-blur-md rounded-2xl p-8 border border-white/5 hover:bg-white/5 transition-colors ${block.purple ? 'border-t-purple-500/50' : 'border-t-amber-500/50'}`}>
                    <div className="flex items-center mb-6">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 border ${block.purple ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-amber-500/10 border-amber-500/20 text-amber-400'}`}>
                        <span className="font-bold text-lg">{block.icon}</span>
                      </div>
                      <h3 className={`text-xl font-medium ${block.purple ? 'text-purple-400' : 'text-amber-400'}`}>{block.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {block.items.slice(0, 8).map((item, i) => (
                        <div key={i} className="flex items-center">
                          <span className={`mr-3 text-xs ${block.purple ? 'text-purple-500/60' : 'text-amber-500/60'}`}>◆</span>
                          <p className="text-gray-300 text-sm font-light">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY + VIDEOS */}
        {(gallery.length > 0 || videos.length > 0) && (
          <section id="gallery" className={`${sectionClass} bg-black/25 border-y border-white/5`}>
            <div className="max-w-6xl mx-auto px-4">
              <Reveal><SectionHeader eyebrow={t.nav.gallery} title={t.gallery} /></Reveal>
              {gallery.length > 0 && <Reveal><Gallery images={gallery} alt={t.galleryAlt} labels={t.lightbox} /></Reveal>}
              {videos.length > 0 && (
                <div className="mt-14">
                  <h3 className={cardTitle}>{t.videosTitle}</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video) => (
                      <figure key={video.url} className="rounded-2xl overflow-hidden border border-white/10 bg-black">
                        <video src={video.url} poster={video.poster} controls preload="none" playsInline className="w-full aspect-video object-cover" />
                        <figcaption className="px-4 py-3 text-xs text-gray-300 flex justify-between"><span>{video.title}</span>{video.duration && <span className="text-gray-500">{video.duration}</span>}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* REVIEWS */}
        {rating && data.testimonials && (
          <section id="reviews" className={sectionClass}>
            <div className="max-w-6xl mx-auto px-4">
              <Reveal><SectionHeader eyebrow={t.nav.reviews} title={t.reviews.title} /></Reveal>
              <Reveal className="flex items-center gap-4 mb-10">
                <span className="text-5xl font-bold text-white" style={cinzel}>{rating.average}</span>
                <span>
                  <Stars rating={rating.average} />
                  <span className="block text-[11px] uppercase tracking-widest text-gray-500 mt-1">{t.reviews.basedOn} {rating.count} {t.reviews.reviews}</span>
                </span>
              </Reveal>
              <div className="grid md:grid-cols-3 gap-6">
                {data.testimonials.map((review, i) => (
                  <Reveal key={review.name + review.text} delay={i * 0.08}>
                    <blockquote className={`${cardClass} p-6 h-full`}>
                      <div className={cardTopLine} />
                      <Stars rating={review.rating ?? 5} />
                      <p className="mt-4 text-sm text-gray-300 leading-relaxed italic">“{review.text}”</p>
                      <footer className="mt-4 text-[11px] uppercase tracking-widest text-gray-500">— {review.name}</footer>
                    </blockquote>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* TRUST */}
        <section className="relative z-10 pb-16 md:pb-24">
          <div className="max-w-6xl mx-auto px-4">
            <Reveal>
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/[0.03] p-8 md:p-10">
                <h3 className="text-amber-300 font-bold uppercase tracking-wider text-sm mb-6">🛡 {t.trust.title}</h3>
                <ul className="grid md:grid-cols-2 gap-x-10 gap-y-4">
                  {t.trust.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-gray-300 leading-relaxed"><span className="text-amber-400 mt-0.5">✓</span>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        {pd.faq?.length ? (
          <section id="faq" className={`${sectionClass} bg-black/25 border-y border-white/5`}>
            <div className="max-w-3xl mx-auto px-4">
              <Reveal><SectionHeader eyebrow={t.nav.faq} title={t.faqTitle} /></Reveal>
              <div className="space-y-3">
                {pd.faq.map((item) => (
                  <details key={item.q} className="group border border-white/10 bg-white/5 rounded-xl px-6 py-4 open:border-purple-400/30">
                    <summary className="cursor-pointer list-none flex items-center justify-between gap-4 text-sm text-white font-medium">
                      {item.q}
                      <span className="text-purple-300 text-xl transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-gray-400 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* CONTACT */}
        <section id="contact" className={sectionClass}>
          <div className="max-w-3xl mx-auto px-4">
            <Reveal>
              <div className={`${cardClass} p-10 md:p-14 text-center space-y-5`}>
                <div className={cardTopLine} />
                <h2 className="text-3xl md:text-4xl font-bold text-white" style={cinzel}>{t.contactTitle}</h2>
                <p className="text-gray-400 max-w-lg mx-auto">{t.contactText}</p>
                <Link href="/contact" className="inline-block mt-2 px-10 py-4 bg-gradient-to-r from-purple-600 to-rose-600 text-white text-xs font-bold uppercase tracking-[0.25em] hover:opacity-90">
                  {t.contactCta}
                </Link>
              </div>
            </Reveal>
            <p className="pt-10 text-center text-[10px] uppercase tracking-widest text-gray-600">{t.ageNotice}</p>
          </div>
        </section>

        <MobileActionBar
          primary={primaryAction}
          shareLabel={copied ? t.copied : t.share}
          onShare={() => void share()}
        />
      </main>
    </>
  );
};

export default ProfileTemplate;
