const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  await p.partner.update({
    where: { id: 'luna-hrl' }, // updating the same record we've been using so the URL still works
    data: { 
        name: 'Alexia',
        bio: 'Profesjonalna modelka i aktorka specjalizująca się w produkcjach adult klasy premium. Ekskluzywne współprace, dyskrecja i autentyczna pasja przed obiektywem.',
        handle: 'alexia' // let's keep the handle luna.hrl so the URL http://localhost:3001/profile/luna.hrl still works? Wait, user asked to rename model to Alexia. 
    }
  });
  await p.$disconnect();
  console.log('Model renamed to Alexia in DB.');
}

run();
