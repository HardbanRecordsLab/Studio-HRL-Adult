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
    likes?: string[];
    boundaries?: string[];
    discretion?: string;
    services?: {
      sexCams?: boolean;
      escort?: boolean;
      filmModel?: boolean;
    };
    availability?: string;
    rates?: string;
    images?: string[];
    videos?: string[];
  };
}

export const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ data }) => {
  const [activeTab, setActiveTab] = useState('about');
  const profile = {
    ...data,
    name: data.name || 'Model',
    handle: data.handle || 'handle'
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
        <div className="sticky top-[72px] bg-[#0a0a0a]/95 border-b border-[#1a1a1a]">
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
            <div className="space-y-8">
              <section className="bg-[#111] border border-[#1a1a1a] p-8">
                <h2 className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4">O Mnie</h2>
                <p className="text-white/70">{profile.bio}</p>
              </section>

              {profile.measurements && (
                <section className="bg-[#111] border border-[#1a1a1a] p-8">
                  <h2 className="text-[#c9a84c] text-sm tracking-widest uppercase mb-6">Wymiary</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {Object.entries(profile.measurements).map(([k, v]) => (
                      <div key={k} className="text-center p-4 bg-[#0a0a0a] border border-[#1a1a1a]">
                        <div className="text-xs text-white/40 uppercase mb-1">{k}</div>
                        <div className="text-lg">{v}</div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {profile.characteristics && (
                <section className="bg-[#111] border border-[#1a1a1a] p-8">
                  <h2 className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4">Cechy</h2>
                  <div className="flex flex-wrap gap-2">
                    {profile.characteristics.map((c, i) => (
                      <span key={i} className="px-4 py-2 bg-[#0a0a0a] border border-[#1a1a1a] text-sm text-white/70">{c}</span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              <h2 className="text-[#c9a84c] text-sm tracking-widest uppercase">Usługi</h2>
              {profile.services?.sexCams && (
                <div className="bg-[#111] border border-[#1a1a1a] p-6">
                  <h3 className="text-lg mb-2">Sex Cams / Live Shows</h3>
                  <p className="text-sm text-white/60">Profesjonalne transmisje na żywo na platformach premium.</p>
                </div>
              )}
              {profile.services?.escort && (
                <div className="bg-[#111] border border-[#1a1a1a] p-6">
                  <h3 className="text-lg mb-2">Escort VIP</h3>
                  <p className="text-sm text-white/60">Dostępna na życzenie po wstępnej weryfikacji.</p>
                </div>
              )}
              {profile.services?.filmModel && (
                <div className="bg-[#111] border border-[#1a1a1a] p-6">
                  <h3 className="text-lg mb-2">Modelka Filmowa</h3>
                  <p className="text-sm text-white/60">Współpraca przy produkcjach 4K/8K.</p>
                </div>
              )}
              <section className="bg-[#111] border border-[#1a1a1a] p-8">
                <h2 className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4">Dostępność</h2>
                <p className="text-white/70">{profile.availability || 'Na życzenie'}</p>
                <h2 className="text-[#c9a84c] text-sm tracking-widest uppercase mb-4 mt-8">Stawki</h2>
                <p className="text-white/70">{profile.rates || 'Kontakt w celu ustalenia'}</p>
              </section>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div>
              <h2 className="text-[#c9a84c] text-sm tracking-widest uppercase mb-6">Galeria</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {(profile.images || []).map((img, i) => (
                  <div key={i} className="aspect-square bg-[#111] border border-[#1a1a1a] flex items-center justify-center">
                    <img src={img} alt={`${profile.name} ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
                {(!profile.images || profile.images.length === 0) && (
                  <div className="col-span-full text-center py-12 text-white/40">Brak zdjęć w galerii</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="bg-[#111] border border-[#1a1a1a] p-8">
              <h2 className="text-[#c9a84c] text-sm tracking-widest uppercase mb-6">Kontakt</h2>
              <p className="text-white/70 mb-6">Skontaktuj się przez Studio HRL Adult, aby umówić spotkanie lub uzyskać więcej informacji.</p>
              <Link href="/#contact" className="inline-block px-6 py-3 bg-[#9b1f35] text-white text-sm tracking-wider hover:bg-[#b0243c] transition-colors">
                FORMULARZ KONTAKTOWY
              </Link>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="border-t border-[#1a1a1a] py-8 px-6 mt-12">
          <div className="max-w-4xl mx-auto text-center text-xs text-white/40">
            <p>&copy; 2026 Studio HRL Adult. Wszelkie prawa zastrzeżone.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ProfileTemplate;
