import { NODE_ENV } from "../config/config.js";
import { logger } from "../utils/helpers.js";

export const errorHandler = (err, req, res, next) => {
  if (NODE_ENV === 'development') {
    // console.error(err);
  }

  const statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  try {
    message = JSON.parse(message);
  } catch { /* not JSON */ }

  logger.error(message);

  res.status(statusCode).json({ message: 'Error', error: message });
};
