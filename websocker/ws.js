const log = require('../common/logger');

global.io.on('connection', (client) => {
  log.info(`socket: new client ${client.id}`);

  client.on('timer', (msg) => {
    if (msg === 'start') {
      setInterval(() => {
        const date = new Date();
        client.emit('timer', date);
      }, 1000);
    } else {
      client.emit('timer', 'use the string start to start the timer');
    }
  });

  client.on('error', () => {
    log.error(`socket: got error on client ${client.id}`);
  });

  client.on('disconnect', () => {
    log.info('socket: connection closed');
  });
});