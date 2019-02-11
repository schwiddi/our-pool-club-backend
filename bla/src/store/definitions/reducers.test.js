import deepFreeze from 'deep-freeze';

import { REQUEST, RECEIVE } from './actions';
import definitions from './reducers';
import { definitionsState } from './mock';

describe('definitions reducer', () => {
  it('default state', () => {
    const before = {};
    const after = {};
    const action = {};

    deepFreeze(before);
    deepFreeze(action);

    expect(definitions(before, {})).toEqual(after);
  });

  it(`action.type: ${REQUEST}`, () => {
    const before = {
      fetchingDefinitions: false,
    };
    const after = {
      fetchingDefinitions: true,
    };
    const action = {
      type: REQUEST,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(definitions(before, action)).toEqual(after);
  });

  it(`action.type: ${RECEIVE}`, () => {
    const before = {
      fetchingDefinitions: true,
    };
    const after = {
      fetchingDefinitions: false,
      definitions: definitionsState,
    };

    const action = {
      type: RECEIVE,
      definitions: {
        definitions: definitionsState,
      },
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(definitions(before, action)).toEqual(after);
  });
});
