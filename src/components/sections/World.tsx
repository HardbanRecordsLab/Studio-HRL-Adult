import React from 'react';
import { motion } from 'framer-motion';

const World: React.FC = () => {
  const items = [
    { title: 'Noir Dreams', image: '/images/world-1.jpg' },
    { title: 'Złoty Brzask', image: '/images/world-2.jpg' },
    { title: 'Spokój Ogrodu', image: '/images/world-3.jpg' },
    { title: 'Jesienny Blask', image: '/images/world-4.jpg' },
  ];

  return (
    <section className="py-32 px-[7%] bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24 space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="section-tag justify-center"
          >
            A Glimpse Into Our World
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="h2-premium uppercase"
          >
            Artistry in <br />
            <span className="italic bg-gold-gradient bg-clip-text text-transparent">Every Detail</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="aspect-[4/5] bg-dark-2 border border-gold/10 overflow-hidden relative group"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6 z-10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <p className="font-cormorant text-xl text-gold italic">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Pagination/Dots Accent */}
        <div className="flex justify-center gap-2 mt-12">
          {[0, 1, 2, 3].map(dot => (
            <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot === 0 ? 'bg-gold' : 'bg-gold/20'}`} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default World;
