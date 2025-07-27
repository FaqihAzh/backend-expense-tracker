import express from 'express';
import cors from 'cors';
import rateLimiter from './middleware/rateLimiter.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';
import swaggerRoutes from "./routes/swaggerRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// API Documentation
app.use('/api-docs', swaggerRoutes);

// API Routes
app.use('/api/v1', routes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Expense Tracker API',
    version: '1.0.0',
    documentation: '/api-docs',
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;