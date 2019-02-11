import api, { errorHandler } from '../../services/api';

export const REQUEST_JOBS = 'jobs/REQUEST_JOBS';
export const RECEIVE_JOBS = 'jobs/RECEIVE_JOBS';
export const UPDATE_JOB = 'jobs/UPDATE_JOB';

export const requestJobs = () => ({
  type: REQUEST_JOBS,
});

export const receiveJobs = jobs => ({
  type: RECEIVE_JOBS,
  jobs,
});

export const updateJob = job => ({
  type: UPDATE_JOB,
  job,
});

export const fetchAllJobs = () =>
  function fetchJobs(dispatch) {
    const urlString = '/queue/jobs';
    dispatch(requestJobs());
    return api
      .get(urlString)
      .then(json => dispatch(receiveJobs(json)));
  };

export const cancelJob = job =>
  function cancel(dispatch) {
    const urlString = `/queue/jobs/${job.profile.organization}/${job.profile.name}`;
    return api
      .delete(urlString)
      .catch(error => errorHandler(error, dispatch));
  };

export const rejectJob = (job, message = 'reject') =>
  function reject(dispatch) {
    const urlString = `/queue/jobs/${job.profile.organization}/${job.profile.name}/rejectors`;
    return api
      .post(urlString, { message })
      .catch(error => errorHandler(error, dispatch));
  };

export const approveJob = job =>
  function approve(dispatch) {
    const urlString = `/queue/jobs/${job.profile.organization}/${job.profile.name}/approvers`;
    return api
      .post(urlString, { })
      .catch(error => errorHandler(error, dispatch));
  };

export const forceJob = (job, message = 'force') =>
  function force(dispatch) {
    const urlString = `/queue/jobs/${job.profile.organization}/${job.profile.name}/approvers`;
    return api
      .post(urlString, { message }, { params: { force: 'true' } })
      .catch(error => errorHandler(error, dispatch));
  };
