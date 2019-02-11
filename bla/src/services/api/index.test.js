import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import api, { checkStatus, parseJSON, parseSettings, parseEndpoint, baseUrl, errorHandler, getHomeLink } from '.';

const BASE_URL = process.env.CONTEXT ? `http://localhost${process.env.CONTEXT}/api/v1` : 'http://localhost/api/v1';

describe('test static links', () => {
  it('should get the home link of mule', () => {
    if (!process.env.CONTEXT) {
      expect(getHomeLink()).toBe('/#');
    } else {
      expect(getHomeLink()).toBe('/mule/#');
    }
  });
});

describe('baseUrl', () => {
  it('it generates valid base URL ', () => {
    expect(baseUrl()).toBe(BASE_URL);
  });
});

describe('checkStatus', () => {
  it('returns response when it is ok', () => {
    const response = { ok: true };
    expect(checkStatus(response)).toBe(response);
  });

  it('throws when it is not ok', () => {
    const response = { ok: false };
    expect(() => checkStatus(response)).toThrow();
  });
});

describe('parseJSON', () => {
  it('calls response.json', () => {
    const response = {
      json: jest.fn(() => 'foo'),
    };
    expect(parseJSON(response)).toBe('foo');
  });
});

describe('parseSettings', () => {
  it('has method get by default', () => {
    expect(parseSettings().method).toBe('get');
  });

  it('has normal body', () => {
    expect(parseSettings({ body: 'foo' }).body).toBe('foo');
  });

  it('has data body', () => {
    expect(parseSettings({ data: { foo: 'bar' } }).body).toBe(JSON.stringify({ foo: 'bar' }));
  });

  it('has passed method', () => {
    expect(parseSettings({ method: 'post' }).method).toBe('post');
  });
});

describe('parseEndpoint', () => {
  it('appends endpoint to apiUrl', () => {
    expect(parseEndpoint('/foo')).toBe(`${BASE_URL}/foo`);
  });

  it('it encodes endpoints', () => {
    expect(parseEndpoint('/foo@/bar')).toBe(`${BASE_URL}/foo%40/bar`);
  });

  it('parses params', () => {
    expect(parseEndpoint('/foo', { bar: 'baz' })).toBe(`${BASE_URL}/foo?bar=baz`);
  });

  it('parses url other than apiUrl', () => {
    expect(parseEndpoint('https://foo.bar/baz')).toBe('https://foo.bar/baz');
  });
});

describe('api', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: jest.fn(),
      }));
  });

  test('request', async () => {
    expect(global.fetch).not.toBeCalled();
    await api.request('/foo');
    expect(global.fetch).toHaveBeenCalledWith(
      `${BASE_URL}/foo`,
      expect.objectContaining({
        method: 'get',
      }),
    );
  });
  ['delete', 'get', 'post', 'put', 'patch'].forEach((method) => {
    test(method, async () => {
      expect(global.fetch).not.toBeCalled();
      await api[method]('/foo');
      expect(global.fetch).toHaveBeenCalledWith(
        `${BASE_URL}/foo`,
        expect.objectContaining({ method }),
      );
    });
  });

  describe('create', () => {
    beforeEach(() => {
      api.request = jest.fn();
    });

    it('creates without arguments', () => {
      api.create();
    });

    it('has settings', () => {
      expect(api.create({ foo: 'bar' }).settings).toEqual({ foo: 'bar' });
    });

    test('setToken', () => {
      const obj = api.create({ headers: { foo: 'bar' } });
      obj.setToken('token');
      expect(obj.settings).toEqual({
        headers: {
          foo: 'bar',
          Authorization: 'Bearer token',
        },
      });
    });

    test('unsetToken', () => {
      const obj = api.create({
        headers: {
          foo: 'bar',
          Authorization: 'Bearer token',
        },
      });
      obj.unsetToken();
      expect(obj.settings).toEqual({ headers: { foo: 'bar' } });
    });

    test('request', () => {
      const obj = api.create({ foo: 'bar' });
      expect(api.request).not.toBeCalled();
      obj.request('/foo', { baz: 'qux' });
      expect(api.request).toHaveBeenCalledWith('/foo', {
        foo: 'bar',
        baz: 'qux',
      });
    });
    ['get', 'delete'].forEach((method) => {
      test(method, () => {
        const obj = api.create({ foo: 'bar' });
        expect(api.request).not.toBeCalled();
        obj[method]('/foo', { baz: 'qux' });
        expect(api.request).toHaveBeenCalledWith('/foo', {
          foo: 'bar',
          baz: 'qux',
          method,
        });
      });
    });
    ['post', 'put', 'patch'].forEach((method) => {
      test(method, () => {
        const obj = api.create({ foo: 'bar' });
        expect(api.request).not.toBeCalled();
        obj[method]('/foo', { field: 'value' }, { baz: 'qux' });
        expect(api.request).toHaveBeenCalledWith('/foo', {
          foo: 'bar',
          baz: 'qux',
          data: {
            field: 'value',
          },
          method,
        });
      });
    });
  });
});

const mockStore = configureMockStore([thunk]);
describe('errorHandler', () => {
  it('it should not dispatch a notification action when no error occured', () => {
    const store = mockStore();
    const errors = [null, undefined];
    errors.forEach((err) => {
      errorHandler(err, store.dispatch);
      expect(store.getActions().length).toEqual(0);
    });
  });

  it('it should dispatch a notification even error as no response object', () => {
    const store = mockStore();
    const err = new Error('test');
    const expectedMessage = 'unhandled error occured: Error: test';
    errorHandler(err, store.dispatch);
    const action = store.getActions()[0];
    expect(action.message).toEqual(expectedMessage);
  });

  // TODO(fix this to work without sleep)
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
  it('it should dispatch a notification when response data not json parseable', async () => {
    const store = mockStore();
    const err = new Error('test');
    const response = {
      ok: false,
      statusText: 'Bad Request',
      url: 'http://localhost/bad/request',
      data: '',
      text: () => new Promise(resolve => resolve(response.data)),
      json: () => new Promise((resolve, reject) => {
        if (response.data.length === 0) {
          reject(new Error('unexptected token'));
        } else {
          resolve(JSON.parse(response.data));
        }
      }),
      clone: () => response,
    };
    const expectedMessage = `api request failed, reason: '${err}', status: ${response.statusText}, path: bad/request`;
    err.response = response;
    errorHandler(err, store.dispatch);
    await sleep(100);
    const action = store.getActions()[0];
    expect(action.message).toEqual(expectedMessage);
  });

  it('it should dispatch a notification when response data json', async () => {
    const store = mockStore();
    const err = new Error('test');
    const response = {
      ok: false,
      statusText: 'Bad Request',
      url: 'http://localhost/bad/request',
      data: '{}',
      text: () => new Promise(resolve => resolve(response.data)),
      json: () => new Promise((resolve, reject) => {
        if (response.data.length === 0) {
          reject(new Error('unexptected token'));
        } else {
          resolve({
            reason: 'invalid user',
          });
        }
      }),
      clone: () => response,
    };
    const expectedMessage = `api request failed, reason: invalid user, status: ${response.statusText}, path: bad/request`;
    err.response = response;
    errorHandler(err, store.dispatch);
    await sleep(100);
    const action = store.getActions()[0];
    expect(action.message).toEqual(expectedMessage);
  });
});
