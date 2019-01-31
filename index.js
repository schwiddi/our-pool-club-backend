require('dotenv').config();
const http = require('http');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const { createTerminus, } = require('@godaddy/terminus');
const socket = require('socket.io');
const { httpPort, } = require('./common/port');
const log = require('./common/logger');
const reqLogger = require('./common/reqLogger');
const db = require('./db/db_connection');
const api = require('./api/index');
const notificationGenerator = require('./notifications/notificationGenerator');
const notificationSender = require('./notifications/notificationSender');

log.info(`NODE_ENV: ${process.env.NODE_ENV}`);
log.info(`LogLevel: ${log.getLevel()}`);

const app = express();
app.use((req, res, next) => {
  reqLogger(req);
  next();
});
app.use(cors());
app.use(express.json());
app.use(compression());
app.use('/api/v1/', api);

async function onSignal() {
  // eslint-disable-next-line no-console
  console.log('signal received... server is starting cleanup');
  return Promise.all([
    db.end(),
    server.close(),
  ]);
}

function onShutdown() {
  // eslint-disable-next-line no-console
  console.log('cleanup finished, server is shutting down');
  process.exit(0);
}

function healthCheck() {
  log.info('healthcheck called');
  return Promise.resolve('Success');
}

const options = {
  healthChecks: {
    '/healthcheck': healthCheck,
  },
  timeout: 1000,
  onShutdown,
  onSignal,
};

const server = http.createServer(app);
const ws = socket(server);

try {
  createTerminus(server, options);
  server.listen(httpPort, () => {
    log.info(`Server is up and running on ${httpPort}`);
  });
  notificationGenerator();
  notificationSender();
} catch (error) {
  log.error(error);
}

ws.on('connection', function (socket) {
  log.info(`socket: new client ${socket.id}`);

  socket.on('my_event', (arg1, arg2) => {
    log.info(`socket: new message from client ${socket.id} -> ${arg1} -> ${arg2}`);
    ws.emit('my_event', 'Hi there!');
  });

  socket.on('disconnect', function () {
    log.info('socket: connection closed');
  });
});