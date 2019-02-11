import { connect } from 'react-redux';
import NodeList from 'components/NodeList';
import { deleteNode } from 'store/nodes/actions';
import { getFilteredNodes } from 'store/nodes/selectors';
import { getUserIsAdmin } from 'store/user/selectors';

const mapStateToProps = state => ({
  nodes: getFilteredNodes(state),
  userIsAdmin: getUserIsAdmin(state),
});

const mapDispatchToProps = dispatch => ({
  deleteClickHandler: (node) => {
    dispatch(deleteNode(node));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NodeList);
