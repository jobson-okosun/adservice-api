import { CORS_ORIGIN, NODE_ENV } from "./config.js";

const allowedOrigins = CORS_ORIGIN?.split(',');

const corsOptions = {
  origin: function (origin, callback) {

    if (NODE_ENV == 'development') {
      callback(null, true);
      return
    }

    if (!origin) {
      callback(null, true); // or false if you want to block them
      return;
    }

    if (!allowedOrigins.includes(origin)) {
      callback(new Error('Not allowed by CORS'));
      return;
    }

    callback(null, true);
  },
};

export default corsOptions;