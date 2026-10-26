import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

const CONTACT_EMAIL = 'hrl-adult-studio@hardbanrecordslab.online';

export type LegalBlock =
  | { kind: 'text'; lead?: string; text: string }
  | { kind: 'list'; items: Array<string | { lead: string; text: string }> }
  | { kind: 'bordered'; items: Array<{ title: string; text: string }> }
  | { kind: 'cards'; cols: 2 | 3; items: Array<{ big?: string; title: string; text: string }> };

export interface LegalSection {
  tone: 'gold' | 'crimson';
  title: string;
  blocks: LegalBlock[];
}

export interface LegalDoc {
  head: { title: string; description: string };
  tag: string;
  titleA: string;
  titleB: string;
  updated?: string;
  intro: string;
  notice?: string;
  sections: LegalSection[];
  footer: string;
}

/** Highlights the studio contact address wherever it appears in a text. */
const WithEmail: React.FC<{ text: string }> = ({ text }) => {
  const parts = text.split(CONTACT_EMAIL);
  return (
    <>
      {parts.map((part, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span className="text-gold">{CONTACT_EMAIL}</span>}
          {part}
        </React.Fragment>
      ))}
    </>
  );
};

const Block: React.FC<{ block: LegalBlock }> = ({ block }) => {
  switch (block.kind) {
    case 'text':
      return (
        <p>
          {block.lead && <strong className="text-white">{block.lead} </strong>}
          <WithEmail text={block.text} />
        </p>
      );
    case 'list':
      return (
        <ul className="list-disc list-inside space-y-2 ml-4">
          {block.items.map((item, i) => (
            <li key={i}>
              {typeof item === 'string' ? (
                item
              ) : (
                <>
                  <strong className="text-white">{item.lead}</strong> {item.text}
                </>
              )}
            </li>
          ))}
        </ul>
      );
    case 'bordered':
      return (
        <div className="space-y-4 mt-4">
          {block.items.map((item, i, all) => (
            <div key={item.title} className={i < all.length - 1 ? 'border-b border-gold/10 pb-4' : ''}>
              <p className="text-white mb-2">{item.title}</p>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      );
    case 'cards':
      return (
        <div className={`grid grid-cols-1 ${block.cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 mt-4 mb-4`}>
          {block.items.map((item) =>
            item.big ? (
              <div key={item.title} className="bg-dark-3/50 p-4 border border-gold/10 text-center">
                <p className="text-2xl text-gold font-cormorant mb-2">{item.big}</p>
                <p className="text-white">{item.title}</p>
                <p className="text-[10px] text-dim/70 mt-1">{item.text}</p>
              </div>
            ) : (
              <div key={item.title} className="bg-dark-3/50 p-4 border border-gold/10">
                <p className="text-white mb-2">{item.title}</p>
                <p>{item.text}</p>
              </div>
            ),
          )}
        </div>
      );
  }
};

const LegalDocument: React.FC<{ doc: LegalDoc }> = ({ doc }) => (
  <>
    <Head>
      <title>{doc.head.title}</title>
      <meta name="description" content={doc.head.description} />
    </Head>

    <div className="min-h-screen bg-dark text-text relative">
      <Navigation />

      <main className="pt-32 pb-24 px-[7%] max-w-5xl mx-auto">
        <div className="section-tag">{doc.tag}</div>
        <h1 className="h1-premium mb-4">{doc.titleA} <span className="italic bg-gold-gradient bg-clip-text text-transparent">{doc.titleB}</span></h1>
        {doc.updated && <p className="text-dim text-[10px] tracking-widest uppercase mb-8">{doc.updated}</p>}

        <p className="text-dim text-sm leading-loose mb-8 max-w-3xl">{doc.intro}</p>
        {doc.notice && (
          <p className="bg-dark-3/50 border border-gold/10 p-6 text-xs text-dim leading-relaxed mb-16 max-w-3xl">{doc.notice}</p>
        )}

        <div className="space-y-12">
          {doc.sections.map((section) => (
            <section
              key={section.title}
              className={`bg-dark-2 border-l-2 ${section.tone === 'crimson' ? 'border-crimson' : 'border-gold'} p-10`}
            >
              <h2 className={`font-cormorant text-2xl ${section.tone === 'crimson' ? 'text-crimson' : 'text-gold'} mb-6 italic`}>{section.title}</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                {section.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gold/20">
          <p className="text-[10px] text-dim/60 text-center tracking-wider">{doc.footer}</p>
        </div>
      </main>

      <Footer />
      <div className="grain-overlay" />
    </div>
  </>
);

export default LegalDocument;
