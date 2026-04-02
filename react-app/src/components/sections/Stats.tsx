import React from 'react';

const Stats: React.FC = () => {
  const stats = [
    { value: '60%', label: 'Dla Partnerki' },
    { value: '30%', label: 'Dla Modela' },
    { value: '10%', label: 'Dla Studia' },
    { value: '4K', label: 'Jakość Produkcji' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 bg-dark2 border-y border-gold/10">
      {stats.map((stat, index) => (
        <div 
          key={index}
          className={`py-8 text-center border-gold/5 ${
            index !== stats.length - 1 ? 'border-r' : ''
          }`}
        >
          <div className="font-bebas text-5xl md:text-6xl tracking-tight leading-none text-gold">
            {stat.value}
          </div>
          <div className="mt-2 text-[10px] tracking-[0.2em] uppercase text-dim">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Stats;
