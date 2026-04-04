import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-2 border-t border-gold/10 pt-24 pb-12 px-[7%] overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand Col */}
          <div className="space-y-8">
            <Link href={ROUTES.HOME} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full border border-gold/30 p-1">
                <img src="/logo/studio hrl adultbezła logo.png" alt="HRL" className="w-full h-full object-contain" />
              </div>
              <span className="font-cormorant text-xl font-semibold text-gold tracking-widest uppercase">HRL Adult</span>
            </Link>
            <p className="text-dim text-[11px] font-light italic leading-loose max-w-xs">
              Poland's foremost platform for independent adult production and distribution. 
              Defined by quality, driven by success.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-xs text-gold hover:border-gold transition-colors">𝕏</a>
              <a href="#" className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-xs text-gold hover:border-gold transition-colors">IG</a>
              <a href="https://t.me/HRL_Adult" className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center text-xs text-gold hover:border-gold transition-colors">TG</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h4 className="text-white text-[10px] font-bold tracking-[0.3em] uppercase">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              {['Home', 'About Us', 'Studios', 'Academy', 'Casting'].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-dim hover:text-gold text-[11px] transition-colors font-light uppercase tracking-widest">{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-8">
            <h4 className="text-white text-[10px] font-bold tracking-[0.3em] uppercase">Legal</h4>
            <ul className="flex flex-col gap-4">
              <li>
                <Link href="/privacy" className="text-dim hover:text-gold text-[11px] transition-colors font-light uppercase tracking-widest">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/regulamin" className="text-dim hover:text-gold text-[11px] transition-colors font-light uppercase tracking-widest">Terms of Service</Link>
              </li>
              <li>
                <Link href="/rodo" className="text-dim hover:text-gold text-[11px] transition-colors font-light uppercase tracking-widest">RODO / GDPR</Link>
              </li>
              <li>
                <Link href="/umowa-tworca" className="text-dim hover:text-gold text-[11px] transition-colors font-light uppercase tracking-widest">Umowa z Twórcą</Link>
              </li>
            </ul>
          </div>

          {/* Contact / Newsletter */}
          <div className="space-y-8">
            <h4 className="text-white text-[10px] font-bold tracking-[0.3em] uppercase">Partner With Us</h4>
            <p className="text-dim text-[11px] font-light leading-relaxed">
              Stay updated with our latest membership plans and production news.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="w-full bg-dark border-b border-gold/20 py-3 text-[10px] text-white outline-none focus:border-gold transition-colors"
              />
              <button className="absolute right-0 bottom-3 text-gold text-[10px] font-bold tracking-widest uppercase">
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gold/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[9px] text-dim/40 tracking-[0.2em] uppercase">
            © {currentYear} Studio HRL Adult. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[9px] text-crimson font-bold tracking-[0.3em] uppercase border border-crimson/20 px-3 py-1">18+ Only</span>
            <div className="h-px w-12 bg-gold/20" />
            <span className="text-[9px] text-gold/40 tracking-[0.3em] uppercase">Designed for Excellence</span>
          </div>
        </div>
      </div>
      
      {/* Decorative Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-grain" />
    </footer>
  );
};

export default Footer;
