import transactionService from '../services/transactionService.js';
import ApiResponse from '../utils/apiResponse.js';
import { MESSAGES } from '../utils/constants.js';

class TransactionController {
  async getAllTransactions(req, res, next) {
    try {
      const transactions = await transactionService.getAllTransactions();
      return res.json(ApiResponse.success(transactions, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }

  async getTransactionsByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const transactions = await transactionService.getTransactionsByUserId(userId);
      return res.json(ApiResponse.success(transactions, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }

  async createTransaction(req, res, next) {
    try {
      const transaction = await transactionService.createTransaction(req.body);
      return res.status(201).json(ApiResponse.created(transaction, MESSAGES.CREATED));
    } catch (error) {
      next(error);
    }
  }

  async deleteTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const deletedTransaction = await transactionService.deleteTransaction(id);

      if (!deletedTransaction) {
        return res.status(404).json(ApiResponse.notFound(MESSAGES.NOT_FOUND));
      }

      return res.json(ApiResponse.success(null, 'Transaction deleted successfully'));
    } catch (error) {
      next(error);
    }
  }

  async getTransactionSummary(req, res, next) {
    try {
      const { userId } = req.params;
      const summary = await transactionService.getTransactionSummary(userId);
      return res.json(ApiResponse.success(summary, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }
}

export default new TransactionController();