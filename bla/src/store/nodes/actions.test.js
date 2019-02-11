import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { baseUrl } from 'services/api';

import { REQUEST_ALL, RECEIVE_ALL, fetchAllNodes } from './actions';

const testBaseURL = baseUrl();
const mockStore = configureMockStore([thunk]);

describe('instanceApp reducer', () => {
  it('fetch data from backend', () => {
    const response = [
      {
        name: 'zbindenren',
        status: 'stopped',
      },
      {
        name: 'p1-linux-mlsu008',
        status: 'running',
      },
      {
        name: 'e1-aplat-alsu001',
        status: 'stopped',
      },
      {
        name: 'e1-isy-alzf001',
        status: 'stopped',
      },
    ];

    nock(testBaseURL)
      .get('/discovery/nodes')
      .reply(200, Object.assign([], response));

    const expectedActions = [
      { type: REQUEST_ALL },
      { type: RECEIVE_ALL, nodes: response },
    ];

    const store = mockStore({});
    return store.dispatch(fetchAllNodes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
