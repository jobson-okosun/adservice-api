import Mailjet from 'node-mailjet';
import { MAILJET } from '../../config/config.js';

const setupMailjet = () => {
    return Mailjet.apiConnect(MAILJET.MAILJET_API_KEY, MAILJET.MAILJET_SECRET_KEY).post("send", { version: "v3.1" });
};

export const sendEmail = async (emailData) => {
    return new Promise((resolve, reject) => {
        setupMailjet().request(emailData)
            .then((response) => {
                resolve(response.body);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

export const prepareEmailData = (payload) => {
    const { templateID, fromEmail, fromName, toEmail, toName, subject, variables } = payload;
    return {
        Messages: [
            {
                From: {
                    Email: fromEmail,
                    Name: fromName[0]?.toUpperCase()?.concat(fromName?.slice(1)),
                },
                To: [
                    {
                        Email: toEmail,
                        Name: toName[0]?.toUpperCase()?.concat(toName?.slice(1)),
                    },
                ],
                TemplateID: templateID,
                TemplateLanguage: true,
                Subject: subject,
                Variables: variables,
            },
        ],
    };
};