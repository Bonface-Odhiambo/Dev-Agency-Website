import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

// Import routes
import contactRoutes from './routes/contact.js';
import projectRoutes from './routes/projects.js';
import healthRoutes from './routes/health.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import serviceRequestRoutes from './routes/serviceRequests.js';
import notificationRoutes from './routes/notifications.js';

// Import database
import sequelize from './config/database.js';

// Import models to set up associations
import User from './models/User.js';
import Session from './models/Session.js';
import ServiceRequest from './models/ServiceRequest.js';
import Notification from './models/Notification.js';
import ActivityLog from './models/ActivityLog.js';
import Contact from './models/Contact.js';
import Project from './models/Project.js';

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

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Logging middleware
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression middleware
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
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
    status: 'running'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start the server only if this file is run directly (for local development)
if (import.meta.url.endsWith(process.argv[1])) {
  const startServer = async () => {
    try {
      console.log('Connecting to database...');
      await sequelize.authenticate();
      console.log('✅ Database connection established.');

      // Sync models
      await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
      console.log('✅ Database models synchronized.');

      app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('❌ Unable to start server:', error);
      process.exit(1);
    }
  };

  startServer();
}

// Export the app for serverless environments and testing
export default app;
