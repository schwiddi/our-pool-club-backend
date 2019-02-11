import sockets from './sockets';

const configureWebsocket = (store) => {
  const { location } = window;
  let protocol;
  if (location.protocol === 'https:') {
    protocol = 'wss:';
  } else {
    protocol = 'ws:';
  }

  let path = location.pathname === '/' ? '' : location.pathname;
  if (path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  const uri = `${protocol}//${location.host}${path}/api/v1/discovery/updates`;
  sockets.forEach(socket => socket(uri, store));
};

export default configureWebsocket;
