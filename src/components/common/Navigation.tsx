import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ROUTES } from '@/utils/constants';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Start', href: ROUTES.HOME },
    { name: 'Filozofia', href: '/#philosophy' },
    { name: 'Model', href: '/#model' },
    { name: 'Studia', href: '/#studios' },
    { name: 'Casting', href: ROUTES.CASTING },
    { name: 'Akademia', href: ROUTES.ACADEMY },
    { name: 'Portfolio', href: ROUTES.PORTFOLIO },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] h-[76px] px-[5%] flex items-center justify-between transition-all duration-500 border-b ${
      isScrolled 
        ? 'bg-dark/95 backdrop-blur-xl border-gold/10' 
        : 'bg-gradient-to-b from-dark/80 to-transparent border-transparent'
    }`}>
      {/* Brand */}
      <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
        <div className="w-9 h-9 rounded-full overflow-hidden border border-gold/40 group-hover:border-gold transition-colors">
          <img 
            src="/logo/studio hrl adultbezła logo.png" 
            alt="Studio HRL Adult" 
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-cormorant text-lg font-semibold text-gold tracking-[0.2em] uppercase">
          Studio HRL Adult
        </span>
      </Link>

      {/* Main Nav */}
      <ul className="hidden lg:flex items-center gap-1">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link 
              href={link.href}
              className={`relative px-4 py-2 text-[10px] font-medium tracking-[0.2em] uppercase transition-colors group ${
                router.pathname === link.href ? 'text-gold' : 'text-dim hover:text-gold'
              }`}
            >
              {link.name}
              <span className={`absolute bottom-0 left-4 right-4 h-px bg-gold transition-transform duration-300 origin-center ${
                router.pathname === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
          </li>
        ))}
      </ul>

      {/* Right CTA */}
      <div className="flex items-center gap-4">
        <Link 
          href={ROUTES.CASTING}
          className="px-6 py-2.5 border border-gold/40 text-gold text-[9px] font-bold tracking-[0.2em] uppercase transition-all hover:bg-gold hover:text-dark"
        >
          Dołącz Teraz
        </Link>
      </div>
    </nav>
  );
};

export default Navigation;
