import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

// Import routes
import contactRoutes from '../routes/contact.js';
import projectRoutes from '../routes/projects.js';
import healthRoutes from '../routes/health.js';
import authRoutes from '../routes/auth.js';
import userRoutes from '../routes/users.js';
import serviceRequestRoutes from '../routes/serviceRequests.js';
import notificationRoutes from '../routes/notifications.js';

// Import database
import sequelize from '../config/database.js';

// Import models to set up associations
import User from '../models/User.js';
import Session from '../models/Session.js';
import ServiceRequest from '../models/ServiceRequest.js';
import Notification from '../models/Notification.js';
import ActivityLog from '../models/ActivityLog.js';
import Contact from '../models/Contact.js';
import Project from '../models/Project.js';

// Set up model associations
User.hasMany(Session, { foreignKey: 'userId', as: 'sessions' });
Session.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ServiceRequest, { foreignKey: 'userId', as: 'serviceRequests' });
ServiceRequest.belongsTo(User, { foreignKey: 'userId', as: 'user' });
ServiceRequest.belongsTo(User, { foreignKey: 'assignedTo', as: 'assignedUser' });

User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ActivityLog, { foreignKey: 'userId', as: 'activityLogs' });
ActivityLog.belongsTo(User, { foreignKey: 'userId' });

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

// CORS configuration
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://dev-agency-website.vercel.app',
  'https://dev-agency-frontend-huyiw93h3-bonfaces-projects.vercel.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/service-requests', serviceRequestRoutes);
app.use('/api/notifications', notificationRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Dev Agency API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      contact: '/api/contact',
      projects: '/api/projects',
      auth: '/api/auth',
      users: '/api/users',
      serviceRequests: '/api/service-requests',
      notifications: '/api/notifications'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.path}`,
    availableEndpoints: [
      '/api/health',
      '/api/contact',
      '/api/projects',
      '/api/auth',
      '/api/users',
      '/api/service-requests',
      '/api/notifications'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Initialize database connection for serverless
let isDbInitialized = false;

async function initializeDatabase() {
  if (!isDbInitialized) {
    try {
      await sequelize.authenticate();
      console.log('✅ Database connection established.');
      
      // Sync models (don't alter in production)
      await sequelize.sync({ alter: false });
      console.log('✅ Database models synchronized.');
      
      isDbInitialized = true;
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      throw error;
    }
  }
}

// Serverless function handler
async function handler(req, res) {
  try {
    // Initialize database on first request
    await initializeDatabase();
    
    // Handle the request with Express
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    });
  }
}

// Export for Vercel serverless
export default handler;
module.exports = handler;
