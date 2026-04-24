const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- DODAWANIE BRAKUJĄCYCH DOKUMENTÓW (PRÓBA OSTATECZNA) ---');

  // 4. PDF GUIDES
  try {
    process.stdout.write('Dodawanie PDF Guides... ');
    await prisma.$executeRawUnsafe(`
      INSERT INTO "AcademyDocument" 
      ("id", "createdAt", "updatedAt", "title", "description", "fileUrl", "fileType", "fileSize", "category", "tags", "isPublished", "downloads", "isActive", "order", "icon", "cloudinaryId", "url", "type", "size")
      VALUES (
        'doc_01', NOW(), NOW(), 'PDF Guides: Tax', 
        'Kompendium wiedzy o rozliczaniu dochodów.', 
        'https://res.cloudinary.com/hrl-studio/image/upload/v1/docs/tax_guide_2025.pdf',
        'PDF', 2, 'Biznesowy', 'Podatki, Prawo', true, 0, true, 1, '📄',
        'docs/tax', 'https://res.cloudinary.com/hrl-studio/image/upload/v1/docs/tax_guide_2025.pdf',
        'PDF', '2.3 MB'
      ) ON CONFLICT ("id") DO UPDATE SET "title" = EXCLUDED."title";
    `);
    console.log('✅');
  } catch (e) { console.log('❌', e.message); }

  console.log('--- KONIEC ---');
}

main().finally(() => prisma.$disconnect());
