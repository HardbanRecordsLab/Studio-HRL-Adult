import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';
import { motion } from 'framer-motion';

const DocsPage: React.FC = () => {
  const docs = [
    { 
      id: '01', 
      title: 'Dokumentacja Biznesowa', 
      desc: 'Opis działalności studia, model biznesowy, podział przychodów 60/30/10, historia powstania, zakres dystrybucji i platforma partnerska.',
      file: 'HRL_01_Dokumentacja_Biznesowa.docx'
    },
    { 
      id: '02', 
      title: 'Umowa Partnerska', 
      desc: 'Trójstronna umowa między Studio, Współniczką i Modelem. Zawiera podział 60/30/10, prawa i obowiązki stron, zasady ochrony wizerunku.',
      file: 'HRL_02_Umowa_Partnerska.docx'
    },
    { 
      id: '03', 
      title: 'Regulamin Szczegółowy', 
      desc: 'Pełne zasady współpracy: organizacja sesji, hard i soft limits, dystrybucja, ochrona tożsamości, finanse i wypłaty, RODO, § 2257.',
      file: 'HRL_03_Regulamin_Szczegolowy.docx'
    },
    { 
      id: '04', 
      title: 'Formularz Castingowy', 
      desc: 'Formularz 4-stronowy: dane osobowe i wizerunkowe, doświadczenie, preferencje treści, hard/soft limits, realistyczne zarobki.',
      file: 'HRL_04_Formularz_Castingowy.docx'
    },
  ];

  return (
    <>
      <Head>
        <title>Dokumenty | Studio HRL Adult</title>
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-32 pb-24 px-[7%] max-w-7xl mx-auto">
          <div className="section-tag">Centrum dokumentów</div>
          <h1 className="h1-premium mb-8">Dokumentacja <span className="italic bg-gold-gradient bg-clip-text text-transparent">partnerska</span></h1>
          <p className="text-dim text-sm leading-loose max-w-2xl mb-16">
            Kompletny pakiet dokumentów regulujących współpracę ze Studio HRL Adult. 
            Wszystkie dokumenty są poufne i przeznaczone wyłącznie dla Partnerek Studia.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {docs.map((doc) => (
              <motion.div 
                key={doc.id}
                whileHover={{ y: -5 }}
                className="bg-dark-2 border border-gold/10 p-10 relative overflow-hidden group"
              >
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gold-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <div className="text-[10px] text-gold tracking-[0.3em] uppercase mb-4">Dokument {doc.id}</div>
                <h3 className="font-cormorant text-2xl text-white mb-4 italic">{doc.title}</h3>
                <p className="text-xs text-dim leading-relaxed mb-8">{doc.desc}</p>
                <button className="text-[10px] text-gold tracking-widest uppercase border-b border-gold/20 pb-1 hover:border-gold transition-all">
                  Pobierz {doc.file}
                </button>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="bg-dark-3/50 border border-gold/5 p-8 space-y-4">
              <div className="section-tag">Ważna informacja</div>
              <p className="text-xs text-dim leading-relaxed">
                Wszystkie dokumenty są poufne i przeznaczone wyłącznie dla Partnerek Studia HRL Adult. 
                Ich reprodukcja lub udostępnianie osobom trzecim bez zgody Studia jest zabronione.
              </p>
            </div>
            <div className="bg-dark-3/50 border border-gold/5 p-8 space-y-4">
              <div className="section-tag">Zdjęcia w formularzu</div>
              <p className="text-xs text-dim leading-relaxed">
                Zdjęcia nagie wymagane w formularzu castingowym służą wyłącznie ocenie wizualnej. 
                W przypadku niezakwalifikowania się są trwale usuwane w ciągu 48 godzin od decyzji.
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
