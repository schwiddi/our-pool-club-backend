import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { baseUrl } from '../../services/api';
import {
  REQUEST_JOBS,
  RECEIVE_JOBS,
  UPDATE_JOB,
  fetchAllJobs,
  updateJob,
  receiveJobs,
  requestJobs,
} from './actions';

const testBaseURL = baseUrl();
const mockStore = configureMockStore([thunk]);

describe('Jobs Actions', () => {
  it('fetch data from backend', () => {
    const response = [
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
    ];

    nock(testBaseURL)
      .get('/queue/jobs')
      .reply(200, Object.assign([], response));

    const expectedActions = [
      { type: REQUEST_JOBS },
      { type: RECEIVE_JOBS, jobs: response },
    ];

    const store = mockStore({});
    return store.dispatch(fetchAllJobs()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('updates the job', () => {
    const expectedActions = { type: UPDATE_JOB, job: { id: 1 } };

    expect(updateJob({ id: 1 })).toEqual(expectedActions);
  });

  it('receive jobs', () => {
    const expectedActions = { type: RECEIVE_JOBS, jobs: [{ id: 1 }, { id: 2 }] };

    expect(receiveJobs([{ id: 1 }, { id: 2 }])).toEqual(expectedActions);
  });

  it('request jobs', () => {
    const expectedActions = { type: REQUEST_JOBS };

    expect(requestJobs()).toEqual(expectedActions);
  });
});
