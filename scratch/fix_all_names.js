const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  await p.$executeRawUnsafe(`UPDATE "Partner" SET name = 'Alexia';`);
  await p.$disconnect();
  console.log('Forcibly updated all remaining names to Alexia.');
}

run();
