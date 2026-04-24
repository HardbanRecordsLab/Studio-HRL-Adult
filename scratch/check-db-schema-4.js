const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log(`\n--- AcademyVideo ---`);
    const columns = await prisma.$queryRawUnsafe(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'AcademyVideo'
      ORDER BY ordinal_position;
    `);
    console.table(columns);
  } catch (e) {}
}

main().finally(() => prisma.$disconnect());
