const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tables = ['AcademyVideo', 'AcademyPodcast'];
  for (const table of tables) {
    try {
      console.log(`\n--- ${table} ---`);
      const columns = await prisma.$queryRawUnsafe(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = '${table}'
        ORDER BY ordinal_position;
      `);
      console.table(columns);
    } catch (e) {}
  }
}

main().finally(() => prisma.$disconnect());
