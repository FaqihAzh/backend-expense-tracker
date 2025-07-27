import express from 'express';
import { handleValidationErrors } from '../middleware/validation.js';
import {
  createTransactionValidator,
  userIdValidator,
  transactionIdValidator,
} from '../validators/transactionValidator.js';
import transactionsController from "../controllers/transactionsController.js";

const router = express.Router();

router.get('/', transactionsController.getAllTransactions);

router.get('/:userId',
  userIdValidator,
  handleValidationErrors,
  transactionsController.getTransactionsByUserId
);

router.post('/',
  createTransactionValidator,
  handleValidationErrors,
  transactionsController.createTransaction
);

router.delete('/:id',
  transactionIdValidator,
  handleValidationErrors,
  transactionsController.deleteTransaction
);

router.get('/summary/:userId',
  userIdValidator,
  handleValidationErrors,
  transactionsController.getTransactionSummary
);

export default router;