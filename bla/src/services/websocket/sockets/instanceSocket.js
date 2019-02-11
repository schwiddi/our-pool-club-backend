import { unstable_batchedUpdates as bachedUpdates } from 'react-dom';
import { updateActiveInstance } from '../../../store/instances/actions';
import { onOpen, onCloseRestart, onError } from './defaultHandlers';
import createWebsocket from './createWebsocket';


const instanceSocket = (uri, store) => {
  const onMessage = (event) => {
    const Console = window.console;
    try {
      const message = JSON.parse(event.data);
      bachedUpdates(() => {
        store.dispatch(updateActiveInstance(message));
      });
    } catch (err) {
      Console.error(`${err} in ${event.data}`);
    }
  };

  const handlers = {
    onopen: onOpen(store),
    onmessage: onMessage,
    onclose: onCloseRestart(instanceSocket, uri, store), // MULE-688 (Workaround for issue)
    onerror: onError(store),
  };

  return createWebsocket(uri, 'update_instance', handlers);
};

export default instanceSocket;
