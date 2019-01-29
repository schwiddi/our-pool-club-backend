const express = require('express');
const Joi = require('joi');
const isEmpty = require('lodash/isEmpty');
const bcrypt = require('bcrypt');
const log = require('../common/logger');
const db = require('../db/db_connection');
const { new_user, } = require('../schemas/joiInVal');
const users = express.Router();

function validateNewUser(data) {
  return Joi.validate(data, new_user);
}

// later you should protect this route that only admins can get that
users.get('/', (req, res) => {
  db.getConnection()
    .then(conn => {
      const result = conn.query('SELECT u_id, u_name, u_mail, u_ts_insert, u_ts_update FROM t_users');
      conn.release();
      return result;
    })
    .then(result => {
      if (isEmpty(result[0])) {
        res.sendStatus(204);
      } else {
        res.status(200).send(result[0]);
      }
    })
    .catch(err => {
      res.sendStatus(500);
      log.error(err.message);
    });
});

users.get('/:u_id', (req, res) => {
  db.getConnection()
    .then(conn => {
      const result = conn.query(`SELECT u_id, u_name, u_mail, u_ts_insert, u_ts_update FROM t_users WHERE u_id = ${req.params.u_id}`);
      conn.release();
      return result;
    })
    .then(result => {
      if (isEmpty(result[0])) {
        res.sendStatus(204);
      } else {
        res.status(200).send(result[0][0]);
      }
    })
    .catch(err => {
      res.sendStatus(500);
      log.error(err.message);
    });
});

users.post('/', (req, res) => {
  const tmp = validateNewUser(req.body);
  if (tmp.error) {
    res.status(406).send(`${tmp.error.name}: ${tmp.error.details[0].message} `);
  } else {
    bcrypt.hash(req.body.u_password, 10)
      .then(hashedpw => {
        db.getConnection()
          .then(conn => {
            const result = conn.query(`INSERT INTO t_users (u_name, u_mail, u_password) VALUES('${req.body.u_name}', '${req.body.u_mail}', '${hashedpw}');`);
            conn.release();
            return result;
          })
          .then(result => {
            db.getConnection()
              .then(conn => {
                const ret = conn.query(`SELECT u_id, u_name, u_mail, u_ts_insert FROM t_users WHERE u_id = ${result[0].insertId}`);
                conn.release();
                return ret;
              })
              .then(ret => {
                if (isEmpty(ret[0])) {
                  res.sendStatus(500);
                } else {
                  res.status(201).send(ret[0][0]);
                }
              })
              .catch(err => {
                res.sendStatus(500);
                log.error(err.message);
              });
          })
          .catch(err => {
            res.sendStatus(500);
            log.error(err.message);
          });
      })
      .catch(err => {
        res.sendStatus(500);
        log.error(err.message);
      });
  }
});

module.exports = users;
