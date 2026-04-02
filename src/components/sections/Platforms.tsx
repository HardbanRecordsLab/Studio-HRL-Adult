import React from 'react';

const Platforms: React.FC = () => {
  const platforms = [
    { name: 'OnlyFans', type: 'Fansite', badge: 'Popular', badgeColor: 'pb-g' },
    { name: 'Chaturbate', type: 'Live-Cam', badge: 'High Traffic', badgeColor: 'pb-g' },
    { name: 'BongaCams', type: 'Live-Cam', badge: 'International', badgeColor: 'pb-g' },
    { name: 'MyFreeCams', type: 'Live-Cam', badge: 'US Market', badgeColor: 'pb-g' },
    { name: 'ManyVids', type: 'Video Store', badge: 'Passive Income', badgeColor: 'pb-g' },
    { name: 'Fansly', type: 'Fansite', badge: 'Growing', badgeColor: 'pb-g' },
    { name: 'Stripchat', type: 'Live-Cam', badge: 'Premium', badgeColor: 'pb-g' },
    { name: 'Camsoda', type: 'Live-Cam', badge: 'Tech-First', badgeColor: 'pb-g' },
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {platforms.map((plat) => (
            <div 
              key={plat.name}
              className="bg-dark-3/40 border border-gold/10 p-8 text-center transition-all duration-300 hover:border-gold/30 hover:bg-dark-3 group relative overflow-hidden"
            >
              {/* Subtle hover line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              
              <h3 className="font-cormorant text-xl text-gold font-semibold mb-2">{plat.name}</h3>
              <p className="text-[8px] tracking-[0.2em] uppercase text-dim/60 mb-4">{plat.type}</p>
              
              <span className="text-[7px] tracking-[0.1em] uppercase px-3 py-1 bg-gold/10 text-gold border border-gold/20 inline-block">
                {plat.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
