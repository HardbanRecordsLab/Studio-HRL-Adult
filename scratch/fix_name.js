const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  await p.partner.update({
    where: { id: 'luna-hrl' },
    data: { 
        name: 'Alexia',
        handle: 'alexia.hrl' // We will also change the handle so the URL should be /profile/alexia.hrl
    }
  });
  await p.$disconnect();
  console.log('Model permanently renamed to Alexia in DB via Prisma.');
}

run();
