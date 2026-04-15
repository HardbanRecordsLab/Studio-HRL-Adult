const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function main() {
  try {
    console.log('Checking Luna gallery...');
    const luna = await p.partner.findFirst({
      where: { handle: 'luna.hrl' },
      select: { id: true, name: true, handle: true, profileData: true }
    });
    
    if (luna && luna.profileData) {
      const parsed = JSON.parse(luna.profileData);
      console.log('Luna gallery:', JSON.stringify(parsed.gallery, null, 2));
    } else {
      console.log('Luna has no profileData or gallery');
    }
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await p.$disconnect();
  }
}

main();
