import deepFreeze from 'deep-freeze';

import {
  REQUEST_JOBS,
  RECEIVE_JOBS,
  UPDATE_JOB,
} from './actions';
import jobs from './reducers';

describe('jobs reducer', () => {
  it('default state', () => {
    const before = {};
    const after = {};
    const action = {};

    deepFreeze(before);
    deepFreeze(action);

    expect(jobs(before, {})).toEqual(after);
  });

  it(`action.type: ${REQUEST_JOBS}`, () => {
    const before = {
      isFetching: false,
    };
    const after = {
      isFetching: true,
    };
    const action = {
      type: REQUEST_JOBS,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(jobs(before, action)).toEqual(after);
  });

  it(`action.type: ${RECEIVE_JOBS}`, () => {
    const before = {
      isFetching: true,
    };
    const after = {
      isFetching: false,
      all: { 1: { id: 1 }, 2: { id: 2 } },
    };
    const action = {
      type: RECEIVE_JOBS,
      jobs: [{ id: 1 }, { id: 2 }],
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(jobs(before, action)).toEqual(after);
  });

  it(`action.type: ${UPDATE_JOB}`, () => {
    const before = {
      isFetching: true,
      all: {
        1: { id: 1, name: 'Job A' },
        2: { id: 2, name: 'Job B' },
        3: { id: 3, name: 'Job C' },
      },
    };
    const after = {
      isFetching: false,
      all: {
        1: { id: 1, name: 'Job A' },
        2: { id: 2, name: 'Job B updated' },
        3: { id: 3, name: 'Job C' },
      },
    };
    const action = {
      type: UPDATE_JOB,
      job: { id: 2, name: 'Job B updated' },
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(jobs(before, action)).toEqual(after);
  });
});
