const mysql = require('mysql2/promise');
const dbconfig = require('./db_conf');

const db = mysql.createPool(dbconfig);

module.exports = db;
