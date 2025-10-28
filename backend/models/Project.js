import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [3, 200]
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  shortDescription: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['web', 'mobile', 'design', 'consulting', 'other']]
    }
  },
  technologies: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  projectUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  githubUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  completionDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  status: {
    type: DataTypes.ENUM('planning', 'in-progress', 'completed', 'archived'),
    defaultValue: 'completed'
  },
  displayOrder: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'projects',
  timestamps: true,
  indexes: [
    {
      fields: ['category']
    },
    {
      fields: ['featured']
    },
    {
      fields: ['status']
    },
    {
      fields: ['displayOrder']
    }
  ]
});

export default Project;
