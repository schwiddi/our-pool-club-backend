import get from 'lodash/get';

const isWebsocketConnected = state => (
  get(state, 'websockets.connected', false)
);

export default isWebsocketConnected;
