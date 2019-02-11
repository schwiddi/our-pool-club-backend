import { connect } from 'react-redux';
import { SVG as SVGComponent } from 'components/ProfilePanel/SVG';

import { getInstanceIds, isUpdating } from 'store/instances/selectors';

const mapStateToProps = (state, ownProps) => ({
  instanceIds: getInstanceIds(ownProps.profile),
  updating: isUpdating(state),
});

const SVG = connect(mapStateToProps)(SVGComponent);

export default SVG;
