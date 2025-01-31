const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Fezafundapp@gmail.com",
    pass: "rxfpycwnxmmvqqbw",
  },
});

exports.Helpers = {
  sendEmail: async function (email, info) {
    const templatePath = path.join(
      __dirname,
      "../templates",
      "emailTemplate.ejs"
    );

    const html = await ejs.renderFile(templatePath, {
      info: info,
    });

    const mailOptions = {
      from: `"RICA-IMPORT" <Fezafundapp@gmail.com>`,
      to: email,
      subject: "Thank you for your application",
      html: html,
    };

    const _info = await transporter.sendMail(mailOptions);
    return { info: _info };
  },
};
