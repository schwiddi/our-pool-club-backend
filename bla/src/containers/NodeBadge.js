import { connect } from 'react-redux';
import Badge from 'components/Badge';
import { getNodes, getFailedNodes } from 'store/nodes/selectors';

const mapStateToProps = state => ({
  failState: {
    total: getNodes(state).length,
    failed: getFailedNodes(state).length,
  },
});

export default connect(mapStateToProps)(Badge);

