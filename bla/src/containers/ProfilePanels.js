import { connect } from 'react-redux';
import ProfilePanels from '../components/ProfilePanels';
import { getSelectedProfileIds } from '../store/instances/selectors';

const mapStateToProps = state => ({
  profileIds: getSelectedProfileIds(state),
});

export default connect(mapStateToProps)(ProfilePanels);
