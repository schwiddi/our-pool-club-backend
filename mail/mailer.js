const nodemailer = require('nodemailer');

const smtpConfig = {
  host: 'smtp.gmail.com',
  port: 587, // 465 / 587
  tls: {
    ciphers: 'SSLv3',
    rejectUnauthorized: false,
  },
  debug: false,
  auth: {
    user: process.env.BACKEND_MAIL_USER,
    pass: process.env.BACKEND_MAIL_PASSWORD,
  },
};

// create transport middleware with smtpconfig
var mailTransporter = nodemailer.createTransport(smtpConfig);

module.exports = mailTransporter;
