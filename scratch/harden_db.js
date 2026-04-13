const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  const fixes = [
    // Ensure FinancialRecord table and columns
    `CREATE TABLE IF NOT EXISTS "FinancialRecord" (
        "id" TEXT PRIMARY KEY,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "partnerId" TEXT NOT NULL,
        "amount" DOUBLE PRECISION NOT NULL,
        "type" TEXT NOT NULL,
        "status" TEXT NOT NULL DEFAULT 'processed',
        "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "FinancialRecord_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE
    )`,
    
    // Partner missing columns from previous failure
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "revenueTotal" DOUBLE PRECISION DEFAULT 0`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "followers" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "rating" TEXT`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "sessions" INTEGER DEFAULT 0`,
    `ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "lastSync" TIMESTAMP(3)`,

    // CastingApplication table
    `CREATE TABLE IF NOT EXISTS "CastingApplication" (
        "id" TEXT PRIMARY KEY,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        "firstName" TEXT NOT NULL,
        "lastName" TEXT NOT NULL,
        "email" TEXT NOT NULL,
        "phone" TEXT NOT NULL,
        "birthDate" TIMESTAMP(3) NOT NULL,
        "height" INTEGER,
        "weight" INTEGER,
        "hairColor" TEXT,
        "eyeColor" TEXT,
        "breastSize" TEXT,
        "experience" TEXT NOT NULL DEFAULT 'no',
        "experienceDesc" TEXT,
        "platforms" TEXT,
        "contentTypes" TEXT,
        "limits" TEXT,
        "sessionsPerWeek" TEXT,
        "workingTimes" TEXT,
        "motivation" TEXT NOT NULL,
        "bodyModifications" TEXT,
        "skills" TEXT,
        "consentAge" BOOLEAN NOT NULL,
        "consentTerms" BOOLEAN NOT NULL,
        "consentData" BOOLEAN NOT NULL,
        "consentMarketing" BOOLEAN NOT NULL,
        "photo1" TEXT,
        "photo2" TEXT,
        "photo3" TEXT,
        "video" TEXT,
        "status" TEXT NOT NULL DEFAULT 'pending'
    )`,

    // Index on FinancialRecord
    `CREATE INDEX IF NOT EXISTS "FinancialRecord_partnerId_idx" ON "FinancialRecord"("partnerId")`
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
