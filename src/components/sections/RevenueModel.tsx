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

          <div className="relative w-full h-[420px] md:h-[500px] mx-auto overflow-hidden rounded-3xl border border-gold/10 bg-gradient-to-br from-dark-3 via-dark-2 to-dark">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,168,76,0.18),transparent_40%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(155,31,53,0.16),transparent_40%)]" />
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-10 text-center">
              <span className="text-[10px] tracking-[0.4em] uppercase text-gold/60 mb-6">Hybrydowy plan</span>
              <div className="font-cormorant text-6xl text-white mb-2">60/30/10</div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-dim/70 mb-8">+ gwarancja startowa dla nowych partnerów</div>
              <div className="grid grid-cols-3 gap-4 w-full text-left">
                <div className="bg-dark-4 p-4 rounded-2xl border border-gold/10">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-gold mb-2">Minimum</p>
                  <p className="text-white text-3xl font-bold">2-4K PLN</p>
                  <p className="text-[10px] text-dim mt-2">Wsparcie startowe dla nowych twórców</p>
                </div>
                <div className="bg-dark-4 p-4 rounded-2xl border border-gold/10">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-gold mb-2">Udział</p>
                  <p className="text-white text-3xl font-bold">60%</p>
                  <p className="text-[10px] text-dim mt-2">Dla partnerki z przychodów netto</p>
                </div>
                <div className="bg-dark-4 p-4 rounded-2xl border border-gold/10">
                  <p className="text-[9px] uppercase tracking-[0.35em] text-gold mb-2">Bonusy</p>
                  <p className="text-white text-3xl font-bold">+10-20%</p>
                  <p className="text-[10px] text-dim mt-2">Za szybki wzrost i aktywność</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RevenueModel;
