const nodemailer = require("nodemailer");
const { customError } = require("../utils/customError");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.HOST_MAIL,
    pass: process.env.APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  logger: true,   // ADD THIS
  debug: true     // ADD THIS
});

exports.mailer = async (subject, template, email) => {
  try {
    const info = await transporter.sendMail({
      from: '"VIRUS COMPUTER" <sabbir000921@gmail.com>',
      to: email,
      subject: subject,
      html: template,
    });
    // console.log(info.messageId);
    return info;
  } catch (error) {
    throw new customError(500, "Email sending failed" + error.message);
  }
};
