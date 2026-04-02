import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'PLATFORMA',
      links: [
        { name: 'Start', href: ROUTES.HOME },
        { name: 'Filozofia', href: '#philosophy' },
        { name: 'Model Współpracy', href: '#model' },
        { name: 'Studia', href: '#studios' }
      ]
    },
    {
      title: 'DLA TWÓRCY',
      links: [
        { name: 'Casting', href: ROUTES.CASTING },
        { name: 'Akademia', href: ROUTES.ACADEMY },
        { name: 'Zasady współpracy', href: '#' },
        { name: 'FAQ', href: '#' }
      ]
    },
    {
      title: 'KONTAKT',
      links: [
        { name: 'Email: hrl-adult-studio@hardbanrecordslab.online', href: 'mailto:hrl-adult-studio@hardbanrecordslab.online' },
        { name: 'Telegram: @HRL_Adult', href: 'https://t.me/HRL_Adult' },
        { name: 'Formularz kontaktowy', href: ROUTES.CASTING },
        { name: 'Lokalizacja: Warszawa / Kraków', href: '#' }
      ]
    }
  ];

  return (
    <footer className="bg-dark2 border-t border-gold/10 py-16 px-[6%] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gold rounded-sm flex items-center justify-center">
              <img 
                src="/logo/studio hrl adultbezła logo.png" 
                alt="Studio HRL Adult Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <span className="text-gold font-bebas text-xl tracking-wider">
              STUDIO HRL ADULT
            </span>
          </div>
          <p className="text-dim font-montserrat text-[10.5px] italic leading-loose">
            Profesjonalna platforma produkcyjno-dystrybucyjna treści 18+. 
            Sztuka, jakość i bezpieczeństwo na każdym etapie produkcji.
          </p>
        </div>

        {footerLinks.map((column, index) => (
          <div key={index} className="space-y-6">
            <h4 className="text-gold font-montserrat text-[8px] font-bold tracking-[0.28em] uppercase">
              {column.title}
            </h4>
            <ul className="space-y-3">
              {column.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link 
                    href={link.href}
                    className="text-dim hover:text-gold font-montserrat text-[10.5px] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-gold/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-dim font-montserrat text-[9px] tracking-widest uppercase">
          © {currentYear} Studio HRL Adult. Wszelkie prawa zastrzeżone.
        </span>
        <div className="flex items-center gap-6">
          <Link href="#" className="text-dim hover:text-gold font-montserrat text-[9px] tracking-widest uppercase transition-colors">
            Polityka Prywatności
          </Link>
          <Link href="#" className="text-dim hover:text-gold font-montserrat text-[9px] tracking-widest uppercase transition-colors">
            Regulamin
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
