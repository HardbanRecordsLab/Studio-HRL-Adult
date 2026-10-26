import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { useMessages } from '@/i18n';
import { contactPages } from '@/i18n/contact';

const CONTACT_EMAIL = 'hrl-adult-studio@hardbanrecordslab.online';

const contactMeta = [
  { ico: '💬', wa: 'https://wa.me/48725663741' },
  { ico: '📧' },
  { ico: '🎬' },
  { ico: '⚖️' },
];

const ContactPage: React.FC = () => {
  const { contact: t } = useMessages(contactPages);

  return (
    <>
      <Head><title>{t.pageTitle}</title></Head>
      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />
        <main className="pt-32 pb-24 px-[7%] max-w-7xl mx-auto">
          <div className="section-tag">{t.tag}</div>
          <h1 className="h1-premium mb-4">{t.titleA} <span className="italic bg-gold-gradient bg-clip-text text-transparent">{t.titleB}</span></h1>
          <p className="text-dim text-sm leading-loose max-w-2xl mb-16">{t.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/10 border border-gold/10">
            {t.cards.map((card, i) => {
              const meta = contactMeta[i];
              return (
                <div key={card.title} className="bg-dark-2 p-12 text-center space-y-6 hover:bg-dark-3 transition-colors">
                  <div className="text-4xl">{meta.ico}</div>
                  <h3 className="font-cormorant text-2xl text-gold italic">{card.title}</h3>
                  <p className="text-xs text-dim leading-relaxed max-w-xs mx-auto">{card.desc}</p>
                  {meta.wa ? <a href={meta.wa} target="_blank" rel="noopener noreferrer" className="inline-block text-white text-sm border-b border-gold/30 pb-1 hover:border-gold transition-all">{t.whatsappCta}</a> : <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block text-white text-sm border-b border-gold/30 pb-1 hover:border-gold transition-all">{CONTACT_EMAIL}</a>}
                </div>
              );
            })}
          </div>
          <section className="mt-32">
            <div className="section-tag">{t.faqTag}</div>
            <h2 className="h1-premium mb-16">{t.faqTitleA} <span className="italic bg-gold-gradient bg-clip-text text-transparent">{t.faqTitleB}</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {[t.faq.slice(0, 2), t.faq.slice(2)].map((column, i) => (
                <div key={i} className="space-y-12">
                  {column.map((item) => (
                    <div key={item.q}><h4 className="font-cormorant text-xl text-white mb-4 italic">{item.q}</h4><p className="text-xs text-dim leading-loose">{item.a}</p></div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
        <div className="grain-overlay" />
      </div>
    </>
  );
};

export default ContactPage;
