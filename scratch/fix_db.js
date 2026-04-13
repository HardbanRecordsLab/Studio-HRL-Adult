const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('--- DB FIX ---');
    
    // Add missing columns if they don't exist
    // Using raw SQL on pooled connection might have issues but let's try
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyBlogArticle" ADD COLUMN IF NOT EXISTS "thumbnail" TEXT`);
    console.log('Ensured AcademyBlogArticle.thumbnail exists.');
    
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "localPath" TEXT`);
    console.log('Ensured AcademyVideo.localPath exists.');

    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "cloudinaryId" TEXT`);
    console.log('Ensured AcademyVideo.cloudinaryId exists.');

  } catch (e) {
    console.error('Fix Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
