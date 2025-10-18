import { createError } from "../utils/helpers.js";
import { CORS_ORIGIN, NODE_ENV } from "./config.js";

const allowedOrigins = CORS_ORIGIN?.split(',');

const corsOptions = {
  origin: function (origin, callback, req) {
    
    if (NODE_ENV == 'development') {
        callback(null, true);
        return
      }
      
    const ssrHeader = req?.headers['x-ssr-client'];
    if (!origin && ssrHeader === 'angular') {
      callback(null, true);
      return;
    }

    if (!origin || !allowedOrigins.includes(origin)) {
      callback(createError('Not allowed by CORS', 401));
      return
    }

    callback(null, true);
  },
};

export default corsOptions;