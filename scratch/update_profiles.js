const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Updating Jane profile...');
    const jane = await p.partner.update({
      where: { handle: 'jane' },
      data: {
        description: `Jane to profesjonalna twórczyni treści adult z ponad trzema latami doświadczenia w branży. Jej specjalizacja obejmuje solo content, fetish videos, custom requests oraz roleplay scenarios. Jane wyróżnia się niezwykłą kreatywnością i elastycznością, co pozwala jej na tworzenie unikalnych, spersonalizowanych treści dla każdego fana. Jej podejście do pracy jest zawsze profesjonalne, a jednocześnie pełne pasji i autentyczności.

W swojej pracy Jane kładzie ogromny nacisk na jakość i dbałość o szczegóły. Każde video, każda sesja zdjęciowa jest starannie planowana i wykonana z najwyższą starannością. Jej studio jest w pełni wyposażone w profesjonalny sprzęt, co pozwala na tworzenie treści w jakości 4K. Jane rozumie, że w branży adult jakość jest kluczowa i zawsze stara się przekraczać oczekiwania swoich fanów.

Jako solowa twórczyni, Jane specjalizuje się w różnych rodzajach treści solo. Od eleganckich sesji zdjęciowych w bieliźnie, przez bardziej zmysłowe sesje w stylu glamour, aż po bardziej zaawansowane fetish content. Jej portfolio jest zróżnicowane i stale się rozwija, co pozwala jej przyciągać różnorodną publiczność. Jane jest otwarta na eksperymentowanie i chętnie realizuje nowe pomysły, zarówno od siebie, jak i od swoich fanów.

Jednym z najważniejszych atutów Jane jest jej zdolność do tworzenia custom content. Rozumie, że fani chcą czuć się wyjątkowi i docenieni, dlatego zawsze stara się spełnić ich indywidualne prośby. Niezależnie od tego, czy jest to konkretny scenario, szczególny rodzaj ubioru, czy unikalna sytuacja, Jane podejmuje wyzwanie z entuzjazmem i profesjonalizmem. Jej custom videos są znane z wysokiej jakości i dbałości o szczegóły.

Jane również wyróżnia się w interactive shows i live sessions. Jej energia i charyzma sprawiają, że jej transmisje są zawsze pełne życia i zaangażowania. Rozumie, że interakcja z fanami jest kluczowa dla sukcesu w branży, dlatego zawsze stara się tworzyć przyjazną i angażującą atmosferę podczas swoich shows. Fani cenią ją za autentyczność i szczerość, co sprawia, że czują się z nią komfortowo i swobodnie.

W swoim fetish content Jane jest bardzo ostrożna i świadoma granic. Rozumie znaczenie consent i bezpieczeństwa, zarówno dla siebie, jak i dla swoich fanów. Jej fetish content jest zawsze consensual, safe i przemyślany. Specjalizuje się w soft fetish i unika hardcore ekstremalnych treści. Jej podejście do fetish jest subtelne i eleganckie, co przyciąga fanów szukających bardziej wyrafinowanych treści.

Jane jest również bardzo open-minded i nie boi się eksperymentować. Rozumie, że branża adult jest dynamiczna i stale się zmienia, dlatego zawsze jest gotowa na nowe wyzwania i pomysły. Jej kreatywność nie zna granic, co pozwala jej na tworzenie unikalnych i innowacyjnych treści. Fani cenią ją za oryginalność i odwagę w próbowaniu nowych rzeczy.

Profesjonalizm Jane jest niezaprzeczalny. Zawsze jest punktualna, przygotowana i gotowa do pracy. Rozumie, że w branży adult niezawodność jest kluczowa, dlatego zawsze stara się być godna zaufania. Jej współpraca z innymi twórcami i studiami zawsze przebiega pomyślnie, co świadczy o jej profesjonalizmie i łatwości w pracy zespołowej.

Jane jest również bardzo świadoma znaczenia dyskrecji w branży adult. Rozumie, że prywatność jest dla niej i dla jej fanów ważna, dlatego zawsze dba o zachowanie odpowiednich granic. Nie ujawnia twarzy w publicznych treściach i zawsze zachowuje profesjonalny dystans. Jej podejście do prywatności jest szanowane przez fanów, co przyciąga tych, którzy cenią dyskrecję.

W swojej pracy Jane kładzie nacisk na quality focus. Każda treść, którą tworzy, jest starannie planowana i wykonana z najwyższą starannością. Niezależnie od tego, czy jest to prosty teaser, czy skomplikowany custom video, Jane zawsze stara się przekraczać oczekiwania. Jej fani wiedzą, że mogą oczekiwać tylko najlepszej jakości, co sprawia, że są lojalni i zawsze wracają po więcej.

Jane to twórczyni, która nieustannie się rozwija i doskonali swoje umiejętności. Uczestniczy w warsztatach, szkoleniach i konferencjach branżowych, aby być na bieżąco z najnowszymi trendami i technikami. Jej zaangażowanie w ciągłe doskonalenie się jest widoczne w jakości jej treści i profesjonalizmie jej pracy.

W relacjach z fanami Jane jest zawsze ciepła, przyjazna i autentyczna. Rozumie, że fani są fundamentem jej sukcesu, dlatego zawsze stara się budować z nimi silne i trwałe relacje. Jej fani czują się docenieni i ważni, co sprawia, że są lojalni i wspierają ją w jej karierze.

Jane to również twórczyni, która dba o swoje zdrowie fizyczne i psychiczne. Rozumie, że praca w branży adult może być wymagająca, dlatego zawsze stara się zachować równowagę między pracą a życiem osobistym. Jej zdrowy styl życia i pozytywne podejście do życia są widoczne w jej energii i entuzjazmie podczas tworzenia treści.

W przyszłości Jane planuje rozszerzyć swoje portfolio o nowe rodzaje treści i platformy. Rozumie, że branża adult stale się rozwija, dlatego chce być gotowa na nowe wyzwania i możliwości. Jej wizja jest kontynuowanie tworzenia wysokiej jakości treści, które będą przyciągać nowych fanów i zadowalać obecnych.

Podsumowując, Jane to profesjonalna, kreatywna i autentyczna twórczyni treści adult, która wyróżnia się jakością, różnorodnością i zaangażowaniem w swoją pracę. Jej fani cenią ją za profesjonalizm, autentyczność i zdolność do tworzenia unikalnych, spersonalizowanych treści. Jane to twórczyni, która z pewnością będzie odnosić sukces w branży adult i stale rozwijać swoje portfolio.`,
        avatar: '/image/Jane.jpg'
      }
    });
    console.log(`✅ Jane updated: description length ${jane.description.length}`);

    console.log('Updating Anna & Mark profile...');
    const am = await p.partner.update({
      where: { handle: 'anna-mark' },
      data: {
        description: `Anna i Mark to autentyczna para, która wyróżnia się w branży adult swoją naturalną chemią i prawdziwą relacją. Ich content nie jest udawany ani sfabrykowany - to jest prawdziwa para, która pokazuje swoją chemię i pasję w każdym video i każdej transmisji live. Ich podejście do tworzenia treści jest oparte na autentyczności, co przyciąga fanów szukających prawdziwych, nieudawanych relacji.

Anna to piękna i pewna siebie kobieta z naturalnym urokiem i magnetyczną osobowością. Jej uśmiech i charyzma są niezaprzeczalne, co sprawia, że fani natychmiast się w niej zakochują. Anna jest naturalna przed kamerą i czuje się komfortowo w swoim ciele, co jest widoczne w każdym jej występie. Jej pewność siebie i zmysłowość są subtelne i eleganckie, co przyciąga fanów szukających bardziej wyrafinowanych treści.

Mark to przystojny i charyzmatyczny mężczyzna z athletic physique i naturalnym urokiem. Jego pewność siebie i dominująca, ale nie agresywna osobowość tworzą idealną równowagę z Anną. Mark jest naturalny przed kamerą i czuje się komfortowo w swojej skórze, co jest widoczne w każdym jego występie. Jego siła i męskość są subtelne i eleganckie, co przyciąga fanów szukających bardziej wyrafinowanych treści.

Ich chemia jest niezaprzeczalna i autentyczna. Anna i Mark nie muszą udawać swojej chemii - ona jest naturalna i widoczna w każdym ich występie. Fani cenią ich za prawdziwość i autentyczność, co sprawia, że czują się z nimi komfortowo i swobodnie. Ich relacja jest oparta na wzajemnym szacunku, zaufaniu i pasji, co jest widoczne w każdym ich występie.

W swojej pracy Anna i Mark specjalizują się w couples content, live shows i custom scenarios. Ich couples content jest zróżnicowany i stale się rozwija, co pozwala im przyciągać różnorodną publiczność. Od eleganckich sesji zdjęciowych, przez bardziej zmysłowe video, aż po interactive live shows - Anna i Mark oferują szeroki zakres treści dla swoich fanów.

Jednym z najważniejszych atutów Anna i Mark jest ich zdolność do tworzenia custom scenarios. Rozumieją, że fani chcą czuć się wyjątkowi i docenieni, dlatego zawsze stara się spełnić ich indywidualne prośby. Niezależnie od tego, czy jest to konkretny scenario, szczególny rodzaj interakcji, czy unikalna sytuacja, Anna i Mark podejmują wyzwanie z entuzjazmem i profesjonalizmem. Ich custom content jest znany z wysokiej jakości i dbałości o szczegóły.

Anna i Mark również wyróżniają się w interactive live shows. Ich energia i chemia sprawiają, że ich transmisje są zawsze pełne życia i zaangażowania. Rozumieją, że interakcja z fanami jest kluczowa dla sukcesu w branży, dlatego zawsze stara się tworzyć przyjazną i angażującą atmosferę podczas swoich shows. Fani cenią ich za autentyczność i naturalność, co sprawia, że czują się z nimi komfortowo i swobodnie.

W swoim couples content Anna i Mark są bardzo świadomi granic i consent. Rozumieją znaczenie consent i bezpieczeństwa, zarówno dla siebie, jak i dla swoich fanów. Ich content jest zawsze consensual, safe i przemyślany. Unikają hardcore ekstremalnego contentu i specjalizują się w bardziej softcore, romantycznych i zmysłowych treściach. Ich podejście do couples content jest subtelne i eleganckie, co przyciąga fanów szukających bardziej wyrafinowanych treści.

Anna i Mark są bardzo open-minded i nie boją się eksperymentować. Rozumieją, że branża adult jest dynamiczna i stale się zmienia, dlatego zawsze są gotowi na nowe wyzwania i pomysły. Ich kreatywność nie zna granic, co pozwala im na tworzenie unikalnych i innowacyjnych treści. Fani cenią ich za oryginalność i odwagę w próbowaniu nowych rzeczy.

Profesjonalizm Anna i Mark jest niezaprzeczalny. Zawsze są punktualni, przygotowani i gotowi do pracy. Rozumieją, że w branży adult niezawodność jest kluczowa, dlatego zawsze starają się być godni zaufania. Ich współpraca z innymi twórcami i studiami zawsze przebiega pomyślnie, co świadczy o ich profesjonalizmie i łatwości w pracy zespołowej.

Anna i Mark są również bardzo świadomi znaczenia dyskrecji w branży adult. Rozumieją, że prywatność jest dla nich i dla ich fanów ważna, dlatego zawsze dbają o zachowanie odpowiednich granic. Nie ujawniają twarzy w publicznych treściach i zawsze zachowują profesjonalny dystans. Ich podejście do prywatności jest szanowane przez fanów, co przyciąga tych, którzy cenią dyskrecję.

W swojej pracy Anna i Mark kładą nacisk na quality focus. Każda treść, którą tworzą, jest starannie planowana i wykonana z najwyższą starannością. Niezależnie od tego, czy jest to prosty teaser, czy skomplikowany custom scenario, Anna i Mark zawsze starają się przekraczać oczekiwania. Ich fani wiedzą, że mogą oczekiwać tylko najlepszej jakości, co sprawia, że są lojalni i zawsze wracają po więcej.

Anna i Mark to twórcy, którzy nieustannie się rozwijają i doskonalą swoje umiejętności. Uczestniczą w warsztatach, szkoleniach i konferencjach branżowych, aby być na bieżąco z najnowszymi trendami i technikami. Ich zaangażowanie w ciągłe doskonalenie się jest widoczne w jakości ich treści i profesjonalizmie ich pracy.

W relacjach z fanami Anna i Mark są zawsze ciepli, przyjaźni i autentyczni. Rozumieją, że fani są fundamentem ich sukcesu, dlatego zawsze starają się budować z nimi silne i trwałe relacje. Ich fani czują się docenieni i ważni, co sprawia, że są lojalni i wspierają ich w ich karierze.

Anna i Mark to również twórcy, którzy dbają o swoje zdrowie fizyczne i psychiczne. Rozumieją, że praca w branży adult może być wymagająca, dlatego zawsze starają się zachować równowagę między pracą a życiem osobistym. Ich zdrowy styl życia i pozytywne podejście do życia są widoczne w ich energii i entuzjazmie podczas tworzenia treści.

W przyszłości Anna i Mark planują rozszerzyć swoje portfolio o nowe rodzaje treści i platformy. Rozumieją, że branża adult stale się rozwija, dlatego chcą być gotowi na nowe wyzwania i możliwości. Ich wizja jest kontynuowanie tworzenia wysokiej jakości treści, które będą przyciągać nowych fanów i zadowalać obecnych.

Podsumowując, Anna i Mark to autentyczna para, która wyróżnia się w branży adult swoją naturalną chemią, prawdziwą relacją i zaangażowaniem w swoją pracę. Ich fani cenią ich za autentyczność, profesjonalizm i zdolność do tworzenia unikalnych, spersonalizowanych treści. Anna i Mark to twórcy, którzy z pewnością będą odnosić sukces w branży adult i stale rozwijać swoje portfolio.`,
        avatar: '/image/am.jpg'
      }
    });
    console.log(`✅ Anna & Mark updated: description length ${am.description.length}`);

    console.log('\n✨ Both profiles updated successfully!');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
