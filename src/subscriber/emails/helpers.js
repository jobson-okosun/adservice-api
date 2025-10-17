import { NODE_ENV } from "../../config/config.js";
import { sendEmail } from "../../services/mailjet/mailjet.js";
import { logger } from "../../utils/helpers.js";

export const initiateEMail = async (emailData, resolveMsg, rejectMsg) => {
    try {
        if (NODE_ENV == 'production') {
            await sendEmail(emailData);
        }

        logger.info(resolveMsg)
    } catch (error) {
        handleError(error, rejectMsg);
    }
};

export const handleError = (error, rejectMsg) => {
    if (NODE_ENV.includes('development')) {
        console.error(error);
    }

    logger.info(rejectMsg);
};