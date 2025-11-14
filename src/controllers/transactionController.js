import transactionService from '../services/transactionService.js';
import ApiResponse from '../utils/apiResponse.js';
import { MESSAGES } from '../utils/constants.js';

class TransactionController {
  async getAllTransactions(req, res, next) {
    try {
      const filters = req.query;
      const transactions = await transactionService.getAllTransactions(filters);
      return res.json(ApiResponse.success(transactions, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }

  async getTransactionsByUserId(req, res, next) {
    try {
      const { userId } = req.params;
      const filters = req.query;
      const transactions = await transactionService.getTransactionsByUserId(userId, filters);
      return res.json(ApiResponse.success(transactions, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }

  async getTransactionById(req, res, next) {
    try {
      const { id } = req.params;
      const transaction = await transactionService.getTransactionById(id);

      if (!transaction) {
        return res.status(404).json(ApiResponse.notFound(MESSAGES.NOT_FOUND));
      }

      return res.json(ApiResponse.success(transaction, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }

  async getTransactionsByCategory(req, res, next) {
    try {
      const { userId, category } = req.params;
      const transactions = await transactionService.getTransactionsByCategory(userId, category);
      return res.json(ApiResponse.success(transactions, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }

  async getTransactionsByDateRange(req, res, next) {
    try {
      const { userId } = req.params;
      const { startDate, endDate } = req.query;
      const transactions = await transactionService.getTransactionsByDateRange(userId, startDate, endDate);
      return res.json(ApiResponse.success(transactions, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }

  async getTransactionsByMonth(req, res, next) {
    try {
      const { userId, year, month } = req.params;
      const transactions = await transactionService.getTransactionsByMonth(userId, parseInt(year), parseInt(month));
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

  async updateTransaction(req, res, next) {
    try {
      const { id } = req.params;
      const updatedTransaction = await transactionService.updateTransaction(id, req.body);

      if (!updatedTransaction) {
        return res.status(404).json(ApiResponse.notFound(MESSAGES.NOT_FOUND));
      }

      return res.json(ApiResponse.success(updatedTransaction, 'Transaction updated successfully'));
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
      const filters = req.query;
      const summary = await transactionService.getTransactionSummary(userId, filters);
      return res.json(ApiResponse.success(summary, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }

  async getCategorySummary(req, res, next) {
    try {
      const { userId } = req.params;
      const filters = req.query;
      const categorySummary = await transactionService.getCategorySummary(userId, filters);
      return res.json(ApiResponse.success(categorySummary, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }

  async getMonthlyReport(req, res, next) {
    try {
      const { userId, year } = req.params;
      const report = await transactionService.getMonthlyReport(userId, parseInt(year));
      return res.json(ApiResponse.success(report, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }

  async getTopCategories(req, res, next) {
    try {
      const { userId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit) : 5;
      const categories = await transactionService.getTopCategories(userId, limit);
      return res.json(ApiResponse.success(categories, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }

  async getRecentTransactions(req, res, next) {
    try {
      const { userId } = req.params;
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const transactions = await transactionService.getRecentTransactions(userId, limit);
      return res.json(ApiResponse.success(transactions, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }

  async getAdvancedAnalytics(req, res, next) {
    try {
      const { userId } = req.params;
      const filters = req.query;
      const analytics = await transactionService.getAdvancedAnalytics(userId, filters);
      return res.json(ApiResponse.success(analytics, MESSAGES.SUCCESS));
    } catch (error) {
      next(error);
    }
  }
}

export default new TransactionController();