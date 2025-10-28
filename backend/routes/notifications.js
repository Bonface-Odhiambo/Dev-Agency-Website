import express from 'express';
import { body, validationResult } from 'express-validator';
import Notification from '../models/Notification.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

// GET /api/notifications - Get user notifications
router.get('/', authenticate, async (req, res) => {
  try {
    const { read, page = 1, limit = 20 } = req.query;
    
    const where = { userId: req.user.id };
    
    if (read !== undefined) {
      where.read = read === 'true';
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Notification.findAndCountAll({
      where,
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
    console.error('Get notifications error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch notifications'
    });
  }
});

// GET /api/notifications/unread-count - Get unread notification count
router.get('/unread-count', authenticate, async (req, res) => {
  try {
    const count = await Notification.count({
      where: {
        userId: req.user.id,
        read: false
      }
    });

    res.json({
      success: true,
      data: { count }
    });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch unread count'
    });
  }
});

// PATCH /api/notifications/:id/read - Mark notification as read
router.patch('/:id/read', authenticate, async (req, res) => {
  try {
    const notification = await Notification.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    notification.read = true;
    await notification.save();

    res.json({
      success: true,
      message: 'Notification marked as read',
      data: notification
    });
  } catch (error) {
    console.error('Mark notification read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark notification as read'
    });
  }
});

// PATCH /api/notifications/mark-all-read - Mark all notifications as read
router.patch('/mark-all-read', authenticate, async (req, res) => {
  try {
    await Notification.update(
      { read: true },
      {
        where: {
          userId: req.user.id,
          read: false
        }
      }
    );

    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    console.error('Mark all read error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark all notifications as read'
    });
  }
});

// DELETE /api/notifications/:id - Delete notification
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const notification = await Notification.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id
      }
    });

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    await notification.destroy();

    res.json({
      success: true,
      message: 'Notification deleted successfully'
    });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete notification'
    });
  }
});

// POST /api/notifications - Create notification (admin only)
router.post('/', authenticate, authorize('admin', 'super_admin'), [
  body('userId').notEmpty().isUUID(),
  body('title').trim().notEmpty().isLength({ max: 255 }),
  body('message').trim().notEmpty(),
  body('type').optional().isIn(['info', 'success', 'warning', 'error']),
  body('link').optional().isURL()
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

    const notification = await Notification.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: notification
    });
  } catch (error) {
    console.error('Create notification error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create notification'
    });
  }
});

export default router;
