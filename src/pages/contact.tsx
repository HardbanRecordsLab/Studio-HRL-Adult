import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

const ContactPage: React.FC = () => {
  const contacts = [
    { title: 'E-mail ogólny', desc: 'Pytania ogólne, informacje o studio, współpraca biznesowa', email: 'hrl-adult-studio@hardbanrecordslab.online', ico: '📧' },
    { title: 'Casting', desc: 'Formularz castingowy, pytania o współpracę jako Partnerka', email: 'hrl-adult-studio@hardbanrecordslab.online', ico: '🎬' },
    { title: 'RODO / Prywatność', desc: 'Wnioski RODO, Inspektor Ochrony Danych, usuwanie danych', email: 'hrl-adult-studio@hardbanrecordslab.online', ico: '🔒' },
    { title: 'Prawne / § 2257', desc: 'Compliance, rejestry 2257, kwestie prawne i umowy', email: 'hrl-adult-studio@hardbanrecordslab.online', ico: '⚖️' },
  ];

  return (
    <>
      <Head>
        <title>Kontakt | Studio HRL Adult</title>
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-32 pb-24 px-[7%] max-w-7xl mx-auto">
          <div className="section-tag">Kontakt</div>
          <h1 className="h1-premium mb-4">Skontaktuj się <span className="italic bg-gold-gradient bg-clip-text text-transparent">z nami</span></h1>
          <p className="text-dim text-sm leading-loose max-w-2xl mb-16">
            Odpowiadamy na wszystkie zapytania w ciągu 24–48 godzin w dni robocze.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gold/10 border border-gold/10">
            {contacts.map((contact, i) => (
              <div key={i} className="bg-dark-2 p-12 text-center space-y-6 hover:bg-dark-3 transition-colors">
                <div className="text-4xl">{contact.ico}</div>
                <h3 className="font-cormorant text-2xl text-gold italic">{contact.title}</h3>
                <p className="text-xs text-dim leading-relaxed max-w-xs mx-auto">{contact.desc}</p>
                <a href={`mailto:${contact.email}`} className="inline-block text-white text-sm border-b border-gold/30 pb-1 hover:border-gold transition-all">
                  {contact.email}
                </a>
              </div>
            ))}
          </div>

          <section className="mt-32">
            <div className="section-tag">FAQ</div>
            <h2 className="h1-premium mb-16">Często zadawane <span className="italic bg-gold-gradient bg-clip-text text-transparent">pytania</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-12">
                <div>
                  <h4 className="font-cormorant text-xl text-white mb-4 italic">Jakie są realne zarobki?</h4>
                  <p className="text-xs text-dim leading-loose">
                    Zarobki zależą od zaangażowania. Przy 1-2 sesjach tygodniowo na starcie realnie można liczyć na 1 500-3 500 PLN/mies. netto. 
                    Przy pełnym zaangażowaniu kwoty te rosną do 15 000-30 000+ PLN.
                  </p>
                </div>
                <div>
                  <h4 className="font-cormorant text-xl text-white mb-4 italic">Czy moja tożsamość jest chroniona?</h4>
                  <p className="text-xs text-dim leading-loose">
                    Tak. Stosujemy pseudonimy, geo-blocking oraz pełną kontrolę nad widocznością twarzy. 
                    Twoja prywatność jest naszym operacyjnym priorytetem.
                  </p>
                </div>
              </div>
              <div className="space-y-12">
                <div>
                  <h4 className="font-cormorant text-xl text-white mb-4 italic">Co z moimi granicami?</h4>
                  <p className="text-xs text-dim leading-loose">
                    To Ty ustalasz hard i soft limits w formularzu castingowym. 
                    Żadna sesja nie może wykroczyć poza uzgodniony zakres bez Twojej wyraźnej zgody.
                  </p>
                </div>
                <div>
                  <h4 className="font-cormorant text-xl text-white mb-4 italic">Czy potrzebuję doświadczenia?</h4>
                  <p className="text-xs text-dim leading-loose">
                    Nie. Zapewniamy pełne szkolenie, briefingi przed sesjami oraz profesjonalne wsparcie na każdym etapie.
                  </p>
                </div>
              </div>
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
