import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/utils/constants';

interface NavigationProps {
  currentPage?: string;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push(ROUTES.HOME);
  };

  const navItems = [
    { name: 'Start', href: ROUTES.HOME },
    { name: 'Casting', href: ROUTES.CASTING },
    { name: 'Akademia', href: ROUTES.ACADEMY },
    { name: 'Portfolio', href: ROUTES.PORTFOLIO },
  ];

  const adminNavItems = [
    { name: 'Dashboard', href: `${ROUTES.ADMIN}/dashboard` },
    { name: 'Partnerki', href: `${ROUTES.ADMIN}/partners` },
    { name: 'Treści', href: `${ROUTES.ADMIN}/content` },
    { name: 'Finanse', href: `${ROUTES.ADMIN}/finance` },
    { name: 'Ustawienia', href: `${ROUTES.ADMIN}/settings` },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark/95 backdrop-blur-md border-b border-gold/20' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={ROUTES.HOME} className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gold rounded-sm flex items-center justify-center transform transition-transform group-hover:scale-105">
                <img 
                  src="/logo/studio hrl adultbezła logo.png" 
                  alt="Studio HRL Adult Logo" 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <span className="text-gold font-bebas text-xl tracking-wider hidden sm:block">
                STUDIO HRL ADULT
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {/* Main Navigation */}
              <div className="flex items-center space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-montserrat transition-colors ${
                      currentPage === item.href 
                        ? 'text-gold' 
                        : 'text-dim hover:text-gold'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Admin Navigation */}
              {isAuthenticated && user?.role === 'admin' && (
                <div className="flex items-center space-x-6 border-l border-gold/20 pl-6">
                  {adminNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-sm font-montserrat transition-colors ${
                        currentPage?.includes(item.href) 
                          ? 'text-gold' 
                          : 'text-dim hover:text-gold'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Right side buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                      <span className="text-gold text-sm font-montserrat">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-text text-sm font-montserrat">
                      {user?.name}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 border border-crimson text-crimson text-sm font-montserrat rounded-sm hover:bg-crimson hover:text-dark transition-colors"
                  >
                    Wyloguj
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href={ROUTES.LOGIN}
                    className="px-4 py-2 border border-gold text-gold text-sm font-montserrat rounded-sm hover:bg-gold hover:text-dark transition-colors"
                  >
                    Zaloguj
                  </Link>
                  <Link
                    href={ROUTES.CASTING}
                    className="px-4 py-2 bg-gold text-dark text-sm font-montserrat font-semibold rounded-sm hover:bg-yellow-500 transition-colors transform hover:scale-105"
                  >
                    Aplikuj Teraz
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gold hover:text-yellow-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden bg-dark/95 backdrop-blur-md border-t border-gold/20">
            <div className="px-4 py-6 space-y-4">
              {/* Main Navigation */}
              <div className="space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block text-sm font-montserrat transition-colors ${
                      currentPage === item.href 
                        ? 'text-gold' 
                        : 'text-dim hover:text-gold'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Admin Navigation */}
              {isAuthenticated && user?.role === 'admin' && (
                <div className="space-y-3 border-t border-gold/20 pt-4">
                  {adminNavItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block text-sm font-montserrat transition-colors ${
                        currentPage?.includes(item.href) 
                          ? 'text-gold' 
                          : 'text-dim hover:text-gold'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Auth buttons */}
              <div className="space-y-3 border-t border-gold/20 pt-4">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                        <span className="text-gold text-sm font-montserrat">
                          {user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-text text-sm font-montserrat">
                        {user?.name}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 border border-crimson text-crimson text-sm font-montserrat rounded-sm hover:bg-crimson hover:text-dark transition-colors"
                    >
                      Wyloguj
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={ROUTES.LOGIN}
                      className="block w-full px-4 py-2 border border-gold text-gold text-sm font-montserrat rounded-sm hover:bg-gold hover:text-dark transition-colors text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Zaloguj
                    </Link>
                    <Link
                      href={ROUTES.CASTING}
                      className="block w-full px-4 py-2 bg-gold text-dark text-sm font-montserrat font-semibold rounded-sm hover:bg-yellow-500 transition-colors transform hover:scale-105 text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Aplikuj Teraz
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Custom Cursor */}
      <div className="custom-cursor" />
      <div className="custom-cursor-ring" />
      <div className="grain-overlay" />
    </>
  );
};

export default Navigation;
