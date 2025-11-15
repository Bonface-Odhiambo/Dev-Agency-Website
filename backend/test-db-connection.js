import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false
});

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...\n');
    
    // Test authentication
    await sequelize.authenticate();
    
    console.log('✅ Database connection successful!\n');
    console.log('📊 Connection Details:');
    console.log('   Database:', process.env.DATABASE_URL.split('/').pop().split('?')[0]);
    console.log('   Host:', process.env.DATABASE_URL.split('@')[1]?.split('/')[0] || 'Unknown');
    console.log('   Status: Connected\n');
    
    // Test query
    const [results] = await sequelize.query('SELECT version()');
    console.log('📌 PostgreSQL Version:', results[0].version.split(' ')[0], results[0].version.split(' ')[1]);
    
    console.log('\n✨ Your database is ready to use!');
    console.log('💡 Next step: Run "npm run setup-db" to create tables\n');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed!\n');
    console.error('Error:', error.message);
    console.error('\n🔧 Troubleshooting Steps:');
    console.error('   1. Check if PostgreSQL is running');
    console.error('   2. Verify DATABASE_URL in backend/.env file');
    console.error('   3. Ensure database exists');
    console.error('   4. Check username and password are correct');
    console.error('   5. Confirm PostgreSQL is listening on the correct port\n');
    
    if (error.message.includes('password authentication failed')) {
      console.error('💡 Tip: Wrong password in DATABASE_URL');
    } else if (error.message.includes('database') && error.message.includes('does not exist')) {
      console.error('💡 Tip: Create the database first');
      console.error('   Run: CREATE DATABASE kalocode_db;');
    } else if (error.message.includes('ECONNREFUSED')) {
      console.error('💡 Tip: PostgreSQL is not running');
      console.error('   Start PostgreSQL service');
    } else if (error.message.includes('Connection terminated')) {
      console.error('💡 Tip: Database connection was dropped');
      console.error('   Restart PostgreSQL service');
    }
    
    console.error('\n📖 See DATABASE_CONNECTION_FIX.md for detailed help\n');
    process.exit(1);
  }
}

testConnection();
