const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Fixing Jane height and weight...');
    const jane = await p.partner.update({
      where: { handle: 'jane' },
      data: {
        height: 168,
        weight: 54
      }
    });
    console.log(`✅ Jane updated: height=${jane.height}, weight=${jane.weight}`);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
