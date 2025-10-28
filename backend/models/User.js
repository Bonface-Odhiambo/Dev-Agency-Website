import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 255]
    }
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  passwordHash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'password_hash'
  },
  role: {
    type: DataTypes.ENUM('client', 'admin', 'super_admin'),
    defaultValue: 'client'
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended'),
    defaultValue: 'active'
  },
  emailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'email_verified'
  },
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  avatarUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'avatar_url',
    validate: {
      isUrl: true
    }
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'last_login'
  }
}, {
  tableName: 'users',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      fields: ['role']
    },
    {
      fields: ['status']
    }
  ]
});

export default User;
