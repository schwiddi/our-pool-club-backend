import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { baseUrl } from 'services/api';

import { REQUEST, RECEIVE, reloadDefinitions } from './actions';
import { definitionState, definitionResponse } from './mock';

const testBaseURL = baseUrl();
const mockStore = configureMockStore([thunk]);

describe('dispatch reloadDefinitions', () => {
  // test profile action including normalizr functionality
  it('fetch unnormalized data from the backend & normalize it', () => {
    nock(testBaseURL)
      .get('/config/definitions')
      .reply(200, Object.assign({}, definitionResponse));

    const expectedDefinitions = {
      definitions: definitionState,
    };

    const expectedActions = [
      { type: REQUEST },
      { type: RECEIVE, definitions: Object.assign({}, expectedDefinitions) },
    ];

    const store = mockStore({ isFetching: false, profiles: [] });
    return store.dispatch(reloadDefinitions())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
