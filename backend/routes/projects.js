import express from 'express';
import { body, validationResult } from 'express-validator';
import Project from '../models/Project.js';

const router = express.Router();

// Validation middleware
const projectValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3, max: 200 }).withMessage('Title must be between 3 and 200 characters'),
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required'),
  body('category')
    .isIn(['web', 'mobile', 'design', 'consulting', 'other']).withMessage('Invalid category'),
  body('technologies')
    .optional()
    .isArray().withMessage('Technologies must be an array'),
  body('imageUrl')
    .optional()
    .isURL().withMessage('Invalid image URL'),
  body('projectUrl')
    .optional()
    .isURL().withMessage('Invalid project URL'),
  body('githubUrl')
    .optional()
    .isURL().withMessage('Invalid GitHub URL')
];

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const { category, featured, status, page = 1, limit = 10 } = req.query;
    
    const where = {};
    if (category) where.category = category;
    if (featured !== undefined) where.featured = featured === 'true';
    if (status) where.status = status;

    const offset = (page - 1) * limit;

    const { count, rows } = await Project.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [
        ['displayOrder', 'ASC'],
        ['createdAt', 'DESC']
      ]
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
    console.error('Error fetching projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch projects'
    });
  }
});

// GET /api/projects/featured - Get featured projects
router.get('/featured', async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { featured: true, status: 'completed' },
      order: [
        ['displayOrder', 'ASC'],
        ['createdAt', 'DESC']
      ],
      limit: 6
    });

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch featured projects'
    });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch project'
    });
  }
});

// POST /api/projects - Create new project (admin only - add auth middleware later)
router.post('/', projectValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const project = await Project.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create project'
    });
  }
});

// PUT /api/projects/:id - Update project
router.put('/:id', projectValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await project.update(req.body);

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update project'
    });
  }
});

// DELETE /api/projects/:id - Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    await project.destroy();

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete project'
    });
  }
});

// PATCH /api/projects/:id/featured - Toggle featured status
router.patch('/:id/featured', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    project.featured = !project.featured;
    await project.save();

    res.json({
      success: true,
      message: `Project ${project.featured ? 'featured' : 'unfeatured'} successfully`,
      data: project
    });
  } catch (error) {
    console.error('Error toggling featured status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update featured status'
    });
  }
});

export default router;
