import { connect } from 'react-redux';
import { instanceState } from 'store/instances/selectors';
import Badge from '../components/Badge';

const mapStateToProps = (state, ownProps) => ({
  failState: instanceState(state, ownProps.profile),
});

export default connect(mapStateToProps)(Badge);
