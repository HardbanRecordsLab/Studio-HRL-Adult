import React, { useCallback, useEffect, useRef, useState } from 'react';

interface GalleryProps {
  images: string[];
  alt: string;
  labels: { close: string; prev: string; next: string };
}

/** Editorial photo grid (first picture featured) with a keyboard- and swipe-friendly lightbox. */
const Gallery: React.FC<GalleryProps> = ({ images, alt, labels }) => {
  const [open, setOpen] = useState<number | null>(null);
  const touchStart = useRef<number | null>(null);

  const go = useCallback(
    (delta: number) => setOpen((i) => (i === null ? null : (i + delta + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, go]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[minmax(140px,1fr)]">
        {images.map((src, i) => (
          <button
            key={src + i}
            onClick={() => setOpen(i)}
            className={`group relative overflow-hidden rounded-2xl bg-[#111113] min-h-[140px] focus:outline-none focus:ring-2 focus:ring-purple-400 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
          >
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover brightness-90 group-hover:brightness-110 group-hover:scale-105 transition duration-700"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setOpen(null)}
          onTouchStart={(e) => {
            touchStart.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStart.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStart.current;
            touchStart.current = null;
            if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1);
          }}
        >
          <button autoFocus aria-label={labels.close} className="absolute top-4 right-4 text-white text-3xl px-3" onClick={() => setOpen(null)}>
            ×
          </button>
          <button aria-label={labels.prev} className="absolute left-2 md:left-6 text-white text-5xl px-3" onClick={(e) => { e.stopPropagation(); go(-1); }}>
            ‹
          </button>
          <img src={images[open]} alt={`${alt} ${open + 1}`} className="max-h-[88vh] max-w-[92vw] object-contain" onClick={(e) => e.stopPropagation()} />
          <button aria-label={labels.next} className="absolute right-2 md:right-6 text-white text-5xl px-3" onClick={(e) => { e.stopPropagation(); go(1); }}>
            ›
          </button>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs tracking-widest text-gray-400">
            {open + 1} / {images.length}
          </span>
        </div>
      )}
    </>
  );
};

export default Gallery;
