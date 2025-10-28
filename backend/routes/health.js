import express from 'express';
import sequelize from '../config/database.js';

const router = express.Router();

// Health check endpoint
router.get('/', async (req, res) => {
  try {
    // Check database connection
    await sequelize.authenticate();
    
    res.json({
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    });
  }
});

export default router;
