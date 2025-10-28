import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';
import dotenv from 'dotenv';

const { Client } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env') });

async function setupDatabase() {
  console.log('🚀 Starting database setup...\n');

  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL not found in .env file');
    console.log('Please add your database connection string to backend/.env');
    process.exit(1);
  }

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
      rejectUnauthorized: false
    } : false
  });

  try {
    // Connect to database
    console.log('📡 Connecting to database...');
    await client.connect();
    console.log('✅ Connected to database\n');

    // Read schema file
    console.log('📄 Reading schema file...');
    const schemaPath = join(__dirname, '..', 'database', 'schema.sql');
    const schema = readFileSync(schemaPath, 'utf8');
    console.log('✅ Schema file loaded\n');

    // Execute schema
    console.log('🔨 Creating tables and indexes...');
    await client.query(schema);
    console.log('✅ Database schema created successfully\n');

    // Verify tables
    console.log('🔍 Verifying tables...');
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('✅ Tables created:');
    result.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });

    console.log('\n🎉 Database setup completed successfully!');
    console.log('\nYou can now start the backend server with:');
    console.log('   npm run dev\n');

  } catch (error) {
    console.error('\n❌ Error setting up database:', error.message);
    console.error('\nPlease check:');
    console.error('1. Your DATABASE_URL is correct');
    console.error('2. PostgreSQL is running');
    console.error('3. The database exists');
    console.error('4. You have proper permissions\n');
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run setup
setupDatabase();
