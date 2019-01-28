const db = require('../db/db_connection');

function notificationSender() {
  setTimeout(() => {
    let openNotifications;
    db.query('SELECT * FROM t_notification_messages WHERE n_m_sended = 0;')
      .then(rows => {
        openNotifications = rows[0];
        openNotifications.forEach(function (openNotification) {
          console.log(openNotification);
          db.query(`SELECT u_mail FROM t_users WHERE u_id = ${openNotification.n_m_userid};`)
            .then(rows => {
              let userMail = rows[0];
              console.log(userMail);
              db.query(`SELECT n_disc FROM t_notification_types WHERE n_id = ${openNotification.n_m_nid};`)
                .then(rows => {
                  console.log(rows);
                });
            });
        });
      });

    // db.query('SELECT u_id, u_name, u_mail FROM t_users;')
    //   .then(rows => {
    //     users = rows[0];
    //     console.log(users);
    //     return db.query('SELECT * FROM ourpooltable.t_notification_types;');
    //   })
    //   .then(rows => {
    //     notificationTypes = rows[0];
    //     console.log(notificationTypes);
    //     return db.query('SELECT n_m_nid, n_m_userid FROM ourpooltable.t_notification_messages WHERE n_m_sended = 0;');
    //   })
    //   .then(rows => {
    //     openNotifications = rows[0];
    //     console.log(openNotifications);
    //   })
    //   .then(() => {
    //     openNotifications.forEach(openNotification => {
    //       // get Notification
    //       const notificationId = openNotification.n_m_nid;
    //       const nofificationFunction = 
    //     });
  }, 1000);
}

module.exports = notificationSender;