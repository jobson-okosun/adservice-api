import express from 'express';
import { protect } from '../middlewares/auth.middleware.js';
import { contactUs, getUser, updatePassword, updateUser } from '../controllers/user.controller.js';
var router = express.Router();
router.get('/', protect, getUser).patch('/', protect, updateUser).post('/password', protect, updatePassword).post('/contactus', contactUs);
export default router;