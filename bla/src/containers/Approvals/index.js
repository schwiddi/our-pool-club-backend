import { connect } from 'react-redux';
import Approvals from '../../components/Approvals';
import { getUserName } from '../../store/user/selectors';
import { cancelJob, rejectJob, approveJob, forceJob } from '../../store/jobs/actions';
import { getJobs } from '../../store/jobs/selectors';

const mapStateToProps = state => ({
  jobs: getJobs(state),
  currentUser: getUserName(state),
});

const mapDispatchToProps = dispatch => ({
  onCancelJob: job => dispatch(cancelJob(job)),
  onRejectJob: job => dispatch(rejectJob(job)),
  onApproveJob: job => dispatch(approveJob(job)),
  onForceJob: (job, message) => dispatch(forceJob(job, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Approvals);
