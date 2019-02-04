const express = require('express');
const Joi = require('joi');
const isEmpty = require('lodash/isEmpty');
const bcrypt = require('bcrypt');
const log = require('../common/logger');
const db = require('../db/db_connection');
const { new_user, } = require('../schemas/joiInVal');
const users = express.Router();
const md5 = require('md5');

users.get('/', (req, res) => {
  db.query('SELECT u_id, u_name, u_mail, u_ts_insert, u_ts_update FROM t_users')
    .then(rows => {
      if (isEmpty(rows[0])) {
        res.sendStatus(204);
      } else {
        res.status(200).send(rows[0]);
      }
    })
    .catch(err => {
      res.sendStatus(500);
      log.error(err.message);
    });
});

users.get('/:u_id', (req, res) => {
  db.query(`SELECT u_id, u_name, u_mail, u_ts_insert, u_ts_update FROM t_users WHERE u_id = ${req.params.u_id}`)
    .then(rows => {
      if (isEmpty(rows[0])) {
        res.sendStatus(204);
      } else {
        res.status(200).send(rows[0][0]);
      }
    })
    .catch(err => {
      res.sendStatus(500);
      log.error(err.message);
    });
});

users.post('/', (req, res) => {
  Joi.validate(req.body, new_user)
    .then(() => {
      const registerKey = md5(`${req.body.u_mail}${req.body.u_name}${new Date()}`);
      bcrypt.hash(req.body.u_password, 10)
        .then(hashedpw => {
          db.query(`INSERT INTO t_users (u_name, u_mail, u_password, u_registration_key) VALUES('${req.body.u_name}', '${req.body.u_mail}', '${hashedpw}', '${registerKey}');`)
            .then(rows => {
              db.query(`SELECT u_id, u_name, u_mail, u_ts_insert FROM t_users WHERE u_id = ${rows[0].insertId}`)
                .then(rows => {
                  if (isEmpty(rows[0])) {
                    res.sendStatus(500);
                  } else {
                    res.status(201).send(rows[0][0]);
                  }
                })
                .catch(err => {
                  res.sendStatus(500);
                  log.error(`db: ${err.message}`);
                });
            })
            .catch(err => {
              res.sendStatus(500);
              log.error(`db: ${err.message}`);
            });
        })
        .catch(err => {
          res.sendStatus(500);
          log.error(`bcrypt: ${err.message}`);
        });
    })
    .catch(err => {
      res.status(400).send(`${err.name}: ${err.details[0].message} `);
      log.warn(`Joi: ${err.message}`);
    });
});

users.get('/completeRegistration/:regKey', (req, res) => {
  db.query(`SELECT * FROM t_users WHERE u_registration_key = '${req.params.regKey}' AND u_active = 0;`)
    .then(rows => {
      if (isEmpty(rows[0])) {
        res.sendStatus(400);
        log.warn('unknown or allready used regKey!!!');
      } else {
        db.query(`UPDATE t_users SET u_active = '1' WHERE (u_id = '${rows[0][0].u_id}');`)
          .then(() => {
            res.sendStatus(200);
            log.info(`user activated ${rows[0][0].u_mail}`);
          }).catch(err => {
            res.sendStatus(500);
            log.error(err.message);
          });
      }
    })
    .catch(err => {
      res.sendStatus(500);
      log.error(err.message);
    });
});

module.exports = users;
