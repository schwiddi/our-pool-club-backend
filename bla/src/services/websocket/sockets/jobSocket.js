import { onOpen, onCloseRestart, onError } from './defaultHandlers';
import createWebsocket from './createWebsocket';
import { updateJob } from '../../../store/jobs/actions';

const jobSocket = (uri, store) => {
  const onMessage = (event) => {
    const Console = window.console;
    try {
      const job = JSON.parse(event.data);
      store.dispatch(updateJob(job));
    } catch (err) {
      Console.error(`${err} in ${event.data}`);
    }
  };

  const handlers = {
    onopen: onOpen(store),
    onmessage: onMessage,
    onclose: onCloseRestart(jobSocket, uri, store), // MULE-688 (Workaround for issue)
    onerror: onError(store),
  };

  return createWebsocket(uri, 'update_job', handlers);
};

export default jobSocket;
