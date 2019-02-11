import { connect } from 'react-redux';
import { SVGNode as SVGNodeComponent } from 'components/ProfilePanel/SVGNode';

import { getActiveInstanceByID, isUpdating } from 'store/instances/selectors';
import { getInstanceState } from 'services/style/instance';

const mapStateToProps = (state, ownProps) => ({
  color: getInstanceState(getActiveInstanceByID(state, ownProps.node.id)).color,
  updating: isUpdating(state),
});

const SVGNode = connect(mapStateToProps)(SVGNodeComponent);

export default SVGNode;
