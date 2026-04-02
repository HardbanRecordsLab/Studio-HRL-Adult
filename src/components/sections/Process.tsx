import React from 'react';

const Process: React.FC = () => {
  const steps = [
    { num: '01', title: 'Casting', desc: 'Wypełniasz formularz i przechodzisz weryfikację wstępną.' },
    { num: '02', title: 'Onboarding', desc: 'Podpisujemy umowę i ustalamy strategię Twojego rozwoju.' },
    { num: '03', title: 'Produkcja', desc: 'Realizujemy pierwsze sesje foto/video w naszych studiach.' },
    { num: '04', title: 'Dystrybucja', desc: 'Uruchamiamy i konfigurujemy Twoje profile na platformach.' },
    { num: '05', title: 'Skalowanie', desc: 'Zarządzamy ruchem, marketingiem i optymalizujemy zyski.' },
  ];

  return (
    <section className="py-24 px-[7%] bg-dark overflow-hidden" id="process">
      <div className="max-w-7xl mx-auto">
        <div className="section-tag">Jak to działa</div>
        
        <h2 className="h2-premium mb-20">
          Prosta droga do <br />
          <span className="italic bg-gold-gradient bg-clip-text text-transparent">Profesjonalizmu</span>
        </h2>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-7 left-10 right-10 h-px bg-gradient-to-r from-crimson via-gold/20 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-4 relative z-10">
            {steps.map((step) => (
              <div key={step.num} className="text-center group">
                <div className="w-14 h-14 rounded-full border border-gold/40 flex items-center justify-center mx-auto mb-8 bg-dark transition-all duration-500 group-hover:bg-crimson group-hover:border-crimson">
                  <span className="font-cormorant text-2xl text-gold group-hover:text-white transition-colors duration-500">{step.num}</span>
                </div>
                
                <h3 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-4 group-hover:text-gold transition-colors">{step.title}</h3>
                <p className="text-dim text-[10px] leading-relaxed font-light max-w-[160px] mx-auto opacity-60 group-hover:opacity-100 transition-opacity">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
