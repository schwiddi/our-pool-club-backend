import { connect } from 'react-redux';
import ApprovalsNavItem from '../components/ApprovalsNavItem';
import { getOthersPendingJobs } from '../store/jobs/selectors';

const mapStateToProps = state => ({
  countOthersPendingApprovals: getOthersPendingJobs(state).length,
});

export default connect(mapStateToProps)(ApprovalsNavItem);
