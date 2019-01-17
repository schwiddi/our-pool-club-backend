const express = require('express');
const Joi = require('joi');
const isEmpty = require('lodash/isEmpty');
const db = require('../db/db_connection');
const log = require('../common/logger');
const { new_table, } = require('../schemas/joiInVal');
const tables = express.Router();

function validateNewTable(data) {
  return Joi.validate(data, new_table);
}

tables.get('/', (req, res) => {
  db.getConnection()
    .then(conn => {
      const result = conn.query('SELECT * FROM ourpooltable.t_tables;');
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

tables.post('/', (req, res) => {
  const tmp = validateNewTable(req.body);
  if (tmp.error) {
    res.status(406).send(`${tmp.error.name}: ${tmp.error.details[0].message} `);
  } else {
    db.getConnection()
      .then(conn => {
        const result = conn.query(`INSERT INTO t_tables (t_c_id, t_name) VALUES('${req.body.t_c_id}', '${req.body.t_name}');`);
        conn.release();
        return result;
      })
      .then(result => {
        db.getConnection()
          .then(conn => {
            const ret = conn.query(`SELECT t_name, t_c_id, c_ts_insert FROM t_tables WHERE t_id = ${result[0].insertId}`);
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

module.exports = tables;
