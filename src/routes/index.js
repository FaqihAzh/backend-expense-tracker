import express from 'express';
import transactionsRoute from "./transactionsRoute.js";

const router = express.Router();

router.use('/transactions', transactionsRoute);

router.get('/', (req, res) => {
  res.json({
    message: 'Expense Tracker API v1',
    endpoints: {
      transactions: '/transactions',
      documentation: '/api-docs',
    },
  });
});

export default router;