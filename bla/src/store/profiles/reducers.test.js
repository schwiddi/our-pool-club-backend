import deepFreeze from 'deep-freeze';
import { REQUEST_ALL, RECEIVE_ALL, REQUEST_PROFILE, RECEIVE_PROFILE } from './actions';
import profiles from './reducers';
import { allProfilesState } from './mocks';

describe('profiles reducer', () => {
  it('default state', () => {
    const before = {};
    const after = {};
    const action = {};

    deepFreeze(before);
    deepFreeze(action);

    expect(profiles(before, {})).toEqual(after);
  });

  it(`action.type: ${REQUEST_ALL}`, () => {
    const before = {
    };
    const after = {
      fetchingAllProfiles: true,
    };

    const action = {
      type: REQUEST_ALL,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(profiles(before, action)).toEqual(after);
  });

  it(`action.type: ${RECEIVE_ALL}`, () => {
    const before = {
      fetchingAllProfiles: true,
    };
    const after = {
      fetchingAllProfiles: false,
      all: allProfilesState,
    };

    const action = {
      type: RECEIVE_ALL,
      profiles: {
        all: allProfilesState,
      },
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(profiles(before, action)).toEqual(after);
  });

  it(`action.type: ${REQUEST_PROFILE}`, () => {
    const before = {
    };
    const after = {
      fetchingProfile: true,
    };

    const action = {
      type: REQUEST_PROFILE,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(profiles(before, action)).toEqual(after);
  });

  it(`action.type: ${RECEIVE_PROFILE}`, () => {
    const before = {
      all: allProfilesState,
      fetchingProfile: true,
    };
    const profile = {
      ...allProfilesState['linux/telegraf'],
      active: false,
    };

    const after = {
      all: {
        'linux/telegraf': profile,
        'linux/autofs': allProfilesState['linux/autofs'],
      },
      fetchingProfile: false,
    };

    const action = {
      type: RECEIVE_PROFILE,
      profile,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(profiles(before, action)).toEqual(after);
  });
});
