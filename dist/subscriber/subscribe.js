import { contactUs, sendUserEmailVerification, sendUserForgotPassword } from "./emails/email.js";
export default function loadListeners(emitter) {
  emitter.on('User.registered', sendUserEmailVerification());
  emitter.on('User.forgotpassword', sendUserForgotPassword());
  emitter.on('User.contactus', contactUs());
  return emitter;
}