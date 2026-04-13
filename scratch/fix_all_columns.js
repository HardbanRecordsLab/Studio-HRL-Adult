const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  const fixes = [
    // AcademyDocument - stary schemat używał fileType, fileUrl, fileSize (int)
    `ALTER TABLE "AcademyDocument" ADD COLUMN IF NOT EXISTS "type" TEXT DEFAULT 'PDF'`,
    `ALTER TABLE "AcademyDocument" ADD COLUMN IF NOT EXISTS "size" TEXT DEFAULT '0 KB'`,
    `ALTER TABLE "AcademyDocument" ADD COLUMN IF NOT EXISTS "description" TEXT DEFAULT ''`,
    // AcademyVideo - stary schemat używał videoUrl, duration int
    `ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "description" TEXT DEFAULT ''`,
    `ALTER TABLE "AcademyVideo" ADD COLUMN IF NOT EXISTS "duration" TEXT DEFAULT '00:00'`,
    // AcademyPodcast - stary schemat używał audioUrl, episodeNumber int
    `ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "description" TEXT DEFAULT ''`,
    `ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "duration" TEXT DEFAULT '00:00'`,
    `ALTER TABLE "AcademyPodcast" ADD COLUMN IF NOT EXISTS "episodeNumber" TEXT DEFAULT 'EP 01'`,
    // AcademyBlogArticle - upewniamy się że slug/tag/readTime istnieją
    `ALTER TABLE "AcademyBlogArticle" ADD COLUMN IF NOT EXISTS "slug" TEXT DEFAULT ''`,
    `ALTER TABLE "AcademyBlogArticle" ADD COLUMN IF NOT EXISTS "tag" TEXT DEFAULT 'MISC'`,
    `ALTER TABLE "AcademyBlogArticle" ADD COLUMN IF NOT EXISTS "readTime" TEXT DEFAULT '5 min'`,
    `ALTER TABLE "AcademyBlogArticle" ADD COLUMN IF NOT EXISTS "excerpt" TEXT DEFAULT ''`,
    `ALTER TABLE "AcademyBlogArticle" ADD COLUMN IF NOT EXISTS "category" TEXT DEFAULT 'Ogólne'`,
  ];

  for (const sql of fixes) {
    try {
      await p.$executeRawUnsafe(sql);
      console.log('OK:', sql.substring(0, 60));
    } catch (e) {
      console.error('FAIL:', sql.substring(0, 60), '->', e.message);
    }
  }

  await p.$disconnect();
  console.log('DONE');
}

run();
