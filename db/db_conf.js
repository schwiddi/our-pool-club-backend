const dbconfig = {
  host: process.env.BACKEND_DB_HOST,
  user: process.env.BACKEND_DB_USER,
  database: process.env.BACKEND_DB_DATABASE,
  password: process.env.BACKEND_DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

module.exports = dbconfig;
