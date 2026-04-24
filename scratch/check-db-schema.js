const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Sprawdzanie rzeczywistej struktury tabel w bazie...');
  
  const tables = ['AcademyVideo', 'AcademyPodcast', 'AcademyDocument', 'AcademyBlogArticle'];
  
  for (const table of tables) {
    try {
      console.log(`\nStruktura tabeli: ${table}`);
      const columns = await prisma.$queryRawUnsafe(`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns
        WHERE table_name = '${table}'
        ORDER BY ordinal_position;
      `);
      console.table(columns);
    } catch (e) {
      console.log(`Nie udało się pobrać struktury dla ${table}: ${e.message}`);
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
