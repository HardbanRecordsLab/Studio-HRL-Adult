import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

const PrivacyPage: React.FC = () => {
  const lastUpdated = "4 kwietnia 2026 r.";

  return (
    <>
      <Head>
        <title>Polityka Prywatności | Studio HRL Adult</title>
        <meta name="description" content="Polityka Prywatności Studio HRL Adult - RODO, GDPR, przetwarzanie danych osobowych, cookies." />
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-32 pb-24 px-[7%] max-w-5xl mx-auto">
          <div className="section-tag">Prawne</div>
          <h1 className="h1-premium mb-4">Polityka <span className="italic bg-gold-gradient bg-clip-text text-transparent">Prywatności</span></h1>
          <p className="text-dim text-[10px] tracking-widest uppercase mb-8">Ostatnia aktualizacja: {lastUpdated} | Studio HRL Adult | Polska</p>
          
          <p className="text-dim text-sm leading-loose mb-16 max-w-3xl">
            Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych Użytkowników 
            serwisu Studio HRL Adult. Dbamy o bezpieczeństwo Twoich danych i przestrzegamy najwyższych standardów 
            zgodnie z RODO (RODO - Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679) oraz przepisami 
            prawa polskiego.
          </p>

          <div className="space-y-12">
            {/* SEKCJA 1 - ADMINISTRATOR DANYCH */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">1. Administrator Danych Osobowych</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">Administratorem danych osobowych</strong> jest Studio HRL Adult 
                  działające w ramach struktury HardbanRecords Lab z siedzibą w Polsce. Administrator przetwarza 
                  dane z najwyższą starannością oraz zgodnie z wymogami Rozporządzenia Parlamentu Europejskiego 
                  i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO/GDPR) oraz ustawy o ochronie danych 
                  osobowych.
                </p>
                <p>
                  We wszystkich sprawach dotyczących przetwarzania danych osobowych oraz realizacji praw 
                  wynikających z RODO można kontaktować się z nami pod adresem email:{' '}
                  <span className="text-gold">hrl-adult-studio@hardbanrecordslab.online</span> lub 
                  korespondencyjnie na adres siedziby Administratora.
                </p>
                <p>
                  Studio HRL Adult wyznaczyło Inspektora Ochrony Danych (IOD), który jest dostępny 
                  w dni robocze w godzinach 9:00–17:00. Inspektor nadzoruje zgodność przetwarzania danych 
                  z przepisami ochrony danych osobowych, udziela informacji oraz przyjmuje zgłoszenia 
                  i skargi dotyczące przetwarzania danych osobowych.
                </p>
              </div>
            </section>

            {/* SEKCJA 2 - JAKIE DANE ZBIERAMY */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">2. Kategorie Przetwarzanych Danych</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>W ramach działalności Studio HRL Adult przetwarza następujące kategorie danych osobowych:</p>
                <div className="space-y-3 mt-4">
                  <p>
                    <strong className="text-white">a) Dane identyfikacyjne:</strong> imię i nazwisko, data urodzenia, 
                    numer dokumentu tożsamości, zdjęcie dokumentu tożsamości (wyłącznie dla celów weryfikacji 
                    wieku zgodnie z § 2257), adres zamieszkania, numer telefonu, adres email.
                  </p>
                  <p>
                    <strong className="text-white">b) Dane finansowe:</strong> numer rachunku bankowego, 
                    skrócone informacje o karcie płatniczej (tokeny płatnicze), historia transakcji, 
                    dane do rozliczeń podatkowych i wypłat wynagrodzeń.
                  </p>
                  <p>
                    <strong className="text-white">c) Dane techniczne:</strong> adres IP, identyfikator 
                    urządzenia, typ przeglądarki, system operacyjny, pliki cookies, dane o sesji, 
                    logi serwerowe.
                  </p>
                  <p>
                    <strong className="text-white">d) Dane dotyczące aktywności:</strong> historia 
                    oglądania treści (w celu personalizacji), historia logowania, preferencje użytkownika, 
                    zapisane ustawienia konta.
                  </p>
                  <p>
                    <strong className="text-white">e) Dane wizerunkowe:</strong> zdjęcia i materiały 
                    wideo przesłane w ramach procesu castingowego (wyłącznie dla celów weryfikacji 
                    i oceny kandydatów), w tym zdjęcia dokumentów tożsamości ze zdjęciem twarzy.
                  </p>
                </div>
              </div>
            </section>

            {/* SEKCJA 3 - CEL PRZETWARZANIA */}
            <section className="bg-dark-2 border-l-2 border-crimson p-10">
              <h2 className="font-cormorant text-2xl text-crimson mb-6 italic">3. Cele i Podstawy Prawne Przetwarzania</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>Dane osobowe są przetwarzane w następujących celach i na następujących podstawach prawnych:</p>
                <div className="space-y-4 mt-4">
                  <div className="border-b border-gold/10 pb-4">
                    <p className="text-white mb-2">Weryfikacja tożsamości i wieku</p>
                    <p>
                      Podstawa: Art. 6 ust. 1 lit. c RODO (obowiązek prawny) oraz 18 U.S.C. § 2257. 
                      Przetwarzanie jest niezbędne do spełnienia wymogów prawa federalnego USA dotyczących 
                      ochrony przed wykorzystywaniem nieletnich w branży treści dla dorosłych.
                    </p>
                  </div>
                  <div className="border-b border-gold/10 pb-4">
                    <p className="text-white mb-2">Realizacja umowy i rozliczenia finansowe</p>
                    <p>
                      Podstawa: Art. 6 ust. 1 lit. b RODO (wykonanie umowy). Przetwarzanie niezbędne 
                      do zawarcia i wykonania umowy partnerskiej oraz dokonywania wypłat wynagrodzeń 
                      dla twórców i partnerów studia.
                    </p>
                  </div>
                  <div className="border-b border-gold/10 pb-4">
                    <p className="text-white mb-2">Compliance i wymogi KYC/AML</p>
                    <p>
                      Podstawa: Art. 6 ust. 1 lit. c RODO (obowiązek prawny). Przetwarzanie wymagane 
                      przez przepisy o przeciwdziałaniu praniu pieniędzy (AML) oraz przepisy Know Your 
                      Customer (KYC).
                    </p>
                  </div>
                  <div className="border-b border-gold/10 pb-4">
                    <p className="text-white mb-2">Wykrywanie i zapobieganie oszustwom</p>
                    <p>
                      Podstawa: Art. 6 ust. 1 lit. f RODO (prawnie uzasadniony interes administratora). 
                      Legitymacją jest zapewnienie bezpieczeństwa systemów, ochrona przed chargebackami 
                      oraz przeciwdziałanie nieautoryzowanemu dostępowi.
                    </p>
                  </div>
                  <div>
                    <p className="text-white mb-2">Marketing i personalizacja (za zgodą)</p>
                    <p>
                      Podstawa: Art. 6 ust. 1 lit. a RODO (zgoda). Wysyłanie informacji handlowych 
                      oraz personalizacja treści wyłącznie po wyrażeniu przez Użytkownika dobrowolnej 
                      i konkretnej zgody, którą można wycofać w każdej chwili.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* SEKCJA 4 - ODBIORCY DANYCH */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">4. Odbiorcy Danych i Transfery Międzynarodowe</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">4.1. Odbiorcy danych.</strong> Dane osobowe mogą być 
                  udostępniane następującym kategoriom odbiorców, wyłącznie w zakresie niezbędnym do 
                  realizacji określonych celów:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Podmioty przetwarzające płatności (Payment Service Providers - PSP)</li>
                  <li>Partnerzy hostingowi i dostawcy usług chmurowych (CDN, serwery)</li>
                  <li>Podmioty świadczące usługi weryfikacji wieku (Age Verification Providers)</li>
                  <li>Firmy księgowe i doradcy podatkowi (w zakresie niezbędnym do rozliczeń)</li>
                  <li>Agencje ochrony przed oszustwami (w przypadku podejrzenia fraudu)</li>
                  <li>Organy władzy publicznej (na żądanie organów ścigania lub sądów)</li>
                </ul>
                <p>
                  <strong className="text-white">4.2. Standardy kontraktowe.</strong> Wszyscy partnerzy 
                  są zobowiązani umowami przetwarzania danych zawierającymi klauzule ochronne zgodne 
                  z wymogami RODO. Studio HRL Adult nie sprzedaje danych osobowych sieciom reklamowym 
                  ani brokerom danych.
                </p>
                <p>
                  <strong className="text-white">4.3. Transfery poza EOG.</strong> W przypadku przekazywania 
                  danych do państw trzecich (poza Europejskim Obszarem Gospodarczym), Studio stosuje 
                  Standardowe Klauzule Umowne (Standard Contractual Clauses - SCC) zatwierdzone 
                  przez Komisję Europejską, zapewniające odpowiedni poziom ochrony danych osobowych. 
                  Wszystkie transfery są dokonywane z zachowaniem dodatkowych środków bezpieczeństwa 
                  technicznych, w tym szyfrowania end-to-end.
                </p>
              </div>
            </section>

            {/* SEKCJA 5 - PRAWA OSOB */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">5. Prawa Osób, których Dane Dotyczą</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  Zgodnie z przepisami RODO (artykuły 15-22), każdej osobie, której dane dotyczą, 
                  przysługują następujące prawa:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-dark-3/50 p-4 border border-gold/10">
                    <p className="text-white mb-2">Prawo dostępu (Art. 15)</p>
                    <p>prawo do uzyskania informacji o przetwarzanych danych oraz kopii tych danych</p>
                  </div>
                  <div className="bg-dark-3/50 p-4 border border-gold/10">
                    <p className="text-white mb-2">Prawo do sprostowania (Art. 16)</p>
                    <p>prawo do żądania poprawienia nieprawidłowych lub uzupełnienia niekompletnych danych</p>
                  </div>
                  <div className="bg-dark-3/50 p-4 border border-gold/10">
                    <p className="text-white mb-2">Prawo do usunięcia (Art. 17)</p>
                    <p>prawo do żądania usunięcia danych ("prawo do bycia zapomnianym") z zastrzeżeniem obowiązków wynikających z § 2257</p>
                  </div>
                  <div className="bg-dark-3/50 p-4 border border-gold/10">
                    <p className="text-white mb-2">Prawo do ograniczenia (Art. 18)</p>
                    <p>prawo do żądania ograniczenia przetwarzania w określonych przypadkach</p>
                  </div>
                  <div className="bg-dark-3/50 p-4 border border-gold/10">
                    <p className="text-white mb-2">Prawo do przenoszenia (Art. 20)</p>
                    <p>prawo do otrzymania danych w strukturalnym formacie oraz przesłania ich innemu administratorowi</p>
                  </div>
                  <div className="bg-dark-3/50 p-4 border border-gold/10">
                    <p className="text-white mb-2">Prawo do sprzeciwu (Art. 21)</p>
                    <p>prawo do wniesienia sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie</p>
                  </div>
                </div>
                <p className="mt-4">
                  Aby skorzystać z powyższych praw, należy przesłać pisemne żądanie na adres{' '}
                  <span className="text-gold">hrl-adult-studio@hardbanrecordslab.online</span>. 
                  Odpowiemy na żądanie w terminie do 30 dni kalendarzowych.
                </p>
                <p>
                  Ponadto, każda osoba ma prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych 
                  (UODO) lub innego właściwego organu nadzorczego w państwie członkowskim swojego 
                  zwykłego pobytu, miejsca pracy lub miejsca popełnienia domniemanego naruszenia.
                </p>
              </div>
            </section>

            {/* SEKCJA 6 - PRZECHOWYWANIE DANYCH */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">6. Okres Przechowywania Danych</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>Dane osobowe są przechowywane przez następujące okresy:</p>
                <div className="space-y-3 mt-4">
                  <p>
                    <strong className="text-white">Dane księgowe i rozliczeniowe:</strong> 7 lat 
                    (zgodnie z przepisami Ordynacji podatkowej i ustawy o rachunkowości)
                  </p>
                  <p>
                    <strong className="text-white">Dane weryfikacyjne § 2257:</strong> 7 lat od 
                    daty ostatniego użycia materiału (zgodnie z wymogami 18 U.S.C. § 2257)
                  </p>
                  <p>
                    <strong className="text-white">Logi dostępowe (IP, sesje):</strong> 12 miesięcy 
                    dla celów bezpieczeństwa, ochrony przed oszustwami oraz celów dowodowych
                  </p>
                  <p>
                    <strong className="text-white">Dane kontaktowe i marketingowe:</strong> Do 
                    momentu wycofania zgody lub zgłoszenia sprzeciwu, nie dłużej jednak niż 3 lata 
                    od ostatniej aktywności
                  </p>
                  <p>
                    <strong className="text-white">Zdjęcia castingowe (niezakwalifikowani):</strong> 
                    Trwale usuwane w ciągu 48 godzin od podjęcia decyzji o niezakwalifikowaniu
                  </p>
                </div>
                <p className="mt-4">
                  Po upływie wskazanych okresów dane są nieodwracalnie usuwane lub anonimizowane, 
                  chyba że obowiązujące przepisy prawa nakazują dłuższe przechowywanie.
                </p>
              </div>
            </section>

            {/* SEKCJA 7 - BEZPIECZEŃSTWO */}
            <section className="bg-dark-2 border-l-2 border-crimson p-10">
              <h2 className="font-cormorant text-2xl text-crimson mb-6 italic">7. Bezpieczeństwo Danych</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  Studio HRL Adult wdrożyło odpowiednie środki techniczne i organizacyjne zapewniające 
                  bezpieczeństwo przetwarzanych danych osobowych:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>
                    <strong className="text-white">Szyfrowanie:</strong> Dane wrażliwe przechowywane 
                    są w formie zaszyfrowanej algorytmem AES-256. Wszystkie transmisje danych odbywają 
                    się za pośrednictwem protokołu HTTPS/TLS 1.3.
                  </li>
                  <li>
                    <strong className="text-white">Kontrola dostępu:</strong> Dostęp do danych osobowych 
                    mają wyłącznie upoważnione osoby, zobowiązane do zachowania poufności. System 
                    oparty jest na zasadzie najmniejszych uprawnień (least privilege).
                  </li>
                  <li>
                    <strong className="text-white">Autoryzacja wieloskładnikowa (MFA):</strong> Dostęp 
                    do systemów wymaga potwierdzenia tożsamości przez co najmniej dwa niezależne czynniki.
                  </li>
                  <li>
                    <strong className="text-white">Monitoring i audyt:</strong> Wszystkie działania 
                    na danych osobowych są logowane i regularnie poddawane audytom bezpieczeństwa.
                  </li>
                  <li>
                    <strong className="text-white">Kopie zapasowe:</strong> Regularne, zaszyfrowane 
                    kopie zapasowe przechowywane w bezpiecznych lokalizacjach geograficznie rozproszonych.
                  </li>
                  <li>
                    <strong className="text-white">Testy penetracyjne:</strong> Regularne testy 
                    bezpieczeństwa przeprowadzane przez niezależne podmioty audytujące.
                  </li>
                </ul>
              </div>
            </section>

            {/* SEKCJA 8 - PLIKI COOKIES */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">8. Pliki Cookies i Technologie Śledzące</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  Serwis wykorzystuje pliki cookies i podobne technologie w celu zapewnienia prawidłowego 
                  funkcjonowania, analizy ruchu, personalizacji treści oraz celów marketingowych.
                </p>
                <div className="space-y-3 mt-4">
                  <p>
                    <strong className="text-white">Cookies niezbędne:</strong> Wymagane do podstawowej 
                    funkcjonalności serwisu (logowanie, bezpieczeństwo, zapamiętywanie ustawień). 
                    Nie mogą być wyłączone.
                  </p>
                  <p>
                    <strong className="text-white">Cookies analityczne:</strong> Pomagają zrozumieć, 
                    jak użytkownicy korzystają ze strony (np. Google Analytics). Zbierają informacje 
                    w sposób zagregowany i anonimowy.
                  </p>
                  <p>
                    <strong className="text-white">Cookies funkcjonalne:</strong> Umożliwiają 
                    zapamiętywanie preferencji użytkownika (np. język, region) i personalizację 
                    doświadczenia.
                  </p>
                  <p>
                    <strong className="text-white">Cookies marketingowe:</strong> Wykorzystywane do 
                    śledzenia aktywności na stronie w celu wyświetlania odpowiednich reklam. Wymagają 
                    wyraźnej zgody użytkownika.
                  </p>
                </div>
                <p className="mt-4">
                  Użytkownik może zarządzać ustawieniami cookies za pośrednictwem przeglądarki internetowej 
                  lub panelu preferencji dostępnego w serwisie. Wyłączenie niektórych cookies może 
                  ograniczyć funkcjonalność serwisu.
                </p>
              </div>
            </section>

            {/* SEKCJA 9 - NARUSZENIA DANYCH */}
            <section className="bg-dark-2 border-l-2 border-crimson p-10">
              <h2 className="font-cormorant text-2xl text-crimson mb-6 italic">9. Procedura w przypadku Naruszenia Danych</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  W przypadku naruszenia ochrony danych osobowych, które może skutkować wysokim ryzykiem 
                  dla praw i wolności osób fizycznych, Studio HRL Adult:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-4">
                  <li>
                    Niezwłocznie powiadomi Prezesa Urzędu Ochrony Danych Osobowych (w terminie do 
                    72 godzin od uzyskania wiedzy o naruszeniu), zgodnie z art. 33 RODO
                  </li>
                  <li>
                    Powiadomi bez zbędnej zwłoki osoby, których dane dotyczą, jeśli naruszenie może 
                    wiązać się z wysokim ryzykiem dla ich praw i wolności (art. 34 RODO)
                  </li>
                  <li>
                    Udokumentuje wszystkie fakty związane z naruszeniem, jego skutkami oraz podjętymi 
                    środkami zaradczymi
                  </li>
                  <li>
                    Przeprowadzi szczegółową analizę incydentu w celu identyfikacji przyczyn i 
                    wdrożenia środków zapobiegających powtórzeniu się zdarzenia
                  </li>
                </ul>
              </div>
            </section>

            {/* SEKCJA 10 - ZMIANY */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">10. Zmiany Polityki Prywatności</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  Studio HRL Adult zastrzega sobie prawo do wprowadzania zmian w niniejszej Polityce 
                  Prywatności. O wszelkich istotnych zmianach Użytkownicy będą informowani drogą 
                  mailową lub poprzez wyraźne powiadomienie w serwisie najpóźniej na 14 dni przed 
                  wejściem zmian w życie.
                </p>
                <p>
                  Kontynuowanie korzystania z serwisu po wejściu w życie zmian stanowi akceptację 
                  nowej wersji Polityki Prywatności. W przypadku pytań lub wątpliwości prosimy o 
                  kontakt pod adresem{' '}
                  <span className="text-gold">hrl-adult-studio@hardbanrecordslab.online</span>.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-gold/20">
            <p className="text-[10px] text-dim/60 text-center tracking-wider">
              Studio HRL Adult © 2026 | Ochrona danych osobowych na najwyższym poziomie | 
              Kontakt: hrl-adult-studio@hardbanrecordslab.online
            </p>
          </div>
        </main>

        <Footer />
        <div className="grain-overlay" />
      </div>

      <style jsx global>{`
        .grain-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          pointer-events: none; z-index: 1; opacity: 0.35;
        }
      `}</style>
    </>
  );
};

export default PrivacyPage;
