const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  await p.partner.update({
    where: { id: 'luna-hrl' },
    data: { 
        name: 'Alexia',
        height: 174,
        weight: 58,
        measurements: '92C / 62 / 92'
    }
  });
  await p.$disconnect();
  console.log('Alexia dimensions updated.');
}

run();
