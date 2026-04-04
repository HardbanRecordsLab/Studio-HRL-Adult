import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  const productionShowcase = [
    {
      title: 'Studio Noir Elegance',
      image: 'https://picsum.photos/400/400?random=1',
      type: 'Sesja Foto',
      alt: 'Studio Noir Elegance - Profesjonalna sesja zdjęciowa w eleganckim studiu z czarnym tłem, oferująca wysokiej klasy zawartość visual dla platformy adult',
      description: 'Sesja zdjęciowa w eleganckim studiu'
    },
    {
      title: 'Velvet Intimacy',
      image: 'https://picsum.photos/400/400?random=2',
      type: 'Lifestyle Content',
      alt: 'Velvet Intimacy - Zawartość lifestylowa z czułym nastawieniem, pokazująca naturalną piękność i intymność w profesjonalnym kontekście',
      description: 'Zawartość lifestylowa z czułą atmosferą'
    },
    {
      title: 'Golden Hour',
      image: 'https://picsum.photos/400/400?random=3',
      type: 'Styl Komercyjny',
      alt: 'Golden Hour - Komercyjna sesja w złotej godzinie z naturalnym oświetleniem, tworząca wysokiej klasy zawartość marketingową',
      description: 'Zdjęcia w złotej godzinie z naturalnym światłem'
    },
    {
      title: 'Artistic Expression',
      image: 'https://picsum.photos/400/400?random=4',
      type: 'Kierunek Kreatywny',
      alt: 'Artistic Expression - Artystyczna interpretacja zawartości adult z kreatywnym kierunkiem i profesjonalną realizacją',
      description: 'Artystyczna interpretacja zawartości'
    },
    {
      title: 'Luxury Aesthetics',
      image: 'https://picsum.photos/400/400?random=5',
      type: 'Produkcja High-End',
      alt: 'Luxury Aesthetics - Ekskluzywna produkcja high-end z luksusową estetyką i premium zarabiającą zawartością',
      description: 'Luksusowa estetyka premium'
    },
    {
      title: 'Natural Beauty',
      image: 'https://picsum.photos/400/400?random=6',
      type: 'Organiczny Content',
      alt: 'Natural Beauty - Organiczna zawartość celebrująca naturalną piękność bez nadmiernej edycji, autentyczna i czysta',
      description: 'Zawartość organiczna z naturalnym pięknem'
    },
    {
      title: 'Urban Glamour',
      image: 'https://picsum.photos/400/400?random=7',
      type: 'Sesja Miejska',
      alt: 'Urban Glamour - Sesja miejska z glamuracyjnym stylem, łącząca zagraniczną architekturę z profesjonalnym performing',
      description: 'Glamuracyjna sesja w mieście'
    },
    {
      title: 'Sensual Shadows',
      image: 'https://picsum.photos/400/400?random=8',
      type: 'Oświetlenie Studio',
      alt: 'Sensual Shadows - Czuła gra światła i cienia w studiu, tworząca mistyczną i zmysłową atmosferę premium',
      description: 'Gra światła i cienia w studiu'
    },
    {
      title: 'Intimate Moments',
      image: 'https://picsum.photos/400/400?random=9',
      type: 'Content Osobisty',
      alt: 'Intimate Moments - Osobista zawartość intymnych chwil, autentyczna i czuła, idealna do budowania fanbase',
      description: 'Intymne momenty z osobistą nutą'
    }
  ];

  return (
    <section className="py-32 px-[7%] bg-dark-2 overflow-hidden relative border-y border-gold/5" id="philosophy">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24 space-y-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="section-tag justify-center"
          >
            Nasza Filozofia
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="h2-premium uppercase"
          >
            Sztuka Rozrywki <br />
            <span className="italic bg-gold-gradient bg-clip-text text-transparent">Dla Dorosłych</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className="text-dim text-base md:text-lg leading-loose font-light italic">
              "Wierzymy, że tworzenie treści dla dorosłych to forma sztuki, która wymaga zarówno wizji artystycznej, jak i biznesowego profesjonalizmu."
            </p>

            <div className="h-px w-24 bg-gold/30" />

            <p className="text-dim text-sm md:text-base leading-relaxed font-light">
              W Studio HRL Adult łączymy estetykę high-end z efektywnością operacyjną.
              Nasze podejście opiera się na trzech filarach: absolutnym szacunku, szczytowym profesjonalizmie i pełnej transparentności.
              Zapewniamy naszym partnerkom nie tylko narzędzia, ale i inspirację do rozwoju jako niezależne artystki w bezpiecznym i lukratywnym środowisku.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <div className="text-gold font-cormorant text-3xl italic">01.</div>
                <h4 className="text-[10px] text-white font-bold tracking-widest uppercase">Doskonałość</h4>
                <p className="text-[9px] text-dim font-light">Bezkompromisowa jakość w każdym kadrze.</p>
              </div>
              <div className="space-y-2">
                <div className="text-gold font-cormorant text-3xl italic">02.</div>
                <h4 className="text-[10px] text-white font-bold tracking-widest uppercase">Prywatność</h4>
                <p className="text-[9px] text-dim font-light">Twoje bezpieczeństwo to nasz priorytet operacyjny.</p>
              </div>
            </div>
          </motion.div>

          {/* Production Showcase Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="font-cormorant text-2xl text-gold italic mb-8">Showcase Produkcji</h3>
            <div className="grid grid-cols-3 gap-4">
              {productionShowcase.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-square bg-dark-3 border border-gold/10 overflow-hidden hover:border-gold/30 transition-all duration-500"
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    title={item.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-3 left-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    <p className="font-cormorant text-sm text-gold italic">{item.title}</p>
                    <p className="text-[8px] text-dim/80 uppercase tracking-widest">{item.type}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
