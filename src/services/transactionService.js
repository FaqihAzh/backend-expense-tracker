import transactionRepository from '../repositories/transactionRepository.js';
import Logger from '../utils/logger.js';

class TransactionService {
  async getAllTransactions(filters = {}) {
    try {
      const transactions = await transactionRepository.findAll(filters);
      Logger.info(`Retrieved ${transactions.length} transactions with filters:`, filters);
      return transactions;
    } catch (error) {
      Logger.error('Error fetching all transactions:', error);
      throw error;
    }
  }

  async getTransactionsByUserId(userId, filters = {}) {
    try {
      const transactions = await transactionRepository.findByUserId(userId, filters);
      Logger.info(`Retrieved ${transactions.length} transactions for user ${userId}`);
      return transactions;
    } catch (error) {
      Logger.error(`Error fetching transactions for user ${userId}:`, error);
      throw error;
    }
  }

  async getTransactionById(id) {
    try {
      const transaction = await transactionRepository.findById(id);
      if (!transaction) {
        Logger.warn(`Transaction not found: ${id}`);
        return null;
      }
      Logger.info(`Retrieved transaction: ${id}`);
      return transaction;
    } catch (error) {
      Logger.error(`Error fetching transaction ${id}:`, error);
      throw error;
    }
  }

  async getTransactionsByCategory(userId, category) {
    try {
      const transactions = await transactionRepository.findByCategory(userId, category);
      Logger.info(`Retrieved ${transactions.length} transactions for user ${userId} in category ${category}`);
      return transactions;
    } catch (error) {
      Logger.error(`Error fetching transactions by category for user ${userId}:`, error);
      throw error;
    }
  }

  async getTransactionsByDateRange(userId, startDate, endDate) {
    try {
      const transactions = await transactionRepository.findByDateRange(userId, startDate, endDate);
      Logger.info(`Retrieved ${transactions.length} transactions for user ${userId} between ${startDate} and ${endDate}`);
      return transactions;
    } catch (error) {
      Logger.error(`Error fetching transactions by date range for user ${userId}:`, error);
      throw error;
    }
  }

  async getTransactionsByMonth(userId, year, month) {
    try {
      const transactions = await transactionRepository.findByMonth(userId, year, month);
      Logger.info(`Retrieved ${transactions.length} transactions for user ${userId} in ${year}-${month}`);
      return transactions;
    } catch (error) {
      Logger.error(`Error fetching monthly transactions for user ${userId}:`, error);
      throw error;
    }
  }

  async createTransaction(transactionData) {
    try {
      const transaction = await transactionRepository.create(transactionData);
      Logger.info('Transaction created:', { id: transaction.id });
      return transaction;
    } catch (error) {
      Logger.error('Error creating transaction:', error);
      throw error;
    }
  }

  async updateTransaction(id, transactionData) {
    try {
      const existingTransaction = await transactionRepository.findById(id);
      if (!existingTransaction) {
        Logger.warn(`Transaction not found for update: ${id}`);
        return null;
      }

      const updatedTransaction = await transactionRepository.updateById(id, transactionData);
      Logger.info(`Transaction updated: ${id}`);
      return updatedTransaction;
    } catch (error) {
      Logger.error(`Error updating transaction ${id}:`, error);
      throw error;
    }
  }

  async deleteTransaction(id) {
    try {
      const existingTransaction = await transactionRepository.findById(id);
      if (!existingTransaction) {
        return null;
      }

      await transactionRepository.deleteById(id);
      Logger.info(`Transaction deleted: ${id}`);
      return existingTransaction;
    } catch (error) {
      Logger.error(`Error deleting transaction ${id}:`, error);
      throw error;
    }
  }

  async getTransactionSummary(userId, filters = {}) {
    try {
      const summary = await transactionRepository.getSummaryByUserId(userId, filters);
      Logger.info(`Retrieved summary for user ${userId}`);
      return summary;
    } catch (error) {
      Logger.error(`Error fetching summary for user ${userId}:`, error);
      throw error;
    }
  }

  async getCategorySummary(userId, filters = {}) {
    try {
      const categorySummary = await transactionRepository.getCategorySummary(userId, filters);
      const formattedSummary = categorySummary.map(item => ({
        category: item.category,
        totalAmount: item._sum.amount || 0,
        transactionCount: item._count.id,
        averageAmount: item._count.id > 0 ? (item._sum.amount || 0) / item._count.id : 0,
      }));

      Logger.info(`Retrieved category summary for user ${userId}`);
      return formattedSummary;
    } catch (error) {
      Logger.error(`Error fetching category summary for user ${userId}:`, error);
      throw error;
    }
  }

  async getMonthlyReport(userId, year) {
    try {
      const report = await transactionRepository.getMonthlyReport(userId, year);
      Logger.info(`Retrieved monthly report for user ${userId} for year ${year}`);
      return report;
    } catch (error) {
      Logger.error(`Error fetching monthly report for user ${userId}:`, error);
      throw error;
    }
  }

  async getTopCategories(userId, limit = 5) {
    try {
      const categories = await transactionRepository.getTopCategories(userId, limit);
      const formattedCategories = categories.map(item => ({
        category: item.category,
        totalAmount: item._sum.amount || 0,
        transactionCount: item._count.id,
      }));

      Logger.info(`Retrieved top ${limit} categories for user ${userId}`);
      return formattedCategories;
    } catch (error) {
      Logger.error(`Error fetching top categories for user ${userId}:`, error);
      throw error;
    }
  }

  async getRecentTransactions(userId, limit = 10) {
    try {
      const transactions = await transactionRepository.getRecentTransactions(userId, limit);
      Logger.info(`Retrieved ${limit} recent transactions for user ${userId}`);
      return transactions;
    } catch (error) {
      Logger.error(`Error fetching recent transactions for user ${userId}:`, error);
      throw error;
    }
  }

  async getAdvancedAnalytics(userId, filters = {}) {
    try {
      const [summary, categorySummary, topCategories, recentTransactions] = await Promise.all([
        this.getTransactionSummary(userId, filters),
        this.getCategorySummary(userId, filters),
        this.getTopCategories(userId, 5),
        this.getRecentTransactions(userId, 5),
      ]);

      const analytics = {
        summary,
        categoryBreakdown: categorySummary,
        topCategories,
        recentTransactions,
        insights: this.generateInsights(summary, categorySummary),
      };

      Logger.info(`Generated advanced analytics for user ${userId}`);
      return analytics;
    } catch (error) {
      Logger.error(`Error generating analytics for user ${userId}:`, error);
      throw error;
    }
  }

  generateInsights(summary, categorySummary) {
    const insights = [];

    if (summary.balance > 0) {
      insights.push({
        type: 'positive',
        message: `You have a positive balance of ${summary.balance}`,
      });
    } else if (summary.balance < 0) {
      insights.push({
        type: 'warning',
        message: `You have a negative balance of ${summary.balance}`,
      });
    }

    if (categorySummary.length > 0) {
      const topExpenseCategory = categorySummary
        .filter(cat => cat.totalAmount < 0)
        .sort((a, b) => a.totalAmount - b.totalAmount)[0];

      if (topExpenseCategory) {
        insights.push({
          type: 'info',
          message: `Your highest expense category is ${topExpenseCategory.category} with ${Math.abs(topExpenseCategory.totalAmount)}`,
        });
      }
    }

    if (summary.totalTransactions > 0) {
      insights.push({
        type: 'info',
        message: `You have made ${summary.totalTransactions} transactions`,
      });
    }

    return insights;
  }
}

export default new TransactionService();