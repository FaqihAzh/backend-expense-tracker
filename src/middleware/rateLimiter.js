import ApiResponse from '../utils/apiResponse.js';
import Logger from '../utils/logger.js';

const requestCounts = new Map();
const WINDOW_SIZE = 60000; 
const MAX_REQUESTS = 100;

setInterval(() => {
  const now = Date.now();
  for (const [key, data] of requestCounts.entries()) {
    if (now - data.resetTime > WINDOW_SIZE) {
      requestCounts.delete(key);
    }
  }
}, 300000);

const rateLimiter = (req, res, next) => {
  try {
    const identifier = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    
    let requestData = requestCounts.get(identifier);
    
    if (!requestData) {
      requestCounts.set(identifier, {
        count: 1,
        resetTime: now + WINDOW_SIZE
      });
      return next();
    }
    
    if (now > requestData.resetTime) {
      requestCounts.set(identifier, {
        count: 1,
        resetTime: now + WINDOW_SIZE
      });
      return next();
    }
    
    requestData.count++;
    
    if (requestData.count > MAX_REQUESTS) {
      Logger.warn(`Rate limit exceeded for IP: ${identifier}`);
      return res
        .status(429)
        .json(ApiResponse.tooManyRequests('Too many requests, please try again later'));
    }
    
    next();
  } catch (error) {
    Logger.error('Error in rate limiter:', error);
    next();
  }
};

export default rateLimiter;