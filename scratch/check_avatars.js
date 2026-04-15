const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Checking avatars in database...');
    const partners = await p.partner.findMany({
      select: { id: true, name: true, handle: true, avatar: true }
    });
    
    partners.forEach(p => {
      console.log(`${p.name} (${p.handle}): avatar = ${p.avatar}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
