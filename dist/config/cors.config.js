import { CORS_ORIGIN, NODE_ENV } from "./config.js";
var allowedOrigins = CORS_ORIGIN === null || CORS_ORIGIN === void 0 ? void 0 : CORS_ORIGIN.split(',');
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (NODE_ENV == 'development') {
      callback(null, true);
      return;
    }
    if (!_origin) {
      callback(null, true); // or false if you want to block them
      return;
    }
    if (!allowedOrigins.includes(_origin)) {
      callback(new Error('Not allowed by CORS'));
      return;
    }
    callback(null, true);
  }
};
export default corsOptions;