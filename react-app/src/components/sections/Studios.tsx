import React from 'react';

const Studios: React.FC = () => {
  const studios = [
    {
      icon: '🎬',
      title: 'Studio Filmowe',
      description: 'Sprzęt 4K, oświetlenie profesjonalne, multiple scenografie'
    },
    {
      icon: '📸',
      title: 'Studio Foto',
      description: 'Cyfrowe aparaty, system oświetleniowy, tła i rekwizyty'
    },
    {
      icon: '🎥',
      title: 'Live Cam Studio',
      description: 'Streamowanie HD, interaktywne zabawki, prywatność'
    },
    {
      icon: '🎭',
      title: 'Studio Kreatywne',
      description: 'Strefa relaksu, makijaż, garderoba, strefa kreatywna'
    }
  ];

  return (
    <section className="py-24 px-[6%] bg-dark2 overflow-hidden" id="studios">
      <div className="space-y-4 mb-16">
        <div className="flex items-center gap-3 text-gold text-[8.5px] font-semibold tracking-[0.42em] uppercase">
          <div className="w-5 h-px bg-gold" />
          Premium Studios
        </div>
        <h2 className="text-white font-bebas text-5xl md:text-7xl tracking-tight leading-none uppercase">
          Profesjonalne <span className="text-gold italic">studia nagraniowe</span>
        </h2>
        <div className="flex items-center gap-3 py-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold" />
          <div className="w-2 h-2 bg-crimson rotate-45 shadow-[0_0_12px_rgba(155,31,53,0.5)]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold" />
        </div>
        <p className="text-dim font-montserrat text-sm md:text-base leading-loose max-w-3xl">
          Cztery w pełni wyposażone studia gotowe do realizacji treści w najwyższej jakości 4K z profesjonalnym oświetleniem i scenografią.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {studios.map((studio, index) => (
          <div 
            key={index}
            className="p-8 bg-dark3/50 border border-gold/10 hover:border-gold/30 transition-all group"
          >
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">
              {studio.icon}
            </div>
            <h3 className="text-gold font-bebas text-2xl tracking-wide mb-3">
              {studio.title}
            </h3>
            <p className="text-dim font-montserrat text-sm leading-relaxed">
              {studio.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Studios;
