const db = require('../db/db_connection');
const log = require('../common/logger');

function notificationWriter() {
  db.getConnection()
    .then(conn => {
      var allNotifications = conn.query('SELECT * FROM t_notification_types;');
      conn.release();
      return allNotifications;
    })
    .then((allNotifications) => {
      db.getConnection()
        .then(conn => {
          var allUsers = conn.query('SELECT * FROM t_users;');
          conn.release();
          return allUsers, allNotifications;
        })
        .then((allUsers, allNotifications) => {
          console.log(allUsers[0]);
          console.log(allNotifications[0]);
        })
        .catch(err => {
          log.error(err.message);
          return false;
        });
    })
    .catch(err => {
      log.error(err.message);
      return false;
    });
}

function getAllUsers() {
  db.getConnection()
    .then(conn => {
      const result = conn.query('SELECT * FROM t_users;');
      conn.release();
      log.info('notification: getAllUsers called');
      return result;
    })
    .catch(err => {
      log.error(err.message);
      return false;
    });
}

function getAllNotifications() {
  db.getConnection()
    .then(conn => {
      const result = conn.query('SELECT * FROM t_notification_types;');
      conn.release();
      log.info('notification: getAllPossibleNotifications called');
      return result;
    })
    .catch(err => {
      log.error(err.message);
      return false;
    });
}

function getAllWritenNotificationForOneUser(userId) {
  db.getConnection()
    .then(conn => {
      const result = conn.query(`SELECT * FROM t_notification_messages WHERE n_m_userid = ${userId};`);
      conn.release();
      log.info(`notification: getAllWritenNotificationForOneUser ${userId} called`);
      return result;
    })
    .catch(err => {
      log.error(err.message);
      return false;
    });
}

module.exports = notificationWriter;