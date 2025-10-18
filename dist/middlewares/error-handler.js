import { NODE_ENV } from "../config/config.js";
import { logger } from "../utils/helpers.js";
export var errorHandler = function errorHandler(err, req, res, next) {
  if (NODE_ENV === 'development') {
    console.error(err);
  }
  var statusCode = err.statusCode || 500;
  var message = err.message || 'Internal Server Error';
  try {
    message = JSON.parse(message);
  } catch (_unused) {/* not JSON */}
  logger.error(message);
  res.status(statusCode).json({
    message: 'Error',
    error: message
  });
};