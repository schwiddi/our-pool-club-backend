import { connect } from 'react-redux';

import ErrorBoundary from 'components/ErrorBoundary';
import { getUserName, getSelectedOrganization } from 'store/user/selectors';

const mapStateToProps = state => ({
  user: getUserName(state),
  org: getSelectedOrganization(state),
});

export default connect(mapStateToProps)(ErrorBoundary);
