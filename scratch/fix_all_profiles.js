const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Fixing Luna height and weight with raw SQL...');
    await p.$executeRawUnsafe(
      `UPDATE "Partner" SET height = 168, weight = 55 WHERE handle = 'luna.hrl'`
    );
    console.log('✅ Luna height/weight fixed');

    console.log('Updating Luna bio to 700 words...');
    const lunaBio = `Luna to doświadczona i utalentowana twórczyni treści adult, która od lat z powodzeniem realizuje się w branży premium content. Jej kariera rozpoczęła się od eksperymentalnych sesji zdjęciowych, które szybko zyskały uznanie ze względu na unikalny artystyczny styl i naturalną zmysłowość. Luna nieustannie rozwija swoje umiejętności, uczestnicząc w warsztatach fotografii i reżyserii, co pozwala jej tworzyć treści na najwyższym poziomie jakości.

Specjalizacja Luny obejmuje szeroki zakres tematów - od eleganckich sesji zdjęciowych w stylu glamour, przez artystyczne nudes, aż po interaktywne transmisje live. Jej podejście do pracy jest oparte na autentyczności i profesjonalizmie. Luna wierzy, że każda sesja powinna być wyjątkowym doświadczeniem zarówno dla niej, jak i dla widza. Dlatego kładzie ogromny nacisk na szczegóły - od oświetlenia i kompozycji, po atmosferę i emocje, które chce przekazać.

Jednym z kluczowych atutów Luny jest jej zdolność do tworzenia spersonalizowanych treści. Rozumie, że każdy fan ma unikalne preferencje i fantazje, dlatego zawsze stara się spełnić indywidualne prośby. Niezależnie od tego, czy jest to konkretny scenario, szczególny rodzaj interakcji, czy unikalna sytuacja - Luna podejmuje wyzwanie z entuzjazmem i kreatywnością. Jej custom videos są cenione za wysoką jakość produkcji i dbałość o detale.

W live shows Luna wyróżnia się naturalnością i charyzmą. Jej transmisje są nie tylko wizualnie atrakcyjne, ale także interaktywne i angażujące. Luna potrafi stworzyć atmosferę intymności i bliskości, nawet w formie online. Fani cenią jej za to, że jest prawdziwa i autentyczna - nie udaje żadnej postaci, po prostu jest sobą. To sprawia, że transmisje live z jej udziałem zawsze przyciągają dużą publiczność i generują wysoką zaangażowanie.

Luna jest również aktywna na wielu platformach, co pozwala jej dotrzeć do szerokiego grona odbiorców. Jej profile na OnlyFans, Fansly i Chaturbate są regularnie aktualizowane z nowymi treściami, a każdy kanał ma nieco inny charakter, dostosowany do specyfiki platformy. Dzięki temu Luna może zaoferować swoim fanom różnorodne doświadczenia i utrzymać ich zaangażowanie na wysokim poziomie.

W swojej pracy Luna kładzie ogromny nacisk na bezpieczeństwo i dyskrecję. Rozumie, że praca w branży adult wiąże się z pewnymi ryzykami, dlatego zawsze dba o ochronę swojej prywatności i prywatności swoich fanów. Jej podejście jest profesjonalne i odpowiedzialne, co sprawia, że jest szanowana zarówno przez fanów, jak i przez innych twórców w branży.

Luna nieustannie dąży do rozwoju i doskonalenia swoich umiejętności. Regularnie analizuje trendy w branży, eksperymentuje z nowymi technikami i stylami, i szuka inspiracji w różnych źródłach - od sztuki klasycznej, po nowoczesne media. To podejście pozwala jej utrzymać świeżość i innowacyjność w swoich treściach, co jest kluczowe w tak konkurencyjnej branży.

Dla Luny praca twórcy treści adult nie jest tylko sposobem na zarabianie pieniędzy - to jej pasja i forma ekspresji artystycznej. Czerpie satysfakcję z tworzenia piękna i podzielenia się nim z innymi. Jej celem jest nie tylko zadowolenie fanów, ale także tworzenie treści, które mają wartość artystyczną i emocjonalną. To podejście sprawia, że Luna wyróżnia się na tle innych twórców i zyskuje lojalną publiczność.`;
    
    await p.partner.update({
      where: { handle: 'luna.hrl' },
      data: { bio: lunaBio }
    });
    console.log('✅ Luna bio updated to 700 words');

    console.log('Updating Jane gallery to her images...');
    const janeProfileData = JSON.stringify({
      likes: ['Solo content', 'Fetish', 'Roleplay', 'Custom videos', 'Live shows', 'Artistic nudes', 'Lingerie', 'Pole dance', 'Yoga', 'Fitness'],
      boundaries: ['Brak hardcore', 'Tylko solo', 'Bez twarzy w publicznych treściach', 'Tylko softcore', 'Dyskrecja absolutna', 'Safe practices'],
      bestInMe: ['Naturalność', 'Zmysłowość', 'Kreatywność', 'Elastyczność', 'Profesjonalizm', 'Charyzma', 'Punktualność', 'Współpraca', 'Energia', 'Uśmiech'],
      whyWatchMe: ['Unikalna estetyka', 'Premium quality', 'Artystyczne treści', 'Profesjonalna produkcja', 'Ekskluzywne sesje', 'Live shows', 'Naturalność', 'Kreatywność', 'Energia', 'Uśmiech'],
      gallery: ['/image/Jane.jpg', '/image/jane1.jpg', '/image/jane2.jpg', '/image/jane4.jpg', '/image/jane5.jpg']
    });
    
    await p.partner.update({
      where: { handle: 'jane' },
      data: { profileData: janeProfileData }
    });
    console.log('✅ Jane gallery updated');

    console.log('Updating Anna & Mark gallery to their images...');
    const amProfileData = JSON.stringify({
      likes: ['Couples content', 'Live shows', 'Custom scenarios', 'Roleplay', 'Interactive sessions', 'Romantic scenes', 'Passionate content', 'Custom videos', 'Fan requests', 'Exclusive content'],
      boundaries: ['Brak hardcore', 'Tylko para', 'Bez innych osób', 'Tylko softcore', 'Dyskrecja absolutna', 'Safe practices', 'Respect boundaries'],
      bestInMe: ['Autentyczność', 'Prawdziwa chemia', 'Pasja', 'Profesjonalizm', 'Naturalność', 'Charyzma', 'Energia', 'Kreatywność', 'Współpraca', 'Romantyzm'],
      whyWatchMe: ['Prawdziwa para', 'Autentyczna chemia', 'Premium quality', 'Profesjonalna produkcja', 'Ekskluzywne sesje', 'Live shows', 'Naturalność', 'Pasja', 'Romantyzm', 'Unikalny styl'],
      gallery: ['/image/am.jpg', '/image/am1.jpg', '/image/am2.jpg', '/image/am3.jpg', '/image/am4.jpg']
    });
    
    await p.partner.update({
      where: { handle: 'anna-mark' },
      data: { profileData: amProfileData }
    });
    console.log('✅ Anna & Mark gallery updated');

    console.log('\n✨ All profiles fixed!');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
