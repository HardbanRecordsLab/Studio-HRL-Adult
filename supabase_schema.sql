-- Studio HRL Adult - Supabase Database Schema
-- Generated from Prisma schema for PostgreSQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create function for cuid() generation (PostgreSQL equivalent)
CREATE OR REPLACE FUNCTION cuid()
RETURNS TEXT AS $$
BEGIN
    RETURN 'cuid_' || substr(md5(random()::text), 1, 20);
END;
$$ LANGUAGE plpgsql;

-- Casting Applications Table
CREATE TABLE IF NOT EXISTS "CastingApplication" (
    "id" TEXT NOT NULL DEFAULT (cuid()),
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
    "platforms" TEXT, -- JSON string
    "contentTypes" TEXT, -- JSON string
    "limits" TEXT,
    "sessionsPerWeek" TEXT,
    "workingTimes" TEXT, -- JSON string
    "motivation" TEXT NOT NULL,
    "bodyModifications" TEXT,
    "skills" TEXT,
    "consentAge" BOOLEAN NOT NULL,
    "consentTerms" BOOLEAN NOT NULL,
    "consentData" BOOLEAN NOT NULL,
    "consentMarketing" BOOLEAN NOT NULL,
    "photo1" TEXT, -- URL to file
    "photo2" TEXT, -- URL to file
    "photo3" TEXT, -- URL to file
    "video" TEXT, -- URL to file
    "status" TEXT NOT NULL DEFAULT 'pending',
    
    CONSTRAINT "CastingApplication_pkey" PRIMARY KEY ("id")
);

-- Partners Table
CREATE TABLE IF NOT EXISTS "Partner" (
    "id" TEXT NOT NULL DEFAULT (cuid()),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "nationality" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "measurements" TEXT, -- JSON string: {bust, waist, hips}
    "hairColor" TEXT NOT NULL,
    "eyeColor" TEXT NOT NULL,
    "tattoos" BOOLEAN NOT NULL DEFAULT false,
    "piercings" BOOLEAN NOT NULL DEFAULT false,
    "experience" TEXT NOT NULL,
    "categories" TEXT, -- JSON string array
    "availability" TEXT, -- JSON string
    "equipment" TEXT, -- JSON string array
    "languages" TEXT, -- JSON string array
    "platforms" TEXT, -- JSON string
    "earnings" TEXT, -- JSON string
    "status" TEXT NOT NULL DEFAULT 'pending',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    
    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- Financial Records Table
CREATE TABLE IF NOT EXISTS "FinancialRecord" (
    "id" TEXT NOT NULL DEFAULT (cuid()),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "partnerId" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "revenueType" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "period" TEXT NOT NULL, -- "2024-01"
    "platformFee" DOUBLE PRECISION NOT NULL,
    "studioFee" DOUBLE PRECISION NOT NULL,
    "partnerEarnings" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    
    CONSTRAINT "FinancialRecord_pkey" PRIMARY KEY ("id")
);

-- Partner Documents Table
CREATE TABLE IF NOT EXISTS "PartnerDocument" (
    "id" TEXT NOT NULL DEFAULT (cuid()),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "partnerId" TEXT NOT NULL,
    "documentType" TEXT NOT NULL, -- 'id_card', 'passport', 'consent_form', etc.
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "isBlurred" BOOLEAN NOT NULL DEFAULT true,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "verificationDate" TIMESTAMP(3),
    "verifiedBy" TEXT,
    "notes" TEXT,
    
    CONSTRAINT "PartnerDocument_pkey" PRIMARY KEY ("id")
);

-- Academy Videos Table
CREATE TABLE IF NOT EXISTS "AcademyVideo" (
    "id" TEXT NOT NULL DEFAULT (cuid()),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT, -- JSON string array
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "level" TEXT, -- 'beginner', 'intermediate', 'advanced'
    "views" INTEGER NOT NULL DEFAULT 0,
    
    CONSTRAINT "AcademyVideo_pkey" PRIMARY KEY ("id")
);

-- Academy Podcasts Table
CREATE TABLE IF NOT EXISTS "AcademyPodcast" (
    "id" TEXT NOT NULL DEFAULT (cuid()),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "audioUrl" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT, -- JSON string array
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "episodeNumber" INTEGER,
    "plays" INTEGER NOT NULL DEFAULT 0,
    
    CONSTRAINT "AcademyPodcast_pkey" PRIMARY KEY ("id")
);

-- Academy Documents Table
CREATE TABLE IF NOT EXISTS "AcademyDocument" (
    "id" TEXT NOT NULL DEFAULT (cuid()),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT, -- JSON string array
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "downloads" INTEGER NOT NULL DEFAULT 0,
    
    CONSTRAINT "AcademyDocument_pkey" PRIMARY KEY ("id")
);

-- Academy Blog Articles Table
CREATE TABLE IF NOT EXISTS "AcademyBlogArticle" (
    "id" TEXT NOT NULL DEFAULT (cuid()),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "excerpt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "readTime" TEXT NOT NULL,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author" TEXT NOT NULL DEFAULT 'Studio HRL Adult',
    "tags" TEXT, -- JSON string array
    "views" INTEGER NOT NULL DEFAULT 0,
    
    CONSTRAINT "AcademyBlogArticle_pkey" PRIMARY KEY ("id")
);

-- Admin Logs Table
CREATE TABLE IF NOT EXISTS "AdminLog" (
    "id" TEXT NOT NULL DEFAULT (cuid()),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminEmail" TEXT NOT NULL,
    "action" TEXT NOT NULL, -- 'LOGIN', 'CREATE', 'UPDATE', 'DELETE', etc.
    "resource" TEXT NOT NULL, -- 'PARTNER', 'CASTING', 'FINANCE', etc.
    "resourceId" TEXT,
    "details" TEXT,
    "ip" TEXT,
    "userAgent" TEXT,
    
    CONSTRAINT "AdminLog_pkey" PRIMARY KEY ("id")
);

-- Studio Settings Table (Singleton)
CREATE TABLE IF NOT EXISTS "StudioSettings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- General Settings
    "studioName" TEXT NOT NULL DEFAULT 'Studio HRL Adult',
    "contactEmail" TEXT NOT NULL DEFAULT 'hardbanrecordslab.pl@gmail.com',
    "notificationEmail" TEXT NOT NULL DEFAULT 'hardbanrecordslab.pl@gmail.com',
    
    -- Revenue Sharing
    "partnerModelShare" DOUBLE PRECISION NOT NULL DEFAULT 60.0,
    "externalPartnerShare" DOUBLE PRECISION NOT NULL DEFAULT 30.0,
    "studioShare" DOUBLE PRECISION NOT NULL DEFAULT 10.0,
    
    -- Email Templates
    "castingEmailTemplate" TEXT,
    "castingRejectTemplate" TEXT,
    
    -- System Settings
    "maintenanceMode" BOOLEAN NOT NULL DEFAULT false,
    "allowNewApplications" BOOLEAN NOT NULL DEFAULT true,
    "defaultCurrency" TEXT NOT NULL DEFAULT 'USD',
    
    CONSTRAINT "StudioSettings_pkey" PRIMARY KEY ("id")
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "CastingApplication_email_idx" ON "CastingApplication"("email");
CREATE INDEX IF NOT EXISTS "CastingApplication_status_idx" ON "CastingApplication"("status");
CREATE INDEX IF NOT EXISTS "CastingApplication_createdAt_idx" ON "CastingApplication"("createdAt");

CREATE INDEX IF NOT EXISTS "Partner_email_idx" ON "Partner"("email");
CREATE INDEX IF NOT EXISTS "Partner_status_idx" ON "Partner"("status");
CREATE INDEX IF NOT EXISTS "Partner_isVerified_idx" ON "Partner"("isVerified");
CREATE INDEX IF NOT EXISTS "Partner_createdAt_idx" ON "Partner"("createdAt");

CREATE INDEX IF NOT EXISTS "FinancialRecord_partnerId_idx" ON "FinancialRecord"("partnerId");
CREATE INDEX IF NOT EXISTS "FinancialRecord_period_idx" ON "FinancialRecord"("period");
CREATE INDEX IF NOT EXISTS "FinancialRecord_platform_idx" ON "FinancialRecord"("platform");

CREATE INDEX IF NOT EXISTS "PartnerDocument_partnerId_idx" ON "PartnerDocument"("partnerId");
CREATE INDEX IF NOT EXISTS "PartnerDocument_documentType_idx" ON "PartnerDocument"("documentType");
CREATE INDEX IF NOT EXISTS "PartnerDocument_isVerified_idx" ON "PartnerDocument"("isVerified");

CREATE INDEX IF NOT EXISTS "AcademyVideo_category_idx" ON "AcademyVideo"("category");
CREATE INDEX IF NOT EXISTS "AcademyVideo_isPublished_idx" ON "AcademyVideo"("isPublished");

CREATE INDEX IF NOT EXISTS "AcademyPodcast_category_idx" ON "AcademyPodcast"("category");
CREATE INDEX IF NOT EXISTS "AcademyPodcast_isPublished_idx" ON "AcademyPodcast"("isPublished");

CREATE INDEX IF NOT EXISTS "AcademyDocument_category_idx" ON "AcademyDocument"("category");
CREATE INDEX IF NOT EXISTS "AcademyDocument_isPublished_idx" ON "AcademyDocument"("isPublished");

CREATE INDEX IF NOT EXISTS "AcademyBlogArticle_slug_idx" ON "AcademyBlogArticle"("slug");
CREATE INDEX IF NOT EXISTS "AcademyBlogArticle_category_idx" ON "AcademyBlogArticle"("category");
CREATE INDEX IF NOT EXISTS "AcademyBlogArticle_isPublished_idx" ON "AcademyBlogArticle"("isPublished");

CREATE INDEX IF NOT EXISTS "AdminLog_adminEmail_idx" ON "AdminLog"("adminEmail");
CREATE INDEX IF NOT EXISTS "AdminLog_action_idx" ON "AdminLog"("action");
CREATE INDEX IF NOT EXISTS "AdminLog_resource_idx" ON "AdminLog"("resource");
CREATE INDEX IF NOT EXISTS "AdminLog_createdAt_idx" ON "AdminLog"("createdAt");

-- Insert default studio settings
INSERT INTO "StudioSettings" (
    "id",
    "studioName",
    "contactEmail",
    "notificationEmail",
    "partnerModelShare",
    "externalPartnerShare",
    "studioShare",
    "castingEmailTemplate",
    "castingRejectTemplate",
    "maintenanceMode",
    "allowNewApplications",
    "defaultCurrency"
) VALUES (
    'singleton',
    'Studio HRL Adult',
    'hardbanrecordslab.pl@gmail.com',
    'hardbanrecordslab.pl@gmail.com',
    60.0,
    30.0,
    10.0,
    'Dzi\u0119kujemy za zainteresowanie wsp\u00f3\u0142prac\u0105 z Studio HRL Adult. Twoja aplikacja zosta\u0142a odebrana i zostanie rozpatrzona w ci\u0105gu 48 godzin.',
    'Niestety, nie mo\u017cemy przyj\u0107 Twojej aplikacji w tym czasie. \u017byczymy powodzenia w dalszych poszukiwaniach.',
    false,
    true,
    'USD'
) ON CONFLICT ("id") DO NOTHING;

-- Create function for cuid() generation (PostgreSQL equivalent)
CREATE OR REPLACE FUNCTION cuid()
RETURNS TEXT AS $$
BEGIN
    RETURN 'cuid_' || substr(md5(random()::text), 1, 20);
END;
$$ LANGUAGE plpgsql;

-- Enable Row Level Security (RLS)
ALTER TABLE "CastingApplication" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Partner" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "FinancialRecord" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PartnerDocument" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AdminLog" ENABLE ROW LEVEL SECURITY;

-- RLS Policies for admin access only
CREATE POLICY "Admins can access all casting applications" ON "CastingApplication"
    FOR ALL USING (auth.jwt() ->> 'email' = 'hardbanrecordslab.pl@gmail.com');

CREATE POLICY "Admins can access all partners" ON "Partner"
    FOR ALL USING (auth.jwt() ->> 'email' = 'hardbanrecordslab.pl@gmail.com');

CREATE POLICY "Admins can access all financial records" ON "FinancialRecord"
    FOR ALL USING (auth.jwt() ->> 'email' = 'hardbanrecordslab.pl@gmail.com');

CREATE POLICY "Admins can access all partner documents" ON "PartnerDocument"
    FOR ALL USING (auth.jwt() ->> 'email' = 'hardbanrecordslab.pl@gmail.com');

CREATE POLICY "Admins can access all admin logs" ON "AdminLog"
    FOR ALL USING (auth.jwt() ->> 'email' = 'hardbanrecordslab.pl@gmail.com');

-- Academy content is public (no RLS needed)
ALTER TABLE "AcademyVideo" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "AcademyPodcast" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "AcademyDocument" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "AcademyBlogArticle" DISABLE ROW LEVEL SECURITY;
ALTER TABLE "StudioSettings" DISABLE ROW LEVEL SECURITY;

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES 
('documents', 'documents', false),
('videos', 'videos', true),
('images', 'images', true),
('audio', 'audio', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Admins can upload documents" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'documents' AND 
        auth.jwt() ->> 'email' = 'hardbanrecordslab.pl@gmail.com'
    );

CREATE POLICY "Admins can view documents" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'documents' AND 
        auth.jwt() ->> 'email' = 'hardbanrecordslab.pl@gmail.com'
    );

CREATE POLICY "Anyone can view public content" ON storage.objects
    FOR SELECT USING (
        bucket_id IN ('videos', 'images', 'audio')
    );

-- Create views for easier data access
CREATE OR REPLACE VIEW "CastingApplicationsView" AS
SELECT 
    c.*,
    p."firstName" as partnerFirstName,
    p."lastName" as partnerLastName
FROM "CastingApplication" c
LEFT JOIN "Partner" p ON c.email = p.email;

CREATE OR REPLACE VIEW "PartnerStatsView" AS
SELECT 
    p.id,
    p."firstName",
    p."lastName",
    p.email,
    p.status,
    p."createdAt",
    COUNT(f.id) as financialRecordsCount,
    COALESCE(SUM(f.amount), 0) as totalEarnings,
    COUNT(d.id) as documentsCount,
    COUNT(CASE WHEN d."isVerified" = true THEN 1 END) as verifiedDocumentsCount
FROM "Partner" p
LEFT JOIN "FinancialRecord" f ON p.id = f."partnerId"
LEFT JOIN "PartnerDocument" d ON p.id = d."partnerId"
GROUP BY p.id, p."firstName", p."lastName", p.email, p.status, p."createdAt";

CREATE OR REPLACE VIEW "AcademyContentView" AS
SELECT 
    'video' as contentType,
    id,
    title,
    description,
    duration,
    category,
    tags,
    "isPublished",
    "createdAt",
    views as stats
FROM "AcademyVideo"
WHERE "isPublished" = true

UNION ALL

SELECT 
    'podcast' as contentType,
    id,
    title,
    description,
    duration,
    category,
    tags,
    "isPublished",
    "createdAt",
    plays as stats
FROM "AcademyPodcast"
WHERE "isPublished" = true

UNION ALL

SELECT 
    'document' as contentType,
    id,
    title,
    description,
    0 as duration,
    category,
    tags,
    "isPublished",
    "createdAt",
    downloads as stats
FROM "AcademyDocument"
WHERE "isPublished" = true

UNION ALL

SELECT 
    'article' as contentType,
    id,
    title,
    excerpt as description,
    0 as duration,
    category,
    tags,
    "isPublished",
    "createdAt",
    views as stats
FROM "AcademyBlogArticle"
WHERE "isPublished" = true;

-- Create triggers for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_casting_application_updated_at 
    BEFORE UPDATE ON "CastingApplication" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_updated_at 
    BEFORE UPDATE ON "Partner" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_financial_record_updated_at 
    BEFORE UPDATE ON "FinancialRecord" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partner_document_updated_at 
    BEFORE UPDATE ON "PartnerDocument" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_academy_video_updated_at 
    BEFORE UPDATE ON "AcademyVideo" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_academy_podcast_updated_at 
    BEFORE UPDATE ON "AcademyPodcast" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_academy_document_updated_at 
    BEFORE UPDATE ON "AcademyDocument" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_academy_blog_article_updated_at 
    BEFORE UPDATE ON "AcademyBlogArticle" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_studio_settings_updated_at 
    BEFORE UPDATE ON "StudioSettings" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function for logging admin actions
CREATE OR REPLACE FUNCTION log_admin_action(
    admin_email TEXT,
    action_name TEXT,
    resource_type TEXT,
    resource_id TEXT DEFAULT NULL,
    details TEXT DEFAULT NULL,
    ip_address TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
    INSERT INTO "AdminLog" (adminEmail, action, resource, resourceId, details, ip)
    VALUES (admin_email, action_name, resource_type, resource_id, details, ip_address);
END;
$$ LANGUAGE plpgsql;

-- Sample data insertion (optional - for testing)
INSERT INTO "AcademyBlogArticle" (
    "slug", "title", "category", "tag", "excerpt", "content", "readTime", "isPublished", "date", "author", "tags"
) VALUES 
(
    'psychologia-widza',
    'Psychologia widza: jak budowa\u0107 lojalno\u015b\u0107, kt\u00f3ra p\u0142aci',
    'Psychologia',
    'MUST READ',
    'Zrozumienie mechanizm\u00f3w psychologicznych stoj\u0105cych za decyzjami zakupowymi fan\u00f3w to fundament ka\u017cdego dochodowego konta.',
    'Pe\u0142ny artyku\u0142 o psychologii widza w bran\u017cy adult content...',
    '8 min',
    true,
    '2026-03-28',
    'Studio HRL Adult',
    '["psychologia", "monetyzacja", "fani"]'
),
(
    'onlyfans-vs-fansly-2026',
    'OnlyFans vs Fansly 2026 - kt\u00f3re konto op\u0142aca si\u0119 bardziej?',
    'Platformy',
    'ANALIZA',
    'Szczeg\u00f3\u0142owe por\u00f3wnanie prowizji, algorytm\u00f3w, narz\u0119dzi i potencja\u0142u zarobkowego obu platform.',
    'Szczeg\u00f3\u0142owe por\u00f3wnanie platform OnlyFans i Fansly...',
    '12 min',
    true,
    '2026-03-22',
    'Studio HRL Adult',
    '["onlyfans", "fansly", "por\u00f3wnanie"]'
) ON CONFLICT ("slug") DO NOTHING;
