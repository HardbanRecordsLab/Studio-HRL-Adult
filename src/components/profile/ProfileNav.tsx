import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

interface NavItem {
  id: string;
  label: string;
}

interface ProfileNavProps {
  backLabel: string;
  items: NavItem[];
  shareLabel: string;
  onShare: () => void;
}

const scrollToSection = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/** Sticky profile navigation with a scroll-spy that highlights the section being read. */
const ProfileNav: React.FC<ProfileNavProps> = ({ backLabel, items, shareLabel, onShare }) => {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const ids = items.map((i) => i.id).join(',');

  useEffect(() => {
    const elements = ids
      .split(',')
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    elements.forEach((el) => observer.observe(el));
    // In the hero (above the first section) nothing is highlighted.
    const onScroll = () => {
      if (window.scrollY < 120) setActive('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [ids]);

  const link = (item: NavItem, className: string) => (
    <a
      key={item.id}
      href={`#${item.id}`}
      onClick={scrollToSection(item.id)}
      aria-current={active === item.id ? 'true' : undefined}
      className={`${className} ${active === item.id ? 'text-white border-purple-400' : 'text-gray-400 border-transparent hover:text-white'}`}
    >
      {item.label}
    </a>
  );

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0c]/85 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/portfolio" className="text-[11px] uppercase tracking-[0.25em] text-gray-400 hover:text-white whitespace-nowrap">
          ← {backLabel}
        </Link>
        <nav aria-label="Profile sections" className="hidden md:flex items-center gap-1">
          {items.map((item) => link(item, 'px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] border-b-2 transition-colors'))}
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={onShare} className="hidden sm:block px-4 py-2 border border-white/15 text-[10px] uppercase tracking-[0.2em] hover:border-white/40">
            {shareLabel}
          </button>
          <LanguageSwitcher />
        </div>
      </div>
      <nav aria-label="Profile sections" className="md:hidden flex overflow-x-auto px-2 border-t border-white/5 [scrollbar-width:none]">
        {items.map((item) => link(item, 'shrink-0 px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] border-b-2'))}
      </nav>
    </header>
  );
};

export default ProfileNav;
