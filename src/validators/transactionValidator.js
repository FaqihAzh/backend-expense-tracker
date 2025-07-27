import { body, param } from 'express-validator';

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
