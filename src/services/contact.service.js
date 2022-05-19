const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
var fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
      throw err;
    } else {
      callback(null, html);
    }
  });
};

const mailService = (data, callback) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });

  readHTMLFile(
    path.join(__dirname, "../templates/mail.html"),
    (error, html) => {
      if (error) {
        console.error(error);
      }
      const template = handlebars.compile(html);
      const replacement = {
        fullName: data.fullName,
      };
      const htmlToSend = template(replacement);
      let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: [data.email, process.env.MAIL_USERNAME],
        subject: "TRIODEL",
        html: htmlToSend,
      };

      transporter.sendMail(mailOptions, (error, data) => {
        if (error) {
          return callback(error);
        }
        return callback(null, data);
      });
    }
  );
};

module.exports = { mailService: mailService };
