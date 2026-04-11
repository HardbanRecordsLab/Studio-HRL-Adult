import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProfileTemplateProps {
  data: {
    name: string;
    handle: string;
    age?: number;
    bio: string;
    intro?: string;
    measurements?: Record<string, string>;
    characteristics?: string[];
    likes?: { title: string; description: string }[];
    boundaries?: string[];
    discretion?: string;
    languages?: string[];
    services?: {
      sexCams?: boolean;
      escort?: boolean;
      filmModel?: boolean;
    };
    availability?: string;
    images?: string[];
    videos?: string[];
  };
}

export const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState('about');
  
  const safeData = data || {} as any;
  const profile = {
    ...safeData,
    name: safeData.name || 'Model',
    handle: safeData.handle || 'handle',
    bio: safeData.bio || ''
  };

  return (
    <>
      <Head>
        <title>{profile.name} | Studio HRL Adult</title>
        <meta name="description" content={profile.bio} />
      </Head>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* NAV */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(10,10,10,0.95)] border-b border-[#1a1a1a] px-6 py-4">
          <div className="max-w-6xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-[#c9a84c] text-sm tracking-widest">STUDIO HRL ADULT</Link>
            <div className="flex gap-6 text-xs tracking-wider text-white/60">
              <Link href="/portfolio" className="hover:text-[#c9a84c]">PORTFOLIO</Link>
              <Link href="/" className="hover:text-[#c9a84c]">HOME</Link>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <header className="pt-24 pb-12 px-6 text-center bg-gradient-to-b from-[#0f0f0f] to-[#0a0a0a]">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full border border-[#c9a84c]/30 flex items-center justify-center bg-[#111]">
            <span className="text-2xl text-[#c9a84c]">{profile.name.charAt(0)}</span>
          </div>
          <h1 className="text-4xl font-light mb-2">{profile.name}</h1>
          <p className="text-sm text-[#c9a84c] tracking-widest">@{profile.handle}</p>
          {profile.intro && <p className="mt-4 text-white/60 italic max-w-lg mx-auto">&ldquo;{profile.intro}&rdquo;</p>}
        </header>

        {/* TABS */}
        <div className="sticky top-[72px] bg-[#0a0a0a]/95 border-b border-[#1a1a1a] z-40">
          <div className="max-w-4xl mx-auto flex justify-center gap-8">
            {['about', 'services', 'gallery', 'contact'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-xs tracking-widest uppercase border-b-2 transition-colors ${
                  activeTab === tab ? 'text-[#c9a84c] border-[#c9a84c]' : 'text-white/40 border-transparent hover:text-white/60'
                }`}
              >
                {tab === 'about' ? 'O Mnie' : tab === 'services' ? 'Usługi' : tab === 'gallery' ? 'Galeria' : 'Kontakt'}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <main className="max-w-4xl mx-auto px-6 py-12">
          {activeTab === 'about' && (
            <div className="space-y-12">
              <section className="bg-[#111] border border-[#1a1a1a] p-8 rounded-2xl">
                <h2 className="text-[#c9a84c] text-xs font-bold tracking-[0.3em] uppercase mb-6 flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-[#c9a84c]/30"></div> O Mnie
                </h2>
                <p className="text-white/70 leading-relaxed text-sm lg:text-base">{profile.bio}</p>
                {profile.languages && (
                  <div className="mt-6 flex gap-4 text-[10px] text-[#c9a84c] font-black uppercase tracking-widest">
                    <span>Języki:</span>
                    {profile.languages.map(l => <span key={l} className="text-white/50">{l}</span>)}
                  </div>
                )}
              </section>

              {profile.likes && (
                <section className="space-y-6">
                  <h2 className="text-[#c9a84c] text-xs font-bold tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-[#c9a84c]/30"></div> Upodobania
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.likes.map((l, i) => (
                      <div key={i} className="bg-[#111] p-6 border border-[#1a1a1a] rounded-xl hover:border-[#c9a84c]/20 transition-all">
                        <h4 className="text-[#c9a84c] text-xs uppercase mb-2 font-bold">{l.title}</h4>
                        <p className="text-xs text-white/50 leading-loose">{l.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {profile.measurements && (
                  <section className="bg-[#111] border border-[#1a1a1a] p-8 rounded-2xl h-full">
                    <h2 className="text-[#c9a84c] text-xs font-bold tracking-[0.3em] uppercase mb-8">Fizyczność</h2>
                    <div className="space-y-4">
                      {Object.entries(profile.measurements).map(([k, v]) => (
                        <div key={k} className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-[10px] text-white/40 uppercase tracking-widest">{k}</span>
                          <span className="text-sm font-light text-[#c9a84c]">{v}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {profile.boundaries && (
                  <section className="bg-[#111] border border-[#1a1a1a] p-8 rounded-2xl h-full">
                    <h2 className="text-rose-600 text-xs font-bold tracking-[0.3em] uppercase mb-8">Granice</h2>
                    <ul className="space-y-4">
                      {profile.boundaries.map((b, i) => (
                        <li key={i} className="flex gap-3 text-xs text-white/60">
                          <span className="text-rose-600">✕</span> {b}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              {profile.discretion && (
                <section className="bg-gradient-to-r from-[#111] to-[#0a0a0a] border-l-2 border-[#c9a84c] p-10 italic">
                   <p className="text-white/60 text-sm leading-relaxed">&ldquo;{profile.discretion}&rdquo;</p>
                </section>
              )}
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              <h2 className="text-[#c9a84c] text-sm tracking-widest uppercase mb-8">Oferta Współpracy</h2>
              <div className="grid grid-cols-1 gap-4">
                {profile.services?.sexCams && (
                  <div className="bg-[#111] border border-[#1a1a1a] p-8 rounded-2xl hover:bg-[#151515] transition-colors">
                    <h3 className="text-xl font-light mb-4">Sex Cams / Live Shows</h3>
                    <p className="text-sm text-white/50 leading-relaxed">Profesjonalne transmisje na żywo na platformach premium. Interaktywne sesje, pokazy tematyczne i budowanie autentycznej relacji z widzami.</p>
                  </div>
                )}
                {profile.services?.escort && (
                  <div className="bg-[#111] border border-[#1a1a1a] p-8 rounded-2xl hover:bg-[#151515] transition-colors">
                    <h3 className="text-xl font-light mb-4">Escort VIP</h3>
                    <p className="text-sm text-white/50 leading-relaxed">Ekskluzywne towarzystwo na kolacje, wyjazdy i wydarzenia kulturalne. Gwarancja pełnej klasy, inteligencji i dyskrecji. Dostępność po wstępnej weryfikacji.</p>
                  </div>
                )}
                {profile.services?.filmModel && (
                  <div className="bg-[#111] border border-[#1a1a1a] p-8 rounded-2xl hover:bg-[#151515] transition-colors">
                    <h3 className="text-xl font-light mb-4">Modelka Filmowa</h3>
                    <p className="text-sm text-white/50 leading-relaxed">Profesjonalna praca przed kamerą przy produkcjach 4K/8K. Sensualne sceny, artystyczne sesje wideo oraz projekty komercyjne.</p>
                  </div>
                )}
              </div>
              
              <div className="mt-12 p-8 bg-black/40 border border-[#c9a84c]/10 rounded-2xl">
                 <h4 className="text-[#c9a84c] text-[10px] uppercase font-black tracking-widest mb-4">Dostępność i Lokalizacja</h4>
                 <p className="text-white/70 text-sm">{profile.availability || 'Zapytaj o wolne terminy i aktualną lokalizację w wiadomości prywatnej.'}</p>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-12">
              <div>
                <h2 className="text-[#c9a84c] text-sm tracking-widest uppercase mb-6 flex items-center justify-between">
                  Fotografia 
                  <span className="text-[10px] text-white/20">{(profile.images || []).length} ZDJĘĆ</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {(profile.images || []).map((img, i) => (
                    <div key={i} className="aspect-square bg-[#111] border border-[#1a1a1a] overflow-hidden group">
                      <img src={img} alt={`${profile.name} ${i + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                  ))}
                </div>
              </div>

              {profile.videos && profile.videos.length > 0 && (
                <div>
                   <h2 className="text-[#c9a84c] text-sm tracking-widest uppercase mb-6 flex items-center justify-between">
                    Teaser Videos
                    <span className="text-[10px] text-white/20">{(profile.videos).length} FILMY</span>
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profile.videos.map((vid, i) => (
                      <div key={i} className="aspect-video bg-[#111] border border-[#1a1a1a] rounded-xl overflow-hidden">
                        <video src={vid} controls className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="max-w-2xl mx-auto text-center space-y-8 py-12">
              <h2 className="text-3xl font-light italic">Gotowy na wyjątkowe doświadczenie?</h2>
              <p className="text-white/60 leading-relaxed">Skontaktuj się przez Studio HRL Adult, aby umówić spotkanie, dopytać o dostępność lub uzyskać więcej informacji. Dyskrecja i bezpieczeństwo są naszym fundamentem.</p>
              <div className="pt-8">
                <Link href="/#contact" className="inline-block px-12 py-4 bg-[#c9a84c] text-black text-xs font-black tracking-[0.3em] hover:bg-[#e0c060] transition-all rounded-full">
                  ZAREZERWUJ TERAZ
                </Link>
                <p className="mt-8 text-[10px] text-white/20 uppercase tracking-widest">Wymagana pełna weryfikacja tożsamości</p>
              </div>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-[#1a1a1a] py-12 px-6 mt-12 bg-black">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#c9a84c] text-[10px] tracking-[0.5em] font-bold mb-4 uppercase">Studio HRL Adult</p>
            <p className="text-white/20 text-[10px] tracking-widest">&copy; 2026 HRL CREATIVE GROUP. WSZELKIE PRAWA ZASTRZEŻONE.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ProfileTemplate;
