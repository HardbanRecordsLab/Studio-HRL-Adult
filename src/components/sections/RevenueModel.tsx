import React from 'react';

const RevenueModel: React.FC = () => {
  const modelItems = [
    { label: 'Dla Partnerki', pct: '60%', color: 'bg-gold', desc: 'Pełne wsparcie operacyjne, techniczne i marketingowe' },
    { label: 'Dla Modela', pct: '30%', color: 'bg-crimson', desc: 'Profesjonalne wsparcie na planie i współudział w produkcji' },
    { label: 'Dla Studia', pct: '10%', color: 'bg-blue-500', desc: 'Utrzymanie sprzętu, lokalu i infrastruktury technologicznej' },
  ];

  return (
    <section className="py-24 px-[7%] bg-dark overflow-hidden" id="model">
      <div className="max-w-7xl mx-auto">
        <div className="section-tag">Model Współpracy</div>
        
        <h2 className="h2-premium mb-16">
          Transparentny podział <br />
          <span className="italic bg-gold-gradient bg-clip-text text-transparent">60/30/10</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Chart Wrapper */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#16121E" strokeWidth="4"></circle>
              {/* Studio - 10% */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#3498DB" strokeWidth="4" strokeDasharray="10 90" strokeDashoffset="100"></circle>
              {/* Model - 30% */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#9B1F35" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="90"></circle>
              {/* Partnerka - 60% */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#C9A84C" strokeWidth="4" strokeDasharray="60 40" strokeDashoffset="60"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-cormorant text-4xl md:text-5xl text-white">100%</span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-dim/60">Przychody</span>
            </div>
          </div>

          {/* Legend and Details */}
          <div className="space-y-12">
            <div className="space-y-6">
              {modelItems.map((item) => (
                <div key={item.label} className="group flex items-center justify-between p-6 bg-dark-3/40 border-l-2 border-transparent hover:border-gold/40 transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className={`w-3 h-3 rotate-45 ${item.color} shadow-[0_0_10px_rgba(201,168,76,0.2)]`} />
                    <div className="space-y-1">
                      <span className="text-white text-sm font-medium tracking-wide">{item.label}</span>
                      <p className="text-dim text-[10px] leading-relaxed max-w-xs">{item.desc}</p>
                    </div>
                  </div>
                  <span className="font-cormorant text-3xl text-gold">{item.pct}</span>
                </div>
              ))}
            </div>

            <div className="bg-dark-3/30 border border-gold/10 p-8">
              <p className="text-dim text-xs leading-loose font-light italic">
                "Zero kosztów własnych. Studio zapewnia profesjonalny sprzęt 4K, oświetlenie, lokal, postprodukcję i dystrybucję. 
                Transparentne raporty finansowe dostępne 24/7."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueModel;
