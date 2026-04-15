const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Creating Alexia profile...');
    
    const alexiaBio = 'Alexia to premium glamour creator z Studio HRL. Specjalizacja: artystyczne nudes, lingerie, live. Top 5% OnlyFans i Fansly.';
    
    const alexiaDescription = `Alexia to utalentowana i elegancka twórczyni treści adult, która specjalizuje się w high-end glamour i artystycznych nudes. Jej kariera w branży rozpoczęła się od ekskluzywnych sesji zdjęciowych dla prestiżowych magazynów, które szybko zyskały uznanie ze względu na unikalny artystyczny styl i naturalną zmysłowość. Alexia nieustannie podnosi swoje umiejętności, uczestnicząc w warsztatach fotografii high-end i reżyserii, co pozwala jej tworzyć treści na najwyższym poziomie jakości.

Specjalizacja Alexii obejmuje szeroki zakres tematów - od eleganckich sesji zdjęciowych w stylu glamour, przez artystyczne nudes, aż po interaktywne transmisje live. Jej podejście do pracy jest oparte na autentyczności i profesjonalizmie. Alexia wierzy, że każda sesja powinna być wyjątkowym doświadczeniem zarówno dla niej, jak i dla widza. Dlatego kładzie ogromny nacisk na szczegóły - od oświetlenia i kompozycji, po atmosferę i emocje, które chce przekazać.

Jednym z kluczowych atutów Alexii jest jej zdolność do tworzenia spersonalizowanych treści. Rozumie, że każdy fan ma unikalne preferencje i fantazje, dlatego zawsze stara się spełnić indywidualne prośby. Niezależnie od tego, czy jest to konkretny scenario, szczególny rodzaj interakcji, czy unikalna sytuacja - Alexia podejmuje wyzwanie z entuzjazmem i kreatywnością. Jej custom videos są cenione za wysoką jakość produkcji i dbałość o detale.

W live shows Alexia wyróżnia się naturalnością i charyzmą. Jej transmisje są nie tylko wizualnie atrakcyjne, ale także interaktywne i angażujące. Alexia potrafi stworzyć atmosferę intymności i bliskości, nawet w formie online. Fani cenią ją za to, że jest prawdziwa i autentyczna - nie udaje żadnej postaci, po prostu jest sobą. To sprawia, że transmisje live z jej udziałem zawsze przyciągają dużą publiczność i generują wysoką zaangażowanie.

Alexia jest również aktywna na wielu platformach, co pozwala jej dotrzeć do szerokiego grona odbiorców. Jej profile na OnlyFans i Fansly są regularnie aktualizowane z nowymi treściami, a każdy kanał ma nieco inny charakter, dostosowany do specyfiki platformy. Dzięki temu Alexia może zaoferować swoim fanom różnorodne doświadczenia i utrzymać ich zaangażowanie na wysokim poziomie.

W swojej pracy Alexia kładzie ogromny nacisk na bezpieczeństwo i dyskrecję. Rozumie, że praca w branży adult wiąże się z pewnymi ryzykami, dlatego zawsze dba o ochronę swojej prywatności i prywatności swoich fanów. Jej podejście jest profesjonalne i odpowiedzialne, co sprawia, że jest szanowana zarówno przez fanów, jak i przez innych twórców w branży.

Alexia nieustannie dąży do rozwoju i doskonalenia swoich umiejętności. Regularnie analizuje trendy w branży, eksperymentuje z nowymi technikami i stylami, i szuka inspiracji w różnych źródłach - od sztuki klasycznej, po nowoczesne media. To podejście pozwala jej utrzymać świeżość i innowacyjność w swoich treściach, co jest kluczowe w tak konkurencyjnej branży.

Dla Alexii praca twórcy treści adult nie jest tylko sposobem na zarabianie pieniędzy - to jej pasja i forma ekspresji artystycznej. Czerpie satysfakcję z tworzenia piękna i podzielenia się nim z innymi. Jej celem jest nie tylko zadowolenie fanów, ale także tworzenie treści, które mają wartość artystyczną i emocjonalną. To podejście sprawia, że Alexia wyróżnia się na tle innych twórców i zyskuje lojalną publiczność.`;

    const alexiaProfileData = JSON.stringify({
      likes: ['Artistic nudes', 'Glamour', 'Lingerie', 'Live shows', 'Custom videos', 'High-end photography', 'Elegant sessions', 'Luxury content', 'Artistic poses', 'Premium quality'],
      boundaries: ['Brak hardcore', 'Tylko solo', 'Bez twarzy w publicznych treściach', 'Tylko softcore', 'Dyskrecja absolutna', 'Safe practices', 'Elegancja i klasa'],
      bestInMe: ['Elegancja', 'Zmysłowość', 'Profesjonalizm', 'Artystyczne podejście', 'High-end quality', 'Kreatywność', 'Naturalność', 'Charyzma', 'Punktualność', 'Współpraca'],
      whyWatchMe: ['Unikalna estetyka', 'Premium quality', 'Artystyczne treści', 'Profesjonalna produkcja', 'Ekskluzywne sesje', 'Live shows', 'Elegancja i klasa', 'Luxury experience', 'High-end photography', 'Unikalny styl'],
      gallery: ['/image/Alexia.jpg', '/image/alexia2.jpg', '/image/alexia3.jpg', '/image/alexia4.jpg', '/image/alexia5.jpg']
    });

    const alexia = await p.partner.create({
      data: {
        id: 'alexia-hrl',
        name: 'Alexia',
        handle: 'alexia',
        email: 'alexia@hrlstudio.online',
        status: 'active',
        type: 'solo',
        bio: alexiaBio,
        description: alexiaDescription,
        avatar: '/image/Alexia.jpg',
        height: 174,
        weight: 58,
        measurements: '92C / 62 / 92',
        profileData: alexiaProfileData
      }
    });
    
    console.log('✅ Alexia profile created successfully!');
    console.log(`Name: ${alexia.name}`);
    console.log(`Handle: ${alexia.handle}`);
    console.log(`Avatar: ${alexia.avatar}`);
    console.log(`Bio length: ${alexia.bio.length} characters`);
    console.log(`Description length: ${alexia.description.length} characters`);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
