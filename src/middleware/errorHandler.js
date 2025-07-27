import ApiResponse from '../utils/apiResponse.js';
import Logger from '../utils/logger.js';
import { HTTP_STATUS } from '../utils/constants.js';

export const errorHandler = (err, req, res, next) => {
  Logger.error('Unhandled error:', err);

  // Prisma errors
  if (err.code === 'P2002') {
    return res
      .status(HTTP_STATUS.CONFLICT)
      .json(ApiResponse.error('Duplicate entry found', HTTP_STATUS.CONFLICT));
  }

  if (err.code === 'P2025') {
    return res
      .status(HTTP_STATUS.NOT_FOUND)
      .json(ApiResponse.notFound('Record not found'));
  }

  // Default error
  return res
    .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
    .json(ApiResponse.error('Internal server error'));
};

export const notFoundHandler = (req, res) => {
  return res
    .status(HTTP_STATUS.NOT_FOUND)
    .json(ApiResponse.notFound('Route not found'));
};