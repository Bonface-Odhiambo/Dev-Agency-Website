import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('========================================');
console.log('Database Connection Test');
console.log('========================================\n');

// Check if DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  console.error('❌ ERROR: DATABASE_URL not found in environment variables!');
  console.log('\nPlease set DATABASE_URL in your .env file:');
  console.log('DATABASE_URL=postgresql://user:pass@host:port/db?sslmode=require\n');
  console.log('See GET_DATABASE_URL.md for instructions.\n');
  process.exit(1);
}

console.log('✅ DATABASE_URL found in environment');
console.log(`📍 Host: ${new URL(process.env.DATABASE_URL).hostname}`);
console.log(`📊 Database: ${new URL(process.env.DATABASE_URL).pathname.slice(1)}\n`);

// Create Sequelize instance
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

async function testConnection() {
  try {
    console.log('🔄 Testing database connection...\n');
    
    // Test authentication
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    
    // Test query
    const [results] = await sequelize.query('SELECT version()');
    console.log(`✅ PostgreSQL version: ${results[0].version.split(' ')[0]} ${results[0].version.split(' ')[1]}`);
    
    // Test database name
    const [dbResult] = await sequelize.query('SELECT current_database()');
    console.log(`✅ Connected to database: ${dbResult[0].current_database}`);
    
    console.log('\n========================================');
    console.log('✅ All tests passed!');
    console.log('========================================\n');
    console.log('Your database is ready for deployment.\n');
    
    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Database connection failed!\n');
    console.error('Error details:');
    console.error(`  Message: ${error.message}`);
    
    if (error.message.includes('authentication failed')) {
      console.error('\n💡 Fix: Check your username and password in DATABASE_URL');
    } else if (error.message.includes('ENOTFOUND')) {
      console.error('\n💡 Fix: Check your database host in DATABASE_URL');
    } else if (error.message.includes('timeout')) {
      console.error('\n💡 Fix: Check if your database is active and accessible');
    } else if (error.message.includes('SSL')) {
      console.error('\n💡 Fix: Make sure DATABASE_URL ends with ?sslmode=require');
    }
    
    console.error('\n📖 See GET_DATABASE_URL.md for help\n');
    
    await sequelize.close();
    process.exit(1);
  }
}

testConnection();
