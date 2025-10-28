import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Session = sequelize.define('Session', {
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
  token: {
    type: DataTypes.STRING(500),
    allowNull: false,
    unique: true
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
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'expires_at'
  }
}, {
  tableName: 'sessions',
  timestamps: true,
  updatedAt: false,
  indexes: [
    {
      fields: ['user_id']
    },
    {
      unique: true,
      fields: ['token']
    },
    {
      fields: ['expires_at']
    }
  ]
});

export default Session;
