const express = require('express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const isEmpty = require('lodash/isEmpty');
const bcrypt = require('bcrypt');
const db = require('../db/db_connection');
const log = require('../common/logger');
const { new_login, } = require('../schemas/joiInVal');
const login = express.Router();

login.post('/', (req, res) => {
  Joi.validate(req.body, new_login)
    .then(() => {
      db.getConnection()
        .then(conn => {
          const dbres = conn.query(`SELECT * FROM t_users WHERE u_mail = '${req.body.mail}';`);
          conn.release();
          return dbres;
        })
        .then((dbres) => {
          if (isEmpty(dbres[0])) {
            res.sendStatus(400);
            log.error('no password found for given user... suspect...');
          } else {
            bcrypt.compare(req.body.password, dbres[0][0].u_password)
              .then(compRes => {
                if (compRes) {
                  const jwtToken = jwt.sign(
                    {
                      u_id: dbres[0][0].u_id,
                      u_name: dbres[0][0].u_name,
                      u_mail: dbres[0][0].u_mail,
                      u_ts_insert: dbres[0][0].u_ts_insert,
                      u_ts_update: dbres[0][0].u_ts_update,
                    },
                    process.env.BACKEND_JWT_KEY,
                    {
                      expiresIn: process.env.BACKEND_JWT_EXPIRE,
                    }
                  );
                  log.info(`token generated: ${jwtToken}`);
                  res
                    .status(200)
                    .header('x-auth-token', jwtToken)
                    .header('access-control-expose-headers', 'x-auth-token')
                    .send('OK');
                } else {
                  res.sendStatus(400);
                  log.error('bcrypt compare was false... supsect...');
                }
              })
              .catch(err => {
                res.sendStatus(500);
                log.error(err.message);
              });
          }
        })
        .catch(err => {
          res.sendStatus(500);
          log.error(err.message);
        });
    })
    .catch(err => {
      res.status(400).send(err.details[0].message);
      log.error(`login validation: ${err.message}`);
    });
});

module.exports = login;