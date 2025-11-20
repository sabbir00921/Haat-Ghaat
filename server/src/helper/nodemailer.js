const nodemailer = require("nodemailer");
const { customError } = require("../utils/customError");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.HOST_MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

exports.mailer = async (subject, template, email) => {
  try {
    const info = await transporter.sendMail({
      from: `"VIRUS COMPUTER" <sabbir000921@gmail.com>`,
      to: email,
      subject,
      html: template,
    });

    return info;
  } catch (error) {
    throw new customError(500, "Email sending failed: " + error.message);
  }
};
