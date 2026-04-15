import React from 'react';
import Head from 'next/head';

interface ProfileTemplateProps {
  data: {
    id: string;
    name: string;
    handle: string;
    bio: string;
    height?: string | number;
    weight?: string | number;
    measurements?: string;
    avatar?: string;
    heroImage?: string;
    characteristics?: string;
    type?: string;
    profileData?: {
        likes?: string[];
        boundaries?: string[];
        bestInMe?: string[];
        whyWatchMe?: string[];
        gallery?: string[];
        size?: string;
    };
  };
}

export const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ data }) => {
  return (
    <>
      <Head>
        <title>{data.name} - Studio HRL Adult</title>
      </Head>

      <main className="bg-[#0a0a0c] text-gray-200 min-h-screen font-sans relative overflow-hidden">
        {/* GLOBAL AMBIENT GLOW */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-900/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-rose-900/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        {/* HERO SECTION */}
        <section className="relative min-h-[70vh] flex items-center justify-center px-4 py-20 z-10 border-b border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-amber-300 rounded-full blur-xl opacity-30 animate-pulse"></div>
              <img 
                src={data.heroImage || data.avatar || "/images/default-profile.jpg"} 
                alt={data.name} 
                className="relative w-64 h-64 mx-auto rounded-full object-cover shadow-[0_0_40px_rgba(0,0,0,0.8)] border-2 border-white/10 ring-4 ring-purple-500/20" 
              />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400 mb-6 tracking-tight drop-shadow-lg" style={{ fontFamily: 'Cinzel, serif' }}>
              {data.name || 'Alexia'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed shadow-black drop-shadow-md">
              {data.bio || "Zmysłowa, pewna siebie kobieta. Ekskluzywna modelka do filmów i aktorka premium."}
            </p>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="py-20 relative z-10 bg-black/20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold text-white mb-8" style={{ fontFamily: 'Cinzel, serif' }}>O mnie</h2>
                <div className="space-y-6">
                  {/* DIMENSIONS CARD */}
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6 uppercase tracking-wider text-sm">Wymiary</h3>
                    {data.type === 'couple' ? (
                      <div className="grid grid-cols-2 gap-8">
                        {/* Anna */}
                        <div>
                          <h4 className="text-gold font-bold mb-4 text-sm uppercase tracking-wider">Anna</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500 uppercase text-xs">Wzrost</span> <span className="text-white font-medium">170 cm</span></div>
                            <div className="flex justify-between"><span className="text-gray-500 uppercase text-xs">Biust</span> <span className="text-white font-medium">88C</span></div>
                            <div className="flex justify-between"><span className="text-gray-500 uppercase text-xs">Talia</span> <span className="text-white font-medium">64 cm</span></div>
                            <div className="flex justify-between"><span className="text-gray-500 uppercase text-xs">Biodra</span> <span className="text-white font-medium">90 cm</span></div>
                          </div>
                        </div>
                        {/* Mark */}
                        <div>
                          <h4 className="text-gold font-bold mb-4 text-sm uppercase tracking-wider">Mark</h4>
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-gray-500 uppercase text-xs">Wzrost</span> <span className="text-white font-medium">182 cm</span></div>
                            <div className="flex justify-between"><span className="text-gray-500 uppercase text-xs">Waga</span> <span className="text-white font-medium">85 kg</span></div>
                            <div className="flex justify-between"><span className="text-gray-500 uppercase text-xs">Budowa</span> <span className="text-white font-medium">Athletic</span></div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-y-6 gap-x-4 text-base">
                        <div className="flex flex-col"><span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Wzrost</span> <span className="text-white font-medium">{data.height || '174'} cm</span></div>
                        <div className="flex flex-col"><span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Waga</span> <span className="text-white font-medium">{data.weight || '58'} kg</span></div>
                        <div className="flex flex-col"><span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Biust</span> <span className="text-white font-medium">{data.measurements?.split('/')[0]?.trim() || '92C'}</span></div>
                        <div className="flex flex-col"><span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Talia</span> <span className="text-white font-medium">{data.measurements?.split('/')[1]?.trim() || '62'} cm</span></div>
                        <div className="flex flex-col"><span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Biodra</span> <span className="text-white font-medium">{data.measurements?.split('/')[2]?.trim() || '92'} cm</span></div>
                        <div className="flex flex-col"><span className="text-gray-500 text-xs uppercase tracking-wider mb-1">Rozmiar</span> <span className="text-white font-medium">{data.profileData?.size || 'S/M'}</span></div>
                      </div>
                    )}
                  </div>
                  {/* CHARACTERISTICS CARD */}
                  <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
                     <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
                    <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300 mb-6 uppercase tracking-wider text-sm">Charakterystyka</h3>
                    <p className="text-gray-300 leading-relaxed font-light text-base">
                      {data.characteristics || 
                      "Jestem osobą pełną pasji i energii, która ceni sobie autentyczne połączenia. Moja natura jest jednocześnie delikatna i silna - potrafię być czuła i opiekuńcza, ale także pewna siebie i zdecydowana. W relacjach stawiam na jakość, nie ilość - każde spotkanie traktuję jako wyjątkowe doświadczenie."}
                    </p>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative rounded-3xl overflow-hidden p-1 bg-gradient-to-b from-white/10 to-transparent">
                  <img 
                    src={data.heroImage || data.avatar || "/images/default-profile.jpg"} 
                    alt={data.name} 
                    className="w-full rounded-2xl object-cover shadow-[0_20px_50px_rgba(0,0,0,0.5)]" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none rounded-3xl"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PREFERENCES SECTION */}
        <section className="py-20 relative z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <h2 className="text-3xl font-bold text-center text-white mb-16" style={{ fontFamily: 'Cinzel, serif' }}>Upodobania i granice</h2>
            <div className="grid md:grid-cols-2 gap-8 shadow-2xl">
              {/* LUBIĘ */}
              <div className="bg-[#111113]/80 backdrop-blur-md rounded-2xl p-8 border border-white/5 border-t-emerald-500/50 hover:bg-white/5 transition-colors">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center mr-4 border border-emerald-500/20">
                    <span className="text-emerald-400 font-bold">✓</span>
                  </div>
                  <h3 className="text-xl font-medium text-emerald-400">Pociąga mnie</h3>
                </div>
                <div className="space-y-6">
                   {(data.profileData?.likes?.length ? data.profileData.likes : [
                     'Romantyczne spotkania | Kolacje przy świecach, spacery, głębokie rozmowy',
                     'Sztuka i kultura | Teatr, galerie, koncerty, literatura',
                     'Luksusowe doświadczenia | Spa, podróże, wykwintne restauracje',
                     'Intymność i bliskość | Czułość, wzajemny szacunek, emocjonalne połączenie',
                   ]).map((item, i) => {
                     const [t, d] = item.split('|');
                     return (
                     <div key={i} className="flex items-start">
                       <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 mr-4 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                       <div>
                         <h4 className="font-semibold text-gray-200 text-sm">{t?.trim() || item}</h4>
                         {d && <p className="text-gray-500 text-xs mt-1">{d.trim()}</p>}
                       </div>
                     </div>
                   )})}
                </div>
              </div>
              {/* GRANICE */}
              <div className="bg-[#111113]/80 backdrop-blur-md rounded-2xl p-8 border border-white/5 border-t-rose-500/50 hover:bg-white/5 transition-colors">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-rose-500/10 rounded-full flex items-center justify-center mr-4 border border-rose-500/20">
                     <span className="text-rose-400 font-bold">✕</span>
                  </div>
                  <h3 className="text-xl font-medium text-rose-400">Moje Granice</h3>
                </div>
                <div className="space-y-6">
                  {(data.profileData?.boundaries?.length ? data.profileData.boundaries : [
                    'Brak szacunku | Nieuprzejmość, agresja, przekraczanie granic',
                    'Niehigiena | Brak dbałości o czystość i wygląd',
                    'Substancje | Narkotyki, nadmierne spożycie alkoholu',
                    'Pośpiech | Presja czasowa, brak cierpliwości',
                  ]).map((item, i) => {
                     const [t, d] = item.split('|');
                     return (
                    <div key={i} className="flex items-start">
                      <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-2 mr-4 flex-shrink-0 shadow-[0_0_8px_rgba(244,63,94,0.8)]"></div>
                      <div>
                        <h4 className="font-semibold text-gray-200 text-sm">{t?.trim() || item}</h4>
                        {d && <p className="text-gray-500 text-xs mt-1">{d.trim()}</p>}
                      </div>
                    </div>
                  )})}
                </div>
              </div>
            </div>
            
            {/* NEW TABLES */}
            <div className="mt-8 grid md:grid-cols-2 gap-8 items-stretch shadow-2xl">
              {/* NAJLEPSZE WE MNIE */}
              <div className="bg-[#111113]/80 backdrop-blur-md rounded-2xl p-8 flex flex-col h-full border border-white/5 border-t-purple-500/50 hover:bg-white/5 transition-colors">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-purple-500/10 rounded-full flex items-center justify-center mr-4 border border-purple-500/20">
                    <span className="text-purple-400 font-bold text-lg">✨</span>
                  </div>
                  <h3 className="text-xl font-medium text-purple-400">Najlepsze we mnie...</h3>
                </div>
                <div className="space-y-4 flex-grow pl-2">
                  {(data.profileData?.bestInMe?.length ? data.profileData.bestInMe : [
                    'Naturalność i swoboda przed kamerą',
                    'Perfekcyjna jakość obrazu 4K HDR',
                    'Kreatywne podejście do stylizacji',
                    'Autentyczna relacja z widzami',
                    'Niespożyta energia podczas live',
                    'Wysoka dbałość o estetykę kadrów',
                    'Unikalny, rozpoznawalny styl',
                    'Pełne zaangażowanie w każdy film',
                  ]).slice(0, 10).map((item, i) => (
                     <div key={i} className="flex items-center">
                       <span className="text-purple-500/50 mr-3 text-xs">◆</span>
                       <p className="text-gray-300 text-sm font-light">{item}</p>
                     </div>
                  ))}
                </div>
              </div>
              {/* WYRÓŻNIKI */}
              <div className="bg-[#111113]/80 backdrop-blur-md rounded-2xl p-8 flex flex-col h-full border border-white/5 border-t-amber-500/50 hover:bg-white/5 transition-colors">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center mr-4 border border-amber-500/20">
                    <span className="text-amber-400 font-bold text-lg">★</span>
                  </div>
                  <h3 className="text-xl font-medium text-amber-400">Dlaczego warto mnie oglądać?</h3>
                </div>
                <div className="space-y-4 flex-grow pl-2">
                  {(data.profileData?.whyWatchMe?.length ? data.profileData.whyWatchMe : [
                    'Ekskluzywne treści tylko u mnie',
                    'Interaktywne streamy (Ty decydujesz)',
                    'Profesjonalna produkcja studyjna',
                    'Regularne nowości i stały grafik',
                    'Szybki, bezpośredni kontakt na DM',
                    'Scenariusze oparte na fantazjach',
                    'Elegancja połączona ze śmiałością',
                    'Pełny profesjonalizm i dyskrecja',
                  ]).slice(0, 10).map((item, i) => (
                     <div key={i} className="flex items-center">
                       <span className="text-amber-500/50 mr-3 text-xs">◆</span>
                       <p className="text-gray-300 text-sm font-light">{item}</p>
                     </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section className="py-24 relative z-10 border-t border-white/5 bg-black/40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-white mb-16" style={{ fontFamily: 'Cinzel, serif' }}>Galeria Portfolio</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {(data.profileData?.gallery?.length ? data.profileData.gallery.slice(0, 5) : []).map((imgSrc, i) => (
                <div key={i} className="rounded-2xl overflow-hidden aspect-square bg-[#111113] group relative">
                  <div className="absolute inset-0 bg-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay"></div>
                  <img 
                    src={imgSrc} 
                    alt={`Galeria ${i + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-110" 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProfileTemplate;
