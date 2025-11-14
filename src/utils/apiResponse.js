import { HTTP_STATUS, RESPONSE_STATUS } from './constants.js';

class ApiResponse {
  static success(data = null, message = 'Request successful', code = HTTP_STATUS.OK) {
    return {
      meta: {
        message,
        code,
        status: RESPONSE_STATUS.SUCCESS,
      },
      data,
    };
  }

  static created(data = null, message = 'Resource created successfully') {
    return {
      meta: {
        message,
        code: HTTP_STATUS.CREATED,
        status: RESPONSE_STATUS.SUCCESS,
      },
      data,
    };
  }

  static error(message = 'Internal server error', code = HTTP_STATUS.INTERNAL_SERVER_ERROR, errors = null) {
    return {
      meta: {
        message,
        code,
        status: RESPONSE_STATUS.ERROR,
      },
      data: null,
      errors,
    };
  }

  static validationError(errors, message = 'Validation failed') {
    return {
      meta: {
        message,
        code: HTTP_STATUS.UNPROCESSABLE_ENTITY,
        status: RESPONSE_STATUS.FAIL,
      },
      data: null,
      errors,
    };
  }

  static notFound(message = 'Resource not found') {
    return {
      meta: {
        message,
        code: HTTP_STATUS.NOT_FOUND,
        status: RESPONSE_STATUS.FAIL,
      },
      data: null,
    };
  }

  static badRequest(message = 'Bad request') {
    return {
      meta: {
        message,
        code: HTTP_STATUS.BAD_REQUEST,
        status: RESPONSE_STATUS.FAIL,
      },
      data: null,
    };
  }

  static tooManyRequests(message = 'Too many requests') {
    return {
      meta: {
        message,
        code: HTTP_STATUS.TOO_MANY_REQUESTS,
        status: RESPONSE_STATUS.ERROR,
      },
      data: null,
    };
  }
}

export default ApiResponse;
