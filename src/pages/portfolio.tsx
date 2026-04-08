import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '@/utils/constants';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import CTA from '@/components/sections/CTA';

const PortfolioPage: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState('jane');

  const profiles = [
    { 
      id: 'jane', 
      name: 'Jane', 
      handle: '@jane_premium', 
      age: 24, 
      bio: 'Sensualna zmysłowa artystka • Premium content creator • Specjalizacja: Lingerie, artystyczne nudy, zmysłowe sesje. Top 5% OnlyFans.', 
      stats: { followers: '28.5K', content: '620+', satisfaction: '97%', online: '18-22' }, 
      tags: ['OnlyFans', 'Fansly', 'Sensual'], 
      ico: '💋',
      measurements: { height: '172cm', weight: '58kg', bust: '100cm', waist: '65cm', hips: '95cm' },
      characteristics: 'Zmysłowa, artystka, naturalny seks-appeal. Specjalistka od tworzenia pięknych lingerie content i artystycznych nudów z tatuażem na biodrze.'
    },
    { 
      id: 'alexia', 
      name: 'Alexia', 
      handle: '@alexia_premium', 
      age: 23, 
      bio: 'Premium Glamour Creator • 10+ lat doświadczenia w modelingu • Specjalizacja: Artistic nudes, Fashion, Lingerie. Top 3% OnlyFans & Fansly.', 
      stats: { followers: '42.8K', content: '850+', satisfaction: '99%', online: '12-20' }, 
      tags: ['OnlyFans', 'Fansly', 'Luxury'], 
      ico: '✨',
      measurements: { height: '174cm', weight: '56kg', bust: '92cm', waist: '62cm', hips: '92cm' },
      characteristics: 'Artystka, elegancja, zmysłowość ze smakiem. Specjalistka od luxury content, artystycznych nudów i fotografii high-end. Absolutna profesjonalistka.'
    },
    { 
      id: 'anna', 
      name: 'Anna Rose', 
      handle: '@annarose_official', 
      age: 25, 
      bio: 'Tworzę treści od 2 lat • 1000+ unikalnych materiałów. Specjalizacja: Intymne rozmowy, Custom videos, Daily content. Top 5% OnlyFans.', 
      stats: { followers: '50.2K', content: '1.2K', satisfaction: '98%', online: '24/7' }, 
      tags: ['OnlyFans', 'Premium'], 
      ico: '📸',
      measurements: { height: '172cm', weight: '54kg', bust: '90cm', waist: '60cm', hips: '90cm' },
      characteristics: 'Elegancja, zmysłowość, profesjonalizm. Specjalistka od budowania głębokich relacji z fanami.'
    },
    { 
      id: 'marek', 
      name: 'Marek Wolf', 
      handle: '@marek_wolf', 
      age: 28, 
      bio: 'Męski i odważny styl. Profesjonalne sesje, wysoka jakość 4K. Specjalizacja: Solo & Group content.', 
      stats: { followers: '15.5K', content: '450', satisfaction: '95%', online: 'Daily' }, 
      tags: ['Chaturbate', 'Top Tier'], 
      ico: '📹',
      measurements: { height: '185cm', weight: '82kg', bust: '110cm', waist: '82cm', hips: '95cm' },
      characteristics: 'Charyzma, siła, autentyczność. Mistrz technicznych aspektów produkcji i dynamicznych show.'
    },
    { 
      id: 'anna-marek', 
      name: 'Anna & Marek', 
      handle: '@anna_marek_duo', 
      age: 'Duo', 
      bio: 'Prawdziwa para z naturalną chemią. Zmysłowe, autentyczne i profesjonalne materiały. Specjalizacja: Couple dynamics, live sessions, custom scenarios.', 
      stats: { followers: '4.2K', content: '240+', satisfaction: '99%', online: 'Daily' }, 
      tags: ['OnlyFans', 'Fansly', 'Couple'], 
      ico: '👩‍❤️‍👨',
      measurements: { height: 'Mixed', weight: 'Mixed', bust: 'N/A', waist: 'N/A', hips: 'N/A' },
      characteristics: 'Autentyczna chemia, wspólna pasja, profesjonalizm. Para która zmienia branżę - bez udawania, tylko rzeczywista intymność.'
    },
      measurements: { height: 'Mixed', weight: 'N/A', bust: 'N/A', waist: 'N/A', hips: 'N/A' },
      characteristics: 'Perfekcyjna chemia, luksusowy styl życia, innowacyjne podejście do treści dla par.'
    },
  ];

// ─── PARTNER CARD ────────────────────────────────────────────────────────────
const PartnerCard: React.FC<{ profile: typeof profiles[0] }> = ({ profile }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[450px] w-full perspective-1000 group cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d shadow-2xl"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front Side: Photo & Pseudonym */}
        <div className="absolute inset-0 backface-hidden bg-dark-2 border border-gold/10 overflow-hidden flex flex-col">
          <div className="flex-1 bg-gradient-to-br from-dark-3 to-dark-4 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,85,106,0.1),transparent_70%)]" />
            <div className="text-8xl filter blur-[2px] opacity-20 group-hover:blur-none group-hover:opacity-40 transition-all duration-700">
              {profile.ico}
            </div>
            <div className="absolute top-4 left-4 flex gap-2">
              {profile.tags.map(tag => (
                <span key={tag} className="text-[7px] tracking-[0.1em] uppercase px-2 py-0.5 bg-gold/10 text-gold border border-gold/20">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="p-8 bg-dark-2 border-t border-gold/10">
            <h3 className="font-playfair text-3xl text-white font-bold mb-1">{profile.name}</h3>
            <p className="text-gold text-[10px] tracking-[0.3em] uppercase">{profile.handle}</p>
          </div>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Back Side: Measurements & Characteristics */}
        <div 
          className="absolute inset-0 backface-hidden bg-dark-3 border border-gold/30 p-8 flex flex-col justify-between rotate-y-180"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="space-y-8">
            <div>
              <h4 className="font-playfair text-xl text-gold italic border-b border-gold/10 pb-2 mb-6">Wymiary</h4>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {Object.entries(profile.measurements).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center border-b border-gold/5 pb-1">
                    <span className="text-[8px] text-dim uppercase tracking-widest">{key}</span>
                    <span className="text-xs text-white font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-playfair text-xl text-gold italic border-b border-gold/10 pb-2 mb-4">Charakterystyka</h4>
              <p className="text-dim text-[11px] leading-relaxed font-light italic">
                {profile.characteristics}
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-gold/10 flex justify-center">
             <Link href={`/profile/${profile.id}`} className="text-[9px] text-gold uppercase tracking-[0.3em] font-bold border border-gold/20 px-6 py-2 hover:bg-gold hover:text-dark transition-all">
               Pełny Profil
             </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

  const contentItems = [
    { title: 'Intimate Morning Routine', type: 'Video • 12:45', price: '$29.99', ico: '📹' },
    { title: 'Golden Hour Photoshoot', type: 'Gallery • 25 photos', price: '$19.99', ico: '📸' },
    { title: 'Personal Video Message', type: 'Custom • 5:30', price: '$49.99', ico: '💬' },
    { title: 'Behind the Scenes', type: 'BTS • 8:15', price: '$14.99', ico: '🎥' },
  ];

  const currentProfile = profiles.find(p => p.id === activeProfile) || profiles[0];

  const portfolioItems = [
    {
      image: '/images/portfolio/template-jane.jpg',
      title: 'Profil: Jane',
      description: 'Zmysłowa i artystyczna twórczyni premium content. Specjalizuje się w lingerie, artystycznych aktach i zmysłowych sesjach z tatuażem. Premium glamour x intimacy.',
      link: '/profile/jane',
    },
    {
      image: '/images/portfolio/template-alexia.jpg',
      title: 'Szablon Premium: Alexia',
      description: 'Luksusowy szablon dla artystek i modelek, łączący elegancję ze zmysłowością. Idealny dla twórców high-end content i fotografii artystycznej.',
      link: '/profile/alexia',
    },
    {
      image: '/images/portfolio/template-anna.jpg',
      title: 'Szablon Solo: Elegancja',
      description: 'Elegancki i zmysłowy szablon profilu, idealny dla twórczyń ceniących sobie subtelność, klasę i głębokie relacje z fanami.',
      link: '/profile/anna',
    },
    {
      image: '/images/portfolio/template-marek.jpg',
      title: 'Szablon Solo: Siła',
      description: 'Odważny i dynamiczny szablon, stworzony dla twórców, którzy chcą podkreślić swoją siłę, charyzę i maskulinność.',
      link: '/profile/marek',
    },
    {
      image: '/images/portfolio/template-duo.jpg',
      title: 'Profil: Anna & Marek',
      description: 'Prawdziwa para z autentyczną chemią. Zmysłowe, intymne i profesjonalne materiały. Specjalizacja: Couple dynamics, live performance, real connection.',
      link: '/profile/anna-marek',
    },
  ];

  return (
    <>
      <Head>
        <title>Portfolio - Studio HRL Adult</title>
        <meta name="description" content="Portfolio i szablony profili partnerek Studio HRL Adult. Zobacz nasze realizacje i styl Anna & Marek." />
      </Head>
      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8 pt-24"
        >
          <h1 className="text-5xl font-bold text-primary mb-8 text-center">Portfolio</h1>
          <p className="text-lg text-center mb-12 max-w-3xl mx-auto">
            W Studio HRL Adult z dumą prezentujemy nasze portfolio, które jest świadectwem pasji i zaangażowania w tworzenie niezapomnianych doświadczeń. Każdy projekt to unikalna historia, w której łączymy kreatywność z profesjonalizmem, aby dostarczyć naszym partnerkom narzędzia do osiągnięcia sukcesu. Poniżej znajdziesz wybrane szablony profili, które odzwierciedlają różnorodność i wysoką jakość naszych usług.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-secondary rounded-lg shadow-lg overflow-hidden"
              >
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-primary mb-2">{item.title}</h2>
                  <p className="text-text-light mb-4">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-primary text-dark px-4 py-2 rounded hover:bg-primary-light transition-colors"
                  >
                    Zobacz więcej
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <Footer />
      </div>
      <style jsx global>{`
        html, body {
          background-color: #1a1a1a; /* Dark background for the whole page */
          color: #e0e0e0; /* Light text color */
        }
      `}</style>
    </>
  );
};

export default PortfolioPage;
