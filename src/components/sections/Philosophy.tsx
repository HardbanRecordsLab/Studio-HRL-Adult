import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
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

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-dark-3 border border-gold/10 overflow-hidden relative group">
              <div className="absolute inset-0 bg-dark/20 z-10 group-hover:bg-dark/0 transition-colors duration-700" />
              <img 
                src="/images/philosophy-visual.jpg" 
                alt="The Art of Production" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              />
              
              {/* Decorative Frame */}
              <div className="absolute inset-6 border border-gold/20 z-20 pointer-events-none" />
              <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-gold z-30" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-gold z-30" />
            </div>
            
            {/* Floating Caption */}
            <div className="absolute -bottom-8 -left-8 bg-dark-4 border border-gold/10 p-8 shadow-2xl hidden md:block z-40">
              <p className="font-cormorant text-xl text-gold italic">Vision. Passion. Profit.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
