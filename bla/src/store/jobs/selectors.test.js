import {
  getJobs,
  getJobById,
  getPendingJobs,
  getPendingJobsByProfileId,
  getJobsByStatus,
  getMyPendingJobs,
  getJobsByOrganization,
  getOthersPendingJobs,
  getBlockingJobs,
  getBlockingJobsByProfileId,
} from './selectors';
import activeJobsState from './mocks';

describe('jobs selector', () => {
  const invalidState = {};
  const state = activeJobsState;
  it('should get empty list of jobs for undefined state', () => {
    expect(getJobs(invalidState).length).toEqual(0);
  });

  it('should get list of jobs for correct state', () => {
    expect(getJobs(state).length).toEqual(3);
  });

  it('should get job by id', () => {
    expect(getJobById(state, '01C2EVSDKZF0G8JDHP5C5Z0HMQ').id).toEqual('01C2EVSDKZF0G8JDHP5C5Z0HMQ');
  });

  it('should get pending jobs by profile name', () => {
    expect(getPendingJobsByProfileId(state, 'linux/e-autofs').length).toEqual(1);
  });

  it('should get list of pending jobs', () => {
    expect(getPendingJobs(state).length).toEqual(1);
  });

  it('should get list of jobs by status', () => {
    expect(getJobsByStatus(state, 'Cancelled').length).toEqual(1);
  });

  it('should get list of my pending jobs', () => {
    expect(getMyPendingJobs(state).length).toEqual(1);
  });

  it('should get list of others pending jobs', () => {
    expect(getOthersPendingJobs(state).length).toEqual(0);
  });

  it('should get list of jobs by organization', () => {
    expect(getJobsByOrganization(state, 'linux').length).toEqual(1);
  });

  it('should get list of blocking jobs', () => {
    expect(getBlockingJobs(state).length).toEqual(2);
  });

  it('should get blocking jobs by profile name', () => {
    expect(getBlockingJobsByProfileId(state, 'linux/e-autofs').length).toEqual(1);
  });
});
