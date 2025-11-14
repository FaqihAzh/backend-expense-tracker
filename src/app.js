import express from 'express';
import cors from 'cors';
import rateLimiter from './middleware/rateLimiter.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';
import { swaggerDocument, swaggerOptions, swaggerUi } from "./config/swagger.js";

const app = express();

app.set('trust proxy', 1);

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(rateLimiter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));

app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocument);
});

app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Mobile Wallet API',
    version: '1.0.0',
    documentation: '/api-docs',
    api: '/api/v1',
    health: '/api/v1/health',
    endpoints: {
      transactions: '/api/v1/transactions',
      documentation: '/api-docs',
      swagger_json: '/api-docs.json'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
    database: process.env.DATABASE_URL ? 'configured' : 'not configured',
    redis: process.env.UPSTASH_REDIS_REST_URL ? 'configured' : 'not configured'
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;