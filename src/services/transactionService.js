import transactionRepository from '../repositories/transactionRepository.js';
import Logger from '../utils/logger.js';

class TransactionService {
  async getAllTransactions() {
    try {
      const transactions = await transactionRepository.findAll();
      Logger.info(`Retrieved ${transactions.length} transactions`);
      return transactions;
    } catch (error) {
      Logger.error('Error fetching all transactions:', error);
      throw error;
    }
  }

  async getTransactionsByUserId(userId) {
    try {
      const transactions = await transactionRepository.findByUserId(userId);
      Logger.info(`Retrieved ${transactions.length} transactions for user ${userId}`);
      return transactions;
    } catch (error) {
      Logger.error(`Error fetching transactions for user ${userId}:`, error);
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

  async deleteTransaction(id) {
    try {
      // Check if transaction exists
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

  async getTransactionSummary(userId) {
    try {
      const summary = await transactionRepository.getSummaryByUserId(userId);
      Logger.info(`Retrieved summary for user ${userId}`);
      return summary;
    } catch (error) {
      Logger.error(`Error fetching summary for user ${userId}:`, error);
      throw error;
    }
  }
}

export default new TransactionService();
