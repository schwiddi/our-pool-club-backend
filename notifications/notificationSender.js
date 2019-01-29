const db = require('../db/db_connection');
const log = require('../common/logger');
const { completeRegistration, someTest, } = require('./templates/notificationTemplates');
const mailer = require('../mail/mailer');

function notificationSender() {
  setInterval(() => {
    let openNotifications;
    db.query('SELECT * FROM t_notification_messages WHERE n_m_sended = 0;')
      .then(rows => {
        openNotifications = rows[0];
        return;
      })
      .then(() => {
        openNotifications.forEach(function (openNotification) {
          db.query(`SELECT u_mail FROM t_users WHERE u_id = ${openNotification.n_m_userid};`)
            .then(rows => {
              let userMail = rows[0][0].u_mail;
              db.query(`SELECT n_disc FROM t_notification_types WHERE n_id = ${openNotification.n_m_nid};`)
                .then(rows => {
                  let notificationType = rows[0][0].n_disc;
                  if (notificationType === 'completeRegistration') {
                    let tmp = completeRegistration(userMail);
                    mailer.sendMail(tmp, function (error, info) {
                      if (error) {
                        log.error(error);
                      } else {
                        db.query(`UPDATE t_notification_messages SET n_m_sended = '1' WHERE (n_m_id = ${openNotification.n_m_id});`)
                          .then(() => {
                            log.info(`notificationSender: Mail sent with messageId: ${info.messageId} type: ${notificationType} and database was updated for id: ${openNotification.n_m_id}`);
                          });
                      }
                    });
                  } else if (notificationType === 'someTest') {
                    let tmp = someTest(userMail);
                    mailer.sendMail(tmp, function (error, info) {
                      if (error) {
                        log.error(error);
                      } else {
                        db.query(`UPDATE t_notification_messages SET n_m_sended = '1' WHERE (n_m_id = ${openNotification.n_m_id});`)
                          .then(() => {
                            log.info(`notificationSender: Mail sent with messageId: ${info.messageId} type: ${notificationType} and database was updated for id: ${openNotification.n_m_id}`);
                          });
                      }
                    });
                  } else {
                    log.error(`notificationSender: no template definded for: ${notificationType}`);
                  }
                });
            });
        });
      });
  }, 30000);
}

module.exports = notificationSender;