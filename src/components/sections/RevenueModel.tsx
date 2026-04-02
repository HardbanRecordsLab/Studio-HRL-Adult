import React from 'react';

const RevenueModel: React.FC = () => {
  return (
    <section className="py-24 px-[6%] bg-dark overflow-hidden" id="model">
      <div className="space-y-4 mb-16">
        <div className="flex items-center gap-3 text-gold text-[8.5px] font-semibold tracking-[0.42em] uppercase">
          <div className="w-5 h-px bg-gold" />
          Model Współpracy
        </div>
        <h2 className="text-white font-bebas text-5xl md:text-7xl tracking-tight leading-none uppercase">
          Transparentny podział <span className="text-gold italic">60/30/10</span>
        </h2>
        <div className="flex items-center gap-3 py-6">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold" />
          <div className="w-2 h-2 bg-crimson rotate-45 shadow-[0_0_12px_rgba(155,31,53,0.5)]" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold" />
        </div>
        <p className="text-dim font-montserrat text-sm md:text-base leading-loose max-w-3xl">
          Nasz sprawiedliwy model podziału przychodów zapewnia maksymalne korzyści dla partnerki przy pełnym wsparciu operacyjnym ze strony studia.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 42 42">
              {/* Background circle */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#16121E" strokeWidth="4"></circle>
              {/* Studio - 10% */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#3498DB" strokeWidth="4" strokeDasharray="10 90" strokeDashoffset="100"></circle>
              {/* Model - 30% */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#D4304A" strokeWidth="4" strokeDasharray="30 70" strokeDashoffset="90"></circle>
              {/* Partnerka - 60% */}
              <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#C9A84C" strokeWidth="4" strokeDasharray="60 40" strokeDashoffset="60"></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-white font-bebas text-4xl md:text-5xl leading-none">100%</span>
              <span className="text-dim text-[10px] tracking-widest uppercase mt-1">Przychody</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-dark3/50 border-l-4 border-gold group hover:bg-dark3 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-gold rounded-sm" />
                <span className="text-white font-montserrat font-semibold text-sm">Dla Partnerki</span>
              </div>
              <span className="text-gold font-bebas text-2xl">60%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-dark3/50 border-l-4 border-crimson group hover:bg-dark3 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-crimson rounded-sm" />
                <span className="text-white font-montserrat font-semibold text-sm">Dla Modela</span>
              </div>
              <span className="text-crimson font-bebas text-2xl">30%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-dark3/50 border-l-4 border-blue-500 group hover:bg-dark3 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                <span className="text-white font-montserrat font-semibold text-sm">Dla Studia</span>
              </div>
              <span className="text-blue-500 font-bebas text-2xl">10%</span>
            </div>
          </div>
          
          <p className="text-dim font-montserrat text-sm leading-relaxed">
            Partnerka nie ponosi żadnych kosztów własnych. Studio zapewnia sprzęt, lokal, modela, postprodukcję, dystrybucję i marketing. 
            Transparentne raporty przy każdej wypłacie z pełnym wglądem online 24/7.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RevenueModel;
