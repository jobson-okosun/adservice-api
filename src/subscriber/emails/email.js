import { MAILJET, NODE_ENV } from "../../config/config.js";
import { getOrgConfig } from "../../loaders/config-loader.js";
import { prepareEmailData } from "../../services/mailjet/mailjet.js";
import { generatePasswordForgotLink, genrateEmailVerificationLInk } from "../../utils/helpers.js";
import { initiateEMail } from "./helpers.js";

export const sendUserEmailVerification = () => {
    return async (user) => {
        const config = getOrgConfig();
        const link = await genrateEmailVerificationLInk(user);

        const fromEmail = NODE_ENV === 'development' ? MAILJET.MAILJET_SENDER_ADDRESS : config.email.no_reply
        const payload = {
            templateID: 7370086, 
            fromEmail,
            fromName: config.appName,
            toEmail: user.email,
            toName: user.firstName,
            subject: `Welcome to ${config.appName}! Please verify your email`,
            variables: { firstName: user.firstName, appName: config.appName, link, configEmail: config.email.customer }
        };

        const emailData = prepareEmailData(payload);
        await initiateEMail(emailData, 'User email verification sent!', 'Error sending user verification email:');
    };
};

export const sendUserForgotPassword = () => {
    return async (user, token) => {
        const config = getOrgConfig();
        const link = await generatePasswordForgotLink(token);

        const fromEmail = NODE_ENV === 'development' ? MAILJET.MAILJET_SENDER_ADDRESS : config.email.no_reply
        const payload = {
            templateID: 7370151, 
            fromEmail,
            fromName: config.appName,
            toEmail: user.email,
            toName: user.firstName,
            subject: `Reset your ${config.appName} password`,
            variables: { firstName: user.firstName, appName: config.appName, link, configEmail: config.email.customer }
        };

        const emailData = prepareEmailData(payload);
        await initiateEMail(emailData, 'User password reset email sent!', 'Error sending user password reset email:');
    };
};

export const contactUs = () => {
    return async (user) => {
        const { name, email, message, phone } = user
        const config = getOrgConfig();

        const payload = {
            templateID: 7370296, 
            fromEmail: NODE_ENV === 'development' ? MAILJET.MAILJET_SENDER_ADDRESS : config.email.no_reply,
            fromName: config.appName,
            toEmail: NODE_ENV === 'development' ? MAILJET.MAILJET_SENDER_ADDRESS : config.email.customer,
            toName: 'Customer Team',
            subject: `Contact Us Form Submission`,
            variables: { name, email, message, phone, appName: config.appName,  }
        };

        const emailData = prepareEmailData(payload);
        await initiateEMail(emailData, 'Contact Us Form Submission email sent!', 'Error sending user Contact Us Form Submission email:');
    };
};
