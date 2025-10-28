import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { 
  hashPassword, 
  comparePassword, 
  generateToken, 
  createSession,
  deleteSession 
} from '../services/authService.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 255 }).withMessage('Name must be between 2 and 255 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('phone')
    .optional()
    .trim()
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required')
];

// POST /api/auth/register - Register new user
router.post('/register', registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, email, password, phone } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const user = await User.create({
      name,
      email,
      passwordHash,
      phone,
      role: 'client',
      status: 'active'
    });

    // Generate token
    const token = generateToken(user.id);

    // Create session
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');
    await createSession(user.id, token, ipAddress, userAgent);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

// POST /api/auth/login - Login user
router.post('/login', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isValidPassword = await comparePassword(password, user.passwordHash);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check if user is active
    if (user.status !== 'active') {
      return res.status(403).json({
        success: false,
        message: 'Account is not active'
      });
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate token
    const token = generateToken(user.id);

    // Create session
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('user-agent');
    await createSession(user.id, token, ipAddress, userAgent);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          avatarUrl: user.avatarUrl
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
});

// POST /api/auth/logout - Logout user
router.post('/logout', authenticate, async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    await deleteSession(token);

    res.json({
      success: true,
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
});

// GET /api/auth/me - Get current user
router.get('/me', authenticate, async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        status: req.user.status,
        phone: req.user.phone,
        avatarUrl: req.user.avatarUrl,
        emailVerified: req.user.emailVerified
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get user information'
    });
  }
});

// PUT /api/auth/profile - Update user profile
router.put('/profile', authenticate, [
  body('name').optional().trim().isLength({ min: 2, max: 255 }),
  body('phone').optional().trim(),
  body('avatarUrl').optional().isURL()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, phone, avatarUrl } = req.body;
    const user = await User.findByPk(req.user.id);

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatarUrl: user.avatarUrl
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update profile'
    });
  }
});

export default router;
