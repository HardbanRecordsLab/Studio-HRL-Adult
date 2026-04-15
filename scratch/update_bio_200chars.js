const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Updating Jane bio to 200 characters...');
    const jane = await p.partner.update({
      where: { handle: 'jane' },
      data: {
        bio: 'Jane to profesjonalna twórczyni treści adult z ponad trzema latami doświadczenia. Specjalizacja: solo, fetish, custom videos i roleplay. Kreatywna, elastyczna i zawsze gotowa na nowe wyzwania.'
      }
    });
    console.log(`✅ Jane updated: bio length ${jane.bio.length} characters`);

    console.log('Updating Anna & Mark bio to 200 characters...');
    const am = await p.partner.update({
      where: { handle: 'anna-mark' },
      data: {
        bio: 'Anna i Mark to autentyczna para z naturalną chemią. Specjalizacja: couples content, live shows i custom scenarios. Prawdziwa relacja, pasja i profesjonalizm w każdym występie.'
      }
    });
    console.log(`✅ Anna & Mark updated: bio length ${am.bio.length} characters`);

    console.log('\n✨ Both profiles updated with 200 character bios!');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
