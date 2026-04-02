import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-2 border-t border-gold/12 pt-16 pb-9 px-[7%] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
        {/* Brand Col */}
        <div className="lg:col-span-2 space-y-6">
          <Link href={ROUTES.HOME} className="block group">
            <span className="font-cormorant text-xl font-semibold text-gold tracking-[0.15em] uppercase">
              Studio HRL Adult
            </span>
          </Link>
          <p className="text-dim text-xs font-light italic leading-relaxed max-w-sm">
            Profesjonalna platforma produkcyjno-dystrybucyjna treści 18+. 
            Sztuka, jakość i bezpieczeństwo na każdym etapie Twojej kariery.
          </p>
        </div>

        {/* Links Col 1 */}
        <div className="space-y-6">
          <h4 className="text-gold text-[9px] font-bold tracking-[0.3em] uppercase">Platforma</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href={ROUTES.HOME} className="text-dim hover:text-gold text-xs transition-colors">Start</Link></li>
            <li><Link href="/#philosophy" className="text-dim hover:text-gold text-xs transition-colors">Filozofia</Link></li>
            <li><Link href="/#model" className="text-dim hover:text-gold text-xs transition-colors">Model 60/30/10</Link></li>
            <li><Link href="/#studios" className="text-dim hover:text-gold text-xs transition-colors">Nasze Studia</Link></li>
          </ul>
        </div>

        {/* Links Col 2 */}
        <div className="space-y-6">
          <h4 className="text-gold text-[9px] font-bold tracking-[0.3em] uppercase">Twórca</h4>
          <ul className="flex flex-col gap-3">
            <li><Link href={ROUTES.CASTING} className="text-dim hover:text-gold text-xs transition-colors">Casting</Link></li>
            <li><Link href={ROUTES.ACADEMY} className="text-dim hover:text-gold text-xs transition-colors">Akademia</Link></li>
            <li><Link href={ROUTES.PORTFOLIO} className="text-dim hover:text-gold text-xs transition-colors">Portfolio</Link></li>
            <li><Link href="#" className="text-dim hover:text-gold text-xs transition-colors">FAQ</Link></li>
          </ul>
        </div>

        {/* Links Col 3 */}
        <div className="space-y-6">
          <h4 className="text-gold text-[9px] font-bold tracking-[0.3em] uppercase">Kontakt</h4>
          <ul className="flex flex-col gap-3">
            <li><a href="mailto:hrl-adult-studio@hardbanrecordslab.online" className="text-dim hover:text-gold text-xs transition-colors">Email</a></li>
            <li><a href="https://t.me/HRL_Adult" className="text-dim hover:text-gold text-xs transition-colors">Telegram</a></li>
            <li><a href="#" className="text-dim hover:text-gold text-xs transition-colors">Lokalizacja</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="pt-8 border-t border-gold/10 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-dim/60 tracking-wider">
          © {currentYear} Studio HRL Adult. Wszelkie prawa zastrzeżone.
        </p>
        <div className="flex gap-8">
          <Link href="#" className="text-[9px] text-dim/60 hover:text-gold tracking-[0.1em] uppercase transition-colors">Polityka Prywatności</Link>
          <Link href="#" className="text-[9px] text-dim/60 hover:text-gold tracking-[0.1em] uppercase transition-colors">Regulamin</Link>
          <span className="text-[9px] text-crimson font-bold tracking-[0.2em] uppercase border border-crimson/30 px-2 py-0.5">18+ Only</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
