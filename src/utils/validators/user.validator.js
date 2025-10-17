import { body } from 'express-validator';

export const updateUser = () => {
    return [
        body('firstName').optional().notEmpty().withMessage('First name must not be empty').matches(/^\S+$/).withMessage('First name must not contain spaces'),
        body('lastName').optional().notEmpty().withMessage('Last name must not be empty').matches(/^\S+$/).withMessage('Last name must not contain spaces'),
        body('phone').optional().isMobilePhone('any').withMessage('Invalid phone number'),
    ]
}