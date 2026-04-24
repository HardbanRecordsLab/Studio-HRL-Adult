const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const result = await prisma.$queryRawUnsafe(`
    SELECT ordinal_position as pos, column_name as name, data_type as type, is_nullable as null
    FROM information_schema.columns
    WHERE table_name = 'AcademyDocument'
    ORDER BY ordinal_position;
  `);
  result.forEach(r => console.log(`${r.pos}: ${r.name} (${r.type}) - ${r.null}`));
}

main().finally(() => prisma.$disconnect());
