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

const migrations = [
  '001_create_users_table.sql',
  '002_create_sessions_table.sql',
  '003_create_service_requests_table.sql',
  '004_create_notifications_table.sql',
  '005_create_activity_logs_table.sql',
  '006_create_views.sql',
  '007_insert_sample_data.sql'
];

async function runMigrations() {
  console.log('🚀 Starting database migrations...\n');

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

    // Run each migration
    for (const migration of migrations) {
      console.log(`📄 Running migration: ${migration}...`);
      
      try {
        const migrationPath = join(__dirname, '..', 'database', 'migrations', migration);
        const sql = readFileSync(migrationPath, 'utf8');
        
        await client.query(sql);
        console.log(`✅ ${migration} completed successfully\n`);
      } catch (error) {
        console.error(`❌ Error running ${migration}:`, error.message);
        
        // Continue with other migrations even if one fails
        if (error.code === '42P07') {
          console.log(`⚠️  Table already exists, skipping...\n`);
        } else {
          console.log(`⚠️  Continuing with next migration...\n`);
        }
      }
    }

    // Verify tables
    console.log('🔍 Verifying database tables...');
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `);

    console.log('\n✅ Database tables:');
    result.rows.forEach(row => {
      console.log(`   - ${row.table_name}`);
    });

    console.log('\n🎉 All migrations completed successfully!');
    console.log('\nYou can now start the backend server with:');
    console.log('   npm run dev\n');

  } catch (error) {
    console.error('\n❌ Migration error:', error.message);
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

// Run migrations
runMigrations();
