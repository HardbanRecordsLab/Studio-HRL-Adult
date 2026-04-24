const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.castingApplication.count();
  const all = await prisma.castingApplication.findMany();
  console.log('Total applications:', count);
  console.log('Applications details:', JSON.stringify(all, null, 2));
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
