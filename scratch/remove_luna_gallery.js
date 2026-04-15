const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Removing Luna gallery (Alexia images)...');
    const luna = await p.partner.findFirst({
      where: { handle: 'luna.hrl' }
    });
    
    if (luna && luna.profileData) {
      const parsed = JSON.parse(luna.profileData);
      parsed.gallery = []; // Empty gallery
      
      await p.partner.update({
        where: { handle: 'luna.hrl' },
        data: { profileData: JSON.stringify(parsed) }
      });
      console.log('✅ Luna gallery removed (now empty)');
    } else {
      console.log('Luna has no profileData');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
