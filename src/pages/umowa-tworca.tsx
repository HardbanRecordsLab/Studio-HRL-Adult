import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

const CreatorAgreementPage: React.FC = () => {
  const lastUpdated = "4 kwietnia 2026 r.";

  return (
    <>
      <Head>
        <title>Umowa z Twórcą | Studio HRL Adult</title>
        <meta name="description" content="Umowa z Twórcą Studio HRL Adult - prawa autorskie, model biznesowy, zasady współpracy." />
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-32 pb-24 px-[7%] max-w-5xl mx-auto">
          <div className="section-tag">Współpraca</div>
          <h1 className="h1-premium mb-4">Umowa z <span className="italic bg-gold-gradient bg-clip-text text-transparent">Twórcą</span></h1>
          <p className="text-dim text-[10px] tracking-widest uppercase mb-8">Ostatnia aktualizacja: {lastUpdated} | Studio HRL Adult | Polska</p>
          
          <p className="text-dim text-sm leading-loose mb-16 max-w-3xl">
            Niniejsza Umowa z Twórcą reguluje warunki współpracy pomiędzy Studio HRL Adult a niezależnymi 
            twórcami treści audiowizualnych. Dokument określa prawa i obowiązki stron, zasady licencjonowania 
            treści oraz model biznesowy oparty na partnerskim podziale przychodów.
          </p>

          <div className="space-y-12">
            {/* SEKCJA 1 - CHARAKTER WSPÓŁPRACY */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">1. Charakter Stosunku Współpracy</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">1.1. Kontraktodawca niezależny.</strong> Twórca występuje 
                  wyłącznie jako kontraktodawca niezależny (independent contractor) świadczący usługi na rzecz 
                  Studio HRL Adult. Współpraca nie stanowi zatrudnienia w rozumieniu Kodeksu pracy ani 
                  nie tworzy stosunku pracodawca-pracownik. Twórca działa we własnym imieniu i na własny 
                  rachunek, zachowując pełną niezależność w zakresie organizacji pracy i czasu jej wykonywania.
                </p>
                <p>
                  <strong className="text-white">1.2. Brak wyłączności.</strong> Niniejsza umowa nie 
                  zakłada wyłączności terytorialnej ani czasowej, chyba że strony uzgodnią inaczej w 
                  odrębnym aneksie. Twórca może świadczyć podobne usługi na rzecz innych podmiotów, 
                  z zastrzeżeniem klauzul poufności oraz lojalnościowych określonych w niniejszej umowie.
                </p>
                <p>
                  <strong className="text-white">1.3. Zobowiązania podatkowe.</strong> Twórca ponosi 
                  pełną odpowiedzialność za opodatkowanie uzyskiwanych dochodów oraz za opłacenie 
                  wszelkich należnych składek na ubezpieczenie społeczne i zdrowotne. Studio nie 
                  dokonuje żadnych potrąceń na rzecz organów podatkowych ani Zakładu Ubezpieczeń 
                  Społecznych, chyba że wymagają tego obowiązujące przepisy prawa.
                </p>
              </div>
            </section>

            {/* SEKCJA 2 - LICENCJA PRAW AUTORSKICH */}
            <section className="bg-dark-2 border-l-2 border-crimson p-10">
              <h2 className="font-cormorant text-2xl text-crimson mb-6 italic">2. Licencja i Przeniesienie Praw Autorskich</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">2.1. Udzielenie licencji.</strong> Twórca udziela 
                  Studio HRL Adult niewyłącznej, sublicencjonowalnej, bezterminowej licencji na 
                  korzystanie z przesłanych treści audiowizualnych (utwory) na następujących polach 
                  eksploatacji:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>utrwalanie i zwielokrotnianie wszelkimi technikami (w tym cyfrową)</li>
                  <li>obrot handlowy, wypożyczanie, najem</li>
                  <li>publiczne wykonanie, wystawienie, wyświetlenie, odtworzenie</li>
                  <li>nadawanie i reemitowanie, w tym w sieciach cyfrowych</li>
                  <li>publiczne udostępnianie w taki sposób, by każdy mógł mieć do niego dostęp w miejscu i czasie przez siebie wybranym</li>
                  <li>tłumaczenie, adaptacja, przetworzenie</li>
                  <li>wprowadzanie do obrotu, pakiety, bundling z innymi produktami</li>
                </ul>
                <p className="mt-4">
                  <strong className="text-white">2.2. Sublicencje.</strong> Studio uprawnione jest do 
                  udzielania dalszych sublicencji na wyżej wymienionych polach eksploatacji, w szczególności 
                  podmiotom dystrybuującym treści w modelu VOD, SVOD, TVOD oraz platformom streamingowym.
                </p>
                <p>
                  <strong className="text-white">2.3. Zmiany w utworach.</strong> Studio uprawnione 
                  jest do dokonywania zmian w utworach w zakresie niezbędnym do ich eksploatacji, 
                  w tym: edycji, przycięcia, dodania znaków wodnych, konwersji formatów, kodowania, 
                  przygotowania wersji językowych (dubbing, napisy).
                </p>
                <p>
                  <strong className="text-white">2.4. Metadane i branding.</strong> Studio uprawnione 
                  jest do dodawania do utworów metadanych, opisów, słów kluczowych oraz oznaczeń 
                  brandingowych Studio HRL Adult, w tym logo, intro i outro.
                </p>
              </div>
            </section>

            {/* SEKCJA 3 - WERYFIKACJA 2257 */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">3. Weryfikacja Wieku i Ewidencja 2257</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">3.1. Oświadczenie o pełnoletności.</strong> Twórca 
                  oświadcza i gwarantuje, że w chwili produkcji każdego przesłanego materiału wszystkie 
                  osoby w nim występujące były pełnoletnie (ukończyły 18 lat) oraz że posiada wszelkie 
                  niezbędne dokumentację potwierdzającą ten fakt.
                </p>
                <p>
                  <strong className="text-white">3.2. Model Release i 2257.</strong> Twórca zobowiązuje 
                  się do przesłania Studio następujących dokumentów dla każdej osoby występującej w treści:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Kopia ważnego dokumentu tożsamości ze zdjęciem (paszport, dowód osobisty, prawo jazdy)</li>
                  <li>Zdjęcie KYC (twarz + dokument) wykonane w trakcie sesji produkcyjnej</li>
                  <li>Podpisany formularz Model Release zezwalający na dystrybucję i eksploatację treści</li>
                  <li>Written Statement oświadczający o pełnoletności z podpisem i datą</li>
                </ul>
                <p className="mt-4">
                  <strong className="text-white">3.3. Custodian of Records.</strong> Studio HRL Adult 
                  wyznacza Custodian of Records zgodnie z wymogami 18 U.S.C. § 2257. Wszystkie 
                  dokumenty weryfikacyjne przechowywane są w bezpiecznej lokalizacji przez okres 
                  wymagany przepisami (minimum 7 lat od daty ostatniego użycia materiału).
                </p>
                <p>
                  <strong className="text-white">3.4. Konsekwencje braku dokumentacji.</strong> Brak 
                  kompletnej dokumentacji 2257 stanowi naruszenie zasad niniejszej umowy i skutkuje 
                  natychmiastowym zawieszeniem współpracy oraz zatrzymaniem wszelkich wypłat do 
                  momentu dostarczenia brakujących dokumentów. Studio zastrzega sobie prawo do 
                  nieprzyjęcia materiału bez prawa do jakiejkolwiek rekompensaty dla Twórcy.
                </p>
              </div>
            </section>

            {/* SEKCJA 4 - ODPOWIEDZIALNOŚĆ I INDEMNIZACJA */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">4. Odpowiedzialność Twórcy i Indemnizacja</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">4.1. Pełna odpowiedzialność za treść.</strong> Twórca 
                  ponosi wyłączną i pełną odpowiedzialność za przesłane treści oraz za zgodność tych 
                  treści z obowiązującym prawem. Twórca oświadcza, że posiada wszelkie niezbędne prawa 
                  do treści oraz że treści nie naruszają praw osób trzecich, w tym praw autorskich, 
                  dóbr osobistych, prawa do prywatności ani żadnych innych przepisów prawa.
                </p>
                <p>
                  <strong className="text-white">4.2. Zwolnienie z odpowiedzialności (indemnizacja).</strong> 
                  Twórca zobowiązuje się do zwolnienia Studio HRL Adult z odpowiedzialności oraz 
                  zabezpieczenia Studio przed wszelkimi roszczeniami, stratami, szkodami, kosztami 
                  (w tym kosztami obsługi prawnej) wynikającymi z:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>naruszenia praw autorskich przez Twórcę</li>
                  <li>naruszenia praw własności intelektualnej osób trzecich</li>
                  <li>rozpowszechniania treści bez wymaganych zgód lub dokumentacji 2257</li>
                  <li>nieprawdziwych oświadczeń Twórcy dotyczących treści</li>
                  <li>działań niezgodnych z prawem podejmowanych przez Twórcę</li>
                </ul>
                <p className="mt-4">
                  <strong className="text-white">4.3. Współpraca przy roszczeniach.</strong> W przypadku 
                  otrzymania przez Studio jakiegokolwiek żądania prawnego dotyczącego treści Twórcy 
                  (np. wezwanie na podstawie DMCA, żądanie usunięcia treści na podstawie GDPR), Twórca 
                  zobowiązuje się do niezwłocznego dostarczenia wszelkiej dokumentacji wspierającej 
                  legalność treści oraz do aktywnego wspierania Studio w obronie przed roszczeniami.
                </p>
              </div>
            </section>

            {/* SEKCJA 5 - MODEL BIZNESOWY */}
            <section className="bg-dark-2 border-l-2 border-crimson p-10">
              <h2 className="font-cormorant text-2xl text-crimson mb-6 italic">5. Model Biznesowy i Podział Przychodów</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">5.1. Model 60/30/10.</strong> W ramach współpracy 
                  stosowany jest transparentny model podziału przychodów:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mb-4">
                  <div className="bg-dark-3/50 p-4 border border-gold/10 text-center">
                    <p className="text-2xl text-gold font-cormorant mb-2">60%</p>
                    <p className="text-white">Twórca</p>
                    <p className="text-[10px] text-dim/70 mt-1">Podstawowy udział w przychodach netto</p>
                  </div>
                  <div className="bg-dark-3/50 p-4 border border-gold/10 text-center">
                    <p className="text-2xl text-gold font-cormorant mb-2">30%</p>
                    <p className="text-white">Studio</p>
                    <p className="text-[10px] text-dim/70 mt-1">W tym: marketing, produkcja, obsługa</p>
                  </div>
                  <div className="bg-dark-3/50 p-4 border border-gold/10 text-center">
                    <p className="text-2xl text-gold font-cormorant mb-2">10%</p>
                    <p className="text-white">Reinvestycje</p>
                    <p className="text-[10px] text-dim/70 mt-1">Nowy sprzęt, szkolenia, rozwój</p>
                  </div>
                </div>
                <p>
                  <strong className="text-white">5.2. Przychód netto.</strong> Jako „przychód netto" 
                  rozumie się przychód brutto pomniejszony o:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>prowizje operatorów płatności (zazwyczaj 5-15%)</li>
                  <li>chargebacki i zwroty</li>
                  <li>opłaty platform dystrybucyjnych</li>
                  <li>podatki od sprzedaży (VAT) naliczone przez platformy</li>
                  <li>koszty prawnicze związane z ochroną praw autorskich</li>
                </ul>
                <p className="mt-4">
                  <strong className="text-white">5.3. Terminy wypłat.</strong> Wypłaty dla Twórców 
                  dokonywane są miesięcznie, do 15. dnia miesiąca następującego po miesiącu rozliczeniowym. 
                  Minimalna kwota wypłaty wynosi 100 EUR lub 450 PLN. Kwoty poniżej progu kumulują się 
                  do następnego miesiąca.
                </p>
                <p>
                  <strong className="text-white">5.4. Rozliczenia.</strong> Studio dostarcza Twórcy 
                  szczegółowe raporty rozliczeniowe zawierające: źródła przychodów, odliczenia, 
                  wyliczenia procentowe oraz kwoty netto do wypłaty. Raporty dostępne są w panelu 
                  użytkownika.
                </p>
              </div>
            </section>

            {/* SEKCJA 6 - ZAKAZ KONKURENCJI */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">6. Klauzule Konkurencji i Poufności</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">6.1. Zakaz konkurencji (Non-Compete).</strong> W okresie 
                  trwania współpracy Twórca nie może działać na szkodę Studio poprzez bezpośrednie 
                  konkurowanie z usługami świadczonymi przez Studio dla tych samych klientów lub 
                  na tym samym rynku docelowym bez uprzedniej pisemnej zgody Studio.
                </p>
                <p>
                  <strong className="text-white">6.2. Non-Solicitation.</strong> Twórca zobowiązuje 
                  się do niepodejmowania prób przejęcia (solicitation) klientów, partnerów biznesowych 
                  ani pracowników Studio do celów konkurencyjnych wobec Studio. Zakaz obowiązuje przez 
                  okres współpracy oraz przez 12 miesięcy po jej zakończeniu.
                </p>
                <p>
                  <strong className="text-white">6.3. Poufność informacji.</strong> Twórca zobowiązuje 
                  się do zachowania poufności wszelkich informacji poufnych uzyskanych w trakcie 
                  współpracy, w tym:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>dane dotyczące przychodów, strategii marketingowych i danych demograficznych użytkowników</li>
                  <li>algorytmy i metody promocji stosowane przez Studio</li>
                  <li>dane techniczne dotyczące infrastruktury i zabezpieczeń</li>
                  <li>informacje o innych twórcach współpracujących z Studio</li>
                  <li>szczegóły modelu biznesowego i umów z platformami dystrybucyjnymi</li>
                </ul>
                <p className="mt-4">
                  Obowiązek zachowania poufności utrzymuje się przez okres 3 lat od zakończenia współpracy.
                </p>
              </div>
            </section>

            {/* SEKCJA 7 - ZAKOŃCZENIE WSPÓŁPRACY */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">7. Zakończenie Współpracy</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">7.1. Okres wypowiedzenia.</strong> Każda ze stron 
                  może rozwiązać współpracę z zachowaniem 30-dniowego okresu wypowiedzenia, przesyłając 
                  pisemne oświadczenie na adres email drugiej strony lub drogą poleconą przesyłką 
                  pocztową na adres siedziby.
                </p>
                <p>
                  <strong className="text-white">7.2. Okres run-off.</strong> W przypadku gdy Studio 
                  poniosło wydatki na promocję Twórcy (kampanie marketingowe, zakup sprzętu, szkolenia), 
                  Studio zachowuje prawo do kontynuowania monetyzacji treści przez okres „run-off" 
                  wynoszący 90 dni od daty zakończenia współpracy. Przychody z tego okresu dzielone 
                  są zgodnie z normalnym modelem 60/30/10.
                </p>
                <p>
                  <strong className="text-white">7.3. Rozwiązanie bez zachowania terminu.</strong> 
                  Studio może rozwiązać współpracę ze skutkiem natychmiastowym w przypadku:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>naruszenia przez Twórcę zasad § 2257 lub braku dokumentacji wieku</li>
                  <li>przesłania treści nielegalnych lub naruszających prawa osób trzecich</li>
                  <li>podejrzenia oszustwa lub nieuczciwych praktyk</li>
                  <li>naruszenia klauzul poufności lub konkurencji</li>
                  <li>działania na szkodę reputacji Studio</li>
                </ul>
                <p className="mt-4">
                  <strong className="text-white">7.4. Konsekwencje rozwiązania.</strong> Po zakończeniu 
                  współpracy: (a) Twórca traci dostęp do panelu partnerskiego, (b) Studio zatrzymuje 
                  należne wypłaty do czasu wyjaśnienia ewentualnych roszczeń, (c) obowiązki dotyczące 
                  poufności i konkurencji pozostają w mocy.
                </p>
              </div>
            </section>

            {/* SEKCJA 8 - PRAWO WŁAŚCIWE */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">8. Prawo Właściwe i Rozstrzyganie Sporów</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">8.1. Prawo właściwe.</strong> Niniejsza umowa podlega 
                  prawu polskiemu. Wszelkie spory wynikłe z umowy lub związane z jej wykonaniem będą 
                  rozstrzygane przez sądy powszechne Rzeczypospolitej Polskiej właściwe dla siedziby 
                  Studio HRL Adult.
                </p>
                <p>
                  <strong className="text-white">8.2. Mediacja.</strong> W przypadku sporu strony 
                  zobowiązują się do podjęcia próby polubownego załatwienia sporu poprzez negocjacje 
                  bezpośrednie. Jeśli negocjacje nie przyniosą rezultatu w terminie 30 dni, strony 
                  mogą poddać spór mediacji przed właściwym sądem polubownym.
                </p>
                <p>
                  <strong className="text-white">8.3. Klauzula zrzeczenia się pozwów zbiorowych.</strong> 
                  Twórca zrzeka się prawa do występowania w imieniu własnym lub innych Twórców w ramach 
                  pozwu zbiorowego (class action) przeciwko Studio HRL Adult. Wszelkie roszczenia muszą 
                  być dochodzone wyłącznie w trybie indywidualnym.
                </p>
              </div>
            </section>

            {/* SEKCJA 9 - POSTANOWIENIA KOŃCOWE */}
            <section className="bg-dark-2 border-l-2 border-crimson p-10">
              <h2 className="font-cormorant text-2xl text-crimson mb-6 italic">9. Postanowienia Końcowe</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">9.1. Całość umowy.</strong> Niniejsza umowa stanowi 
                  całość ustaleń między stronami i zastępuje wszelkie wcześniejsze porozumienia, 
                  zapewnienia, czy to ustne, czy pisemne, dotyczące przedmiotu umowy.
                </p>
                <p>
                  <strong className="text-white">9.2. Zmiany umowy.</strong> Wszelkie zmiany lub 
                  uzupełnienia niniejszej umowy wymagają formy pisemnej pod rygorem nieważności. 
                  Zmiany muszą być podpisane przez obie strony lub potwierdzone wymianą emaili 
                  zawierających jednoznaczną akceptację zmian.
                </p>
                <p>
                  <strong className="text-white">9.3. Siła wyższa.</strong> Żadna ze stron nie ponosi 
                  odpowiedzialności za opóźnienie lub niewykonanie zobowiązań wynikających z siły 
                  wyższej, w tym działań wojennych, klęsk żywiołowych, epidemii, strajków, awarii 
                  infrastruktury krytycznej.
                </p>
                <p>
                  <strong className="text-white">9.4. Klauzula separowalności.</strong> Jeśli jakiekolwiek 
                  postanowienie niniejszej umowy zostanie uznane za nieważne lub niewykonalne, pozostałe 
                  postanowienia pozostają w pełnej mocy. Nieważne postanowienie zostanie zastąpione 
                  ważnym o zbliżonej treści gospodarczej.
                </p>
                <p>
                  <strong className="text-white">9.5. Język umowy.</strong> Niniejsza umowa sporządzona 
                  jest w języku polskim. Wersja polska jest wersją wiążącą. Ewentualne tłumaczenia na 
                  inne języki mają charakter wyłącznie informacyjny.
                </p>
              </div>
            </section>

            {/* SEKCJA 10 - KONTAKT */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">10. Kontakt i Akceptacja Warunków</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  Wszelkie pytania dotyczące niniejszej umowy prosimy kierować na adres email:{' '}
                  <span className="text-gold">hrl-adult-studio@hardbanrecordslab.online</span> lub 
                  przez formularz kontaktowy dostępny na stronie /contact.
                </p>
                <p>
                  Przesłanie treści do Studio HRL Adult poprzez panel użytkownika lub formularz castingowy 
                  stanowi akceptację niniejszej umowy i zobowiązanie do przestrzegania jej wszystkich 
                  postanowień.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-gold/20">
            <p className="text-[10px] text-dim/60 text-center tracking-wider">
              Studio HRL Adult © 2026 | Profesjonalna współpraca z twórcami | 
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

export default CreatorAgreementPage;
