import { body, param, query } from 'express-validator';

export const createTransactionValidator = [
  body('user_id')
    .notEmpty()
    .withMessage('User ID is required')
    .isString()
    .withMessage('User ID must be a string')
    .isLength({ min: 1, max: 255 })
    .withMessage('User ID must be between 1 and 255 characters'),

  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),

  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount must be a number'),

  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isString()
    .withMessage('Category must be a string')
    .isLength({ min: 1, max: 255 })
    .withMessage('Category must be between 1 and 255 characters'),
];

export const updateTransactionValidator = [
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string')
    .isLength({ min: 1, max: 255 })
    .withMessage('Title must be between 1 and 255 characters'),

  body('amount')
    .optional()
    .isNumeric()
    .withMessage('Amount must be a number'),

  body('category')
    .optional()
    .isString()
    .withMessage('Category must be a string')
    .isLength({ min: 1, max: 255 })
    .withMessage('Category must be between 1 and 255 characters'),
];

export const userIdValidator = [
  param('userId')
    .notEmpty()
    .withMessage('User ID is required')
    .isString()
    .withMessage('User ID must be a string'),
];

export const transactionIdValidator = [
  param('id')
    .notEmpty()
    .withMessage('Transaction ID is required')
    .isInt({ min: 1 })
    .withMessage('Transaction ID must be a positive integer'),
];

export const categoryValidator = [
  param('category')
    .notEmpty()
    .withMessage('Category is required')
    .isString()
    .withMessage('Category must be a string'),
];

export const dateRangeValidator = [
  query('startDate')
    .optional()
    .isISO8601()
    .withMessage('Start date must be a valid ISO 8601 date'),

  query('endDate')
    .optional()
    .isISO8601()
    .withMessage('End date must be a valid ISO 8601 date'),
];

export const monthValidator = [
  param('year')
    .isInt({ min: 2000, max: 2100 })
    .withMessage('Year must be a valid year between 2000 and 2100'),

  param('month')
    .isInt({ min: 1, max: 12 })
    .withMessage('Month must be between 1 and 12'),
];

export const queryFiltersValidator = [
  query('category')
    .optional()
    .isString()
    .withMessage('Category filter must be a string'),

  query('minAmount')
    .optional()
    .isNumeric()
    .withMessage('Minimum amount must be a number'),

  query('maxAmount')
    .optional()
    .isNumeric()
    .withMessage('Maximum amount must be a number'),

  query('type')
    .optional()
    .isIn(['income', 'expense'])
    .withMessage('Type must be either "income" or "expense"'),

  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),

  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
];

export const analyticsValidator = [
  query('period')
    .optional()
    .isIn(['week', 'month', 'quarter', 'year'])
    .withMessage('Period must be one of: week, month, quarter, year'),
];
