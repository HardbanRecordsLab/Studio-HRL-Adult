const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  console.log('--- ULTRA SAFE SEED STARTING ---');

  try {
    // 1. Sync Partner (Luna)
    await p.$executeRawUnsafe(`
      INSERT INTO "Partner" (
        id, name, "firstName", "lastName", handle, email, status, bio, platforms, "profileStats", "revenueTotal", followers, rating
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
      ) ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        handle = EXCLUDED.handle,
        email = EXCLUDED.email,
        status = EXCLUDED.status,
        bio = EXCLUDED.bio,
        platforms = EXCLUDED.platforms;
    `, 
    'luna-hrl', 'Luna HRL', 'Luna', 'HRL', 'luna.hrl', 'luna@hrlstudio.online', 'active', 
    'Premium content creator ze Studio HRL Adult.', 
    JSON.stringify({ onlyfans: { username: 'luna.hrl', url: 'https://onlyfans.com/luna.hrl' } }),
    JSON.stringify({ subscribers: '3.6K', content: '240+', satisfaction: '98%' }),
    12500.50, '2.4K', '5.0');
    
    console.log('Partner Luna synced.');

    // 2. Sync Financial Records
    const records = [
      { id: 'tx-1', amount: 450, type: 'subscription', platform: 'OnlyFans', rType: 'Direct' },
      { id: 'tx-2', amount: 120, type: 'tip', platform: 'Chaturbate', rType: 'Tokens' }
    ];

    for (const r of records) {
      await p.$executeRawUnsafe(`
        INSERT INTO "FinancialRecord" (id, "partnerId", amount, type, status, date, platform, "revenueType")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO NOTHING;
      `, r.id, 'luna-hrl', r.amount, r.type, 'processed', new Date(), r.platform, r.rType);
    }
    console.log('Financial records synced.');

    // 3. Sync Academy Article (CORRECTED ORDER)
    // Columns: id(1), slug(2), title(3), category(4), tag(5), excerpt(6), content(7), readTime(8), isPublished(9), publishedAt(10)
    await p.$executeRawUnsafe(`
      INSERT INTO "AcademyBlogArticle" (id, slug, title, category, tag, excerpt, content, "readTime", "isPublished", "publishedAt")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;
    `, 
    'art-1', 'smart-start-2026', 'Smart Start 2026', 'Biznes', 'PODSTAWY', 
    'Jak zacząć zarabiać w branży adult.', '<p>Kompletny poradnik krok po kroku...</p>', 
    '5 min', true, new Date());
    
    console.log('Academy article synced.');

  } catch (e) {
    console.error('Ultra Seed Error:', e.message);
  } finally {
    await p.$disconnect();
    console.log('--- ULTRA SAFE SEED DONE ---');
  }
}

run();
