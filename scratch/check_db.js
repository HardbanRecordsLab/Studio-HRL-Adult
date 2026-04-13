require('dotenv').config({ path: '.env' });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('--- DB CHECK ---');
    const tables = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    console.log('Tables:', tables.map(t => t.table_name));
    
    // Check columns of AcademyBlogArticle
    try {
      const cols = await prisma.$queryRaw`SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'AcademyBlogArticle'`;
      console.log('Columns of AcademyBlogArticle:', cols);
    } catch (e) {
      console.log('Could not get columns for AcademyBlogArticle');
    }

  } catch (e) {
    console.error('Connection Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
