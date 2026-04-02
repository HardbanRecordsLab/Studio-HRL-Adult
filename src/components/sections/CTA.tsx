import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/utils/constants';

const CTA: React.FC = () => {
  return (
    <section className="py-24 px-[7%] bg-dark-2 overflow-hidden" id="cta">
      <div className="max-w-6xl mx-auto relative">
        {/* Background Decorative Element */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-crimson/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="bg-dark-3 border border-gold/15 p-12 md:p-20 text-center relative overflow-hidden">
          {/* Subtle Grain Overay just for this box */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-grain" />
          
          <div className="relative z-10 space-y-10">
            <div className="section-tag justify-center">Rozpocznij Współpracę</div>
            
            <h2 className="font-cormorant text-4xl md:text-7xl text-white font-light leading-[1.1]">
              Twoja kariera zaczyna się <br />
              <span className="italic bg-gold-gradient bg-clip-text text-transparent">właśnie w tym miejscu</span>
            </h2>

            <p className="text-dim text-sm md:text-base leading-loose max-w-2xl mx-auto font-light">
              Nie czekaj na idealny moment — stwórz go razem z nami. 
              Zapewniamy wszystko, czego potrzebujesz, by odnieść sukces w profesjonalnej branży adult. 
              Dyskrecja, bezpieczeństwo i najwyższe zarobki gwarantowane.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <Link href={ROUTES.CASTING} className="btn-gold w-full sm:w-auto text-center">
                Aplikuj Teraz
              </Link>
              <Link href="https://t.me/HRL_Adult" className="btn-outline w-full sm:w-auto text-center">
                Porozmawiaj na Telegram
              </Link>
            </div>

            <div className="pt-10 flex items-center justify-center gap-8">
              <div className="text-center">
                <span className="block font-cormorant text-2xl text-gold">24h</span>
                <span className="text-[8px] text-dim tracking-[0.2em] uppercase">Czas Odpowiedzi</span>
              </div>
              <div className="w-px h-10 bg-gold/20" />
              <div className="text-center">
                <span className="block font-cormorant text-2xl text-gold">100%</span>
                <span className="text-[8px] text-dim tracking-[0.2em] uppercase">Dyskrecja</span>
              </div>
              <div className="w-px h-10 bg-gold/20" />
              <div className="text-center">
                <span className="block font-cormorant text-2xl text-gold">4K</span>
                <span className="text-[8px] text-dim tracking-[0.2em] uppercase">Jakość Produkcji</span>
              </div>
            </div>
          </div>

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gold/30" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gold/30" />
        </div>
      </div>
    </section>
  );
};

export default CTA;
