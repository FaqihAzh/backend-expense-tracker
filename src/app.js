import express from 'express';
import cors from 'cors';
import rateLimiter from './middleware/rateLimiter.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';
import {swaggerDocument, swaggerOptions, swaggerUi} from "./config/swagger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.use('/api/v1', routes);

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