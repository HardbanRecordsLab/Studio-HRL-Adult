import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useMessages } from '@/i18n';
import { liveCopy } from '@/i18n/live';
import { QUALITY_PRESETS, mediaSupported } from '@/lib/whip';
import { useCameraPublisher } from '@/hooks/useCameraPublisher';
import CameraPreview from '@/components/live/CameraPreview';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

const KEY_RE = /^[A-Za-z0-9_-]{16,128}$/;

/**
 * Phone camera: opened from the QR code in the admin Live Studio (https://site/studio/camera#<key>).
 * The key stays in the URL fragment, so it is never sent to a server or written to access logs.
 * The page only sends the picture; the studio operator starts/stops the broadcast to the platforms.
 */
const PhoneCameraPage: React.FC = () => {
  const { camera: t } = useMessages(liveCopy);
  const cam = useCameraPublisher('mid');
  const [key, setKey] = useState<string | null | undefined>(undefined);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const readKey = () => {
      const fromHash = window.location.hash.replace(/^#k?=?/, '');
      setKey(KEY_RE.test(fromHash) ? fromHash : null);
    };
    readKey();
    setSupported(mediaSupported());
    window.addEventListener('hashchange', readKey);
    return () => window.removeEventListener('hashchange', readKey);
  }, []);

  const liveBase = (process.env.NEXT_PUBLIC_LIVE_URL || '').replace(/\/+$/, '');
  const whipUrl = key && liveBase ? `${liveBase}/live/${key}/whip` : null;
  const sending = cam.status === 'connecting' || cam.status === 'sending' || cam.status === 'reconnecting';
  const statusText = cam.error === 'denied' ? t.denied : t.status[cam.status];

  const toggleSending = async () => {
    if (sending) {
      await cam.unpublish();
    } else if (whipUrl) {
      await cam.publish(whipUrl).catch(() => undefined);
    }
  };

  return (
    <>
      <Head>
        <title>{t.meta}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>

      <div className="min-h-[100dvh] bg-[#07050A] text-white flex flex-col">
        <header className="flex items-center justify-between gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-3">
          <div>
            <h1 className="font-cormorant text-xl text-[#c9a84c] italic">{t.title}</h1>
            <p className="text-[11px] text-gray-400 leading-snug max-w-xs">{t.intro}</p>
          </div>
          <LanguageSwitcher />
        </header>

        {key === null ? (
          <p className="m-4 p-4 border border-red-500/30 text-red-400 text-sm">{t.invalid}</p>
        ) : key && !whipUrl ? (
          <p className="m-4 p-4 border border-[#c9a84c]/30 text-[#c9a84c] text-sm">{t.notConfigured}</p>
        ) : !supported ? (
          <p className="m-4 p-4 border border-[#c9a84c]/30 text-[#c9a84c] text-sm">{t.needsHttps}</p>
        ) : (
          <>
            <CameraPreview
              stream={cam.stream}
              mirror={cam.facing === 'user'}
              placeholder={t.status.off}
              className="flex-1 min-h-[40dvh] mx-0"
            />

            <div className="px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] space-y-3 bg-[#0d0d0d] border-t border-white/10">
              <div className="flex items-center gap-2 text-xs">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    cam.status === 'sending' ? 'bg-red-500 animate-pulse' : cam.status === 'failed' ? 'bg-red-900' : 'bg-gray-600'
                  }`}
                />
                <span className="uppercase tracking-widest text-gray-300">{statusText}</span>
              </div>

              {!cam.stream ? (
                <button
                  onClick={() => void cam.startCamera().catch(() => undefined)}
                  className="w-full py-4 bg-[#c9a84c] text-black text-sm font-bold uppercase tracking-widest"
                >
                  {t.start}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => void toggleSending()}
                    className={`w-full py-4 text-sm font-bold uppercase tracking-widest ${sending ? 'bg-red-600 text-white' : 'bg-[#9b1f35] text-white'}`}
                  >
                    {sending ? t.stop : t.goLive}
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => void cam.flip().catch(() => undefined)} className="py-3 border border-white/15 text-xs uppercase tracking-widest">
                      {t.flip}
                    </button>
                    <button onClick={cam.toggleMute} className="py-3 border border-white/15 text-xs uppercase tracking-widest">
                      {cam.muted ? t.unmute : t.mute}
                    </button>
                  </div>
                  <label className="flex items-center justify-between gap-3 text-[11px] uppercase tracking-widest text-gray-400">
                    {t.quality}
                    <select
                      value={cam.quality}
                      disabled={sending}
                      onChange={(e) => cam.setQuality(e.target.value as typeof cam.quality)}
                      className="bg-black border border-white/15 text-white text-xs px-2 py-2 disabled:opacity-40"
                    >
                      {QUALITY_PRESETS.map((p) => (
                        <option key={p.id} value={p.id}>{t.qualities[p.id]}</option>
                      ))}
                    </select>
                  </label>
                </>
              )}
              <p className="text-[10px] text-gray-500 leading-snug">{t.note}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default PhoneCameraPage;
