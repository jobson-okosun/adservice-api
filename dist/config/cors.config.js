import { createError } from "../utils/helpers.js";
import { CORS_ORIGIN, NODE_ENV } from "./config.js";
var allowedOrigins = CORS_ORIGIN === null || CORS_ORIGIN === void 0 ? void 0 : CORS_ORIGIN.split(',');
var corsOptions = {
  origin: function origin(_origin, callback, req) {
    if (NODE_ENV == 'development') {
      callback(null, true);
      return;
    }
    var ssrHeader = req === null || req === void 0 ? void 0 : req.headers['x-ssr-client'];
    if (!_origin && ssrHeader === 'angular') {
      callback(null, true);
      return;
    }
    if (!_origin || !allowedOrigins.includes(_origin)) {
      callback(createError('Not allowed by CORS', 401));
      return;
    }
    callback(null, true);
  }
};
export default corsOptions;