const log = require('./logger');
const db = require('../db/db_connection');

async function reqLogger(req) {
  const reqString = `req.hostname=${req.hostname} req.ip=${req.ip} req.method=${req.method} req.originalUrl=${req.originalUrl} req.path=${req.path} req.protocol=${req.protocol}`;
  log.info(`Request Logger: ${reqString}`);
  db.getConnection()
    .then(conn => {
      const result = conn.query(`INSERT INTO inf_req_log (req) VALUES ('${reqString}');`);
      conn.release();
      return result;
    })
    .catch(err => {
      log.error(err.message);
    });
}

module.exports = reqLogger;