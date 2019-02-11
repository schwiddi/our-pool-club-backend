import { connect } from 'react-redux';
import DeleteAllFailedNodesButton from 'components/NodePage/DeleteAllFailedNodesButton';
import { deleteNode } from 'store/nodes/actions';
import { getFailedNodes } from 'store/nodes/selectors';
import { getUserIsAdmin } from 'store/user/selectors';

const mapStateToProps = state => ({
  failedNodes: getFailedNodes(state),
  failedNodesCount: getFailedNodes(state).length,
  userIsAdmin: getUserIsAdmin(state),
});

const mapDispatchToProps = dispatch => ({
  deleteNodeHandler: (node) => {
    dispatch(deleteNode(node));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAllFailedNodesButton);
