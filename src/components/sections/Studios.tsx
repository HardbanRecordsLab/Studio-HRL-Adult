import React from 'react';
import { motion } from 'framer-motion';

const Studios: React.FC = () => {
  const galleryItems = [
    { type: 'photo', title: 'Studio Setup A', image: '/images/studio-noir.jpg' },
    { type: 'video', title: 'Behind The Scenes', image: '/images/studio-velvet.jpg' },
    { type: 'photo', title: 'Lighting Setup', image: '/images/studio-neon.jpg' },
    { type: 'photo', title: 'Production Room', image: '/images/studio-platinum.jpg' },
    { type: 'video', title: 'Full Production', image: '/images/studio-noir.jpg' },
    { type: 'photo', title: 'Equipment Showcase', image: '/images/studio-velvet.jpg' },
    { type: 'video', title: 'Client Testimonial', image: '/images/studio-neon.jpg' },
    { type: 'photo', title: 'Gallery 4K', image: '/images/studio-platinum.jpg' },
    { type: 'photo', title: 'Control Room', image: '/images/studio-noir.jpg' },
    { type: 'video', title: 'Setup Process', image: '/images/studio-velvet.jpg' },
    { type: 'photo', title: 'Studio Overview', image: '/images/studio-neon.jpg' },
    { type: 'photo', title: 'Editing Suite', image: '/images/studio-platinum.jpg' },
    { type: 'video', title: 'Day in Studio', image: '/images/studio-noir.jpg' },
    { type: 'photo', title: 'Cameras Array', image: '/images/studio-velvet.jpg' },
    { type: 'photo', title: 'Microphone Booth', image: '/images/studio-neon.jpg' },
    { type: 'video', title: 'Sound Check', image: '/images/studio-platinum.jpg' },
    { type: 'photo', title: 'Backdrop Design', image: '/images/studio-noir.jpg' },
    { type: 'photo', title: 'Lighting Rig', image: '/images/studio-velvet.jpg' },
    { type: 'video', title: 'Production Flow', image: '/images/studio-neon.jpg' },
    { type: 'photo', title: 'Wardrobe Area', image: '/images/studio-platinum.jpg' },
    { type: 'photo', title: 'Green Screen Setup', image: '/images/studio-noir.jpg' },
    { type: 'video', title: 'Mixing Session', image: '/images/studio-velvet.jpg' },
    { type: 'photo', title: 'VR Equipment', image: '/images/studio-neon.jpg' },
    { type: 'photo', title: 'Studio Tech', image: '/images/studio-platinum.jpg' },
    { type: 'video', title: 'Testimonial 1', image: '/images/studio-noir.jpg' },
    { type: 'photo', title: 'Director Station', image: '/images/studio-velvet.jpg' },
    { type: 'photo', title: 'Lounge Area', image: '/images/studio-neon.jpg' },
    { type: 'video', title: 'Gallery Walk', image: '/images/studio-platinum.jpg' },
    { type: 'photo', title: 'Monitor Wall', image: '/images/studio-noir.jpg' },
    { type: 'video', title: 'Testimonial 2', image: '/images/studio-velvet.jpg' },
    { type: 'photo', title: 'Storage Solutions', image: '/images/studio-neon.jpg' },
    { type: 'video', title: 'Full Tour', image: '/images/studio-platinum.jpg' },
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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[280px]">
          {galleryItems.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden bg-dark-2 border border-gold/10 hover:border-gold/30 transition-all duration-500 cursor-pointer"
              style={{
                gridColumn: i === 0 || i === 4 ? 'span 1' : 'span 1',
              }}
            >
              {/* Image */}
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Video Play Button */}
              {item.type === 'video' && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.15 }}
                    className="w-16 h-16 rounded-full bg-crimson/80 flex items-center justify-center border-2 border-white/40 backdrop-blur-sm group-hover:bg-crimson transition-all"
                  >
                    <span className="text-white text-2xl ml-1">▶</span>
                  </motion.div>
                </div>
              )}
              
              {/* Content Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <div className="text-[8px] tracking-[0.2em] uppercase text-gold font-bold mb-1">
                  {item.type === 'video' ? '▶ VIDEO' : '📸 PHOTO'}
                </div>
                <h4 className="font-cormorant text-sm text-white italic">
                  {item.title}
                </h4>
              </div>

              {/* Type badge */}
              <div className="absolute top-3 right-3 text-[10px] tracking-[0.15em] uppercase bg-dark/60 text-gold px-2 py-1 border border-gold/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {item.type}
              </div>
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
            <div className="section-tag md:justify-start">Gallery Access</div>
            <h4 className="font-cormorant text-3xl md:text-4xl text-white italic">View Full Media Gallery</h4>
            <p className="text-dim text-xs md:text-sm font-light max-w-xl">
              Browse through our complete collection of photos and production videos showcasing our facilities.
            </p>
          </div>
          <button className="btn-gold relative z-10 whitespace-nowrap min-w-[200px]">
            View Gallery
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Studios;
