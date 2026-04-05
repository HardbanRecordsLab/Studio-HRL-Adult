import React from 'react';

const RevenueModel: React.FC = () => {
  const modelItems = [
    { label: 'Dla Partnerki', pct: '60%', color: 'bg-gold', desc: 'Podstawowy udział w przychodach netto.' },
    { label: 'Dla Modela', pct: '30%', color: 'bg-crimson', desc: 'Wsparcie produkcyjne i udział w sesjach.' },
    { label: 'Dla Studia', pct: '10%', color: 'bg-blue-500', desc: 'Utrzymanie sprzętu, lokalu i dystrybucji.' },
  ];

  return (
    <section className="py-24 px-[7%] bg-dark overflow-hidden" id="model">
      <div className="max-w-7xl mx-auto">
        <div className="section-tag">Model Współpracy</div>
        
        <h2 className="h2-premium mb-16">
          Hybrydowy model <br />
          <span className="italic bg-gold-gradient bg-clip-text text-transparent">60/30/10 + Gwarancja Startowa</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
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
              <h3 className="font-cormorant text-xl text-gold mb-4">Jak działa model hybrydowy?</h3>
              <ul className="list-disc list-inside text-dim text-[11px] space-y-3">
                <li>Gwarantujemy wsparcie startowe: 2.000–4.000 PLN w pierwszym miesiącu dla nowych partnerów, nawet przy ograniczonej publiczności.</li>
                <li>Standardowy udział z przychodów pozostaje w modelu 60/30/10: partnerka 60%, studio 30%, rezerwa/bonusy 10%.</li>
                <li>Dodatkowe premie są przyznawane za szybki wzrost bazy, interakcje z fanami i sprzedaż ekskluzywnych treści.</li>
                <li>Model hybrydowy łączy stałe wsparcie onboardingowe z przychodami z performance, aby start był bezpieczniejszy.</li>
              </ul>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};

export default RevenueModel;
