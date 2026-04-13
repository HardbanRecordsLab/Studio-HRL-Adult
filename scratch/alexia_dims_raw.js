const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  try {
    await p.$executeRawUnsafe(`
      UPDATE "Partner" 
      SET 
        height = 174,
        weight = 58,
        measurements = '92C / 62 / 92',
        name = 'Alexia'
      WHERE id = 'luna-hrl' OR handle = 'luna.hrl';
    `);
    console.log('Alexia dimensions and name forcibly updated via Raw SQL.');
  } catch(e) {
    console.error(e);
  } finally {
    await p.$disconnect();
  }
}

run();
