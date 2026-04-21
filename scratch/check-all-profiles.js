const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const p = await prisma.partner.findMany();
  console.log(JSON.stringify(p.map(x => ({ handle: x.handle, name: x.name, bio: x.bio, avatar: x.avatar, heroImage: x.heroImage, profileData: x.profileData })), null, 2));
}

check()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
