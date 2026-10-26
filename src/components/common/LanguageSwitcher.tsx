import React from 'react';
import { useRouter } from 'next/router';
import { LOCALES, Locale, toLocale } from '@/i18n';

const LABELS: Record<Locale, { short: string; long: string }> = {
  en: { short: 'EN', long: 'English' },
  pl: { short: 'PL', long: 'Polski' },
};

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const router = useRouter();
  const active = toLocale(router.locale);

  const switchTo = (locale: Locale) => {
    if (locale === active) return;
    router.push({ pathname: router.pathname, query: router.query }, router.asPath, { locale, scroll: false });
  };

  return (
    <div role="group" aria-label="Language" className={`flex items-center border border-gold/20 ${className}`}>
      {LOCALES.map((locale) => (
        <button
          key={locale}
          type="button"
          lang={locale}
          title={LABELS[locale].long}
          aria-pressed={locale === active}
          onClick={() => switchTo(locale)}
          className={`px-3 py-2 text-[9px] font-bold tracking-[0.2em] uppercase transition-colors ${
            locale === active ? 'bg-gold text-dark' : 'text-gold/70 hover:text-gold'
          }`}
        >
          {LABELS[locale].short}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
