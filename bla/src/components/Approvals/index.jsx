import Approvals from './Approvals';

export const Status = {
  APPROVED: 'Approved',
  CANCELLED: 'Cancelled',
  FAILED: 'Failed',
  FINISHED: 'Finished',
  PENDING: 'Pending',
  REJECTED: 'Rejected',
  RUNNING: 'Running',
  TIMEOUT: 'Timeout',
};

export const Action = {
  START: 'start',
  STOP: 'stop',
  CHECK: 'check',
  _CLEAR: '.clear',
  _SYNC: '.sync',
};

export const actionFilter = {
  ALL: 'All',
  ...Action,
};

export const statusFilter = {
  ALL: 'All',
  ...Status,
};

export default Approvals;
