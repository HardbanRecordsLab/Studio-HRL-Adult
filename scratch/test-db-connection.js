const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Połączenie z bazą OK:', result);
  } catch (e) {
    console.error('Błąd połączenia:', e.message);
  }
}

main().finally(() => prisma.$disconnect());
