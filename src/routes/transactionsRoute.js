import express from 'express';
import transactionController from '../controllers/transactionController.js';
import { handleValidationErrors } from '../middleware/validation.js';
import {
  createTransactionValidator,
  updateTransactionValidator,
  userIdValidator,
  transactionIdValidator,
  categoryValidator,
  dateRangeValidator,
  monthValidator,
  queryFiltersValidator,
  analyticsValidator,
} from '../validators/transactionValidator.js';

const router = express.Router();

// Get all transactions with optional filters
router.get('/',
  queryFiltersValidator,
  handleValidationErrors,
  transactionController.getAllTransactions
);

// Get transaction summary for user
router.get('/summary/:userId',
  userIdValidator,
  queryFiltersValidator,
  handleValidationErrors,
  transactionController.getTransactionSummary
);

// Get category summary for user
router.get('/category-summary/:userId',
  userIdValidator,
  queryFiltersValidator,
  handleValidationErrors,
  transactionController.getCategorySummary
);

// Get monthly report for user
router.get('/monthly-report/:userId/:year',
  userIdValidator,
  monthValidator,
  handleValidationErrors,
  transactionController.getMonthlyReport
);

// Get top categories for user
router.get('/top-categories/:userId',
  userIdValidator,
  queryFiltersValidator,
  handleValidationErrors,
  transactionController.getTopCategories
);

// Get recent transactions for user
router.get('/recent/:userId',
  userIdValidator,
  queryFiltersValidator,
  handleValidationErrors,
  transactionController.getRecentTransactions
);

// Get advanced analytics for user
router.get('/analytics/:userId',
  userIdValidator,
  queryFiltersValidator,
  analyticsValidator,
  handleValidationErrors,
  transactionController.getAdvancedAnalytics
);

// Get transactions by user ID with optional filters
router.get('/user/:userId',
  userIdValidator,
  queryFiltersValidator,
  handleValidationErrors,
  transactionController.getTransactionsByUserId
);

// Get transactions by category
router.get('/user/:userId/category/:category',
  userIdValidator,
  categoryValidator,
  queryFiltersValidator,
  handleValidationErrors,
  transactionController.getTransactionsByCategory
);

// Get transactions by date range
router.get('/user/:userId/date-range',
  userIdValidator,
  dateRangeValidator,
  handleValidationErrors,
  transactionController.getTransactionsByDateRange
);

// Get transactions by month
router.get('/user/:userId/month/:year/:month',
  userIdValidator,
  monthValidator,
  handleValidationErrors,
  transactionController.getTransactionsByMonth
);

// Get single transaction by ID
router.get('/:id',
  transactionIdValidator,
  handleValidationErrors,
  transactionController.getTransactionById
);

// Create new transaction
router.post('/',
  createTransactionValidator,
  handleValidationErrors,
  transactionController.createTransaction
);

// Update transaction
router.put('/:id',
  transactionIdValidator,
  updateTransactionValidator,
  handleValidationErrors,
  transactionController.updateTransaction
);

// Delete transaction
router.delete('/:id',
  transactionIdValidator,
  handleValidationErrors,
  transactionController.deleteTransaction
);

export default router;