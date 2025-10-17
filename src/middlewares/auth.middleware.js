import User from '../models/user.model.js';
import { createError, verifyToken } from '../utils/helpers.js';

// protect middleware: verify cookie JWT and attach req.user (full user from DB)
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies?.authorization;
    if (!token) {
      throw createError('Not authorized', 401)
    }

    const decoded = await verifyToken(token);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      throw createError('User not found', 401)
    }

    req.user = { 
      id: user._id, 
      email: user.email, 
      role: user.role, 
      firstName: user.firstName, 
      lastName: user.lastName,
      gender: user.gender,
      phone: user.phone
    };
    next();
  } catch (err) {
    next(err)
  }
};

// authorize middleware: ensure user's role is in allowed roles
export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
