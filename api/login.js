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
      db.query(`SELECT * FROM t_users WHERE u_mail = '${req.body.mail}';`)
        .then(rows => {
          if (isEmpty(rows[0])) {
            res.sendStatus(400);
            log.warn(`login with unknown mail! ${req.body.mail}`);
          } else {
            bcrypt.compare(req.body.password, rows[0][0].u_password)
              .then(compRes => {
                if (compRes) {
                  const jwtToken = jwt.sign(
                    {
                      u_id: rows[0][0].u_id,
                      u_name: rows[0][0].u_name,
                      u_mail: rows[0][0].u_mail,
                      u_ts_insert: rows[0][0].u_ts_insert,
                    },
                    process.env.BACKEND_JWT_KEY,
                    {
                      expiresIn: process.env.BACKEND_JWT_EXPIRE,
                    }
                  );
                  res
                    .status(200)
                    .header('x-auth-token', jwtToken)
                    .header('access-control-expose-headers', 'x-auth-token')
                    .send('OK');

                  log.info(`user ${req.body.mail} successfull auth and new token generated ${jwtToken}`);
                } else {
                  res.sendStatus(400);
                  log.warn(`login with wrong password!! ${req.body.mail} and pw: ${req.body.password}`);
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
      res.sendStatus(400);
      log.warn(`Joi: ${err.message}`);
    });
});

module.exports = login;