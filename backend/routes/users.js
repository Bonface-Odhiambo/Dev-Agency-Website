import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import ServiceRequest from '../models/ServiceRequest.js';
import Notification from '../models/Notification.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { hashPassword } from '../services/authService.js';

const router = express.Router();

// GET /api/users - Get all users (admin only)
router.get('/', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const { role, status, page = 1, limit = 10, search } = req.query;
    
    const where = {};
    
    if (role) where.role = role;
    if (status) where.status = status;
    
    // Search by name or email
    if (search) {
      where[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { email: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await User.findAndCountAll({
      where,
      attributes: { exclude: ['passwordHash'] },
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch users'
    });
  }
});

// GET /api/users/:id - Get single user (admin only)
router.get('/:id', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['passwordHash'] },
      include: [
        {
          model: ServiceRequest,
          as: 'serviceRequests',
          limit: 5,
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Get user statistics
    const stats = {
      totalRequests: await ServiceRequest.count({ where: { userId: user.id } }),
      pendingRequests: await ServiceRequest.count({ where: { userId: user.id, status: 'pending' } }),
      completedRequests: await ServiceRequest.count({ where: { userId: user.id, status: 'completed' } }),
      unreadNotifications: await Notification.count({ where: { userId: user.id, read: false } })
    };

    res.json({
      success: true,
      data: {
        ...user.toJSON(),
        stats
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user'
    });
  }
});

// POST /api/users - Create new user (admin only)
router.post('/', authenticate, authorize('admin', 'super_admin'), [
  body('name').trim().notEmpty().isLength({ min: 2, max: 255 }),
  body('email').trim().notEmpty().isEmail().normalizeEmail(),
  body('password').notEmpty().isLength({ min: 6 }),
  body('role').optional().isIn(['client', 'admin', 'super_admin']),
  body('phone').optional().trim()
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

    const { name, email, password, role, phone } = req.body;

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
      role: role || 'client',
      phone,
      status: 'active'
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Create user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create user'
    });
  }
});

// PUT /api/users/:id - Update user (admin only)
router.put('/:id', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { name, phone, role, status, avatarUrl } = req.body;

    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    if (role) user.role = role;
    if (status) user.status = status;
    if (avatarUrl !== undefined) user.avatarUrl = avatarUrl;

    await user.save();

    res.json({
      success: true,
      message: 'User updated successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update user'
    });
  }
});

// DELETE /api/users/:id - Delete user (admin only)
router.delete('/:id', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Prevent deleting yourself
    if (user.id === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete your own account'
      });
    }

    await user.destroy();

    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete user'
    });
  }
});

// GET /api/users/stats/overview - Get user statistics (admin only)
router.get('/stats/overview', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const stats = {
      totalUsers: await User.count(),
      totalClients: await User.count({ where: { role: 'client' } }),
      totalAdmins: await User.count({ where: { role: 'admin' } }),
      activeUsers: await User.count({ where: { status: 'active' } }),
      inactiveUsers: await User.count({ where: { status: 'inactive' } })
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics'
    });
  }
});

export default router;
