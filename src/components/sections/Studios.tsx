import React from 'react';
import { motion } from 'framer-motion';

const Studios: React.FC = () => {
  const studios = [
    {
      title: 'Noir Elegance',
      desc: 'Minimalist aesthetics designed for high-contrast lighting and shadows.',
      image: '/images/studio-noir.jpg',
      tag: 'Cinema Grade'
    },
    {
      title: 'Ethereal Velvet',
      desc: 'Soft textures and warm tones for intimate and elegant content.',
      image: '/images/studio-velvet.jpg',
      tag: 'Luxury Decor'
    },
    {
      title: 'Neon Nexus',
      desc: 'Futuristic lighting setups for vibrant, high-energy productions.',
      image: '/images/studio-neon.jpg',
      tag: 'Interactive Tech'
    },
    {
      title: 'Pure Platinum',
      desc: 'A bright, high-key environment for fashion and commercial styles.',
      image: '/images/studio-platinum.jpg',
      tag: '4K Standard'
    }
  ];

  return (
    <section className="py-32 px-[7%] bg-dark overflow-hidden relative" id="studios">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="section-tag justify-center"
          >
            Premium Studios & Production
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="h2-premium uppercase"
          >
            Spaces Crafted for <br />
            <span className="italic bg-gold-gradient bg-clip-text text-transparent">Excellence</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studios.map((studio, i) => (
            <motion.div 
              key={studio.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-full flex flex-col bg-dark-2 border border-gold/10 overflow-hidden hover:border-gold/30 transition-all duration-500"
            >
              {/* Image Aspect */}
              <div className="aspect-[3/4] overflow-hidden relative">
                <div className="absolute inset-0 bg-dark/20 z-10 group-hover:bg-dark/0 transition-colors duration-500" />
                <img 
                  src={studio.image} 
                  alt={studio.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                />
                <div className="absolute top-4 right-4 z-20 text-[7px] tracking-[0.2em] uppercase bg-dark/80 text-gold px-3 py-1 border border-gold/20 backdrop-blur-md">
                  {studio.tag}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 space-y-4 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-cormorant text-2xl text-white group-hover:text-gold transition-colors duration-500 italic">
                    {studio.title}
                  </h3>
                  <p className="text-dim text-[10px] leading-relaxed font-light italic">
                    {studio.desc}
                  </p>
                </div>
                
                <div className="pt-4 flex items-center gap-2 group-hover:gap-4 transition-all duration-500">
                  <div className="h-px w-8 bg-gold/30 group-hover:w-12 transition-all" />
                  <span className="text-[8px] text-gold tracking-widest uppercase font-bold">Details</span>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </motion.div>
          ))}
        </div>

        {/* CTA Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="mt-24 p-12 bg-dark-3/50 border border-gold/10 flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <div className="relative z-10 space-y-4 text-center md:text-left">
            <div className="section-tag md:justify-start">Studio Tour</div>
            <h4 className="font-cormorant text-3xl md:text-4xl text-white italic">Experience the Quality in Person</h4>
            <p className="text-dim text-xs md:text-sm font-light max-w-xl">
              Book a non-committal tour of our production facilities and see where the magic happens.
            </p>
          </div>
          <button className="btn-gold relative z-10 whitespace-nowrap min-w-[200px]">
            Schedule Visit
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Studios;
