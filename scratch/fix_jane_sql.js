const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Fixing Jane height and weight with raw SQL...');
    await p.$executeRawUnsafe(
      `UPDATE "Partner" SET height = 168, weight = 54 WHERE handle = 'jane'`
    );
    console.log('✅ Jane updated with raw SQL');
    
    const jane = await p.partner.findFirst({
      where: { handle: 'jane' },
      select: { id: true, name: true, handle: true, height: true, weight: true }
    });
    console.log('Jane data:', JSON.stringify(jane, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
