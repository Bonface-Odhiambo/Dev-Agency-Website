import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Session from '../models/Session.js';

// Generate JWT token
export const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Hash password
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Compare password
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

// Create session
export const createSession = async (userId, token, ipAddress, userAgent) => {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  return await Session.create({
    userId,
    token,
    ipAddress,
    userAgent,
    expiresAt
  });
};

// Validate session
export const validateSession = async (token) => {
  const session = await Session.findOne({
    where: { token },
    include: [{
      model: User,
      attributes: ['id', 'name', 'email', 'role', 'status']
    }]
  });

  if (!session) {
    return null;
  }

  // Check if session is expired
  if (new Date() > session.expiresAt) {
    await session.destroy();
    return null;
  }

  return session;
};

// Delete session (logout)
export const deleteSession = async (token) => {
  await Session.destroy({ where: { token } });
};

// Clean expired sessions
export const cleanExpiredSessions = async () => {
  await Session.destroy({
    where: {
      expiresAt: {
        [Op.lt]: new Date()
      }
    }
  });
};

export default {
  generateToken,
  verifyToken,
  hashPassword,
  comparePassword,
  createSession,
  validateSession,
  deleteSession,
  cleanExpiredSessions
};
