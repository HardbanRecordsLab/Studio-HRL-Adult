const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  const handleStr = 'barbie.hrl';
  const partner = await prisma.partner.findUnique({ where: { handle: handleStr } });
  
  if (partner) {
    const safeJSON = (s, fallback = {}) => {
      try { return typeof s === 'string' ? JSON.parse(s) : (s || fallback); } catch { return fallback; }
    };

    const parsedProfileData = safeJSON(partner.profileData, {
      likes: [], boundaries: [], bestInMe: [], whyWatchMe: [], gallery: []
    });

    const res = {
      ...partner,
      height: partner.height || '174',
      weight: partner.weight || '58',
      measurements: partner.measurements || '92C / 62 / 92',
      bio: partner.bio || partner.description || '',
      characteristics: partner.description || '',
      platforms: safeJSON(partner.platforms),
      stats: safeJSON(partner.profileStats),
      liveSchedule: safeJSON(partner.liveSchedule, []),
      subscriptionPlans: safeJSON(partner.subscriptionPlans, []),
      testimonials: safeJSON(partner.testimonials, []),
      profileData: {
        likes: parsedProfileData.likes || [],
        boundaries: parsedProfileData.boundaries || [],
        bestInMe: parsedProfileData.bestInMe || [],
        whyWatchMe: parsedProfileData.whyWatchMe || [],
        gallery: parsedProfileData.gallery || [],
        size: parsedProfileData.size || 'S/M'
      },
      tags: ['Premium', 'Studio HRL'],
      ico: '⭐',
    };
    console.log("Success:", res.profileData.gallery);
    console.log("Measurements:", res.measurements);
    console.log("Height:", res.height);
  } else {
    console.log("Not found");
  }
}

test().finally(() => prisma.$disconnect());
