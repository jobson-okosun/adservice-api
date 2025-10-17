import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envName = (process.env.NODE_ENV || 'development').toLowerCase();
dotenv.config({ path: path.resolve(__dirname, `../environments/.env.${envName}`) });

export const APP_NAME = process.env.APP_NAME;
export const APP_FRONT_URL = process.env.APP_FRONT_URL;
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const CONN_STRING = process.env.CONN_STRING;
export const CORS_ORIGIN = process.env.ALLOWED_ORIGINS;
export const TOKEN_SECRET = process.env.TOKEN_SECRET;
export const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN;
export const MAILJET = {
  MAILJET_API_KEY: process.env.MAILJET_API_KEY,
  MAILJET_SECRET_KEY: process.env.MAILJET_SECRET_KEY,
  MAILJET_SENDER_ADDRESS: process.env.MAILJET_SENDER_ADDRESS
}
export const GEOAPIFY = {
  GEOAPIFY_BASE_URL: process.env.GEOAPIFY_BASE_URL,
  GEOAPIFY_API_KEY: process.env.GEOAPIFY_API_KEY,
}
 