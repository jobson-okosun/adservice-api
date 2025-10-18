import ms from "ms";
import { NODE_ENV, TOKEN_EXPIRES_IN } from "./config.js";
export var cookieOptions = function cookieOptions() {
  return {
    httpOnly: true,
    secure: NODE_ENV === 'production',
    sameSite: NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: ms(TOKEN_EXPIRES_IN)
  };
};