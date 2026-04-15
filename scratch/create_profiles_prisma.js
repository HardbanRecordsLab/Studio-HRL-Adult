const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Creating Jane profile...');
    const jane = await p.partner.create({
      data: {
        name: 'Jane',
        handle: 'jane',
        email: 'jane@hrlstudio.online',
        status: 'active',
        type: 'solo',
        bio: 'Professional Content Creator. Studio HRL Adult. Specialization: Solo, Fetish, Custom Videos. Top 10% OnlyFans.',
        description: 'Profesjonalna twórczyni treści adult z doświadczeniem w solo i fetish content. Kreatywna, elastyczna i zawsze gotowa na nowe wyzwania.',
        avatar: '/image/Jane.jpg',
        height: 168,
        weight: 54,
        measurements: '85C / 62 / 88',
        profileData: JSON.stringify({
          likes: ['Solo content', 'Fetish videos', 'Custom requests', 'Roleplay', 'Teasing', 'Interactive shows'],
          boundaries: ['Brak hardcore', 'Tylko solo', 'Bez twarzy w publicznych treściach', 'Brak BDSM ekstremalnego', 'Tylko soft fetish', 'Dyskrecja'],
          bestInMe: ['Kreatywność', 'Elastyczność', 'Profesjonalizm', 'Doświadczenie', 'Charisma', 'Energy', 'Punktualność', 'Współpraca', 'Open-minded', 'Quality focus'],
          whyWatchMe: ['Unikalny styl', 'High-quality content', 'Interactive shows', 'Custom-friendly', 'Professional approach', 'Creative scenarios', 'Authentic energy', 'Fetish expertise', 'Solo specialist', 'Engaging personality'],
          gallery: ['/image/Jane.jpg', '/image/jane1.jpg', '/image/jane2.jpg', '/image/jane4.jpg', '/image/jane5.jpg']
        })
      }
    });
    console.log(`✅ Jane created: ID ${jane.id}, handle: ${jane.handle}`);

    console.log('Creating Anna & Mark profile...');
    const am = await p.partner.create({
      data: {
        name: 'Anna & Mark',
        handle: 'anna-mark',
        email: 'anna-mark@hrlstudio.online',
        status: 'active',
        type: 'couple',
        bio: 'Power Couple. Studio HRL Adult. Specialization: Couple content, Live shows, Custom scenarios. Top 5% Couple category.',
        description: 'Autentyczna para z naturalną chemią. Specjalizujemy się w couples content, live shows i custom scenarios. Profesjonalizm, pasja i zabawa.',
        avatar: '/image/am.jpg',
        measurements: 'Anna: 170cm / 88C / 64 / 90, Mark: 182cm / Athletic',
        profileData: JSON.stringify({
          likes: ['Couples content', 'Live shows', 'Custom scenarios', 'Roleplay', 'Interactive sessions', 'Chemistry-focused content'],
          boundaries: ['Brak hardcore ekstremalnego', 'Tylko para', 'Bez innych osób', 'Safe practices', 'Consensual only', 'Dyskrecja absolutna'],
          bestInMe: ['Naturalna chemia', 'Autentyczność', 'Profesjonalizm', 'Doświadczenie', 'Charisma', 'Energy', 'Współpraca', 'Open-minded', 'Quality focus', 'Fun & passion'],
          whyWatchMe: ['Real chemistry', 'Authentic couple', 'Professional production', 'Interactive shows', 'Custom scenarios', 'Genuine passion', 'High-quality content', 'Couple specialist', 'Engaging energy', 'Real experience'],
          gallery: ['/image/am.jpg', '/image/am1.jpg', '/image/am2.jpg', '/image/am3.jpg', '/image/am4.jpg']
        })
      }
    });
    console.log(`✅ Anna & Mark created: ID ${am.id}, handle: ${am.handle}`);

    console.log('\n✨ Both profiles created successfully!');
  } catch (error) {
    console.error('Error:', error.message);
    if (error.code === 'P2002') {
      console.error('Profile with this handle or email already exists.');
    }
  } finally {
    await p.$disconnect();
  }
}

main();
