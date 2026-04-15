const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Deleting Luna profile from database...');
    const luna = await p.partner.delete({
      where: { handle: 'luna.hrl' }
    });
    console.log(`✅ Luna profile deleted: ${luna.name} (${luna.handle})`);
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
