import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

const RodoPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>RODO & 18 U.S.C. § 2257 | Studio HRL Adult</title>
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-32 pb-24 px-[7%] max-w-5xl mx-auto">
          <div className="section-tag">Zgodność prawna</div>
          <h1 className="h1-premium mb-8">RODO / GDPR & <span className="italic bg-gold-gradient bg-clip-text text-transparent">18 U.S.C. § 2257</span></h1>
          <p className="text-dim text-sm leading-loose max-w-2xl mb-16">
            Studio HRL Adult przetwarza dane zgodnie z Rozporządzeniem RODO (EU) 2016/679 i spełnia wymogi 18 U.S.C. § 2257 (Child Protection and Obscenity Enforcement Act).
          </p>

          <div className="space-y-16">
            <section className="space-y-8">
              <div className="section-tag">Zgodność z RODO</div>
              <div className="bg-dark-2 border border-gold/10 p-10 space-y-8">
                <div>
                  <h3 className="font-cormorant text-2xl text-gold mb-4 italic">Podstawy prawne przetwarzania</h3>
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gold/20">
                        <th className="py-4 text-gold uppercase tracking-widest font-bold">Cel przetwarzania</th>
                        <th className="py-4 text-gold uppercase tracking-widest font-bold">Podstawa prawna</th>
                      </tr>
                    </thead>
                    <tbody className="text-dim">
                      <tr className="border-b border-gold/5">
                        <td className="py-4">Weryfikacja tożsamości i wieku</td>
                        <td className="py-4 italic">Art. 6 ust. 1 lit. c RODO (compliance § 2257)</td>
                      </tr>
                      <tr className="border-b border-gold/5">
                        <td className="py-4">Rozliczenia finansowe</td>
                        <td className="py-4 italic">Art. 6 ust. 1 lit. b RODO (wykonanie umowy)</td>
                      </tr>
                      <tr className="border-b border-gold/5">
                        <td className="py-4">Prowadzenie rejestrów § 2257</td>
                        <td className="py-4 italic">Art. 6 ust. 1 lit. c RODO (obowiązek prawny)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div>
                  <h3 className="font-cormorant text-2xl text-gold mb-4 italic">Inspektor Ochrony Danych (IOD)</h3>
                  <p className="text-xs text-dim leading-loose">
                    Studio HRL Adult wyznaczyło Inspektora Ochrony Danych. Kontakt: <span className="text-white">no-reply@hardbanrecordslab.online</span>.
                    IOD jest dostępny w dni robocze w godzinach 9:00–17:00.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-8">
              <div className="section-tag">Zgodność z 18 U.S.C. § 2257</div>
              <div className="bg-dark-2 border border-crimson/20 p-10 space-y-8">
                <div>
                  <h3 className="font-cormorant text-2xl text-crimson mb-4 italic">Custodian of Records</h3>
                  <p className="text-xs text-dim leading-loose">
                    Studio HRL Adult wyznacza Opiekuna Rejestrów (Custodian of Records) zgodnie z wymogami 18 U.S.C. § 2257. 
                    Wszelkie materiały audiowizualne dystrybuowane przez Studio zawierają stosowne oznaczenie o miejscu przechowywania dokumentacji.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-cormorant text-2xl text-crimson mb-4 italic">Procedura weryfikacji wieku</h3>
                  <p className="text-xs text-dim leading-loose mb-6">
                    Bezwzględnym wymogiem przed jakimkolwiek udziałem w produkcji jest weryfikacja pełnoletności:
                  </p>
                  <ul className="space-y-4">
                    {['Przedłożenie ważnego dokumentu tożsamości', 'Fotografia KYC (twarz + dokument)', 'Pisemne oświadczenie o pełnoletności'].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-xs text-dim italic">
                        <span className="w-1.5 h-1.5 bg-crimson rotate-45 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>
    </>
  );
};

export default RodoPage;
