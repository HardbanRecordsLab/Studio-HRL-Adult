const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  try {
    await p.$executeRawUnsafe(`ALTER TABLE "Partner" ADD COLUMN "profileData" JSONB;`);
    console.log('Added profileData to Partner table.');
  } catch(e) {
    if (e.message.includes('already exists')) {
        console.log('profileData already exists');
    } else {
        console.error(e);
    }
  } finally {
    await p.$disconnect();
  }
}

run();
