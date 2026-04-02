import React from 'react';

const Safety: React.FC = () => {
  const points = [
    {
      title: 'Prywatność i Anonimowość',
      description: 'Zapewniamy pełną dyskrecję, ochronę wizerunku i anonimowość zgodnie z Twoimi preferencjami.'
    },
    {
      title: 'Legalność i Umowy',
      description: 'Przejrzyste warunki współpracy, legalne umowy i zgodność z regulacjami 18 U.S.C. § 2257.'
    },
    {
      title: 'Bezpieczeństwo Fizyczne',
      description: 'Chronione studio, wsparcie ochrony i bezpieczne środowisko pracy 24/7.'
    },
    {
      title: 'Wsparcie Psychologiczne',
      description: 'Profesjonalne wsparcie, coaching i opieka na każdym etapie kariery.'
    }
  ];

  return (
    <section className="py-24 px-[6%] bg-dark overflow-hidden" id="safety">
      <div className="space-y-4 mb-16">
        <div className="flex items-center gap-3 text-gold text-[8.5px] font-semibold tracking-[0.42em] uppercase">
          <div className="w-5 h-px bg-gold" />
          Bezpieczeństwo i Transparentność
        </div>
        <h2 className="text-white font-bebas text-5xl md:text-7xl tracking-tight leading-none uppercase">
          Ochrona i <span className="text-gold italic">zgodność prawna</span>
        </h2>
        <div className="flex items-center gap-3 py-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold" />
          <div className="w-2 h-2 bg-crimson rotate-45 shadow-[0_0_12px_rgba(155,31,53,0.5)]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold" />
        </div>
        <p className="text-dim font-montserrat text-sm md:text-base leading-loose max-w-3xl">
          Twoje bezpieczeństwo i komfort są dla nas priorytetem. Dbamy o każdy aspekt Twojej pracy w branży adult.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {points.map((point, index) => (
          <div 
            key={index}
            className="p-8 bg-dark3/50 border border-crimson/10 hover:border-crimson/30 transition-all group"
          >
            <h3 className="text-gold font-bebas text-2xl tracking-wide mb-4">
              {point.title}
            </h3>
            <p className="text-dim font-montserrat text-sm leading-relaxed">
              {point.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Safety;
