const express = require('express');
const Joi = require('joi');
const isEmpty = require('lodash/isEmpty');
const db = require('../db/db_connection');
const log = require('../common/logger');
const { new_club, } = require('../schemas/joiInVal');
const clubs = express.Router();

clubs.get('/', (req, res) => {
  db.query('SELECT * FROM t_clubs;')
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

clubs.get('/:c_id', (req, res) => {
  db.query(`SELECT c_id, c_name, c_description, c_initiator, c_ts_insert, c_ts_update FROM t_clubs WHERE c_id = ${req.params.c_id}`)
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

clubs.post('/', (req, res) => {
  Joi.validate(req.body, new_club)
    .then(() => {
      db.query(`INSERT INTO t_clubs (c_name, c_description, c_initiator) VALUES('${req.body.c_name}', '${req.body.c_description}', '${req.body.c_iniator}');`)
        .then(rows => {
          return db.query(`SELECT c_id, c_name, c_description, c_initiator, c_ts_insert FROM t_clubs WHERE c_id = ${rows[0].insertId}`);
        })
        .then(rows => {
          if (isEmpty(rows[0])) {
            res.sendStatus(500);
          } else {
            res.status(201).send(rows[0][0]);
          }
        })
        .catch(err => {
          res.sendStatus(500);
          log.error(err.message);
        });
    })
    .catch(err => {
      res.status(400).send(`${err.name}: ${err.details[0].message} `);
      log.warn(`Joi: ${err.message}`);
    });
});

module.exports = clubs;
