import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

const PrivacyPage: React.FC = () => {
  const sections = [
    {
      title: '1. Administrator Danych',
      content: 'Administratorem danych osobowych jest Studio HRL Adult z siedzibą w Szwajcarii. We wszystkich sprawach dotyczących danych osobowych prosimy o kontakt na adres: no-reply@hardbanrecordslab.online'
    },
    {
      title: '2. Jakie dane zbieramy',
      list: [
        'Dane podane dobrowolnie w formularzu castingowym (imię, data urodzenia, dane kontaktowe)',
        'Kopie dokumentów tożsamości — wyłącznie do celów weryfikacji § 2257',
        'Dane rozliczeniowe niezbędne do wypłat',
        'Zdjęcia i materiały wizerunkowe wymagane do procesu castingowego'
      ]
    },
    {
      title: '3. Cel przetwarzania danych',
      list: [
        'Weryfikacja tożsamości i pełnoletności (wymóg prawny § 2257)',
        'Realizacja umowy partnerskiej i rozliczeń finansowych',
        'Wypełnienie obowiązków prawnych wynikających z przepisów krajowych i zagranicznych',
        'Marketing i promocja — wyłącznie za wyraźną zgodą osoby'
      ]
    },
    {
      title: '4. Zdjęcia nagie — procedura castingowa',
      content: 'Zdjęcia nagie wymagane w formularzu castingowym służą wyłącznie do oceny wizualnej przez uprawniony personel studia. W przypadku niezakwalifikowania się kandydatki, wszelkie zdjęcia nagie są trwale i nieodwracalnie usuwane z systemów studia w ciągu 48 godzin od podjęcia decyzji.'
    },
    {
      title: '5. Prawa przysługujące osobom',
      list: [
        'Prawo dostępu do danych',
        'Prawo do sprostowania nieprawidłowych danych',
        'Prawo do usunięcia danych (z zastrzeżeniem obowiązków wynikających z § 2257)',
        'Prawo do ograniczenia przetwarzania',
        'Prawo do przenoszenia danych',
        'Prawo do wniesienia sprzeciwu',
        'Prawo do wniesienia skargi do UODO'
      ]
    },
    {
      title: '6. Bezpieczeństwo danych',
      list: [
        'Szyfrowanie AES-256 dla przechowywanych danych osobowych',
        'Ograniczony dostęp — wyłącznie upoważniony personel',
        'Regularne kopie zapasowe w bezpiecznej lokalizacji',
        'Procedura reagowania na naruszenia danych (art. 33-34 RODO)'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Polityka Prywatności | Studio HRL Adult</title>
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-32 pb-24 px-[7%] max-w-5xl mx-auto">
          <div className="section-tag">Prawne</div>
          <h1 className="h1-premium mb-4">Polityka <span className="italic bg-gold-gradient bg-clip-text text-transparent">Prywatności</span></h1>
          <p className="text-dim text-[10px] tracking-widest uppercase mb-16">Data wejścia w życie: 25 marca 2026 r. | Studio HRL Adult | Polska</p>

          <div className="space-y-12">
            {sections.map((section, i) => (
              <div key={i} className="bg-dark-2 border-l-2 border-gold p-10">
                <h3 className="font-cormorant text-2xl text-gold mb-6 italic">{section.title}</h3>
                {section.content && <p className="text-xs text-dim leading-loose">{section.content}</p>}
                {section.list && (
                  <ul className="space-y-4">
                    {section.list.map((item, j) => (
                      <li key={j} className="flex items-start gap-4 text-xs text-dim leading-relaxed">
                        <span className="w-1.5 h-1.5 bg-gold rotate-45 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>
    </>
  );
};

export default PrivacyPage;
