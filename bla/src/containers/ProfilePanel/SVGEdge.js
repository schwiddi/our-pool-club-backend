import { connect } from 'react-redux';
import { SVGEdge as SVGEdgeComponent } from 'components/ProfilePanel/SVGEdge';

import { isUpdating } from 'store/instances/selectors';

const mapStateToProps = state => ({
  updating: isUpdating(state),
});

const SVGEdge = connect(mapStateToProps)(SVGEdgeComponent);

export default SVGEdge;
