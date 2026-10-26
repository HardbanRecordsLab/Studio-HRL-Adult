import React from 'react';
import Link from 'next/link';

interface MobileActionBarProps {
  primary: { label: string; href: string; external?: boolean; live?: boolean } | null;
  shareLabel: string;
  onShare: () => void;
}

/** Thumb-reach call to action on phones: watch live when on air, otherwise follow on the main platform. */
const MobileActionBar: React.FC<MobileActionBarProps> = ({ primary, shareLabel, onShare }) => (
  <div className="md:hidden fixed bottom-0 inset-x-0 z-40 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-[#0a0a0c]/90 backdrop-blur-xl border-t border-white/10 flex gap-3">
    {primary &&
      (primary.external ? (
        <a
          href={primary.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex-1 text-center py-3 bg-gradient-to-r from-purple-600 to-rose-600 text-white text-[11px] font-bold uppercase tracking-[0.2em]"
        >
          {primary.label}
        </a>
      ) : (
        <Link
          href={primary.href}
          className={`flex-1 text-center py-3 text-white text-[11px] font-bold uppercase tracking-[0.2em] ${primary.live ? 'bg-rose-600 animate-pulse' : 'bg-gradient-to-r from-purple-600 to-rose-600'}`}
        >
          {primary.label}
        </Link>
      ))}
    <button onClick={onShare} className="px-5 py-3 border border-white/20 text-[11px] uppercase tracking-[0.2em] text-gray-200">
      {shareLabel}
    </button>
  </div>
);

export default MobileActionBar;
