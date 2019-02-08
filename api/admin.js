const express = require('express');
const log = require('../common/logger');
const db = require('../db/db_connection');
const admin = express.Router();
// const heapdump = require('heapdump');

admin.get('/clearall', (req, res) => {
  if (process.env.NODE_ENV === 'dev') {
    db.query('TRUNCATE inf_req_log;')
      .then(() => {
        return db.query('TRUNCATE t_clubs;');
      })
      .then(() => {
        return db.query('TRUNCATE t_notification_messages;');
      })
      .then(() => {
        return db.query('TRUNCATE t_rel_user_clubs;');
      })
      .then(() => {
        return db.query('TRUNCATE t_users;');
      })
      .then(() => {
        log.warn('truncated all tables...');
        res.sendStatus(200);
      })
      .catch(err => {
        res.sendStatus(500);
        log.error(err.message);
      });
  } else {
    res.sendStatus(400);
    log.warn('DB truncate only on dev allowed!!!');
  }
});

// admin.get('/heapdump', (req, res) => {
//   if (process.env.NODE_ENV === 'dev') {
//     res.sendStatus(200);
//     process.chdir('./dumps');
//     heapdump.writeSnapshot();
//     // eslint-disable-next-line no-console
//     console.log('!!! heapdump was called ... exit now..');
//     process.exit(0);
//   } else {
//     res.sendStatus(400);
//     log.warn('Heapdump endpoint is only on dev allowed to use..');
//   }
// });

module.exports = admin;
