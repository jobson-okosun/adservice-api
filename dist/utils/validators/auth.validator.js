import { body } from 'express-validator';
export var validateSignup = function validateSignup() {
  return [body('email').isEmail().withMessage('Invalid email address'), body('password').isLength({
    min: 6
  }).withMessage('Password must be at least 6 characters long'), body('firstName').notEmpty().withMessage('First name is required').matches(/^\S+$/).withMessage('First name must not contain spaces'), body('lastName').notEmpty().withMessage('Last name is required').matches(/^\S+$/).withMessage('Last name must not contain spaces'), body('phone').notEmpty().withMessage('Phone number is required'), body('gender').notEmpty().withMessage('Gender is required'), body('dob').notEmpty().withMessage('Date of birth is required')];
};
export var validateSignin = function validateSignin() {
  return [body('email').isEmail().withMessage('Invalid email address'), body('password').notEmpty().withMessage('Password is required')];
};