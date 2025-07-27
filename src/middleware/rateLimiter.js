import ApiResponse from '../utils/apiResponse.js';
import Logger from '../utils/logger.js';
import rateLimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit(req.ip);

    if (!success) {
      Logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
      return res
        .status(429)
        .json(ApiResponse.tooManyRequests());
    }

    next();
  } catch (error) {
    Logger.error('Error applying rate limit:', error);
    return res
      .status(500)
      .json(ApiResponse.error('Internal server error'));
  }
};

export default rateLimiter;