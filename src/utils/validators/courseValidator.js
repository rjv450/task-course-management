import { check, validationResult,param,body } from 'express-validator';

export const courseValidator = [
    check('title')
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters long'),
    check('description')
        .notEmpty().withMessage('description is required')
        .isLength({ max: 1000 }).withMessage('Description must be less than 1000 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const updateCourseValidator = [
    check('title')
      .optional()
      .isLength({ min: 1, max: 100 }).withMessage('Title must be between 1 and 100 characters long'),
    
    check('description')
      .optional()
      .isLength({ max: 500 }).withMessage('Description must not exceed 500 characters'),
    
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];


  export const validateCreateLesson = [
    param('courseId').isInt().withMessage('Course ID must be an integer'),
    body('title').isString().notEmpty().withMessage('Title is required'),
    body('content').optional().isString().withMessage('Content must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateUpdateLesson = [
    param('id').isInt().withMessage('Lesson ID must be an integer'),
    param('courseId').isInt().withMessage('course ID must be an integer'),
    body('title').optional().isString().withMessage('Title must be a string'),
    body('content').optional().isString().withMessage('Content must be a string'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];