import { connect } from 'react-redux';
import { SVGGraph as SVGGraphComponent } from 'components/ProfilePanel/SVGGraph';

import { isUpdating } from 'store/instances/selectors';

const mapStateToProps = state => ({
  updating: isUpdating(state),
});

const SVGGraph = connect(mapStateToProps)(SVGGraphComponent);

export default SVGGraph;
