import app from '../server.js';
import sequelize from '../config/database.js';

/**
 * Initializes the database connection for the serverless environment.
 * Caches the connection to avoid reconnecting on every invocation.
 */
let isDbInitialized = false;
async function initializeDatabase() {
  if (isDbInitialized) {
    return;
  }
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established for serverless function.');
    // In production, we assume migrations handle the schema.
    // Avoid using sync({ alter: true }) in production.
    await sequelize.sync(); 
    console.log('✅ Database models synchronized.');
    isDbInitialized = true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    // Propagate the error to ensure the serverless function fails loudly.
    throw new Error('Database initialization failed.');
  }
}

/**
 * The main handler for Vercel's serverless functions.
 * It ensures the database is connected and then passes the request to the Express app.
 */
const handler = async (req, res) => {
  try {
    await initializeDatabase();
    return app(req, res);
  } catch (error) {
    console.error('Critical error in serverless handler:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An internal server error occurred during initialization.' 
    });
  }
};

export default handler;
module.exports = handler;
