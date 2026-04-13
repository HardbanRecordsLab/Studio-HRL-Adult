const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('--- DB HARMONIZATION ---');
    
    // AcademyPodcast
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "url" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "cloudinaryId" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "format" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "bytes" INTEGER`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0`);
    console.log('AcademyPodcast harmonized.');

    // AcademyVideo
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "url" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "level" TEXT DEFAULT 'Początkujący'`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "format" TEXT`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "bytes" INTEGER`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0`);
    console.log('AcademyVideo harmonized.');

    // AcademyDocument
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyDocument" ADD COLUMN IF NOT EXISTS "isActive" BOOLEAN DEFAULT true`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyDocument" ADD COLUMN IF NOT EXISTS "order" INTEGER DEFAULT 0`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "AcademyDocument" ADD COLUMN IF NOT EXISTS "icon" TEXT DEFAULT '📄'`);
    console.log('AcademyDocument harmonized.');

  } catch (e) {
    console.error('Harmonization Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
