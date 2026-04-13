const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  console.log('--- REFINING LUNA FOR THE LAST TIME ---');

  try {
    // Columns from discovery: height, weight, measurements, bio, name
    await p.$executeRawUnsafe(`
      UPDATE "Partner" 
      SET 
        height = 168,
        weight = 55,
        measurements = '85C / 62 / 88',
        bio = 'Elegancka, pewna siebie kobieta. Modelka do filmów, sex cams i escort. Dostępna na platformie Studio HRL Adult.',
        name = 'Elegancka Modelka (Luna HRL)',
        "profileStats" = $1
      WHERE id = 'luna-hrl' OR handle = 'luna.hrl';
    `, JSON.stringify({ subscribers: '3.6K', content: '240+', satisfaction: '98%' }));
    
    console.log('Luna refined with exact dimensions and bio.');

  } catch (e) {
    console.error('Refinement Error:', e.message);
  } finally {
    await p.$disconnect();
    console.log('--- DONE ---');
  }
}

run();
