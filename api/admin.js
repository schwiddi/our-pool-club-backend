const express = require('express');
const log = require('../common/logger');
const db = require('../db/db_connection');
const admin = express.Router();

admin.get('/clearall', (req, res) => {
  if (process.env.NODE_ENV === 'dev') {
    db.getConnection()
      .then(conn => {
        conn.query('TRUNCATE inf_req_log;');
        conn.query('TRUNCATE t_clubs;');
        conn.query('TRUNCATE t_rel_club_tables;');
        conn.query('TRUNCATE t_rel_user_clubs;');
        conn.query('TRUNCATE t_tables;');
        conn.query('TRUNCATE t_users;');
        conn.release();
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

module.exports = admin;
