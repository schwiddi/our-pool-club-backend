const snl = require('simple-node-logger');

const opts = {
  logFilePath: './log/app.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};

const logger = snl.createSimpleLogger(opts);

if (process.env.NODE_ENV === 'dev') {
  logger.setLevel('debug');
} else {
  logger.setLevel('info');
}

module.exports = logger;
