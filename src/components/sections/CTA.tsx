import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';

const CTA: React.FC = () => {
  return (
    <section className="py-24 px-[6%] bg-dark2 overflow-hidden" id="cta">
      <div className="bg-gradient-to-br from-dark3 to-dark4 border border-gold/15 p-16 text-center max-w-5xl mx-auto space-y-8">
        <h2 className="text-white font-bebas text-5xl md:text-7xl tracking-tight leading-none uppercase">
          Twoja kariera zaczyna się <span className="text-gold italic">tutaj</span>
        </h2>
        <p className="text-dim font-montserrat text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Nie czekaj, dołącz do grona profesjonalnych twórczyń treści dla dorosłych. 
          Zapewniamy wszystko, czego potrzebujesz, by odnieść sukces.
        </p>
        <div className="pt-8">
          <Link 
            href={ROUTES.CASTING}
            className="inline-block px-12 py-5 bg-gradient-to-br from-gold to-gold-dark text-dark text-[10px] font-bold tracking-[0.28em] uppercase transition-all hover:opacity-90 hover:-translate-y-1"
          >
            Aplikuj Teraz
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
