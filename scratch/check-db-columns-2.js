const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tables = ['AcademyVideo', 'AcademyPodcast'];
  for (const table of tables) {
    try {
      const columns = await prisma.$queryRawUnsafe(`
        SELECT column_name, data_type, is_nullable, ordinal_position
        FROM information_schema.columns
        WHERE table_name = '${table}'
        ORDER BY ordinal_position;
      `);
      console.log(`\nTable: ${table}`);
      columns.forEach(c => {
        console.log(`${c.ordinal_position}: ${c.column_name} (${c.data_type}) - Nullable: ${c.is_nullable}`);
      });
    } catch (e) {}
  }
}

main().finally(() => prisma.$disconnect());
