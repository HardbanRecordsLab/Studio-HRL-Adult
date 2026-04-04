import React from 'react';
import Head from 'next/head';
import Navigation from '@/components/common/Navigation';
import Footer from '@/components/common/Footer';

const TermsPage: React.FC = () => {
  const lastUpdated = "4 kwietnia 2026 r.";

  return (
    <>
      <Head>
        <title>Regulamin Serwisu | Studio HRL Adult</title>
        <meta name="description" content="Regulamin korzystania z serwisu Studio HRL Adult - warunki użytkowania, weryfikacja wieku, zasady płatności." />
      </Head>

      <div className="min-h-screen bg-dark text-text relative">
        <Navigation />

        <main className="pt-32 pb-24 px-[7%] max-w-5xl mx-auto">
          <div className="section-tag">Prawne</div>
          <h1 className="h1-premium mb-4">Regulamin <span className="italic bg-gold-gradient bg-clip-text text-transparent">Serwisu</span></h1>
          <p className="text-dim text-[10px] tracking-widest uppercase mb-8">Ostatnia aktualizacja: {lastUpdated} | Studio HRL Adult | Polska</p>
          
          <p className="text-dim text-sm leading-loose mb-16 max-w-3xl">
            Niniejszy Regulamin określa zasady korzystania z serwisu internetowego dostępnego pod adresem studio-hrl-adult.vercel.app, 
            prowadzonego przez Studio HRL Adult z siedzibą w Polsce. Korzystanie z serwisu oznacza akceptację wszystkich postanowień niniejszego Regulaminu.
          </p>

          <div className="space-y-12">
            {/* PREAMBUŁA */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">Preambuła</h2>
              <p className="text-xs text-dim leading-loose">
                Studio HRL Adult, działające z siedzibą w Polsce, świadczy usługi polegające na profesjonalnej produkcji 
                i dystrybucji treści audiowizualnych dla dorosłych w modelu partnerskim. Niniejszy Regulamin stanowi 
                wiążącą umowę prawną między Użytkownikiem a Studiem. Dostęp do platformy i korzystanie z jej usług 
                jest równoznaczne z akceptacją wszystkich warunków niniejszego dokumentu. Regulamin jest dostępny 
                w języku polskim i stanowi jedyną autorytatywną wersję w przypadku ewentualnych sporów interpretacyjnych.
              </p>
            </section>

            {/* SEKCJA 1 - WERYFIKACJA WIEKU */}
            <section className="bg-dark-2 border-l-2 border-crimson p-10">
              <h2 className="font-cormorant text-2xl text-crimson mb-6 italic">§ 1. Obowiązkowa Weryfikacja Wieku</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">1.1.</strong> Dostęp do serwisu jest ściśle zabroniony dla osób, które nie ukończyły 18 lat. 
                  Każdy Użytkownik, wchodząc na stronę, oświadcza i gwarantuje, że jest osobą pełnoletnią zgodnie z prawem 
                  obowiązującym w jego jurysdykcji.
                </p>
                <p>
                  <strong className="text-white">1.2.</strong> Studio HRL Adult stosuje zaawansowane protokoły weryfikacji wieku zgodne z wymogami 
                  18 U.S.C. § 2257 oraz standardami RODO. Proces weryfikacji obejmuje: przedłożenie ważnego dokumentu 
                  tożsamości ze zdjęciem, wykonanie fotografii KYC (twarz + dokument), oraz pisemne oświadczenie o pełnoletności.
                </p>
                <p>
                  <strong className="text-white">1.3.</strong> Fałszywe przedstawianie wieku lub próba obejścia systemów weryfikacji stanowi czyn 
                  karalny zagrożony odpowiedzialnością karną i cywilną. Studio zastrzega sobie prawo do natychmiastowego 
                  zbanowania konta, usunięcia wszystkich danych oraz zgłoszenia naruszenia odpowiednim organom ścigania 
                  w przypadku wykrycia nieprawidłowości w procesie weryfikacji.
                </p>
                <p>
                  <strong className="text-white">1.4.</strong> Wszystkie dane weryfikacyjne są przechowywane zgodnie z najwyższymi standardami 
                  bezpieczeństwa (szyfrowanie AES-256) przez okres wymagany przepisami prawa (7 lat dla celów podatkowych 
                  oraz 12 miesięcy logów dostępowych dla celów dowodowych).
                </p>
              </div>
            </section>

            {/* SEKCJA 2 - CHARAKTER TREŚCI */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">§ 2. Charakter Treści i Oświadczenie Użytkownika</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">2.1.</strong> Platforma Studio HRL Adult zawiera treści przeznaczone wyłącznie dla dorosłych, 
                  w tym materiały o charakterze seksualnym. Każdy Użytkownik, uzyskując dostęp do serwisu, oświadcza 
                  na własną odpowiedzialność, że nie jest obrażany przez tego typu materiały oraz że przeglądanie 
                  treści o charakterze erotycznym jest dozwolone i legalne w jego jurysdykcji lokalnej, stanowej 
                  lub federalnej.
                </p>
                <p>
                  <strong className="text-white">2.2.</strong> Użytkownik ponosi pełną odpowiedzialność za zapewnienie, że jego dostęp do 
                  treści nie narusza żadnych lokalnych przepisów prawa, regulacji administracyjnych ani zasad 
                  obowiązujących w jego miejscu zamieszkania lub przebywania. Studio HRL Adult nie ponosi 
                  odpowiedzialności za naruszenie przez Użytkownika przepisów prawa obowiązujących w jego 
                  lokalizacji geograficznej.
                </p>
                <p>
                  <strong className="text-white">2.3.</strong> W przypadku wykrycia naruszenia zasad dotyczących dostępu osób niepełnoletnich 
                  lub dystrybucji treści w jurysdykcjach, gdzie jest to zabronione, Studio podejmie natychmiastowe 
                  działania mające na celu zablokowanie dostępu i współpracę z właściwymi organami ścigania.
                </p>
              </div>
            </section>

            {/* SEKCJA 3 - KONTA I SUBSKRYPCJE */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">§ 3. Konta Użytkowników i Subskrypcje</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">3.1.</strong> Rejestracja w serwisie wymaga podania prawidłowego adresu email oraz utworzenia 
                  bezpiecznego hasła. Użytkownik jest wyłącznie odpowiedzialny za bezpieczeństwo swojego konta, 
                  w tym za poufność hasła. Studio zaleca stosowanie haseł o długości minimum 12 znaków, zawierających 
                  wielkie i małe litery, cyfry oraz znaki specjalne.
                </p>
                <p>
                  <strong className="text-white">3.2.</strong> Użytkownik zobowiązuje się do nieudostępniania swoich danych logowania osobom 
                  trzecim. Wszystkie działania dokonane z wykorzystaniem konta Użytkownika są traktowane jako 
                  działania tego Użytkownika. W przypadku podejrzenia nieautoryzowanego dostępu, Użytkownik 
                  zobowiązany jest do natychmiastowego powiadomienia Studia pod adresem hrl-adult-studio@hardbanrecordslab.online.
                </p>
                <p>
                  <strong className="text-white">3.3.</strong> Usługi subskrypcyjne oferowane przez Studio mają charakter cykliczny. 
                  Użytkownik potwierdza, że dostęp do treści jest udzielany natychmiast po dokonaniu płatności. 
                  Zgodnie z dyrektywą Parlamentu Europejskiego i Rady 2011/83/UE w sprawie praw konsumentów, 
                  Użytkownik wyraża zgodę na utratę prawa do odstąpienia od umowy lub anulowania subskrypcji 
                  w momencie rozpoczęcia strumieniowania lub pobierania treści.
                </p>
                <p>
                  <strong className="text-white">3.4.</strong> Subskrypcje są odnawiane automatycznie na kolejne okresy rozliczeniowe 
                  (miesięczne lub roczne) do momentu ich anulowania przez Użytkownika. Anulowanie subskrypcji 
                  możliwe jest poprzez panel użytkownika lub kontakt z obsługą klienta minimum 48 godzin przed 
                  datą kolejnego obciążenia.
                </p>
              </div>
            </section>

            {/* SEKCJA 4 - ZGODNOŚĆ FINANSOWA */}
            <section className="bg-dark-2 border-l-2 border-crimson p-10">
              <h2 className="font-cormorant text-2xl text-crimson mb-6 italic">§ 4. Zgodność Finansowa i Ochrona Przed Oszustwami</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">4.1.</strong> Studio HRL Adult działa w środowisku wysokiego ryzyka ("high-risk merchant account"), 
                  co jest standardem w branży treści dla dorosłych. Użytkownik akceptuje specyfikę tego modelu 
                  biznesowego i wyraża zgodę na wszystkie związane z tym procedury weryfikacyjne.
                </p>
                <p>
                  <strong className="text-white">4.2.</strong> Każdy "chargeback" (spór dotyczący transakcji) zainicjowany przez Użytkownika 
                  bez uprzedniego kontaktu z działem obsługi klienta Studia jest traktowany jako akt oszustwa 
                  płatniczego. Użytkownik wyraża zgodę na udostępnienie jego danych osobowych agencjom 
                  ochrony przed oszustwami oraz firmom windykacyjnym w przypadku złożenia nieuzasadnionego 
                  chargebacku.
                </p>
                <p>
                  <strong className="text-white">4.3.</strong> W przypadku wykrycia podejrzanych wzorców transakcyjnych, Studio zastrzega 
                  sobie prawo do tymczasowego zablokowania konta do czasu wyjaśnienia sytuacji. Użytkownik 
                  zobowiązuje się do współpracy w procesie weryfikacji płatności, w tym do dostarczenia 
                  dodatkowych dokumentów na żądanie Studia.
                </p>
                <p>
                  <strong className="text-white">4.4.</strong> Wszystkie ceny podawane w serwisie są cenami brutto, zawierającymi podatek VAT 
                  zgodnie z przepisami prawa polskiego i unijnego. Transakcje są rozliczane w walucie EUR 
                  (euro) lub PLN (polski złoty) w zależności od wyboru Użytkownika.
                </p>
              </div>
            </section>

            {/* SEKCJA 5 - ZABRONIONE ZACHOWANIA */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">§ 5. Zabronione Zachowania i Ochrona Własności Intelektualnej</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">5.1.</strong> Użytkownikowi ściśle zabrania się jakichkolwiek prób kopiowania, pobierania, 
                  skrobania (scraping), redystrybucji lub udostępniania treści poza platformą Studio HRL Adult 
                  bez wyraźnej pisemnej zgody właścicieli praw autorskich.
                </p>
                <p>
                  <strong className="text-white">5.2.</strong> Studio stosuje zaawansowane techniki znakowania cyfrowego (steganografia, 
                  niewidoczne znaki wodne), które umożliwiają identyfikację źródła nieautoryzowanej dystrybucji 
                  treści. Każda próba obejścia tych zabezpieczeń jest zabroniona i będzie skutkować podjęciem 
                  natychmiastowych działań prawnych.
                </p>
                <p>
                  <strong className="text-white">5.3.</strong> W przypadku wykrycia piractwa treści, nieautoryzowanego leakowania materiałów 
                  lub innych naruszeń praw własności intelektualnej, Studio podejmie wszelkie dostępne środki 
                  prawne, w tym zgłoszenia do organów ścigania, pozwy cywilne o naprawienie szkody oraz 
              żądania wstrzymania dostępu do treści u podmiotów pośredniczących w nielegalnej dystrybucji.
                </p>
                <p>
                  <strong className="text-white">5.4.</strong> Użytkownik zobowiązuje się do nieingerowania w infrastrukturę techniczną serwisu, 
                  w tym do niepróbowania obchodzenia zabezpieczeń, nieprowadzenia ataków DDoS, nieużywania 
                  zautomatyzowanych narzędzi (botów, crawlerów) bez wyraźnej zgody Studia.
                </p>
              </div>
            </section>

            {/* SEKCJA 6 - ODPOWIEDZIALNOŚĆ */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">§ 6. Ograniczenie Odpowiedzialności i Zgodność z DSA</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">6.1.</strong> Studio HRL Adult, działając jako dostawca usług hostingowych, zachowuje 
                  zgodność z przepisami Aktu o Usługach Cyfrowych (Digital Services Act - DSA). Platforma 
                  zapewnia mechanizm zgłaszania nielegalnych treści poprzez dedykowany formularz lub 
                  kontakt email: hrl-adult-studio@hardbanrecordslab.online.
                </p>
                <p>
                  <strong className="text-white">6.2.</strong> Studio nie ponosi odpowiedzialności za treści przesyłane przez niezależnych 
                  twórców poza obowiązkami wynikającymi z przepisów prawa, w szczególności obowiązkiem 
                  usunięcia treści po otrzymaniu ważnego zawiadomienia. Studio nie jest wydawcą treści 
                  w rozumieniu przepisów o odpowiedzialności wydawców.
                </p>
                <p>
                  <strong className="text-white">6.3.</strong> Studio dołoży wszelkich starań, aby serwis był dostępny przez 99,5% czasu 
                  w skali miesiąca, jednak nie gwarantuje nieprzerwanego dostępu. Przerwy techniczne, 
              konserwacje systemów oraz siła wyższa mogą skutkować chwilowym brakiem dostępności usług.
                </p>
                <p>
                  <strong className="text-white">6.4.</strong> Studio nie ponosi odpowiedzialności za szkody wynikłe z nieprawidłowego 
                  korzystania z serwisu przez Użytkownika, w tym za konsekwencje naruszenia zakazu dostępu 
                  dla osób niepełnoletnich lub korzystania z serwisu w sposób sprzeczny z prawem obowiązującym 
                  w jurysdykcji Użytkownika.
                </p>
              </div>
            </section>

            {/* SEKCJA 7 - PRAWA AUTORSKIE */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">§ 7. Prawa Autorskie i Własność Intelektualna</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">7.1.</strong> Wszystkie treści dostępne w serwisie Studio HRL Adult, w tym materiały 
                  wideo, fotografie, grafiki, logo, znaki towarowe, układ strony oraz kod źródłowy, są 
                  chronione prawem autorskim i stanowią własność intelektualną Studia lub jego licencjodawców.
                </p>
                <p>
                  <strong className="text-white">7.2.</strong> Użytkownik uzyskuje ograniczoną, niewyłączną, nieprzenaszalną licencję na 
                  dostęp do treści wyłącznie w celach osobistych, niekomercyjnych. Licencja ta nie obejmuje 
                  prawa do kopiowania, modyfikowania, rozpowszechniania, wyświetlania publicznego, 
                  przygotowywania utworów zależnych ani innego wykorzystania treści.
                </p>
                <p>
                  <strong className="text-white">7.3.</strong> Naruszenie praw własności intelektualnej będzie skutkować natychmiastowym 
                  zakończeniem dostępu do serwisu oraz podjęciem wszelkich dostępnych środków prawnych, 
                  w tym dochodzeniem roszczeń odszkodowawczych.
                </p>
              </div>
            </section>

            {/* SEKCJA 8 - PRYWATNOŚĆ */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">§ 8. Prywatność i Przechowywanie Logów</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">8.1.</strong> Studio HRL Adult szanuje prywatność Użytkowników i przetwarza dane osobowe 
                  zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO/GDPR) oraz 
                  Polityką Prywatności dostępną na stronie /privacy.
                </p>
                <p>
                  <strong className="text-white">8.2.</strong> Logi dostępowe, w tym adresy IP, identyfikatory urządzeń oraz historia 
                  sesji, są przechowywane przez okres 12 miesięcy dla celów dowodowych, bezpieczeństwa 
                  systemów informatycznych oraz wypełnienia obowiązków prawnych. Po upływie tego okresu 
                  dane są anonimizowane lub nieodwracalnie usuwane.
                </p>
                <p>
                  <strong className="text-white">8.3.</strong> Studio wykorzystuje pliki cookies i podobne technologie w celu zapewnienia 
                  prawidłowego funkcjonowania serwisu, analizy ruchu oraz personalizacji treści. Szczegółowe 
                  informacje znajdują się w Polityce Cookies.
                </p>
              </div>
            </section>

            {/* SEKCJA 9 - SIŁA WYŻSZA */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">§ 9. Siła Wyższa</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">9.1.</strong> Żadna ze stron nie ponosi odpowiedzialności za niewykonanie lub opóźnienie 
                  w wykonaniu swoich zobowiązań wynikających z niniejszego Regulaminu, jeśli niewykonanie 
                  lub opóźnienie to jest spowodowane okolicznościami leżącymi poza jej kontrolą, w tym 
                  w szczególności: klęskami żywiołowymi, działaniami wojennymi, zamieszkami, epidemiami, 
                  strajkami, awariami sieci energetycznej lub internetowej, decyzjami administracyjnymi 
                  lub sądowymi.
                </p>
                <p>
                  <strong className="text-white">9.2.</strong> Strona dotknięta siłą wyższą zobowiązana jest niezwłocznie powiadomić drugą 
                  stronę o wystąpieniu takich okoliczności oraz dołożyć wszelkich starań w celu zminimalizowania 
                  ich skutków.
                </p>
              </div>
            </section>

            {/* SEKCJA 10 - ZMIANA REGULAMINU */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">§ 10. Zmiana Regulaminu</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">10.1.</strong> Studio zastrzega sobie prawo do jednostronnej zmiany niniejszego Regulaminu 
                  w dowolnym czasie. Zmiany wchodzą w życie po upływie 14 dni od momentu publikacji 
                  zaktualizowanego Regulaminu na stronie serwisu.
                </p>
                <p>
                  <strong className="text-white">10.2.</strong> W przypadku istotnych zmian mających wpływ na prawa Użytkowników, Studio 
                  powiadomi Użytkowników drogą mailową lub poprzez wyraźne powiadomienie w serwisie.
                </p>
                <p>
                  <strong className="text-white">10.3.</strong> Kontynuowanie korzystania z serwisu po wejściu w życie zmian Regulaminu 
                  stanowi akceptację nowych warunków. Użytkownik, który nie akceptuje zmian, powinien 
                  zaprzestać korzystania z serwisu i anulować swoją subskrypcję.
                </p>
              </div>
            </section>

            {/* SEKCJA 11 - ROZWIĄZYWANIE SPORÓW */}
            <section className="bg-dark-2 border-l-2 border-crimson p-10">
              <h2 className="font-cormorant text-2xl text-crimson mb-6 italic">§ 11. Rozwiązywanie Sporów</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">11.1.</strong> Wszelkie spory wynikłe z niniejszego Regulaminu lub związane z korzystaniem 
                  z serwisu będą rozstrzygane w pierwszej kolejności drogą negocjacji między stronami. 
                  W przypadku braku możliwości polubownego załatwienia sporu, strony zobowiązują się 
                  do poddania go rozstrzygnięciu przez sąd właściwy dla siedziby Studia.
                </p>
                <p>
                  <strong className="text-white">11.2.</strong> Prawem właściwym dla niniejszego Regulaminu jest prawo polskie. 
                  Wszelkie ewentualne postępowania sądowe będą toczyć się przed sądami powszechnymi 
                  Rzeczypospolitej Polskiej.
                </p>
                <p>
                  <strong className="text-white">11.3.</strong> Użytkownik zrzeka się prawa do uczestnictwa w pozwach zbiorowych (class-action) 
                  przeciwko Studio HRL Adult. Wszelkie roszczenia muszą być dochodzone w trybie indywidualnym.
                </p>
              </div>
            </section>

            {/* SEKCJA 12 - POSTANOWIENIA KOŃCOWE */}
            <section className="bg-dark-2 border-l-2 border-gold p-10">
              <h2 className="font-cormorant text-2xl text-gold mb-6 italic">§ 12. Postanowienia Końcowe</h2>
              <div className="text-xs text-dim leading-loose space-y-4">
                <p>
                  <strong className="text-white">12.1.</strong> Jeśli jakiekolwiek postanowienie niniejszego Regulaminu zostanie uznane 
                  za nieważne lub niewykonalne przez właściwy sąd, pozostałe postanowienia pozostają 
                  w pełnej mocy i skuteczności. Nieważne postanowienie zostanie zastąpione ważnym 
                  postanowieniem, które w możliwie najszerszym zakresie realizuje intencje stron.
                </p>
                <p>
                  <strong className="text-white">12.2.</strong> Brak egzekwowania przez Studio któregokolwiek z praw wynikających z Regulaminu 
                  nie stanowi zrzeczenia się tego prawa. Studio zachowuje prawo do egzekwowania 
                  wszystkich swoich praw w późniejszym terminie.
                </p>
                <p>
                  <strong className="text-white">12.3.</strong> Użytkownik nie może przenosić swoich praw ani obowiązków wynikających z 
                  niniejszego Regulaminu bez uprzedniej pisemnej zgody Studia. Studio może przenosić 
                  swoje prawa i obowiązki na podmioty trzecie bez zgody Użytkownika, pod warunkiem 
                  zapewnienia kontynuacji świadczenia usług.
                </p>
                <p>
                  <strong className="text-white">12.4.</strong> Wszelkie pytania dotyczące niniejszego Regulaminu prosimy kierować na adres 
                  email: <span className="text-gold">hrl-adult-studio@hardbanrecordslab.online</span> lub 
                  poprzez formularz kontaktowy dostępny w serwisie.
                </p>
              </div>
            </section>
          </div>

          <div className="mt-16 pt-8 border-t border-gold/20">
            <p className="text-[10px] text-dim/60 text-center tracking-wider">
              Studio HRL Adult © 2026 | Wszelkie prawa zastrzeżone | 
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

export default TermsPage;
