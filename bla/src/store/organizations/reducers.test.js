import deepFreeze from 'deep-freeze';
import {
  REQUEST,
  RECEIVE,
} from './actions';
import organizations from './reducers';
import organizationsState from './actions.test';

describe('organizations reducer', () => {
  it('default state', () => {
    const before = {};
    const after = {};
    const action = {};

    deepFreeze(before);
    deepFreeze(action);

    expect(organizations(before, {})).toEqual(after);
  });

  it(`action.type: ${REQUEST}`, () => {
    const before = {
      isFetching: false,
    };
    const after = {
      isFetching: true,
    };
    const action = {
      type: REQUEST,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(organizations(before, action)).toEqual(after);
  });

  it(`action.type: ${RECEIVE}`, () => {
    const before = {
      isFetching: true,
    };
    const after = {
      isFetching: false,
      all: organizationsState,
    };
    const action = {
      type: RECEIVE,
      organizations: organizationsState,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(organizations(before, action)).toEqual(after);
  });
});
