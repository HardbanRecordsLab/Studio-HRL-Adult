import React, { useState } from 'react';

const Platforms: React.FC = () => {
  const [flipped, setFlipped] = useState<string | null>(null);

  const platformCategories = [
    {
      title: 'Live Cam',
      items: [
        { 
          name: 'Chaturbate', 
          badge: '#1 Świat', 
          desc: 'Największa platforma live cam na świecie',
          fullDesc: 'Chaturbate to lider rynku webcam z ponad 4 milionami zarejestrowanych modeli. Platforma oferuje system zarządzania fanami, integrację ze wspólnotą i wsparcie dla wielu formatów treści. Modele mogą zarabiać przez prywatne pokazy, tipy, sprzedaż tokenów i zawartość PPV. Struktura provizji wynosi 40-80% w zależności od statusu, z bonusami za konsystencję. Chaturbate ma potężny algorytm odkrywania treści i wysoką sezoność dochodów.'
        },
        { 
          name: 'MyFreeCams', 
          badge: '#2 Świat', 
          desc: 'Lojalna społeczność, wysoki payout',
          fullDesc: 'MyFreeCams stanowi weterana branży z bardzo lojalnymi fanami i jedną z najwyższych stawek prowizji do 85%. Platforma słynie z bezpośredniego wsparcia modelek i Fair Trade gwarantującego stałe zarobki. System reputacji zachęca długoterminowe relacje z fanami. Modelki mogą zarabiać przez tipy, prywatne pokazy, sprzedaż zdjęć i zawartość na żądanie. MyFreeCams jest idealny dla modelek szukających stabilności i wsparcia społeczności.'
        },
        { 
          name: 'LiveJasmin', 
          badge: 'Premium', 
          desc: 'Najwyższe stawki w private shows',
          fullDesc: 'LiveJasmin to platforma premium znana z wymagających standardów i ekskluzywnością. Oferuje najwyższe stawki za pokazy prywatne oraz premiumowych fanów z wyższym budżetem. Platforma zapewnia zaawansowane narzędzia moderacji, integracje z systemami płatności i profesjonalne wsparcie. Modelki muszą przejść rygorystyczne audycje, ale zarabiane warunki ekonomiczne są najwyższe w branży. LiveJasmin to wybór dla elitarnych performerek.'
        },
        { 
          name: 'StripChat', 
          badge: 'VR Leader', 
          desc: 'Fan Club, VR shows, do 80% prowizji',
          fullDesc: 'StripChat to nowoczesna platforma z zaawansowanymi funkcjami jak Fan Club, VR shows i interaktywnym doświadczeniem. Oferuje prowizję do 80% z regularnym bonusami za osiągi. System Fan Club umożliwia exclusive content i bezpośrednią komunikację z fanami. Modelki mogą zarabiać przez live shows, tips, prywatne sesje i sprzedaż zawartości. StripChat\'s technologia VR stanowi unique selling point dla modelek chcących się wyróżnić.'
        },
        { 
          name: 'CamSoda', 
          badge: 'Innowacje', 
          desc: 'VR, krypto płatności, mobile-first',
          fullDesc: 'CamSoda to platformę innowacyjną z fokusem na VR treść, kryptowalnościowe płatności i optymalizacją mobile. Oferuje gamifikację zaangażowania z systemem nagradzania i promocji algorytmicznej. Modelki mogą zarabiać przez live shows, tokeny, tips i exclusive kontent. Struktura prowizji wynosi 60-80% z dodatkowymi bonusami. CamSoda przyciąga tech-savvy audience i modele zainteresowane nowymi formatami zarabiania.'
        },
        { 
          name: 'BongaCams', 
          badge: 'Europa', 
          desc: 'Silny ruch z PL/DE/CZ/RU',
          fullDesc: 'BongaCams ma wyraźną siłę w krajach europejskich, szczególnie w Polsce, Niemczech, Czechach i Rosji. Platforma oferuje 40-50% prowizję z regularnym wsparcie marketingowym. Interfejs jest przyjazny dla użytkownika i wspiera wielojęzyczność. Modelki mogą zarabiać przez live sessions, prywatne pokazy, tipy i zawartość zapisaną. BongaCams jest idealny dla modelek z europejskim audience i tych chcących targetować określone rynki.'
        },
        { 
          name: 'Flirt4Free', 
          badge: 'VIP Cam', 
          desc: 'Private shows, Feature Shows',
          fullDesc: 'Flirt4Free specjalizuje się w wysokiej jakości private shows i feature shows z ekskluzywnymi promocjami. Platforma ma zaangażowaną społeczność oferującą premium experience. Modelki mogą zarabiać przez prywatne sesje, tipy, sprzedaż zdjęć i niestandardowe pokazy. Prowizja wynosi około 30-50% z możliwością bonusów. Flirt4Free jest idealna dla modelek skupionych na prywatnych sesji z wyższą taryfą.'
        },
        { 
          name: 'ImLive', 
          badge: 'Stabilny', 
          desc: 'Multi-Viewer, Candy Show, od 2002',
          fullDesc: 'ImLive to stabilna, znana platforma działająca od 2002 roku z wysoce zaangażowaną bazą fanów. Oferuje funkcje jak Multi-Viewer, Candy Show i wsparcie zarządzania kontem. Modelki mają dostęp do powiadomień fanów i systemów zarządzania. Zarabiają przez live shows, prywatne sesje, tipy i zawartość PPV. Prowizja wynosi około 35-50%. ImLive jest wyborem modelek szukających bezpieczeństwa i stabilności długoterminowej.'
        },
      ]
    },
    {
      title: 'Subskrypcja / Fansite',
      items: [
        { 
          name: 'OnlyFans', 
          badge: 'Must Have', 
          desc: 'Lider rynku subskrypcji +18',
          fullDesc: 'OnlyFans zdefiniował model subskrypcji dla content creators z możliwością zarabiania przez subscription, tips i pay-per-view content. Twórcy zatrzymują 80% dochodów z subskrypcji i tipów. Platforma ma potężny algorytm discovery i dynamiczną społeczność z potencjałem dla wirusowego wzrostu. Modelki mogą sprzedawać exclusive kontent, custom videos i live streams. OnlyFans to must-have dla każdego serioznego content creatora.'
        },
        { 
          name: 'Fansly', 
          badge: 'Algorytm', 
          desc: 'Ruch organiczny z algorytmu',
          fullDesc: 'Fansly to konkurencja OnlyFans z fokusem na organic discovery i algorytmiczne promowanie zawartości. Twórcy zatrzymują 80% dochodów z możliwością zarabiania przez subscription tiers, tips i PPV. Platforma ma interfejs bardziej przyjazny dla użytkownika i zaawansowane narzędzia analityki. Fansly przyciąga modelki szukające lepszego exposure organicznego i mniejszej konkurencji. Jest doskonały dla budowania fanbase od zera.'
        },
        { 
          name: 'ManyVids', 
          badge: 'VOD Store', 
          desc: 'Sprzedaż klipów, MV Crush',
          fullDesc: 'ManyVids specjalizuje się w sprzedaży video-on-demand klipów i live streaming z funkcją MV Crush do premium membership. Twórcy mogą zarabiać przez sprzedaż klipów (70/30), live shows i premium subscription. Platforma ma ekskluzywnościowe brandy loyalty program i wsparcie dla niszowych kontenów. ManyVids przyciąga modelki zainteresowane pre-recorded content monetyzacją i specialized audiences.'
        },
        { 
          name: 'Clips4Sale', 
          badge: 'Nisza', 
          desc: 'Baza fetyszowa, lojalni fani',
          fullDesc: 'Clips4Sale to specjalistyczna platforma dla niszowych zawartości, szczególnie fetyszu i kustohm kontent. Ma bardzo lojalne audience szukające niszowych performerek. Twórcy mogą zarabiać przez sprzedaż klipów, custom video na żądanie i subscription. Prowizja wynosi około 40-60% zależnie od modelu. Clips4Sale jest idealny dla modelek chcących targetować niche komunę z wysokim engagement i niższą konkurencją.'
        },
        { 
          name: 'AVN Stars', 
          badge: 'Marka', 
          desc: 'Integracja AVN, prestiż branży',
          fullDesc: 'AVN Stars to platforma integrowana z prestižową firmą AVN, ofertą branży-wide recognition i networking opportunities. Modelki mogą zarabiać przez live shows, sprzedaż zawartości i membership. Platforma zapewnia wsparcie marketingowe, zaangażowanie influencerów i zaawansowane narzędzia analityczne. Prowizja wynosi około 50/50. AVN Stars jest przeznaczony dla modelek chcących budowania profesjonalnej marki.'
        },
        { 
          name: 'Fanvue', 
          badge: '15% Fee', 
          desc: 'Najniższa prowizja, AI tools',
          fullDesc: 'Fanvue oferuje jedną z najniższych prowizji w branży (15%) z zaawansowanymi narzędziami AI do tworzenia i promocji zawartości. Twórcy zatrzymują 85% dochodów z subskrypcji i tips. Platforma wspiera live streaming, subscription tiers i PPV zawartość. Fanvue ma rosnącą społeczność i wsparcie dla beginner-friendly setup. To wybór dla modelek maksymalizujących dochód i zainteresowanych AI asystencją.'
        },
      ]
    },
    {
      title: 'Tube / Lejek Ruchu',
      items: [
        { 
          name: 'Pornhub ModelHub', 
          badge: 'Funnel #1', 
          desc: 'Największy lejek organiczny',
          fullDesc: 'Pornhub ModelHub to największy traffic funnel w branży z miliardami monthly views. Modelki mogą zarabiać poprzez premium views, tips, pay-per-view i custom content. Struktura prowizji zależy od programu (Partner vs Standard). Platforma oferuje zaawansowane narzędzia analityki i discovery algorithm do organizacji kontentu. ModelHub jest essential dla maksymalizacji visibility i organic reach, choć same zarobki mogą być niższe.'
        },
        { 
          name: 'xHamster', 
          badge: 'SEO Power', 
          desc: 'Silny ruch organiczny, dobre SEO',
          fullDesc: 'xHamster ma doskonałe SEO ranking i wysoki traffic organiczny z user-generated content. Modelki mogą zarabiać przez premium monetization, tips i sprzedaż zawartości. Platforma ma unikalne podejście do zarabiania na free kontencie z passive income potencjałem. xHamster wspiera live streaming i kustomowy kontent na żądanie. Jest to świetny lejek traffic dla modelek chcących dużego organic reach.'
        },
        { 
          name: 'xVideos RED', 
          badge: 'Pasywny', 
          desc: 'Zarabiaj na premium widzach',
          fullDesc: 'xVideos RED to premium subscription service gdzie modelki zarabiają na premium viewers. Treść jest zarabiająca pasywnie bez initial effort jak inne platformy. xVideos ma ogromną bazę userów dając potencjał dla wysokiego pasywnego income. System jest prostszy do zarządzania z minimalnym требованием do daily posting. xVideos RED jest idealne dla modelek szukających passive revenue stream.'
        },
        { 
          name: 'xHamster Live', 
          badge: 'Bonus', 
          desc: 'Live cam + baza xHamster',
          fullDesc: 'xHamster Live łączy funkcjonalność live camming z ogromną bazą xHamster. Modelki mogą zarabiać przez live shows, tips i private sessions. Integracja z xHamster zapewnia automatic traffic i discovery dla live streams. System prowizji wynosi około 50/50. xHamster Live jest doskonały do kombinacji live camming z potencjałem organic traffic z istniejącego xHamster audience.'
        },
      ]
    },
    {
      title: 'Marketing',
      items: [
        { 
          name: 'Twitter / X', 
          badge: 'Essential', 
          desc: 'Główna arteria ruchu #1',
          fullDesc: 'Twitter/X to essential platform dla kreatywnego dystrybucji treści i building fanbase. Modelki mogą zarabiać przez links do premium platform, affiliate programs i direct monetizację. X oferuje Verified program, monetizację views i Premium membership. Treść jest wysoko shareable i ma viral potential. Twitter/X jest najważniejszym kanałem dla budowania Social proof, zaangażowania i traffic redirection.'
        },
        { 
          name: 'Reddit', 
          badge: 'Organic', 
          desc: 'Najlepsza konwersja, subreddity',
          fullDesc: 'Reddit ma najlepsze conversion rates z highly engaged community na targeted subreddity. Modelki mogą zarabiać poprzez strategic content positioning, link promotion i community building. Reddit audience jest zaawansowany och zainteresowany premium offering. Platforma pozwala na self-promotion w designated subs i community engagement. Reddit jest doskonały dla modelek chcących wysokiej konwersji i dedicated fanbase.'
        },
        { 
          name: 'Telegram', 
          badge: 'VIP', 
          desc: 'Ekosystem lojalnych fanów',
          fullDesc: 'Telegram to private platform dla budowania ekosystemu VIP fans z loyalty program. Modelki mogą zarabiać poprzez subscriber channels, premium groups i custom content. Telegram jest niedostępny dla algorytmów trzecich stron, co pozwala na complete control nad audience. Fani są highly engaged i loyal. Telegram jest idealny dla modelek chcących premium fanbase z bezpośrednią komunikacją i subscription revenue.'
        },
        { 
          name: 'TikTok', 
          badge: 'Brand', 
          desc: 'Budowanie świadomości marki',
          fullDesc: 'TikTok to platforma do budowania brand awareness z viral potential i massive reach dla younger audience. Modelki mogą zarabiać przez Creator Fund, brand partnerships i redirection do premium platforms. TikTok algorithm faworyzuje educational i entertaining content. Nie pozwala na adult content ale jest świetny do visual branding. TikTok jest essential dla modelek chcących reach szeroki audience i brand recognition.'
        },
        { 
          name: 'Instagram', 
          badge: 'Lifestyle', 
          desc: 'SFW content, przyciąganie',
          fullDesc: 'Instagram to platforma dla SFW lifestyle content i aesthetic branding z high visual impact. Modelki mogą zarabiać przez brand deals, affiliate links i redirection do premium content. Instagram oferuje Reels potential, monetyzację i Shopping features. Audience jest zainteresowany lifestyle i visual appeal. Instagram jest doskonały dla building recognizable brand identity i attracting new fans ze SFW content.'
        },
      ]
    },
  ];

  const toggleFlip = (platformName: string) => {
    setFlipped(flipped === platformName ? null : platformName);
  };

  return (
    <section className="py-24 px-[7%] bg-dark overflow-hidden" id="platforms">
      <style>{`
        @keyframes flipIn {
          0% {
            opacity: 0;
            transform: rotateY(90deg);
          }
          100% {
            opacity: 1;
            transform: rotateY(0deg);
          }
        }
        
        @keyframes flipOut {
          0% {
            opacity: 1;
            transform: rotateY(0deg);
          }
          100% {
            opacity: 0;
            transform: rotateY(90deg);
          }
        }
        
        .flip-card-front {
          animation: flipIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .flip-card-back {
          animation: flipIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
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
                {category.items.map((plat) => {
                  const isFlipped = flipped === plat.name;
                  return (
                    <div 
                      key={plat.name}
                      onClick={() => toggleFlip(plat.name)}
                      className="bg-dark-3/40 border border-gold/10 p-6 text-center transition-all duration-300 hover:border-gold/30 hover:bg-dark-3 group relative overflow-hidden min-h-[180px] flex flex-col justify-between cursor-pointer"
                    >
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      
                      {/* Front of card */}
                      {!isFlipped && (
                        <div className="flip-card-front">
                          <h4 className="font-cormorant text-lg text-gold font-semibold mb-1">{plat.name}</h4>
                          <p className="text-[8px] tracking-[0.2em] uppercase text-dim/60 mb-3">{plat.badge}</p>
                          <p className="text-[9px] text-dim/80 leading-relaxed">{plat.desc}</p>
                          <p className="text-[7px] text-gold/50 mt-4 italic">Kliknij aby przeczytać więcej</p>
                        </div>
                      )}
                      
                      {/* Back of card */}
                      {isFlipped && (
                        <div className="flip-card-back text-left">
                          <p className="text-[8px] text-dim/90 leading-relaxed">{plat.fullDesc}</p>
                          <p className="text-[7px] text-gold/50 mt-3 italic text-center">Kliknij aby przejść z powrotem</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Platforms;
