import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Notification = sequelize.define('Notification', {
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
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: DataTypes.ENUM('info', 'success', 'warning', 'error'),
    defaultValue: 'info'
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  link: {
    type: DataTypes.STRING(500),
    allowNull: true,
    validate: {
      isUrl: true
    }
  }
}, {
  tableName: 'notifications',
  timestamps: true,
  updatedAt: false,
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['read']
    },
    {
      fields: ['createdAt']
    }
  ]
});

export default Notification;
