import prisma from '../config/database.js';

class TransactionRepository {
  async findAll(filters = {}) {
    const where = this.buildWhereClause(filters);
    return await prisma.transaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByUserId(userId, filters = {}) {
    const where = { userId, ...this.buildWhereClause(filters) };
    return await prisma.transaction.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id) {
    return await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });
  }

  async findByCategory(userId, category) {
    return await prisma.transaction.findMany({
      where: {
        userId,
        category: {
          contains: category,
          mode: 'insensitive'
        }
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByDateRange(userId, startDate, endDate) {
    return await prisma.transaction.findMany({
      where: {
        userId,
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByMonth(userId, year, month) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    return await prisma.transaction.findMany({
      where: {
        userId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(data) {
    return await prisma.transaction.create({
      data: {
        userId: data.user_id,
        title: data.title,
        amount: data.amount,
        category: data.category,
      },
    });
  }

  async updateById(id, data) {
    return await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        amount: data.amount,
        category: data.category,
      },
    });
  }

  async deleteById(id) {
    return await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });
  }

  async getSummaryByUserId(userId, filters = {}) {
    const where = { userId, ...this.buildWhereClause(filters) };

    const [balance, income, expense, count] = await Promise.all([
      prisma.transaction.aggregate({
        where,
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: {
          ...where,
          amount: { gt: 0 },
        },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: {
          ...where,
          amount: { lt: 0 },
        },
        _sum: { amount: true },
      }),
      prisma.transaction.count({ where }),
    ]);

    return {
      balance: balance._sum.amount || 0,
      income: income._sum.amount || 0,
      expense: expense._sum.amount || 0,
      totalTransactions: count,
    };
  }

  async getCategorySummary(userId, filters = {}) {
    const where = { userId, ...this.buildWhereClause(filters) };

    return await prisma.transaction.groupBy({
      by: ['category'],
      where,
      _sum: { amount: true },
      _count: { id: true },
      orderBy: { _sum: { amount: 'desc' } },
    });
  }

  async getMonthlyReport(userId, year) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year, 11, 31);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    // Group by month
    const monthlyData = {};
    transactions.forEach(transaction => {
      const month = transaction.createdAt.getMonth() + 1;
      if (!monthlyData[month]) {
        monthlyData[month] = {
          month,
          income: 0,
          expense: 0,
          balance: 0,
          count: 0,
        };
      }

      const amount = parseFloat(transaction.amount);
      monthlyData[month].count++;
      monthlyData[month].balance += amount;

      if (amount > 0) {
        monthlyData[month].income += amount;
      } else {
        monthlyData[month].expense += amount;
      }
    });

    return Object.values(monthlyData).sort((a, b) => a.month - b.month);
  }

  async getTopCategories(userId, limit = 5) {
    return await prisma.transaction.groupBy({
      by: ['category'],
      where: { userId },
      _sum: { amount: true },
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: limit,
    });
  }

  async getRecentTransactions(userId, limit = 10) {
    return await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  buildWhereClause(filters) {
    const where = {};

    if (filters.category) {
      where.category = {
        contains: filters.category,
        mode: 'insensitive'
      };
    }

    if (filters.minAmount !== undefined) {
      where.amount = { ...where.amount, gte: parseFloat(filters.minAmount) };
    }

    if (filters.maxAmount !== undefined) {
      where.amount = { ...where.amount, lte: parseFloat(filters.maxAmount) };
    }

    if (filters.startDate) {
      where.createdAt = { ...where.createdAt, gte: new Date(filters.startDate) };
    }

    if (filters.endDate) {
      where.createdAt = { ...where.createdAt, lte: new Date(filters.endDate) };
    }

    if (filters.type) {
      if (filters.type === 'income') {
        where.amount = { ...where.amount, gt: 0 };
      } else if (filters.type === 'expense') {
        where.amount = { ...where.amount, lt: 0 };
      }
    }

    return where;
  }
}

export default new TransactionRepository();