const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Checking all partners in database...');
    const partners = await p.partner.findMany({
      select: { id: true, name: true, handle: true, status: true, avatar: true }
    });
    
    console.log(`Found ${partners.length} partners in database:`);
    partners.forEach(p => {
      console.log(`- ${p.name} (${p.handle}): status=${p.status}, avatar=${p.avatar}`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
