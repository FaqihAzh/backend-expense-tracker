import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5001,
  databaseUrl: process.env.DATABASE_URL,
  nodeEnv: process.env.NODE_ENV || 'development',
  upstashRedisUrl: process.env.UPSTASH_REDIS_REST_URL,
  upstashRedisToken: process.env.UPSTASH_REDIS_REST_TOKEN,
};