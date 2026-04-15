const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Removing duplicate test.hrl profiles...');
    // Find all test.hrl profiles
    const duplicates = await p.partner.findMany({
      where: { handle: 'test.hrl' }
    });
    
    console.log(`Found ${duplicates.length} test.hrl profiles`);
    
    if (duplicates.length > 1) {
      // Keep first one, delete others
      const toDelete = duplicates.slice(1);
      for (const dup of toDelete) {
        await p.partner.delete({ where: { id: dup.id } });
        console.log(`Deleted duplicate: ${dup.id}`);
      }
    }
    
    // Update Luna HRL avatar
    console.log('Updating Luna HRL avatar...');
    const luna = await p.partner.update({
      where: { handle: 'luna.hrl' },
      data: { avatar: '/image/Alexia.jpg' } // Luna should use Alexia image as placeholder
    });
    console.log(`✅ Luna HRL updated: avatar = ${luna.avatar}`);
    
    console.log('\n✨ Fixed duplicates and avatars!');
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
