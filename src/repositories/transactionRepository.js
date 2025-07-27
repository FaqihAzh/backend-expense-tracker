import prisma from '../config/database.js';

class TransactionRepository {
  async findAll() {
    return await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByUserId(userId) {
    return await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id) {
    return await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
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

  async deleteById(id) {
    return await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });
  }

  async getSummaryByUserId(userId) {
    const [balance, income, expense] = await Promise.all([
      prisma.transaction.aggregate({
        where: { userId },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: {
          userId,
          amount: { gt: 0 },
        },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: {
          userId,
          amount: { lt: 0 },
        },
        _sum: { amount: true },
      }),
    ]);

    return {
      balance: balance._sum.amount || 0,
      income: income._sum.amount || 0,
      expense: expense._sum.amount || 0,
    };
  }
}

export default new TransactionRepository();