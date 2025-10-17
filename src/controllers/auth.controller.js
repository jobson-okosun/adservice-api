import User from '../models/user.model.js';
import crypto from 'crypto';
import { createError, createToken, verifyToken } from '../utils/helpers.js';
import { cookieOptions } from '../config/cookie.js';
import { emitter } from '../loaders/events.js';

export const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, gender, dob, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      throw createError('Email already registered', 400);
    }

    const user = new User({ firstName, lastName, email, phone, gender, dob, password, role: 'USER' });
    await user.save();

    emitter.emit('User.registered', user)
    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createError('Email and password are required', 400);
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw createError('Invalid email or password', 400);
    }

    if (!user.isActive) {
      throw createError('This account is yet to be activated', 400);
    }

    const token = await createToken(user);
    res.cookie('authorization', token, cookieOptions());

    const { firstName, lastName } = user;
    res.json({ message: 'Login successful', user: { email, firstName, lastName } });
  } catch (err) {
    next(err);
  }
};

export const verify = async (req, res, next) => {
  try {
    const { token } = req.query;
    if (!token) {
      throw createError('Verification token is required', 400);
    }

    let payload;
    try {
      payload = await verifyToken(token);
    } catch (err) {
      throw createError('Invalid or expired verification token', 400);
    }

    const user = await User.findById(payload.id);
    if (!user) {
      throw createError('User not found', 404);
    }

    if (user.isActive) {
      return res.json({ message: 'Email already verified.' });
    }

    user.isActive = true;
    await user.save();

    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    next(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie('authorization', { httpOnly: true, sameSite: cookieOptions().sameSite, secure: cookieOptions().secure });
  res.json({ message: 'Logged out' });
};


export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw createError('Email has been sent!', 400);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw createError('No account with that email found', 400);
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    emitter.emit('User.forgotpassword', user, resetToken)
    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      throw createError('Token and new password are required', 400);
    }

    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() }});

    if (!user) {
      throw createError('Invalid or expired reset token', 400);
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    next(err);
  }
};
