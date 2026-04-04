import React from 'react';

const Platforms: React.FC = () => {
  const platformCategories = [
    {
      title: 'Live Cam',
      items: [
        { name: 'Chaturbate', badge: '#1 Świat', desc: 'Największa platforma live cam na świecie' },
        { name: 'MyFreeCams', badge: '#2 Świat', desc: 'Lojalna społeczność, wysoki payout' },
        { name: 'LiveJasmin', badge: 'Premium', desc: 'Najwyższe stawki w private shows' },
        { name: 'StripChat', badge: 'VR Leader', desc: 'Fan Club, VR shows, do 80% prowizji' },
        { name: 'CamSoda', badge: 'Innowacje', desc: 'VR, krypto płatności, mobile-first' },
        { name: 'BongaCams', badge: 'Europa', desc: 'Silny ruch z PL/DE/CZ/RU' },
        { name: 'Flirt4Free', badge: 'VIP Cam', desc: 'Private shows, Feature Shows' },
        { name: 'ImLive', badge: 'Stabilny', desc: 'Multi-Viewer, Candy Show, od 2002' },
      ]
    },
    {
      title: 'Subskrypcja / Fansite',
      items: [
        { name: 'OnlyFans', badge: 'Must Have', desc: 'Lider rynku subskrypcji +18' },
        { name: 'Fansly', badge: 'Algorytm', desc: 'Ruch organiczny z algorytmu' },
        { name: 'ManyVids', badge: 'VOD Store', desc: 'Sprzedaż klipów, MV Crush' },
        { name: 'Clips4Sale', badge: 'Nisza', desc: 'Baza fetyszowa, lojalni fani' },
        { name: 'AVN Stars', badge: 'Marka', desc: 'Integracja AVN, prestiż branży' },
        { name: 'Fanvue', badge: '15% Fee', desc: 'Najniższa prowizja, AI tools' },
      ]
    },
    {
      title: 'Tube / Lejek Ruchu',
      items: [
        { name: 'Pornhub ModelHub', badge: 'Funnel #1', desc: 'Największy lejek organiczny' },
        { name: 'xHamster', badge: 'SEO Power', desc: 'Silny ruch organiczny, dobre SEO' },
        { name: 'xVideos RED', badge: 'Pasywny', desc: 'Zarabiaj na premium widzach' },
        { name: 'xHamster Live', badge: 'Bonus', desc: 'Live cam + baza xHamster' },
      ]
    },
    {
      title: 'Marketing',
      items: [
        { name: 'Twitter / X', badge: 'Essential', desc: 'Główna arteria ruchu #1' },
        { name: 'Reddit', badge: 'Organic', desc: 'Najlepsza konwersja, subreddity' },
        { name: 'Telegram', badge: 'VIP', desc: 'Ekosystem lojalnych fanów' },
        { name: 'TikTok', badge: 'Brand', desc: 'Budowanie świadomości marki' },
        { name: 'Instagram', badge: 'Lifestyle', desc: 'SFW content, przyciąganie' },
      ]
    },
  ];

  return (
    <section className="py-24 px-[7%] bg-dark overflow-hidden" id="platforms">
      <div className="max-w-7xl mx-auto">
        <div className="section-tag">Zasięg Dystrybucji</div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16">
          <h2 className="h2-premium">
            Twoje treści na <br />
            <span className="italic bg-gold-gradient bg-clip-text text-transparent">Najlepszych Platformach</span>
          </h2>
          <p className="text-dim text-sm leading-loose font-light max-w-lg lg:mb-2">
            Zajmujemy się pełną konfiguracją, zarządzaniem i promocją Twoich profili na wiodących platformach adult na świecie. 
            Maksymalizujemy zasięgi, dbając jednocześnie o geoblokowanie i Twoją prywatność.
          </p>
        </div>

        <div className="space-y-16">
          {platformCategories.map((category) => (
            <div key={category.title}>
              <h3 className="font-cormorant text-xl text-gold mb-6 italic">{category.title}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
                {category.items.map((plat) => (
                  <div 
                    key={plat.name}
                    className="bg-dark-3/40 border border-gold/10 p-6 text-center transition-all duration-300 hover:border-gold/30 hover:bg-dark-3 group relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    
                    <h4 className="font-cormorant text-lg text-gold font-semibold mb-1">{plat.name}</h4>
                    <p className="text-[8px] tracking-[0.2em] uppercase text-dim/60 mb-3">{plat.badge}</p>
                    <p className="text-[9px] text-dim/80 leading-relaxed">{plat.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
