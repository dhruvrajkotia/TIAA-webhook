"use strict";

const nodemailer = require("nodemailer");
const config = require("../config")();
const logger = require("../lib/logger");

module.exports = async (mailDetails, fileName ,attachment) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        auth: {
            type: "OAuth2",
            user: config.mailer.email,
            clientId: config.mailer.clientId,
            clientSecret: config.mailer.clientSecret,
            refreshToken: config.mailer.refreshToken
        }
    });

    let mailOptions = {
        from: `${mailDetails.title} <${config.mailer.email}>`,
        to: mailDetails.email,
        subject: "Payment Confirmation",
        html: mailDetails.html
    };

    if (attachment){
        mailOptions["attachments"] = [{
            filename: `${fileName}.pdf`,
            content : attachment
        }];
    }

    await transporter.sendMail(mailOptions);
    logger.log("info", "Mail Sent", null);
};
