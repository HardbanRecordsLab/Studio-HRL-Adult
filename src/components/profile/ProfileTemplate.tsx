import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Platform {
  id: string;
  name: string;
  url: string;
  followers: number;
  icon: string;
  verified?: boolean;
}

interface ProfileData {
  id: string;
  handle: string;
  name: string;
  bio: string;
  heroImage: string;
  aboutImage1: string;
  aboutImage2: string;
  yearsTogether: number;
  description: string;
  platforms: Platform[];
  stats: {
    subscribers: number;
    content: number;
    satisfaction: number;
  };
  liveSchedule: Array<{
    day: string;
    time: string;
    active: boolean;
  }>;
  subscriptionPlans: Array<{
    name: string;
    description: string;
    price: number;
    period: string;
    perks: string[];
    featured?: boolean;
    ofUrl?: string;
  }>;
  testimonials: Array<{
    username: string;
    text: string;
    since: string;
    rating: number;
    avatar: string;
  }>;
}

interface ProfileTemplateProps {
  data: ProfileData;
  isPreview?: boolean;
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = ({ data, isPreview = false }) => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-dark text-cream overflow-hidden" style={{ cursor: 'none' }}>
      {/* Custom Cursor */}
      <div
        className="fixed pointer-events-none z-50 w-3 h-3 bg-rose rounded-full"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-12 py-6 backdrop-blur bg-black/95 border-b border-gold/10">
        <Link href="/" className="font-cormorant text-2xl italic text-white">
          {data.name.split(' ')[0]} <span className="text-rose">&</span> {data.name.split(' ')[1]}
        </Link>
        <div className="flex gap-8 text-sm tracking-widest uppercase">
          <a href="#about" className="text-muted hover:text-cream transition">O Nas</a>
          <a href="#live" className="text-muted hover:text-cream transition">Live</a>
          <a href="#subscribe" className="text-muted hover:text-cream transition">Subskrypcja</a>
        </div>
        <a href={data.platforms[0]?.url} className="px-6 py-2 border border-rose text-rose hover:bg-rose hover:text-white transition">
          Dołącz Teraz
        </a>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 min-h-screen grid grid-cols-2 gap-12 px-20 py-32 bg-deep border-b border-gold/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-center space-y-8"
        >
          <p className="text-rose text-sm tracking-widest uppercase">Autentyczna Para — Polska — Od 2024</p>
          <h1 className="font-playfair text-6xl font-black text-white">
            Tylko dla <em className="italic text-rose-light">Twoich</em>
            <span className="font-cormorant italic text-gold text-4xl"> &</span> naszych
          </h1>
          <p className="text-muted text-xl italic max-w-md leading-relaxed">
            {data.bio}
          </p>

          <div className="flex gap-4 pt-8">
            <a
              href={data.platforms[0]?.url}
              className="px-10 py-4 bg-rose text-white uppercase tracking-widest text-sm font-bold hover:bg-rose-light transition shadow-lg"
            >
              🔥 Subskrybuj
            </a>
            <a href="#about" className="text-gold italic hover:text-gold-light transition border-b border-gold/40">
              Podejrzyj →
            </a>
          </div>

          <div className="flex gap-12 pt-12 border-t border-gold/10">
            {Object.entries(data.stats).map(([key, value]) => (
              <div key={key}>
                <div className="text-3xl font-bold text-white">{value}{key === 'satisfaction' ? '%' : '+'}</div>
                <div className="text-xs text-muted uppercase tracking-widest">
                  {key === 'subscribers' && 'Subskrybentów'}
                  {key === 'content' && 'Treści'}
                  {key === 'satisfaction' && 'Zadowolonych'}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="aspect-square overflow-hidden border border-gold/10 relative">
            <img
              src={data.heroImage}
              alt={data.name}
              className="w-full h-full object-cover opacity-90 filter saturate-90 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="grid grid-cols-2 gap-20 px-20 py-32 bg-black border-b border-gold/10">
        <div className="relative h-96">
          <div className="absolute top-0 left-0 w-3/4 h-5/6 overflow-hidden border border-gold/10">
            <img src={data.aboutImage1} alt="Main photo" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 w-3/5 h-3/5 overflow-hidden border border-gold/10 shadow-2xl">
            <img src={data.aboutImage2} alt="Accent photo" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-gold rounded-full flex flex-col items-center justify-center bg-black z-20 shadow-lg">
            <span className="text-4xl font-bold text-gold">{data.yearsTogether}</span>
            <span className="text-xs text-muted tracking-widest">LAT RAZEM</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center space-y-8"
        >
          <div>
            <p className="text-rose text-sm tracking-widest uppercase mb-4">Kim Jestemy</p>
            <h2 className="font-playfair text-4xl font-bold text-white mb-4">
              {data.name} — <em className="italic text-rose-light">prawdziwa para</em>
            </h2>
          </div>

          <p className="text-muted text-lg italic leading-relaxed">{data.description}</p>

          <div className="space-y-6 pt-8">
            {[
              { icon: '🎬', title: 'Nowy content co tydzień', desc: 'Minimum 5 publikacji — zdjęcia, filmy i niespodzianki' },
              { icon: '💬', title: 'Odpowiadamy na wiadomości', desc: 'DM czytamy 2x dziennie. Piszesz — odpiszemy' },
              { icon: '🔥', title: 'Live dwa razy w tygodniu', desc: 'Bezpośrednio z wami, bez skryptu' },
            ].map((feature, i) => (
              <div key={i} className="flex gap-4">
                <div className="text-3xl flex-shrink-0">{feature.icon}</div>
                <div>
                  <h4 className="font-playfair text-white italic mb-2">{feature.title}</h4>
                  <p className="text-muted text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Platforms Section */}
      <section className="px-20 py-32 bg-deep border-b border-gold/10">
        <h2 className="font-playfair text-4xl font-bold text-white mb-16 text-center">
          Znajdź nas na <em className="italic text-rose-light">platformach</em>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.platforms.map((platform) => (
            <motion.a
              key={platform.id}
              href={platform.url}
              whileHover={{ scale: 1.05, borderColor: '#c8556a' }}
              className="border border-gold/10 p-6 text-center space-y-3 hover:bg-rose/5 transition"
            >
              <div className="text-4xl">{platform.icon}</div>
              <h4 className="text-white font-bold">{platform.name}</h4>
              <p className="text-muted text-sm">{platform.followers.toLocaleString()} obserwujących</p>
              {platform.verified && <p className="text-gold text-xs">✓ Zweryfikowane</p>}
            </motion.a>
          ))}
        </div>
      </section>

      {/* Live Schedule */}
      <section id="live" className="px-20 py-32 bg-black border-b border-gold/10">
        <div className="flex items-center gap-8 mb-16">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-rose animate-pulse" />
            <div className="absolute inset-0 rounded-full border border-rose" />
          </div>
          <div>
            <h2 className="font-playfair text-3xl italic text-white">Transmisje na żywo</h2>
            <p className="text-muted italic">Dwa razy w tygodniu — bądźcie punktualnie</p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {data.liveSchedule.map((day, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-4 border text-center ${
                day.active
                  ? 'border-rose bg-rose/10'
                  : 'border-gold/10'
              }`}
            >
              <p className={`text-sm tracking-widest uppercase ${day.active ? 'text-rose' : 'text-muted'}`}>
                {day.day}
              </p>
              <p className={`text-2xl font-playfair italic mt-2 ${day.active ? 'text-rose-light' : 'text-muted'}`}>
                {day.time || '—'}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-20 py-32 bg-deep border-b border-gold/10">
        <div className="text-center mb-16">
          <p className="text-rose text-sm tracking-widest uppercase mb-4">Co mówią fani</p>
          <h2 className="font-playfair text-4xl font-bold text-white mb-4">
            Oni już <em className="italic text-rose-light">wiedzą</em>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {data.testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8 }}
              className="bg-card border border-gold/10 p-8 space-y-4"
            >
              <p className="text-6xl text-rose opacity-20">"</p>
              <p className="text-white italic text-lg leading-relaxed">{testimonial.text}</p>
              <div className="flex items-center gap-3 pt-4">
                <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{testimonial.username}</p>
                  <p className="text-muted text-xs italic">{testimonial.since}</p>
                </div>
              </div>
              <p className="text-gold text-sm">{'★'.repeat(testimonial.rating)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Subscription Plans */}
      <section id="subscribe" className="px-20 py-32 bg-black border-b border-gold/10">
        <div className="mb-16">
          <p className="text-rose text-sm tracking-widest uppercase mb-4">Dołącz do nas</p>
          <h2 className="font-playfair text-4xl font-bold text-white mb-4">
            Wybierz <em className="italic text-rose-light">swój</em> dostęp
          </h2>
          <p className="text-muted italic text-lg max-w-md">
            Każda subskrypcja to pełny dostęp do archiwum, transmisji live i możliwość pisania do nas. Żadnych ukrytych opłat.
          </p>
        </div>

        <div className="space-y-4 max-w-2xl mb-8">
          {data.subscriptionPlans.map((plan, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className={`border p-8 flex justify-between items-center ${
                plan.featured ? 'border-rose bg-rose/5' : 'border-gold/10'
              } relative overflow-hidden`}
            >
              {plan.featured && (
                <div className="absolute -right-16 top-2 bg-rose text-white text-xs px-16 py-1 transform rotate-45">
                  NAJPOPULARNIEJSZY
                </div>
              )}
              <div>
                <h4 className="font-playfair text-xl text-white italic mb-1">{plan.name}</h4>
                <p className="text-muted text-sm italic">{plan.description}</p>
                <ul className="mt-3 space-y-1 text-sm">
                  {plan.perks.map((perk, j) => (
                    <li key={j} className="text-muted">
                      <span className="text-rose">✦</span> {perk}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="font-playfair text-4xl font-bold text-white">
                  ${plan.price}
                </span>
                <p className="text-muted text-sm italic">/ {plan.period}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <a
          href={data.subscriptionPlans[0]?.ofUrl || '#'}
          className="px-10 py-4 bg-rose text-white uppercase tracking-widest font-bold text-sm hover:bg-rose-light transition"
        >
          🔥 Przejdź na OnlyFans
        </a>
      </section>

      {/* Footer */}
      <footer className="px-20 py-16 bg-deep border-t border-gold/10 text-center text-muted text-sm italic">
        <p>© 2024 {data.name}. Wszelkie prawa zastrzeżone. Treść wyłącznie dla osób pełnoletnich.</p>
        <p className="mt-4 text-xs tracking-widest uppercase">18+ ONLY</p>
      </footer>
    </div>
  );
};

export default ProfileTemplate;
