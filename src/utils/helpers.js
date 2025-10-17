import mongoUri from 'mongodb-uri';
import pino from 'pino';
import { APP_FRONT_URL, NODE_ENV, TOKEN_EXPIRES_IN, TOKEN_SECRET } from '../config/config.js';
import jsonwebtoken from 'jsonwebtoken';

export function encodeMongoURI(urlString) {
  if (urlString) {
    const parsed = mongoUri.parse(urlString);
    return mongoUri.format(parsed);
  }
  return urlString;
}

export const logger = pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "dddd, mmmm dS, yyyy, h:MM:ss TT",
    },
  },
});

export const createToken = async (user, expiresIn) => {
  try {
    if (!user) {
      throw new Error("Token payload is malformed");
    }

    return jsonwebtoken.sign({ id: user._id, role: user.role }, TOKEN_SECRET, { expiresIn: expiresIn ?? TOKEN_EXPIRES_IN });
  } catch (error) {
    logger.error("Failed to sign token");
  }
};

export const verifyToken = async (token) => {
  return jsonwebtoken.verify(token, TOKEN_SECRET);
};

export const createError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode || 500;
  return err;
}

export const genrateEmailVerificationLInk = async (user) => {
  const token = await createToken(user, '1d');
  const url = `${APP_FRONT_URL}/verification?token=${token}`

  if(NODE_ENV == 'development') {
    console.log(url)
  }

  return url
}


export const generatePasswordForgotLink = async (token) => {
  const url = `${APP_FRONT_URL}/password/reset?token=${token}`

  if(NODE_ENV == 'development') {
    console.log(url)
  }

  return url
}