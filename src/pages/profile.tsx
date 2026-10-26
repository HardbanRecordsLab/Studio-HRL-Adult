import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useMessages } from '@/i18n';
import { profileCopy } from '@/i18n/profiles';

const sectionClass = 'mb-12 p-8 bg-white/5 rounded-2xl backdrop-blur-md border border-[rgba(255,215,0,0.2)]';
const hoverLift = 'hover:translate-y-[-5px] hover:shadow-[0_15px_50px_rgba(218,112,214,0.4)] transition-all duration-300';
const subHeadingClass = 'text-xl md:text-2xl text-[#da70d6] my-5 border-l-4 border-[#ffd700] pl-4';
const headingClass = 'font-cinzel text-3xl md:text-4xl text-[#ffd700] mb-6 text-center';
const thClass = 'p-4 text-left text-[#ffd700] border-b border-[rgba(255,255,255,0.2)]';

const ProfilePage: React.FC = () => {
  const { profileDemo: t } = useMessages(profileCopy);

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }
      `}</style>

      <div className="min-h-screen font-playfair bg-gradient-to-br from-[#1a1a1a] via-[#2d1b69] to-black text-[#f0e6d2] leading-relaxed overflow-x-hidden">
        <div className="max-w-[1200px] mx-auto p-5">

          {/* Navigation Back */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-[#ffd700] hover:text-[#da70d6] transition-colors text-sm tracking-wider">
              <span>←</span> {t.back}
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center p-12 md:p-16 bg-black/70 rounded-2xl mb-10 shadow-[0_10px_40px_rgba(218,112,214,0.3)]"
          >
            <h1 className="font-cinzel text-4xl md:text-5xl text-[#ffd700] mb-3 drop-shadow-[0_0_20px_rgba(255,215,0,0.5)] animate-pulse">
              {t.headline}
            </h1>
            <p className="text-lg md:text-xl max-w-[800px] mx-auto opacity-90">
              {t.subline}
            </p>
          </motion.header>

          {/* About */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="about"
            className={`${sectionClass} ${hoverLift}`}
          >
            <h2 className={headingClass}>{t.aboutTitle}</h2>

            <h3 className={subHeadingClass}>{t.measurementsTitle}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-8">
              {t.dimensions.map((dim, index) => (
                <motion.div
                  key={dim.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/30 p-4 rounded-lg border border-[rgba(255,215,0,0.1)]"
                >
                  <span className="text-[#da70d6] font-semibold">{dim.label}:</span> {dim.value}
                </motion.div>
              ))}
            </div>

            <h3 className={subHeadingClass}>{t.characterTitle}</h3>
            <p className="text-base leading-7">
              {t.character}
            </p>
          </motion.section>

          {/* Preferences and boundaries */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="preferences"
            className={`${sectionClass} ${hoverLift}`}
          >
            <h2 className={headingClass}>{t.preferencesTitle}</h2>

            <h3 className={subHeadingClass}>{t.likesTitle}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
              {t.likes.map((like, index) => (
                <motion.div
                  key={like.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/30 p-5 rounded-lg border border-[rgba(255,215,0,0.1)]"
                >
                  <h4 className="text-[#ffd700] mb-2 font-semibold">{like.title}</h4>
                  <p className="text-sm opacity-80">{like.desc}</p>
                </motion.div>
              ))}
            </div>

            <h3 className={subHeadingClass}>{t.boundariesTitle}</h3>
            <ul className="space-y-3 pl-5 mb-6">
              {t.boundaries.map((item, index) => (
                <motion.li
                  key={item.strong}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="py-2"
                >
                  <strong className="text-[#ff6b6b]">{item.strong}</strong> {item.text}
                </motion.li>
              ))}
            </ul>

            <h3 className={subHeadingClass}>{t.discretionTitle}</h3>
            <p className="text-base leading-7 bg-black/20 p-5 rounded-lg border border-[rgba(255,215,0,0.1)]">
              {t.discretion}
            </p>
          </motion.section>

          {/* Services */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="services"
            className={`${sectionClass} ${hoverLift}`}
          >
            <h2 className={headingClass}>{t.servicesTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {t.services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="bg-black/30 p-6 rounded-lg border border-[rgba(255,215,0,0.1)]"
                >
                  <h3 className="text-xl text-[#da70d6] mb-4 font-semibold">{service.title}</h3>
                  <ul className="space-y-3 text-sm">
                    {service.items.map((item, i) => (
                      <li key={i} className="py-1 leading-relaxed">{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Availability and rates */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="availability"
            className={`${sectionClass} ${hoverLift}`}
          >
            <h2 className={headingClass}>{t.availabilityTitle}</h2>
            <p className="mb-6 text-base leading-7">
              <strong className="text-[#ffd700]">{t.availabilityLabel}</strong> {t.availability}
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse my-5">
                <thead>
                  <tr className="bg-[rgba(255,215,0,0.2)]">
                    {t.tableHeaders.map((header) => (
                      <th key={header} className={thClass}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {t.rates.map((row) => (
                    <tr key={row.service} className="border-b border-[rgba(255,255,255,0.1)] hover:bg-white/5 transition-colors">
                      <td className="p-4">{row.service}</td>
                      <td className="p-4 text-[#ffd700] font-semibold">{row.rate}</td>
                      <td className="p-4">{row.included}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm opacity-80">
              {t.ratesNote}
            </p>
          </motion.section>

          {/* Gallery */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="gallery"
            className={sectionClass}
          >
            <h2 className={headingClass}>{t.galleryTitle}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <motion.div
                  key={num}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: num * 0.05 }}
                  viewport={{ once: true }}
                  className="overflow-hidden rounded-xl cursor-pointer group"
                >
                  <img
                    src={`https://picsum.photos/400/500?random=${num}`}
                    alt={`${t.photoAlt} ${num}`}
                    className="w-full h-auto rounded-xl transition-transform duration-300 group-hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>

            <h3 className="text-xl md:text-2xl text-[#da70d6] my-5 text-center">{t.teaserTitle}</h3>
            <div className="flex flex-wrap gap-5 justify-center">
              <video width="400" height="auto" controls className="rounded-xl shadow-lg">
                <source src="placeholder-teaser1.mp4" type="video/mp4" />
                {t.noVideo}
              </video>
              <video width="400" height="auto" controls className="rounded-xl shadow-lg">
                <source src="placeholder-teaser2.mp4" type="video/mp4" />
                {t.noVideo}
              </video>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            id="cta"
            className="text-center p-10 md:p-12 rounded-2xl text-lg md:text-xl font-bold bg-gradient-to-r from-[#da70d6] to-[#ffd700] text-black"
          >
            <h2 className="text-2xl md:text-3xl mb-4 font-cinzel">{t.ctaTitle}</h2>
            <p className="mb-6 font-normal text-base">
              {t.ctaText}
            </p>
            <button
              onClick={() => alert(t.ctaAlert)}
              className="px-10 py-4 text-lg bg-black text-[#ffd700] border-none rounded-full cursor-pointer font-playfair hover:scale-105 transition-transform shadow-lg"
            >
              {t.ctaButton}
            </button>
          </motion.section>

        </div>
      </div>
    </>
  );
};

export default ProfilePage;
