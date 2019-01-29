const express = require('express');
const Joi = require('joi');
const isEmpty = require('lodash/isEmpty');
const db = require('../db/db_connection');
const log = require('../common/logger');
const { new_club, } = require('../schemas/joiInVal');
const clubs = express.Router();

function validateNewClub(data) {
  return Joi.validate(data, new_club);
}

clubs.get('/', (req, res) => {
  db.getConnection()
    .then(conn => {
      const result = conn.query('SELECT * FROM t_clubs;');
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

clubs.get('/:c_id', (req, res) => {
  db.getConnection()
    .then(conn => {
      const result = conn.query(`SELECT c_id, c_name, c_description, c_initiator, c_ts_insert, c_ts_update FROM t_clubs WHERE c_id = ${req.params.c_id}`);
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

clubs.post('/', (req, res) => {
  const tmp = validateNewClub(req.body);
  if (tmp.error) {
    res.status(406).send(`${tmp.error.name}: ${tmp.error.details[0].message}`);
  } else {
    db.getConnection()
      .then(conn => {
        const result = conn.query(`INSERT INTO t_clubs (c_name, c_description, c_initiator) VALUES('${req.body.c_name}', '${req.body.c_description}', '${req.body.c_iniator}');`);
        conn.release();
        return result;
      })
      .then(result => {
        db.getConnection()
          .then(conn => {
            const ret = conn.query(`SELECT c_id, c_name, c_description, c_initiator, c_ts_insert FROM t_clubs WHERE c_id = ${result[0].insertId}`);
            conn.release();
            return ret;
          })
          .then(ret => {
            if (isEmpty(ret[0])) {
              res.sendStatus(500);
            } else {
              res.status(201).send(ret[0]);
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
  }
});

module.exports = clubs;
