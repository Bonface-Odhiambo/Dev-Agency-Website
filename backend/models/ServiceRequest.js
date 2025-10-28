import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ServiceRequest = sequelize.define('ServiceRequest', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  projectName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'project_name',
    validate: {
      notEmpty: true,
      len: [3, 255]
    }
  },
  serviceType: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'service_type',
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  budgetRange: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'budget_range'
  },
  expectedTimeline: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'expected_timeline'
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'review', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  priority: {
    type: DataTypes.ENUM('low', 'normal', 'high', 'urgent'),
    defaultValue: 'normal'
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
  },
  assignedTo: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'assigned_to',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  estimatedCompletion: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'estimated_completion'
  },
  actualCompletion: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'actual_completion'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'service_requests',
  timestamps: true,
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['status']
    },
    {
      fields: ['assigned_to']
    },
    {
      fields: ['createdAt']
    }
  ]
});

export default ServiceRequest;
