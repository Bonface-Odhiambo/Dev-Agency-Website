import express from 'express';
import { body, validationResult } from 'express-validator';
import ServiceRequest from '../models/ServiceRequest.js';
import User from '../models/User.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// Validation rules
const serviceRequestValidation = [
  body('projectName')
    .trim()
    .notEmpty().withMessage('Project name is required')
    .isLength({ min: 3, max: 255 }).withMessage('Project name must be between 3 and 255 characters'),
  body('serviceType')
    .trim()
    .notEmpty().withMessage('Service type is required'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('budgetRange')
    .optional()
    .trim()
];

// POST /api/service-requests - Create new service request
router.post('/', authenticate, serviceRequestValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { projectName, serviceType, description, budgetRange } = req.body;

    const serviceRequest = await ServiceRequest.create({
      userId: req.user.id,
      projectName,
      serviceType,
      description,
      budgetRange,
      status: 'pending',
      priority: 'normal',
      progress: 0
    });

    res.status(201).json({
      success: true,
      message: 'Service request created successfully',
      data: serviceRequest
    });
  } catch (error) {
    console.error('Create service request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create service request'
    });
  }
});

// GET /api/service-requests - Get service requests
router.get('/', authenticate, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    const where = {};
    
    // If user is client, only show their requests
    if (req.user.role === 'client') {
      where.userId = req.user.id;
    }
    
    // Filter by status if provided
    if (status) {
      where.status = status;
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await ServiceRequest.findAndCountAll({
      where,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        },
        {
          model: User,
          as: 'assignedUser',
          attributes: ['id', 'name', 'email']
        }
      ],
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
    console.error('Get service requests error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service requests'
    });
  }
});

// GET /api/service-requests/:id - Get single service request
router.get('/:id', authenticate, async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: User,
          as: 'assignedUser',
          attributes: ['id', 'name', 'email']
        }
      ]
    });

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    // Check if user has permission to view
    if (req.user.role === 'client' && serviceRequest.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      data: serviceRequest
    });
  } catch (error) {
    console.error('Get service request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch service request'
    });
  }
});

// PUT /api/service-requests/:id - Update service request
router.put('/:id', authenticate, async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByPk(req.params.id);

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    // Check permissions
    if (req.user.role === 'client' && serviceRequest.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Clients can only update certain fields
    const allowedFields = req.user.role === 'client' 
      ? ['description', 'budgetRange']
      : ['status', 'priority', 'progress', 'assignedTo', 'estimatedCompletion', 'actualCompletion', 'notes'];

    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    await serviceRequest.update(updates);

    res.json({
      success: true,
      message: 'Service request updated successfully',
      data: serviceRequest
    });
  } catch (error) {
    console.error('Update service request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update service request'
    });
  }
});

// DELETE /api/service-requests/:id - Delete service request
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const serviceRequest = await ServiceRequest.findByPk(req.params.id);

    if (!serviceRequest) {
      return res.status(404).json({
        success: false,
        message: 'Service request not found'
      });
    }

    // Only admins or the request owner can delete
    if (req.user.role === 'client' && serviceRequest.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await serviceRequest.destroy();

    res.json({
      success: true,
      message: 'Service request deleted successfully'
    });
  } catch (error) {
    console.error('Delete service request error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete service request'
    });
  }
});

// GET /api/service-requests/stats/overview - Get statistics (admin only)
router.get('/stats/overview', authenticate, authorize('admin', 'super_admin'), async (req, res) => {
  try {
    const stats = {
      total: await ServiceRequest.count(),
      pending: await ServiceRequest.count({ where: { status: 'pending' } }),
      inProgress: await ServiceRequest.count({ where: { status: 'in-progress' } }),
      review: await ServiceRequest.count({ where: { status: 'review' } }),
      completed: await ServiceRequest.count({ where: { status: 'completed' } }),
      cancelled: await ServiceRequest.count({ where: { status: 'cancelled' } })
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

export default router;
