import configureMockStore from 'redux-mock-store';
import { baseUrl } from 'services/api';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  allProfilesState,
  allProfilesResponse,
} from './mocks';

import {
  REQUEST_ALL,
  RECEIVE_ALL,
  reloadAllProfiles,
} from './actions';


const testBaseURL = baseUrl();
const mockStore = configureMockStore([thunk]);

describe('all profiles actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  // all profiles
  it('should reload all profiles from backend and normalize data', () => {
    nock(testBaseURL)
      .get('/config/organizations/linux/profiles')
      .reply(200, Object.assign([], allProfilesResponse));

    const expectedActions = [
      { type: REQUEST_ALL },
      {
        type: RECEIVE_ALL,
        profiles: Object.assign({}, { all: allProfilesState }),
      },
    ];

    const getState = {
      user: {
        selectedOrganization: 'linux',
      },
    };
    const store = mockStore(getState, expectedActions);
    return store
      .dispatch(reloadAllProfiles())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('should handle Bad request from backend when reloading all profiles', () => {
    nock(testBaseURL)
      .get('/config/organizations/linux/profiles')
      .reply(400, Object.assign([], '400 Bad request'));

    const expectedOutput = 'could not reload profiles, error code: 400, Bad Request';

    const getState = {
      user: {
        selectedOrganization: 'linux',
      },
    };
    const store = mockStore(getState);
    return store
      .dispatch(reloadAllProfiles())
      .then(() => {
        expect(store.getActions()[1].message).toEqual(expectedOutput);
      });
  });

  it('should handle missing organization when reloading all profiles from backend', () => {
    nock(testBaseURL)
      .get('/config/organizations/linux/profiles')
      .reply(400, Object.assign([], '400 Bad request'));

    const expectedOutput = 'error in reloadAllProfiles, call administrator';

    const getState = {
      user: {
        selectedOrganization: '',
      },
    };
    const store = mockStore(getState);
    return store
      .dispatch(reloadAllProfiles())
      .then(() => {
        expect(store.getActions()[1].message).toEqual(expectedOutput);
      });
  });

  it('should handle data correctly in case of Bad request when reloading all profiles from backend ', () => {
    nock(testBaseURL)
      .get('/config/organizations/linux/profiles')
      .reply(400, Object.assign([], '400 Bad request'));

    const expectedResult = {
      type: RECEIVE_ALL,
      profiles: Object.assign({}, {
        all: {},
      }),
    };

    const getState = {
      user: {
        selectedOrganization: 'linux',
      },
    };
    const store = mockStore(getState, expectedResult);
    return store
      .dispatch(reloadAllProfiles())
      .then(() => {
        expect(store.getActions()[2]).toEqual(expectedResult);
      });
  });

  it('should handle data in case of fetch error when reloading all profiles from backend', () => {
    nock(testBaseURL)
      .get('/config/organizations/linux/badurl')
      .reply(404, Object.assign([], '404 page not found'));

    const expectedResult = {
      type: RECEIVE_ALL,
      profiles: Object.assign({}, {
        all: {},
      }),
    };

    const getState = {
      user: {
        selectedOrganization: 'linux',
      },
    };
    const store = mockStore(getState, expectedResult);
    return store
      .dispatch(reloadAllProfiles())
      .then(() => {
        expect(store.getActions()[2]).toEqual(expectedResult);
      });
  });
});
