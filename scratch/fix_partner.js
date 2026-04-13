const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  const fixes = [
    // Partner table
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "name" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "handle" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "bio" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "avatar" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "description" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "heroImage" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "type" TEXT DEFAULT 'solo'`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "yearsTogether" INTEGER`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "profileStats" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "liveSchedule" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "subscriptionPlans" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "testimonials" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "contentSchedule" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "aboutImage1" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "aboutImage2" TEXT`,
  ];

  for (const sql of fixes) {
    try {
      await p.$executeRawUnsafe(sql);
      console.log('OK:', sql.substring(0, 70));
    } catch (e) {
      console.error('SKIP:', e.message.substring(0, 80));
    }
  }
  await p.$disconnect();
  console.log('DONE');
}
run();
