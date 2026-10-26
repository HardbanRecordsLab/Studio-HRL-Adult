import React, { useEffect, useRef } from 'react';

interface HlsPlayerProps {
  src: string;
  className?: string;
  onError?: () => void;
}

/** Plays an HLS playlist: natively on Safari/iOS, through hls.js everywhere else. */
const HlsPlayer: React.FC<HlsPlayerProps> = ({ src, className = '', onError }) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let destroyed = false;
    let cleanup = () => {};

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src;
      void video.play().catch(() => undefined);
    } else {
      import('hls.js').then(({ default: Hls }) => {
        if (destroyed) return;
        if (!Hls.isSupported()) return onError?.();
        const hls = new Hls({ lowLatencyMode: true, liveSyncDurationCount: 3 });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => void video.play().catch(() => undefined));
        hls.on(Hls.Events.ERROR, (_event, data) => {
          if (!data.fatal) return;
          if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad();
          else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError();
          else onError?.();
        });
        cleanup = () => hls.destroy();
      });
    }

    return () => {
      destroyed = true;
      cleanup();
      video.removeAttribute('src');
      video.load();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // muted: browsers only allow autoplay without sound; viewers unmute with the controls.
  return <video ref={ref} className={className} controls muted playsInline autoPlay />;
};

export default HlsPlayer;
