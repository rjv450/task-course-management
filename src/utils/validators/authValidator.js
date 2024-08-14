import { check, validationResult } from 'express-validator';

export const registerValidator = [
  check('email')
    .isEmail().withMessage('Invalid email address format')
    .normalizeEmail(),
  
  check('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/\d/).withMessage('Password must contain a number')
    .matches(/[a-z]/i).withMessage('Password must contain a letter'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export const loginValidator = [
  check('email')
    .isEmail().withMessage('Invalid email address format')
    .normalizeEmail(),
  
  check('password')
    .exists().withMessage('Password is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
