import express from 'express';
import { signup, forgotPassword, resetPassword, logout, login, verify } from '../controllers/auth.controller.js';
import { protect, authorize } from '../middlewares/auth.middleware.js';
import { validateSignin, validateSignup } from '../utils/validators/auth.validator.js';
import { validate } from '../middlewares/validate.middleware.js';
var router = express.Router();
router.post('/signup', validateSignup(), validate, signup).post('/signin', validateSignin(), validate, login).get('/verify', verify).post('/password/forgot', forgotPassword).post('/password/reset', resetPassword).post('/logout', logout);

// example admin protected route
// router.get('/admin', protect, authorize('ADMIN'), (req, res) => {
//   res.json({ message: 'Admin only' });
// });

export default router;