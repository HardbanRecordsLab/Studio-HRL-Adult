import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';
import { useMessages } from '@/i18n';
import { contactPages } from '@/i18n/contact';

const DOC_FILES = [
  'HRL_01_Dokumentacja_Biznesowa.docx',
  'HRL_02_Umowa_Partnerska.docx',
  'HRL_03_Regulamin_Szczegolowy.docx',
  'HRL_04_Formularz_Castingowy.docx',
];

const DocsPage: React.FC = () => {
  const { docs: t } = useMessages(contactPages);

  return (
    <>
      <Head>
        <title>{t.pageTitle}</title>
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-32 pb-24 px-[7%] max-w-7xl mx-auto">
          <div className="section-tag">{t.tag}</div>
          <h1 className="h1-premium mb-8">{t.titleA} <span className="italic bg-gold-gradient bg-clip-text text-transparent">{t.titleB}</span></h1>
          <p className="text-dim text-sm leading-loose max-w-2xl mb-16">
            {t.intro}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.items.map((doc, i) => (
              <motion.div
                key={DOC_FILES[i]}
                whileHover={{ y: -5 }}
                className="bg-dark-2 border border-gold/10 p-10 relative overflow-hidden group"
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="text-[10px] text-gold tracking-[0.3em] uppercase mb-4">{t.documentLabel} {String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-cormorant text-2xl text-white mb-4 italic">{doc.title}</h3>
                <p className="text-xs text-dim leading-relaxed mb-8">{doc.desc}</p>
                <button className="text-[10px] text-gold tracking-widest uppercase border-b border-gold/20 pb-1 hover:border-gold transition-all">
                  {t.download} {DOC_FILES[i]}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="bg-dark-3/50 border border-gold/5 p-8 space-y-4">
              <div className="section-tag">{t.noticeTitle}</div>
              <p className="text-xs text-dim leading-relaxed">
                {t.notice}
              </p>
            </div>
            <div className="bg-dark-3/50 border border-gold/5 p-8 space-y-4">
              <div className="section-tag">{t.photosTitle}</div>
              <p className="text-xs text-dim leading-relaxed">
                {t.photos}
              </p>
            </div>
          </div>
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>
    </>
  );
};

export default DocsPage;
