const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('--- COMPREHENSIVE DB HARMONIZATION ---');
    
    // AcademyBlogArticle
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyBlogArticle" ADD COLUMN IF NOT EXISTS "thumbnail" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyBlogArticle" ADD COLUMN IF NOT EXISTS "publishedAt" TIMESTAMP(3)`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyBlogArticle" ADD COLUMN IF NOT EXISTS "isPublished" BOOLEAN DEFAULT false`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyBlogArticle" ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0`);
    console.log('AcademyBlogArticle harmonized.');

    // AcademyVideo
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "url" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "cloudinaryId" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "localPath" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "thumbnail" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "format" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "bytes" INTEGER`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "width" INTEGER`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "height" INTEGER`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0`);
    console.log('AcademyVideo harmonized.');

    // AcademyPodcast
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "url" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "cloudinaryId" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "format" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "bytes" INTEGER`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0`);
    console.log('AcademyPodcast harmonized.');

    // AcademyDocument
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyDocument" ADD COLUMN IF NOT EXISTS "cloudinaryId" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyDocument" ADD COLUMN IF NOT EXISTS "url" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyDocument" ADD COLUMN IF NOT EXISTS "icon" TEXT DEFAULT '📄'`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyDocument" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyDocument" ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0`);
    console.log('AcademyDocument harmonized.');

  } catch (e) {
    console.error('Harmonization Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
