import deepFreeze from 'deep-freeze';
import { ONERROR, ONCLOSE, ONOPEN } from './actions';
import websockets from './reducers';

describe('websockets reducer', () => {
  it(`action.type: ${ONOPEN}`, () => {
    const before = {};
    const after = {
      connected: true,
    };
    const action = {
      type: ONOPEN,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(websockets(before, action)).toEqual(after);
  });
  it(`action.type: ${ONCLOSE}`, () => {
    const before = {
      connected: true,
    };
    const after = {
      connected: false,
    };
    const action = {
      type: ONCLOSE,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(websockets(before, action)).toEqual(after);
  });

  it(`action.type: ${ONERROR}`, () => {
    const before = {
      connected: true,
    };
    const after = {
      connected: false,
    };
    const action = {
      type: ONERROR,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(websockets(before, action)).toEqual(after);
  });
});
