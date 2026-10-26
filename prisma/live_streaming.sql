-- CreateTable
CREATE TABLE "LiveChannel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "partnerId" TEXT NOT NULL,
    "ingestKey" TEXT NOT NULL,

    CONSTRAINT "LiveChannel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveDestination" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "partnerId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "rtmpUrl" TEXT NOT NULL,
    "streamKeyEnc" TEXT NOT NULL,
    "keyHint" TEXT,
    "profileUrl" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "LiveDestination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LiveSession" (
    "id" TEXT NOT NULL,
    "partnerId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'live',
    "title" TEXT,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "startedBy" TEXT,
    "destinationIds" JSONB,

    CONSTRAINT "LiveSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LiveChannel_partnerId_key" ON "LiveChannel"("partnerId");

-- CreateIndex
CREATE UNIQUE INDEX "LiveChannel_ingestKey_key" ON "LiveChannel"("ingestKey");

-- CreateIndex
CREATE INDEX "LiveDestination_partnerId_idx" ON "LiveDestination"("partnerId");

-- CreateIndex
CREATE INDEX "LiveSession_partnerId_status_idx" ON "LiveSession"("partnerId", "status");

-- AddForeignKey
ALTER TABLE "LiveChannel" ADD CONSTRAINT "LiveChannel_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveDestination" ADD CONSTRAINT "LiveDestination_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LiveSession" ADD CONSTRAINT "LiveSession_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

