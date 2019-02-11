// https://github.com/diegohaz/arc/wiki/API-service
import 'isomorphic-fetch';
import { stringify } from 'query-string';
import Notifications from 'react-notification-system-redux';
import notifyOptions from 'services/notification';

export const getContext = () => {
  let ctx = process.env.CONTEXT ? process.env.CONTEXT : '/';
  if (ctx.length > 1 && !ctx.endsWith('/')) {
    ctx = `${ctx}/`;
  }
  return ctx;
};

export const getHomeLink = () => (
  `${getContext()}#`
);

export const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  const error = new Error(`${response.status} ${response.statusText}`);
  error.response = response;
  throw error;
};

export const parseJSON = response => response.json();

export const errorHandler = (error, dispatch) => {
  if (!error) {
    return;
  }
  if (!error.response) {
    dispatch(Notifications.error(notifyOptions({
      message: `unhandled error occured: ${error}`,
    })));
  } else {
    error.response.clone().text().then(text => window.console.log(text));
    error.response.json().then(data =>
      dispatch(Notifications.error(notifyOptions({
        message: `api request failed, reason: ${data.reason}, status: ${error.response.statusText}, path: ${error.response.url.replace(/^(?:\/\/|[^/]+)*\//, '')}`,
      }))))
      .catch(() =>
        dispatch(Notifications.error(notifyOptions({
          message: `api request failed, reason: '${error}', status: ${error.response.statusText}, path: ${error.response.url.replace(/^(?:\/\/|[^/]+)*\//, '')}`,
        }))));
  }
};

export const parseSettings = ({
  method = 'get', data, locale, ...otherSettings
} = {}) => {
  let l = locale;
  if (!locale) {
    l = 'en-US';
  }
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    'Accept-Language': l,
  };
  const settings = {
    body: data ? JSON.stringify(data) : undefined,
    method,
    credentials: 'same-origin',
    headers,
    ...otherSettings,
  };
  return settings;
};

export const baseUrl = () => {
  const testmode = process.env.NODE_ENV === 'test';
  return `${testmode ? 'http://localhost' : ''}${getContext()}api/v1`;
};

export const parseEndpoint = (endpoint, params) => {
  const querystring = params ? `?${stringify(params)}` : '';

  if (endpoint.indexOf('http') === 0) {
    return `${endpoint}${querystring}`;
  }

  let ep = endpoint;
  if (endpoint.startsWith('/')) {
    ep = endpoint.slice(1);
  }

  ep = ep.split('/').map(x => encodeURIComponent(x)).join('/');
  return `${baseUrl()}/${ep}${querystring}`;
};

const api = {};

api.request = (endpoint, { params, ...settings } = {}) =>
  fetch(parseEndpoint(endpoint, params), parseSettings(settings)).then(checkStatus).then(parseJSON);
['delete', 'get'].forEach((method) => {
  api[method] = (endpoint, settings) => api.request(endpoint, { method, ...settings });
});
['post', 'put', 'patch'].forEach((method) => {
  api[method] = (endpoint, data, settings) => api.request(endpoint, { method, data, ...settings });
});

api.create = (apiSettings = {}) => ({
  settings: apiSettings,

  setToken(token) {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: `Bearer ${token}`,
    };
  },

  unsetToken() {
    this.settings.headers = {
      ...this.settings.headers,
      Authorization: undefined,
    };
  },

  request(endpoint, settings) {
    return api.request(endpoint, { ...this.settings, ...settings });
  },

  post(endpoint, data, settings) {
    return this.request(endpoint, { method: 'post', data, ...settings });
  },

  get(endpoint, settings) {
    return this.request(endpoint, { method: 'get', ...settings });
  },

  put(endpoint, data, settings) {
    return this.request(endpoint, { method: 'put', data, ...settings });
  },

  patch(endpoint, data, settings) {
    return this.request(endpoint, { method: 'patch', data, ...settings });
  },

  delete(endpoint, settings) {
    return this.request(endpoint, { method: 'delete', ...settings });
  },
});

export default api;
