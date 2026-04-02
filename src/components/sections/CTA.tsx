import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ROUTES } from '@/utils/constants';

const CTA: React.FC = () => {
  return (
    <section className="py-32 px-[7%] bg-dark overflow-hidden relative" id="cta">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Join Community Card */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-dark-2 border border-gold/15 p-12 md:p-16 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 space-y-8">
              <h2 className="font-cormorant text-3xl md:text-5xl text-white font-light leading-tight uppercase">
                Join Our Exclusive <br />
                <span className="italic bg-gold-gradient bg-clip-text text-transparent">Community</span>
              </h2>
              <p className="text-dim text-xs md:text-sm leading-relaxed font-light max-w-md italic">
                Elevate your career with Poland's foremost production house. 
                Professional management, high-end content, and unparalleled support.
              </p>
              <Link href={ROUTES.CASTING} className="btn-outline border-gold/40 text-gold hover:bg-gold hover:text-dark">
                View Membership Plans
              </Link>
            </div>
            
            {/* Background Icon Accent */}
            <div className="absolute bottom-8 right-8 text-8xl opacity-5 grayscale group-hover:grayscale-0 group-hover:opacity-10 transition-all duration-700">
              💎
            </div>
          </motion.div>

          {/* Partner With Us Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-dark-3 border border-gold/15 p-12 md:p-16 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-crimson/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 space-y-8">
              <h2 className="font-cormorant text-3xl md:text-5xl text-white font-light leading-tight uppercase">
                Partner With Us <br />
                <span className="italic text-crimson">Distribution Platform</span>
              </h2>
              <p className="text-dim text-xs md:text-sm leading-relaxed font-light max-w-md italic">
                Our advanced infrastructure ensures your content reaches the right audience 
                across 10+ premium platforms simultaneously.
              </p>
              <Link href="https://t.me/HRL_Adult" className="btn-crimson">
                Explore Partnerships
              </Link>
            </div>

            {/* Background Graphic Accent */}
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-10 pointer-events-none">
              <img src="/images/chart-accent.png" alt="Growth" className="w-full h-full object-contain" />
            </div>
          </motion.div>
        </div>

        {/* Global Footer Stats inside CTA section like in image */}
        <div className="mt-20 pt-12 border-t border-gold/5 flex flex-wrap justify-center gap-12 md:gap-24 opacity-40">
          <div className="text-center">
            <span className="block font-cormorant text-3xl text-gold italic">18+</span>
            <span className="text-[7px] tracking-[0.3em] uppercase text-dim">Adult Content</span>
          </div>
          <div className="text-center">
            <span className="block font-cormorant text-3xl text-gold italic">4K</span>
            <span className="text-[7px] tracking-[0.3em] uppercase text-dim">Production</span>
          </div>
          <div className="text-center">
            <span className="block font-cormorant text-3xl text-gold italic">60/30/10</span>
            <span className="text-[7px] tracking-[0.3em] uppercase text-dim">Revenue Model</span>
          </div>
          <div className="text-center">
            <span className="block font-cormorant text-3xl text-gold italic">24/7</span>
            <span className="text-[7px] tracking-[0.3em] uppercase text-dim">Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
