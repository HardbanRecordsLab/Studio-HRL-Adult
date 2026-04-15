const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Fixing Alexia height and weight with raw SQL...');
    await p.$executeRawUnsafe(
      `UPDATE "Partner" SET height = 174, weight = 58 WHERE handle = 'alexia'`
    );
    console.log('✅ Alexia height/weight fixed');
    
    const alexia = await p.partner.findFirst({
      where: { handle: 'alexia' },
      select: { id: true, name: true, handle: true, height: true, weight: true, measurements: true }
    });
    console.log('Alexia data:', JSON.stringify(alexia, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
