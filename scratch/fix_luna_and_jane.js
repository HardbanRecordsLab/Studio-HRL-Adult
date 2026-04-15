const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Removing test.hrl from database...');
    const testProfile = await p.partner.findFirst({
      where: { handle: 'test.hrl' }
    });
    if (testProfile) {
      await p.partner.delete({ where: { id: testProfile.id } });
      console.log('✅ Deleted test.hrl profile');
    }

    console.log('Updating Luna HRL to Luna...');
    const luna = await p.partner.update({
      where: { handle: 'luna.hrl' },
      data: {
        name: 'Luna',
        bio: 'Luna to premium twórczyni treści adult z Studio HRL. Specjalizacja: live cam, ekskluzywne subskrypcje, artystyczne treści. Top 3% OnlyFans.',
        avatar: '/image/Alexia.jpg',
        height: 168,
        weight: 55,
        measurements: '90C / 64 / 92',
        profileData: JSON.stringify({
          likes: ['Live cam', 'Ekskluzywne subskrypcje', 'Artystyczne treści', 'Interaktywne shows', 'Custom videos', 'Personalizowane treści'],
          boundaries: ['Brak hardcore', 'Tylko solo', 'Bez twarzy w publicznych treściach', 'Tylko softcore', 'Dyskrecja absolutna', 'Safe practices'],
          bestInMe: ['Naturalna elegancja', 'Profesjonalizm', 'Zmysłowość', 'Artystyczne podejście', 'High-end quality', 'Doświadczenie', 'Kreatywność', 'Elastyczność', 'Punktualność', 'Współpraca'],
          whyWatchMe: ['Unikalny styl', 'Premium quality', 'Artystyczne treści', 'Profesjonalna produkcja', 'Ekskluzywne sesje', 'Live shows', 'Elegancja i klasa', 'Unikalna estetyka', 'Luxury experience', 'High-end photography'],
          gallery: ['/image/Alexia.jpg', '/image/alexia2.jpg', '/image/alexia3.jpg', '/image/alexia4.jpg', '/image/alexia5.jpg']
        })
      }
    });
    console.log(`✅ Luna updated: name=${luna.name}, avatar=${luna.avatar}`);

    console.log('Fixing Jane height and weight...');
    const jane = await p.partner.update({
      where: { handle: 'jane' },
      data: {
        height: 168,
        weight: 54
      }
    });
    console.log(`✅ Jane updated: height=${jane.height}, weight=${jane.weight}`);

    console.log('\n✨ All fixes completed!');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
