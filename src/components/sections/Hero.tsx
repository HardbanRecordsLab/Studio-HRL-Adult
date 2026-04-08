import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getCloudinaryUrl } from '@/utils/cloudinary';
import { ROUTES } from '@/utils/constants';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-[7%] bg-dark">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-dark/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/20 via-transparent to-dark z-10" />
        <img 
          src={getCloudinaryUrl('hero-model.jpg', { quality: 'auto', format: 'auto' })} 
          alt="Premium Experience" 
          className="w-full h-full object-cover object-center opacity-40 grayscale"
        />
      </div>
      
      {/* Floating Orbs for depth */}
      <div className="orb o1 animate-orb-float" />
      <div className="orb o2 animate-orb-float" />

      <div className="relative z-20 text-center max-w-5xl mx-auto space-y-10">
        {/* Logo Accent */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-4"
        >
          <div className="w-16 h-16 rounded-full border border-gold/30 p-1 bg-dark/50 backdrop-blur-sm">
            <img 
              src="/logo/studio hrl adultbezła logo.png" 
              alt="HRL" 
              className="w-full h-full object-contain"
            />
          </div>
        </motion.div>

        {/* Main Heading */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-4 text-gold/60 text-[9px] tracking-[0.6em] uppercase"
          >
            <div className="w-12 h-px bg-gold/20" />
            Studio HRL Adult
            <div className="w-12 h-px bg-gold/20" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-cormorant text-6xl md:text-[110px] font-light leading-[0.85] tracking-tight text-white uppercase"
          >
            Elevate Your <br />
            <span className="italic bg-gold-gradient bg-clip-text text-transparent">Experience</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gold text-[10px] md:text-xs tracking-[0.5em] uppercase font-bold"
          >
            Redefine Entertainment
          </motion.h2>
        </div>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-dim text-sm md:text-base leading-loose max-w-2xl mx-auto font-light italic"
        >
          Discover Poland's foremost platform for independent adult production and distribution. 
          Where artistry meets professional excellence.
        </motion.p>

        {/* CTAs removed */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
        <div className="w-px h-16 bg-gradient-to-b from-gold via-gold/50 to-transparent" />
      </div>

      <style jsx>{`
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          z-index: 5;
        }
        .o1 { width: 600px; height: 600px; background: rgba(155,31,53,0.08); top: -10%; left: -10%; }
        .o2 { width: 500px; height: 500px; background: rgba(201,168,76,0.05); bottom: -10%; right: -5%; }
      `}</style>
    </section>
  );
};

export default Hero;
