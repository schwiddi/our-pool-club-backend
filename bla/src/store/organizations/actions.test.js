import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { baseUrl } from 'services/api';

import {
  reloadOrganizations,
  REQUEST,
  RECEIVE,
} from './actions';

const testBaseURL = baseUrl();
const mockStore = configureMockStore([thunk]);

const organizationsResponse = [
  {
    id: 'admin',
    name: 'admin',
    email: 'markus.sommer@postfinace.ch',
    alarming: false,
    search: {
      'include-any-context': false,
    },
  },
  {
    id: 'cao',
    name: 'cao',
    email: 'markus.sommer@postfinace.ch',
    larming: false,
    search: {
      'include-any-context': false,
    },
  },
];

const organizationsState = {
  admin: {
    id: 'admin',
    name: 'admin',
    email: 'markus.sommer@postfinace.ch',
    alarming: false,
    search: {
      'include-any-context': false,
    },
  },
  cao: {
    id: 'cao',
    name: 'cao',
    email: 'markus.sommer@postfinace.ch',
    larming: false,
    search: {
      'include-any-context': false,
    },
  },
};

describe('organizations actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should reload organizations from backend and normalize data', () => {
    nock(testBaseURL)
      .get('/config/organizations')
      .reply(200, Object.assign([], organizationsResponse));

    const expectedOrganizations = {
      organizations: organizationsState,
    };
    const expectedActions = [
      { type: REQUEST },
      {
        type: RECEIVE,
        organizations: Object.assign({}, expectedOrganizations),
      },
    ];

    const store = mockStore(expectedActions);
    return store.dispatch(reloadOrganizations()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

export default organizationsState;
