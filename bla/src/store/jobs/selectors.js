import get from 'lodash/get';

export const getJobs = state =>
  Object.values(get(state, 'jobs.all', {}));

export const getJobById = (state, id) => (
  get(state, `jobs.all["${id}"]`, {})
);

export const getPendingJobs = state => (
  getJobs(state).filter(job => job.status.code === 'Pending')) || [];

export const getPendingJobsByProfileId = (state, profileId) =>
  getPendingJobs(state).filter(job => `${job.profile.organization}/${job.profile.name}` === profileId);

export const getJobsByStatus = (state, status) => (
  getJobs(state).filter(job => job.status.code === status)) || [];

export const getMyPendingJobs = state =>
  getPendingJobs(state).filter(job => job.created_by === state.user.current.name);

export const getOthersPendingJobs = state =>
  getPendingJobs(state).filter(job => job.created_by !== state.user.current.name);

export const getJobsByOrganization = (state, organization) => (
  getJobs(state).filter(job => job.profile.organization === organization)) || [];

export const getBlockingJobs = state =>
  getJobs(state).filter(job => job.status.code === 'Pending' || job.status.code === 'Running') || [];

export const getBlockingJobsByProfileId = (state, profileId) =>
  getBlockingJobs(state).filter(job => `${job.profile.organization}/${job.profile.name}` === profileId);
