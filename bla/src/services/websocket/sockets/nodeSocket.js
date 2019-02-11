import { onOpen, onCloseRestart, onError } from './defaultHandlers';
import createWebsocket from './createWebsocket';
import { updateNode } from '../../../store/nodes/actions';

const nodeSocket = (uri, store) => {
  const onMessage = (event) => {
    const Console = window.console;
    try {
      store.dispatch(updateNode(JSON.parse(event.data)));
    } catch (err) {
      Console.error(`${err} in ${event.data}`);
    }
  };

  const handlers = {
    onopen: onOpen(store),
    onmessage: onMessage,
    onclose: onCloseRestart(nodeSocket, uri, store), // MULE-688 (Workaround for issue)
    onerror: onError(store),
  };

  return createWebsocket(uri, 'update_node', handlers);
};

export default nodeSocket;
