const snl = require('simple-node-logger');

const opts = {
  logFilePath: './log/app.log',
  timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};

const log = snl.createSimpleLogger(opts);

if (process.env.NODE_ENV === 'dev') {
  log.setLevel('debug');
} else {
  log.setLevel('info');
}

module.exports = log;
