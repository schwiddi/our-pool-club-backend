const log = require('../common/logger');
const db = require('../db/db_connection');
const isEmpty = require('lodash/isEmpty');
const mailTransporter = require('./mailer');
const { returnRegisterMail, } = require('../notifications/templates/notificationTemplates');

function sendRegisterMail(user) {
  mailTransporter.sendMail(returnRegisterMail(user.u_mail), function (error, info) {
    if (error) {
      log.info(error);
    } else {
      log.info(`registerMail sent to ${user.u_mail} messageId: ${info.messageId}`);
    }
  });
}

function mailDeamon() {
  // setInterval(() => {
  //   db.getConnection()
  //     .then(conn => {
  //       const result = conn.query('SELECT u_id, u_mail FROM t_users WHERE u_active = 0');
  //       conn.release();
  //       return result;
  //     })
  //     .then(result => {
  //       if (isEmpty(result[0])) {
  //         log.info('mailDeamon: no inactive users found');
  //       } else {
  //         log.info('mailDeamon: inactive users found');
  //         result[0].forEach(sendRegisterMail);
  //       }
  //       return result;
  //     })
  //     .then(result => {
  //       db.getConnection()
  //         .then(conn => {
  //           result[0].forEach((user) => {
  //             conn.query(`UPDATE t_users SET u_active = 1 WHERE u_id = '${user.u_id}'`);
  //           });
  //           conn.release();
  //         });
  //     })
  //     .catch(err => {
  //       log.error(err.message);
  //     });
  // }, 100000);
}

module.exports = mailDeamon;
