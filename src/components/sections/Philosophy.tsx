import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  const productionShowcase = [
    {
      title: 'Studio Noir Elegance',
      image: 'https://picsum.photos/400/400?random=1',
      type: 'Photo Session'
    },
    {
      title: 'Velvet Intimacy',
      image: 'https://picsum.photos/400/400?random=2',
      type: 'Lifestyle Content'
    },
    {
      title: 'Golden Hour',
      image: 'https://picsum.photos/400/400?random=3',
      type: 'Commercial Style'
    },
    {
      title: 'Artistic Expression',
      image: 'https://picsum.photos/400/400?random=4',
      type: 'Creative Direction'
    },
    {
      title: 'Luxury Aesthetics',
      image: 'https://picsum.photos/400/400?random=5',
      type: 'High-End Production'
    },
    {
      title: 'Natural Beauty',
      image: 'https://picsum.photos/400/400?random=6',
      type: 'Organic Content'
    },
    {
      title: 'Urban Glamour',
      image: 'https://picsum.photos/400/400?random=7',
      type: 'City Shoot'
    },
    {
      title: 'Sensual Shadows',
      image: 'https://picsum.photos/400/400?random=8',
      type: 'Studio Lighting'
    },
    {
      title: 'Intimate Moments',
      image: 'https://picsum.photos/400/400?random=9',
      type: 'Personal Content'
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
            Our Philosophy
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="h2-premium uppercase"
          >
            The Art of Adult <br />
            <span className="italic bg-gold-gradient bg-clip-text text-transparent">Entertainment</span>
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
              "We believe that adult content creation is a form of art that requires both artistic vision and business professionalism."
            </p>

            <div className="h-px w-24 bg-gold/30" />

            <p className="text-dim text-sm md:text-base leading-relaxed font-light">
              At Studio HRL Adult, we combine high-end aesthetics with operational efficiency.
              Our approach is built on three core pillars: absolute respect, peak professionalism, and full transparency.
              We provide our partners not just with tools, but with the inspiration to grow as independent artists in a safe and lucrative environment.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <div className="text-gold font-cormorant text-3xl italic">01.</div>
                <h4 className="text-[10px] text-white font-bold tracking-widest uppercase">Excellence</h4>
                <p className="text-[9px] text-dim font-light">Uncompromising quality in every frame.</p>
              </div>
              <div className="space-y-2">
                <div className="text-gold font-cormorant text-3xl italic">02.</div>
                <h4 className="text-[10px] text-white font-bold tracking-widest uppercase">Privacy</h4>
                <p className="text-[9px] text-dim font-light">Your security is our operational priority.</p>
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
            <h3 className="font-cormorant text-2xl text-gold italic mb-8">Production Showcase</h3>
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
                    alt={item.title}
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
