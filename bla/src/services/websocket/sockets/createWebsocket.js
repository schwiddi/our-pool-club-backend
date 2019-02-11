const createWebsocket = (uri, ressource, handlers) => {
  const websocket = new WebSocket(uri, ressource);

  websocket.onopen = handlers.onopen;
  websocket.onmessage = handlers.onmessage;
  websocket.onclose = handlers.onclose;
  websocket.onerror = handlers.onerror;

  return websocket;
};

export default createWebsocket;
