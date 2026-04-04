import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { value: '30%', label: 'Dla Partnerki', desc: 'Minimum dla nowej' },
    { value: '50%', label: 'Dla Studia', desc: 'Wsparcie i operacje' },
    { value: '20%', label: 'Dla Modela', desc: 'Współpraca plan' },
    { value: '4K', label: 'Jakość HDR', desc: 'Standard' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 bg-dark-2 border-y border-gold/10 overflow-hidden">
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className={`py-12 md:py-16 text-center border-gold/5 transition-colors duration-500 hover:bg-gold/5 group ${
            index !== stats.length - 1 ? 'border-r' : ''
          }`}
        >
          <div className="font-cormorant text-5xl md:text-7xl font-light tracking-tight leading-none bg-gold-gradient bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-500">
            {stat.value}
          </div>
          <div className="mt-4 text-[9px] tracking-[0.3em] uppercase text-gold/80 font-semibold">
            {stat.label}
          </div>
          <div className="mt-1 text-[8px] tracking-[0.1em] uppercase text-dim/40">
            {stat.desc}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
