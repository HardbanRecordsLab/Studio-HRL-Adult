import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/constants';
import { useMessages } from '@/i18n';
import { common } from '@/i18n/common';
import LanguageSwitcher from '@/components/common/LanguageSwitcher';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { nav } = useMessages(common);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: nav.home, href: ROUTES.HOME },
    { name: nav.about, href: '/#philosophy' },
    { name: nav.contact, href: '/contact' },
    { name: nav.casting, href: ROUTES.CASTING },
    { name: nav.academy, href: ROUTES.ACADEMY },
    { name: nav.portfolio, href: ROUTES.PORTFOLIO },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] h-[76px] px-[5%] flex items-center justify-between transition-all duration-500 border-b ${isScrolled ? 'bg-dark/95 backdrop-blur-xl border-gold/10' : 'bg-gradient-to-b from-dark/80 to-transparent border-transparent'}`}>
      <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-gold/40 group-hover:border-gold transition-colors">
          <img src="/logo/studio hrl adultbezła logo.png" alt="Studio HRL Adult" className="w-full h-full object-cover" />
        </div>
        <span className="font-cormorant text-lg font-semibold text-gold tracking-[0.2em] uppercase">Studio HRL Adult</span>
      </Link>

      <ul className="hidden xl:flex items-center gap-1">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={`relative px-3 py-2 text-[9px] font-medium tracking-[0.2em] uppercase transition-colors group ${router.pathname === link.href ? 'text-gold' : 'text-dim hover:text-gold'}`}>
              {link.name}
              <span className={`absolute bottom-0 left-3 right-3 h-px bg-gold transition-transform duration-300 origin-center ${router.pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        <Link href="/admin" className="hidden lg:block px-4 py-2 border border-gold/20 text-gold/60 text-[8px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-gold/5 hover:text-gold">{nav.admin}</Link>
        <Link href={ROUTES.CASTING} className="px-6 py-2.5 bg-crimson-gradient text-white text-[9px] font-bold tracking-[0.2em] uppercase transition-all hover:opacity-90 shadow-lg shadow-crimson/20">{nav.joinNow}</Link>
      </div>
    </nav>
  );
};

export default Navigation;
