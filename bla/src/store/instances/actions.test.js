import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { baseUrl } from 'services/api';

import {
  activeProfilesState,
  activeInstancesState,
  activeInstancesResponse,
} from './mock';

import {
  REQUEST_ACTIVE,
  RECEIVE_ACTIVE,
  SET_CONTEXT_SELECTION,
  reloadActiveInstances,
} from './actions';

const testBaseURL = baseUrl();
const mockStore = configureMockStore([thunk]);

describe('active instances', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should load active profiles from backend and normalize data', () => {
    nock(testBaseURL)
      .get('/discovery/organizations/linux?context=test')
      .reply(200, activeInstancesResponse);

    const expectedProfiles = {
      profiles: activeProfilesState,
      instances: activeInstancesState,
    };

    const expectedActions = [
      { type: REQUEST_ACTIVE },
      {
        type: RECEIVE_ACTIVE,
        active: expectedProfiles,
      },
      {
        type: SET_CONTEXT_SELECTION,
        context: { context: 'test' },
      },
    ];

    const getState = {
      user: {
        selectedOrganization: 'linux',
      },
    };
    const store = mockStore(getState, expectedActions);
    return store
      .dispatch(reloadActiveInstances({ context: 'test' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
