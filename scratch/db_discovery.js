const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();

async function run() {
  console.log('--- DATABASE DISCOVERY ---');
  
  try {
    // 1. List all tables
    const tables = await p.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('\n[ TABLES ]');
    console.table(tables);

    // 2. List all columns for main tables
    console.log('\n[ COLUMNS DETAILS ]');
    const columns = await p.$queryRaw`
      SELECT table_name, column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position
    `;
    
    const structure = {};
    columns.forEach(c => {
        if (!structure[c.table_name]) structure[c.table_name] = [];
        structure[c.table_name].push(`${c.column_name} (${c.data_type}${c.is_nullable === 'NO' ? ' NOT NULL' : ''})`);
    });
    
    Object.keys(structure).forEach(tableName => {
        console.log(`\nTable: ${tableName}`);
        console.log(structure[tableName].join(', '));
    });

    // 3. List views
    const views = await p.$queryRaw`
      SELECT table_name as view_name 
      FROM information_schema.views 
      WHERE table_schema = 'public'
    `;
    console.log('\n[ VIEWS ]');
    console.table(views);

  } catch (e) {
    console.error('Discovery failed:', e.message);
  } finally {
    await p.$disconnect();
  }
}

run();
