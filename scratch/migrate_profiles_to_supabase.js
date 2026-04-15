const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Checking current profiles in database (Supabase)...');
    const existingProfiles = await p.partner.findMany({
      select: { id: true, name: true, handle: true, status: true }
    });
    
    console.log(`Found ${existingProfiles.length} existing profiles:`);
    existingProfiles.forEach(p => {
      console.log(`- ${p.name} (${p.handle}): status=${p.status}`);
    });

    // Profiles to ensure exist
    const profilesToCreate = [
      {
        id: 'alexia-hrl',
        name: 'Alexia',
        handle: 'alexia',
        email: 'alexia@hrlstudio.online',
        status: 'active',
        type: 'solo',
        bio: 'Alexia to premium glamour creator z Studio HRL. Specjalizacja: artystyczne nudes, lingerie, live. Top 5% OnlyFans i Fansly.',
        description: `Alexia to utalentowana i elegancka twórczyni treści adult, która specjalizuje się w high-end glamour i artystycznych nudes. Jej kariera w branży rozpoczęła się od ekskluzywnych sesji zdjęciowych dla prestiżowych magazynów, które szybko zyskały uznanie ze względu na unikalny artystyczny styl i naturalną zmysłowość. Alexia nieustannie podnosi swoje umiejętności, uczestnicząc w warsztatach fotografii high-end i reżyserii, co pozwala jej tworzyć treści na najwyższym poziomie jakości.

Specjalizacja Alexii obejmuje szeroki zakres tematów - od eleganckich sesji zdjęciowych w stylu glamour, przez artystyczne nudes, aż po interaktywne transmisje live. Jej podejście do pracy jest oparte na autentyczności i profesjonalizmie. Alexia wierzy, że każda sesja powinna być wyjątkowym doświadczeniem zarówno dla niej, jak i dla widza. Dlatego kładzie ogromny nacisk na szczegóły - od oświetlenia i kompozycji, po atmosferę i emocje, które chce przekazać.

Jednym z kluczowych atutów Alexii jest jej zdolność do tworzenia spersonalizowanych treści. Rozumie, że każdy fan ma unikalne preferencje i fantazje, dlatego zawsze stara się spełnić indywidualne prośby. Niezależnie od tego, czy jest to konkretny scenario, szczególny rodzaj interakcji, czy unikalna sytuacja - Alexia podejmuje wyzwanie z entuzjazmem i kreatywnością. Jej custom videos są cenione za wysoką jakość produkcji i dbałość o detale.

W live shows Alexia wyróżnia się naturalnością i charyzmą. Jej transmisje są nie tylko wizualnie atrakcyjne, ale także interaktywne i angażujące. Alexia potrafi stworzyć atmosferę intymności i bliskości, nawet w formie online. Fani cenią ją za to, że jest prawdziwa i autentyczna - nie udaje żadnej postaci, po prostu jest sobą. To sprawia, że transmisje live z jej udziałem zawsze przyciągają dużą publiczność i generują wysoką zaangażowanie.

Alexia jest również aktywna na wielu platformach, co pozwala jej dotrzeć do szerokiego grona odbiorców. Jej profile na OnlyFans i Fansly są regularnie aktualizowane z nowymi treściami, a każdy kanał ma nieco inny charakter, dostosowany do specyfiki platformy. Dzięki temu Alexia może zaoferować swoim fanom różnorodne doświadczenia i utrzymać ich zaangażowanie na wysokim poziomie.

W swojej pracy Alexia kładzie ogromny nacisk na bezpieczeństwo i dyskrecję. Rozumie, że praca w branży adult wiąże się z pewnymi ryzykami, dlatego zawsze dba o ochronę swojej prywatności i prywatności swoich fanów. Jej podejście jest profesjonalne i odpowiedzialne, co sprawia, że jest szanowana zarówno przez fanów, jak i przez innych twórców w branży.

Alexia nieustannie dąży do rozwoju i doskonalenia swoich umiejętności. Regularnie analizuje trendy w branży, eksperymentuje z nowymi technikami i stylami, i szuka inspiracji w różnych źródłach - od sztuki klasycznej, po nowoczesne media. To podejście pozwala jej utrzymać świeżość i innowacyjność w swoich treściach, co jest kluczowe w tak konkurencyjnej branży.

Dla Alexii praca twórcy treści adult nie jest tylko sposobem na zarabianie pieniędzy - to jej pasja i forma ekspresji artystycznej. Czerpie satysfakcję z tworzenia piękna i podzielenia się nim z innymi. Jej celem jest nie tylko zadowolenie fanów, ale także tworzenie treści, które mają wartość artystyczną i emocjonalną. To podejście sprawia, że Alexia wyróżnia się na tle innych twórców i zyskuje lojalną publiczność.`,
        avatar: '/image/Alexia.jpg',
        height: 174,
        weight: 58,
        measurements: '92C / 62 / 92',
        profileData: JSON.stringify({
          likes: ['Artistic nudes', 'Glamour', 'Lingerie', 'Live shows', 'Custom videos', 'High-end photography', 'Elegant sessions', 'Luxury content', 'Artistic poses', 'Premium quality'],
          boundaries: ['Brak hardcore', 'Tylko solo', 'Bez twarzy w publicznych treściach', 'Tylko softcore', 'Dyskrecja absolutna', 'Safe practices', 'Elegancja i klasa'],
          bestInMe: ['Elegancja', 'Zmysłowość', 'Profesjonalizm', 'Artystyczne podejście', 'High-end quality', 'Kreatywność', 'Naturalność', 'Charyzma', 'Punktualność', 'Współpraca'],
          whyWatchMe: ['Unikalna estetyka', 'Premium quality', 'Artystyczne treści', 'Profesjonalna produkcja', 'Ekskluzywne sesje', 'Live shows', 'Elegancja i klasa', 'Luxury experience', 'High-end photography', 'Unikalny styl'],
          gallery: ['/image/Alexia.jpg', '/image/alexia2.jpg', '/image/alexia3.jpg', '/image/alexia4.jpg', '/image/alexia5.jpg']
        })
      },
      {
        id: 'cmnzmq5kh0000v488t3mxwpbe',
        name: 'Jane',
        handle: 'jane',
        email: 'jane@hrlstudio.online',
        status: 'active',
        type: 'solo',
        bio: 'Jane to profesjonalna twórczyni treści adult z ponad trzema latami doświadczenia. Specjalizacja: solo, fetish, custom videos i roleplay. Kreatywna, elastyczna i zawsze gotowa na nowe wyzwania.',
        description: `Jane jest profesjonalną twórczynią treści adult z ponad trzema latami doświadczenia w branży. Jej kariera rozpoczęła się od eksperymentalnych sesji zdjęciowych, które szybko zyskały uznanie ze względu na unikalny styl i naturalność. Jane nieustannie rozwija swoje umiejętności, uczestnicząc w warsztatach i szkoleniach, co pozwala jej tworzyć treści na najwyższym poziomie jakości.

Specjalizacja Jane obejmuje szeroki zakres tematów - od solo content, przez fetish i roleplay, aż po custom videos. Jej podejście do pracy jest oparte na kreatywności i elastyczności. Jane wierzy, że każda sesja powinna być wyjątkowym doświadczeniem. Dlatego kładzie ogromny nacisk na szczegóły i zawsze stara się spełnić indywidualne prośby fanów.

Jednym z kluczowych atutów Jane jest jej zdolność do tworzenia spersonalizowanych treści. Rozumie, że każdy fan ma unikalne preferencje, dlatego zawsze stara się spełnić indywidualne prośby. Niezależnie od tego, czy jest to konkretny scenario, szczególny rodzaj interakcji, czy unikalna sytuacja - Jane podejmuje wyzwanie z entuzjazmem i kreatywnością.

W live shows Jane wyróżnia się naturalnością i charyzmą. Jej transmisje są interaktywne i angażujące. Jane potrafi stworzyć atmosferę intymności i bliskości, nawet w formie online. Fani cenią ją za to, że jest prawdziwa i autentyczna.

Jane jest również aktywna na wielu platformach, co pozwala jej dotrzeć do szerokiego grona odbiorców. Jej profile są regularnie aktualizowane z nowymi treściami. Dzięki temu Jane może zaoferować swoim fanom różnorodne doświadczenia.

W swojej pracy Jane kładzie ogromny nacisk na bezpieczeństwo i dyskrecję. Rozumie, że praca w branży adult wiąże się z pewnymi ryzykami, dlatego zawsze dba o ochronę swojej prywatności i prywatności swoich fanów. Jej podejście jest profesjonalne i odpowiedzialne.`,
        avatar: '/image/Jane.jpg',
        height: 168,
        weight: 54,
        measurements: '85C / 62 / 88',
        profileData: JSON.stringify({
          likes: ['Solo content', 'Fetish', 'Roleplay', 'Custom videos', 'Live shows', 'Artistic nudes', 'Lingerie', 'Pole dance', 'Yoga', 'Fitness'],
          boundaries: ['Brak hardcore', 'Tylko solo', 'Bez twarzy w publicznych treściach', 'Tylko softcore', 'Dyskrecja absolutna', 'Safe practices'],
          bestInMe: ['Naturalność', 'Zmysłowość', 'Kreatywność', 'Elastyczność', 'Profesjonalizm', 'Charyzma', 'Punktualność', 'Współpraca', 'Energia', 'Uśmiech'],
          whyWatchMe: ['Unikalna estetyka', 'Premium quality', 'Artystyczne treści', 'Profesjonalna produkcja', 'Ekskluzywne sesje', 'Live shows', 'Naturalność', 'Kreatywność', 'Energia', 'Uśmiech'],
          gallery: ['/image/Jane.jpg', '/image/jane1.jpg', '/image/jane2.jpg', '/image/jane4.jpg', '/image/jane5.jpg']
        })
      },
      {
        id: 'cmnzmq6ce0001v488bowvfqx3',
        name: 'Anna & Mark',
        handle: 'anna-mark',
        email: 'anna-mark@hrlstudio.online',
        status: 'active',
        type: 'couple',
        bio: 'Anna i Mark to autentyczna para z naturalną chemią i prawdziwą relacją. Specjalizacja: couples content, live shows i custom scenarios. Prawdziwa relacja, pasja i profesjonalizm w każdym występie.',
        description: `Anna i Mark to autentyczna para, która wyróżnia się w branży adult swoją naturalną chemią i prawdziwą relacją. Ich content nie jest udawany ani sfabrykowany - to jest prawdziwa para, która pokazuje swoją chemię i pasję w każdym video i każdej transmisji live. Ich podejście do tworzenia treści jest oparte na autentyczności.

Anna to piękna i pewna siebie kobieta z naturalnym urokiem i magnetyczną osobowością. Jej uśmiech i charyzma są niezaprzeczalne, co sprawia, że fani natychmiast się w niej zakochują. Anna jest naturalna przed kamerą i czuje się komfortowo w swoim ciele, co jest widoczne w każdym jej występie.

Mark to przystojny i charyzmatyczny mężczyzna z athletic physique i naturalnym urokiem. Jego pewność siebie i dominująca, ale nie agresywna osobowość tworzą idealną równowagę z Anną. Mark jest naturalny przed kamerą i czuje się komfortowo w swojej skórze.

Ich chemia jest niezaprzeczalna i autentyczna. Anna i Mark nie muszą udawać swojej chemii - ona jest naturalna i widoczna w każdym ich występie. Fani cenią ich za prawdziwość i autentyczność, co sprawia, że czują się z nimi komfortowo i swobodnie.

W swojej pracy Anna i Mark specjalizują się w couples content, live shows i custom scenarios. Ich couples content jest zróżnicowany i stale się rozwija, co pozwala im przyciągać różnorodną publiczność. Od eleganckich sesji zdjęciowych, przez bardziej zmysłowe video, aż po interactive live shows.

Jednym z najważniejszych atutów Anna i Mark jest ich zdolność do tworzenia custom scenarios. Rozumieją, że fani chcą czuć się wyjątkowi i docenieni, dlatego zawsze starają się spełnić ich indywidualne prośby. Niezależnie od tego, czy jest to konkretny scenario, szczególny rodzaj interakcji, czy unikalna sytuacja.

Anna i Mark również wyróżniają się w interactive live shows. Ich transmisje są nie tylko wizualnie atrakcyjne, ale także interaktywne i angażujące. Potrafią stworzyć atmosferę intymności i bliskości, nawet w formie online. Fani cenią ich za to, że są prawdziwi i autentyczni.

Anna i Mark kładą ogromny nacisk na bezpieczeństwo i dyskrecję. Rozumieją, że praca w branży adult wiąże się z pewnymi ryzykami, dlatego zawsze dbają o ochronę swojej prywatności i prywatności swoich fanów. Ich podejście jest profesjonalne i odpowiedzialne.

W swojej pracy Anna i Mark nieustannie dążą do rozwoju i doskonalenia swoich umiejętności. Regularnie analizują trendy w branży i eksperymentują z nowymi technikami. To podejście pozwala im utrzymać świeżość i innowacyjność w swoich treściach.`,
        avatar: '/image/am.jpg',
        height: 170,
        weight: null,
        measurements: '88C / 64 / 90',
        profileData: JSON.stringify({
          likes: ['Couples content', 'Live shows', 'Custom scenarios', 'Roleplay', 'Interactive sessions', 'Romantic scenes', 'Passionate content', 'Custom videos', 'Fan requests', 'Exclusive content'],
          boundaries: ['Brak hardcore', 'Tylko para', 'Bez innych osób', 'Tylko softcore', 'Dyskrecja absolutna', 'Safe practices', 'Respect boundaries'],
          bestInMe: ['Autentyczność', 'Prawdziwa chemia', 'Pasja', 'Profesjonalizm', 'Naturalność', 'Charyzma', 'Energia', 'Kreatywność', 'Współpraca', 'Romantyzm'],
          whyWatchMe: ['Prawdziwa para', 'Autentyczna chemia', 'Premium quality', 'Profesjonalna produkcja', 'Ekskluzywne sesje', 'Live shows', 'Naturalność', 'Pasja', 'Romantyzm', 'Unikalny styl'],
          gallery: ['/image/am.jpg', '/image/am1.jpg', '/image/am2.jpg', '/image/am3.jpg', '/image/am4.jpg']
        })
      }
    ];

    console.log('\nEnsuring profiles exist in database...');
    for (const profile of profilesToCreate) {
      const existing = existingProfiles.find(p => p.handle === profile.handle);
      if (existing) {
        console.log(`✅ ${profile.name} already exists, skipping`);
      } else {
        console.log(`Creating ${profile.name}...`);
        await p.partner.create({ data: profile });
        console.log(`✅ ${profile.name} created`);
      }
    }

    console.log('\n✨ Migration complete! All profiles are now in the database (Supabase).');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
