import {
  REQUEST_JOBS,
  RECEIVE_JOBS,
  UPDATE_JOB,
} from './actions';

const jobs = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_JOBS:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_JOBS:
      return {
        all: action.jobs.reduce((map, job) =>
          Object.assign({}, map, { [job.id]: job }), {}),
        isFetching: false,
      };
    case UPDATE_JOB:
      return {
        isFetching: false,
        all: Object.assign({}, state.all, { [action.job.id]: action.job }),
      };
    default:
      return state;
  }
};

export default jobs;
