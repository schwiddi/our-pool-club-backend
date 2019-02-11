import Notifications from 'react-notification-system-redux';
import { wsOnOpen, wsOnClose, wsOnError } from 'store/websockets/actions';
import notifyOptions from 'services/notification';

export const onOpen = store => () => {
  store.dispatch(wsOnOpen());
};

export const onClose = store => () => {
  store.dispatch(Notifications.warning(notifyOptions({
    title: 'Websocket closed',
    message:
          'Will reconnect! If this message reoccurs over and over, please reload your browser',
  })));

  store.dispatch(wsOnClose());
};

export const onError = store => () => {
  store.dispatch(Notifications.warning(notifyOptions({
    title: 'Error on websocket',
    message:
          'Will reconnect! If this message reoccurs over and over, please reload your browser',
  })));
  store.dispatch(wsOnError());
};

// MULE-688 (Workaround for issue: try restart after 3000ms)
export const onCloseRestart = (socket, uri, store) => () => {
  store.dispatch(wsOnClose());
  setTimeout(() => socket(uri, store), 3000);
};
