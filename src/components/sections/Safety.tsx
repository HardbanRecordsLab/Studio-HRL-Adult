import React from 'react';

const Safety: React.FC = () => {
  const safetyPoints = [
    {
      title: 'Dyskrecja i Anonimowość',
      desc: 'Zapewniamy pełną ochronę wizerunku poza wybranymi platformami. Stosujemy zaawansowane narzędzia do geoblokowania (np. blokada Twojego kraju).'
    },
    {
      title: 'Zgodność Prawna (2257)',
      desc: 'Pełna legalność współpracy. Przejrzyste umowy, weryfikacja wieku zgodnie z 18 U.S.C. § 2257 i najwyższe standardy etyczne.'
    },
    {
      title: 'Bezpieczeństwo Fizyczne',
      desc: 'Studia znajdują się w chronionych, monitorowanych budynkach. Wsparcie ochrony i personelu medycznego na każde żądanie.'
    },
    {
      title: 'Opieka Psychologiczna',
      desc: 'Dostęp do profesjonalnego wsparcia, coachingu i opieki mentorskiej na każdym etapie Twojej kariery w branży adult.'
    }
  ];

  return (
    <section className="py-24 px-[7%] bg-dark overflow-hidden" id="safety">
      <div className="max-w-7xl mx-auto">
        <div className="section-tag">Bezpieczeństwo i Prawo</div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="h2-premium">
              Twoja Ochrona jest <br />
              <span className="italic bg-gold-gradient bg-clip-text text-transparent">Naszym Priorytetem</span>
            </h2>
            
            <p className="text-dim text-sm md:text-base leading-loose font-light">
              Rozumiemy specyfikę branży adult i wyzwania, przed którymi stają twórcy. 
              Naszym celem jest stworzenie środowiska, w którym możesz skupić się wyłącznie na swojej sztuce, 
              mając pewność, że wszystkie aspekty techniczne, prawne i bezpieczeństwa są pod naszą kontrolą.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4 p-5 bg-crimson/5 border-l-2 border-crimson/30">
                <span className="text-crimson text-lg">🔒</span>
                <p className="text-dim text-[11px] leading-relaxed">
                  Systemy szyfrowania danych i najwyższe standardy cyberbezpieczeństwa.
                </p>
              </div>
              <div className="flex items-center gap-4 p-5 bg-gold/5 border-l-2 border-gold/30">
                <span className="text-gold text-lg">⚖️</span>
                <p className="text-dim text-[11px] leading-relaxed">
                  Jasne warunki finansowe i wypłaty realizowane zawsze terminowo.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {safetyPoints.map((point) => (
              <div 
                key={point.title}
                className="p-8 bg-dark-3/50 border border-gold/10 hover:border-crimson/20 transition-all duration-500"
              >
                <h3 className="font-cormorant text-xl text-gold font-semibold mb-4 tracking-wide">
                  {point.title}
                </h3>
                <p className="text-dim text-[10px] leading-relaxed font-light">
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;
