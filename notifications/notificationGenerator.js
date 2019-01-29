const isEmpty = require('lodash/isEmpty');
const db = require('../db/db_connection');
const log = require('../common/logger');

function notificationGenerator() {
  setInterval(() => {
    let users, types;
    db.query('SELECT * FROM t_users;')
      .then(rows => {
        users = rows[0];
        return db.query('SELECT * FROM t_notification_types;');
      })
      .then(rows => {
        types = rows[0];
        return;
      })
      .then(() => {
        users.forEach(function (user) {
          types.forEach(function (type) {
            db.query(`SELECT * FROM t_notification_messages WHERE n_m_userid = ${user.u_id} AND n_m_nid = ${type.n_id};`)
              .then(rows => {
                if (isEmpty(rows[0])) {
                  db.query(`INSERT INTO t_notification_messages (n_m_userid, n_m_nid) VALUES (${user.u_id}, ${type.n_id});`)
                    .then(() => {
                      log.info(`notificationGenerator: Inserted new notification ${type.n_id} for user ${user.u_id}`);
                    });
                }
                return;
              });
          });
        });
      });
  }, 30000);
}

module.exports = notificationGenerator;