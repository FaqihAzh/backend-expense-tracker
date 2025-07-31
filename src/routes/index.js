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

router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    database: process.env.DATABASE_URL ? 'connected' : 'not configured',
    redis: process.env.UPSTASH_REDIS_REST_URL ? 'connected' : 'not configured'
  });
});

export default router;