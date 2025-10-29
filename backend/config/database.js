import { Sequelize } from 'sequelize';

// Don't use dotenv on Vercel - it doesn't work with serverless functions
// Vercel injects env vars directly into process.env

const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
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

// Add error logging to help debug
if (!process.env.DATABASE_URL) {
  console.error('ERROR: DATABASE_URL is not defined!');
  console.error('Available env vars:', Object.keys(process.env).filter(k => k.includes('DB')));
}

export default sequelize;