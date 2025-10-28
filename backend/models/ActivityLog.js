import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ActivityLog = sequelize.define('ActivityLog', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  action: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  entityType: {
    type: DataTypes.STRING(50),
    allowNull: true,
    field: 'entity_type'
  },
  entityId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'entity_id'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ipAddress: {
    type: DataTypes.STRING(45),
    allowNull: true,
    field: 'ip_address'
  },
  userAgent: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'user_agent'
  },
  metadata: {
    type: DataTypes.JSONB,
    allowNull: true
  }
}, {
  tableName: 'activity_logs',
  timestamps: true,
  updatedAt: false,
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['action']
    },
    {
      fields: ['createdAt']
    },
    {
      fields: ['entity_type', 'entity_id']
    }
  ]
});

export default ActivityLog;
