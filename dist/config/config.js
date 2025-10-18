import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var envName = (process.env.NODE_ENV || 'development').toLowerCase();
dotenv.config({
  path: path.resolve(__dirname, "../environments/.env.".concat(envName))
});
export var APP_NAME = process.env.APP_NAME;
export var APP_FRONT_URL = process.env.APP_FRONT_URL;
export var NODE_ENV = process.env.NODE_ENV || 'development';
export var CONN_STRING = process.env.CONN_STRING;
export var CORS_ORIGIN = process.env.ALLOWED_ORIGINS;
export var TOKEN_SECRET = process.env.TOKEN_SECRET;
export var TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;
export var MAILJET = {
  MAILJET_API_KEY: process.env.MAILJET_API_KEY,
  MAILJET_SECRET_KEY: process.env.MAILJET_SECRET_KEY,
  MAILJET_SENDER_ADDRESS: process.env.MAILJET_SENDER_ADDRESS
};
export var GEOAPIFY = {
  GEOAPIFY_BASE_URL: process.env.GEOAPIFY_BASE_URL,
  GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY
};