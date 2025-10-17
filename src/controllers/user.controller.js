import { emitter } from '../loaders/events.js';
import User from '../models/user.model.js';
import { createError } from '../utils/helpers.js';

export const getUser = (req, res) => {
    delete req.user.role
    delete req.user.id 

    res.status(200).json({ message: 'successful', data: req.user })
}

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
        if (!user) {
            throw createError('User not found', 404)
        }

        res.status(200).json({ message: 'User updated successfully' });
    } catch (err) {
        next(err);
    }
};

export const updatePassword = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            throw createError('Old and new passwords are required', 400);
        }

        const user = await User.findById(userId);
        if (!user) {
            throw createError('User not found', 404);
        }

        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            throw createError('Old password is incorrect', 401);
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully' });
    } catch (err) {
        next(err);
    }
};

export const contactUs = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            throw createError('Name, email, and message are required', 400);
        }
        
        emitter.emit('User.contactus', { ...req.body })
        res.status(200).json({ message: 'Your message has been sent. We will get back to you soon.' });
    } catch (err) {     
        next(err);
    }
};
