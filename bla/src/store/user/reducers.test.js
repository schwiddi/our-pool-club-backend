import deepFreeze from 'deep-freeze';
import { FETCH, RECEIVE, SELECTED_ORGANIZATION } from './actions';
import user from './reducers';
import currentUser from './actions.test';

describe('user reducer', () => {
  it('default state', () => {
    const before = {};
    const after = {};
    const action = {};

    deepFreeze(before);
    deepFreeze(action);

    expect(user(before, {})).toEqual(after);
  });

  it(`action.type: ${FETCH}`, () => {
    const before = {
    };
    const after = {
      fetching: true,
    };

    const action = {
      type: FETCH,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(user(before, action)).toEqual(after);
  });

  it(`action.type: ${RECEIVE}`, () => {
    const before = {
      fetching: true,
    };
    const after = {
      fetching: false,
      current: currentUser,
    };

    const action = {
      type: RECEIVE,
      current: currentUser,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(user(before, action)).toEqual(after);
  });

  it(`action.type: ${SELECTED_ORGANIZATION}`, () => {
    const before = {
    };
    const after = {
      selectedOrganization: 'linux',
    };

    const action = {
      type: SELECTED_ORGANIZATION,
      selectedOrganization: 'linux',
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(user(before, action)).toEqual(after);
  });
});
