import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import { baseUrl } from 'services/api';

import { FETCH, RECEIVE, SELECTED_ORGANIZATION, fetchUserInfo, setSelectedOrganization, setDefaultOrganization } from './actions';
import { DEFAULT_ORG } from './selectors';

const mockStore = configureMockStore([thunk]);

const currentUser = {
  name: 'admin',
  roles: [
    'admin',
    'cao_admin',
    'cbt_admin',
    'findis_admin',
    'linux_admin',
    'sandbox_admin',
    'solaris_admin',
    'sysinfra_admin',
    'windows_admin',
    'zv_admin',
  ],
  organizations: [
    'cao',
    'cbt',
    'findis',
    'linux',
    'sandbox',
    'solaris',
    'sysinfra',
    'windows',
    'zv',
  ],
};

describe('user actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetch data from backend', () => {
    nock(baseUrl()).get('/users/me').reply(200, currentUser);

    const expectedActions = [
      { type: FETCH },
      {
        type: RECEIVE,
        current: currentUser,
      },
    ];

    const store = mockStore({});
    return store.dispatch(fetchUserInfo()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('should set selected organization', () => {
    const expectedActions = [
      {
        type: SELECTED_ORGANIZATION,
        selectedOrganization: 'linux',
      },
    ];

    const store = mockStore(expectedActions);
    store.dispatch(setSelectedOrganization('linux'));
    return expect(store.getActions()).toEqual(expectedActions);
  });

  it('should set default organization', () => {
    const expectedActions = [
      {
        type: SELECTED_ORGANIZATION,
        selectedOrganization: 'linux',
      },
    ];
    // initialize mock store data
    const getState = {
      user: {
        current: {
          organizations: ['linux', 'cao', 'findis'],
        },
      },
    };
    const store = mockStore(getState, expectedActions);
    store.dispatch(setDefaultOrganization());
    return expect(store.getActions()).toEqual(expectedActions);
  });

  it('should set default organization when user data is empty', () => {
    const expectedActions = [
      {
        type: SELECTED_ORGANIZATION,
        selectedOrganization: DEFAULT_ORG,
      },
    ];
    // initialize mock store data
    const getState = {
      user: {
        organizations: [],
      },
    };
    const store = mockStore(getState, expectedActions);
    store.dispatch(setDefaultOrganization());
    return expect(store.getActions()).toEqual(expectedActions);
  });
});

export default currentUser;
