const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Checking Jane data...');
    const jane = await p.partner.findFirst({
      where: { handle: 'jane' }
    });
    console.log(JSON.stringify(jane, null, 2));
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
