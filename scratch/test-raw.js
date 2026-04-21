const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const handleStr = 'barbie.hrl';
  const partner = await prisma.partner.findUnique({ where: { handle: handleStr } });
  console.log("Raw partner:", JSON.stringify(partner, null, 2));
}

test().finally(() => prisma.$disconnect());
