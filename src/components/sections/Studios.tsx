import React from 'react';

const Studios: React.FC = () => {
  const studios = [
    {
      icon: '🎬',
      title: 'Main Studio Filmowe',
      features: ['Kamery 4K HDR', 'Oświetlenie ARRI', 'Wielowariantowe scenografie'],
      tag: 'Cinema Grade'
    },
    {
      icon: '📸',
      title: 'Professional Photo',
      features: ['Aparaty średnioformatowe', 'Systemy oświetleniowe Profoto', 'Pełna postprodukcja'],
      tag: 'High-End Fashion'
    },
    {
      icon: '🎥',
      title: 'Live Streaming Hub',
      features: ['Łącze światłowodowe 1Gbps', 'Interaktywne sterowanie światłem', 'Izolacja akustyczna'],
      tag: 'Interactive Tech'
    },
    {
      icon: '🎭',
      title: 'Creative Space',
      features: ['Profesjonalny Makeup & Hair', 'Garderoba Premium', 'Strefa Relaksu & Contentu'],
      tag: 'Total Comfort'
    }
  ];

  return (
    <section className="py-24 px-[7%] bg-dark-2 overflow-hidden" id="studios">
      <div className="max-w-7xl mx-auto">
        <div className="section-tag">Premium Studios</div>
        
        <h2 className="h2-premium mb-16">
          Przestrzeń stworzona dla <br />
          <span className="italic bg-gold-gradient bg-clip-text text-transparent">Najwyższej Jakości</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {studios.map((studio) => (
            <div 
              key={studio.title}
              className="card-premium relative group h-full flex flex-col"
            >
              {/* Badge */}
              <div className="absolute top-4 right-4 text-[7px] tracking-[0.2em] uppercase bg-gold/10 text-gold px-3 py-1 border border-gold/20">
                {studio.tag}
              </div>

              {/* Icon */}
              <div className="text-4xl mb-8 group-hover:scale-110 transition-transform duration-500">
                {studio.icon}
              </div>

              {/* Title */}
              <h3 className="font-cormorant text-2xl text-gold font-semibold mb-6">
                {studio.title}
              </h3>

              {/* Features List */}
              <ul className="space-y-3 flex-grow">
                {studio.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-dim text-[10px] leading-relaxed font-light">
                    <span className="w-1 h-1 bg-gold/40 mt-1.5 flex-shrink-0 rotate-45" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Studio Tour Callout */}
        <div className="mt-16 p-10 bg-dark-3/50 border border-gold/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <h4 className="font-cormorant text-2xl text-white italic">Chcesz zobaczyć studia osobiście?</h4>
            <p className="text-dim text-xs font-light">Umów się na niezobowiązujące spotkanie i prezentację naszych możliwości.</p>
          </div>
          <button className="btn-outline whitespace-nowrap">
            Umów Spotkanie
          </button>
        </div>
      </div>
    </section>
  );
};

export default Studios;
