const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  await p.partner.update({
    where: { id: 'luna-hrl' },
    data: { 
        bio: 'Elegancka, pewna siebie kobieta. Modelka do filmów, sex cams i twórczyni contentu premium w Studio HRL Adult.',
        name: 'Elegancka Modelka HRL'
    }
  });
  await p.$disconnect();
  console.log('Cleanup DONE.');
}

run();
