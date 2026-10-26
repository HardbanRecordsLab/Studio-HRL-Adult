import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import HlsPlayer from '@/components/live/HlsPlayer';
import { useMessages } from '@/i18n';
import { liveCopy } from '@/i18n/live';
import type { PublicLiveStatus } from '@/pages/api/live/[handle]';

const POLL_MS = 8000;

/** Our own live page for a profile: HLS from the restreamer, plus links to the platforms it is also live on. */
const LivePage: React.FC = () => {
  const router = useRouter();
  const { viewer: t } = useMessages(liveCopy);
  const handle = typeof router.query.handle === 'string' ? router.query.handle : '';
  const [status, setStatus] = useState<PublicLiveStatus | null>(null);
  const [copied, setCopied] = useState(false);

  const refresh = useCallback(async () => {
    if (!handle) return;
    try {
      const res = await fetch(`/api/live/${encodeURIComponent(handle)}`);
      if (res.ok) setStatus(await res.json());
    } catch {
      /* keep the last known status */
    }
  }, [handle]);

  useEffect(() => {
    void refresh();
    const timer = setInterval(() => void refresh(), POLL_MS);
    return () => clearInterval(timer);
  }, [refresh]);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title: status?.name ?? 'Studio HRL Adult', url }).catch(() => undefined);
    } else {
      await navigator.clipboard.writeText(url).catch(() => undefined);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const name = status?.name ?? handle;
  const watching = status?.live && status.onAir && status.hlsUrl;

  return (
    <>
      <Head>
        <title>{`${name} · ${t.meta} | Studio HRL Adult`}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-28 pb-24 px-[5%] max-w-5xl mx-auto space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="h1-premium !text-4xl md:!text-5xl">{name}</h1>
              {status?.live && (
                <span className={`px-3 py-1 text-[10px] font-bold tracking-[0.3em] ${watching ? 'bg-crimson text-white animate-pulse' : 'border border-gold/40 text-gold'}`}>
                  {watching ? t.live : t.startingSoon}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <Link href={`/profile/${handle}`} className="btn-outline">{t.backToProfile}</Link>
              <button onClick={() => void share()} className="btn-outline">{copied ? t.copied : t.share}</button>
            </div>
          </div>

          {status?.title && <p className="font-cormorant text-2xl italic text-dim">{status.title}</p>}

          <div className="aspect-video bg-black border border-gold/10 relative">
            {watching ? (
              <HlsPlayer src={status.hlsUrl as string} className="absolute inset-0 w-full h-full" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center p-6">
                <p className="font-cormorant text-3xl text-gold italic">
                  {status?.live ? t.startingSoon : t.offline}
                </p>
                {!status?.live && <p className="text-xs text-dim max-w-sm">{t.offlineText}</p>}
              </div>
            )}
          </div>

          {status && status.platforms.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-gold">{t.alsoOn}</h2>
              <div className="flex flex-wrap gap-3">
                {status.platforms.map((p) => (
                  <a key={p.profileUrl} href={p.profileUrl} target="_blank" rel="noopener noreferrer nofollow" className="btn-outline">
                    {p.label}
                  </a>
                ))}
              </div>
            </section>
          )}

          <p className="text-[10px] text-dim/60 tracking-widest uppercase">{t.ageNotice}</p>
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>
    </>
  );
};

export default LivePage;
