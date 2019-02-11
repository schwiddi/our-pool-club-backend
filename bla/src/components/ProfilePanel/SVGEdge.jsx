import React from 'react';
import PropTypes from 'prop-types';


export class SVGEdge extends React.Component {
  static propTypes = {
    edge: PropTypes.shape({
      attrs: PropTypes.shape(),
      pathOpts: PropTypes.shape(),
      polygonOpts: PropTypes.shape(),
    }).isRequired,
    updating: PropTypes.bool.isRequired,
  };

  shouldComponentUpdate = () => (
    !this.props.updating
  )

  render() {
    return (

      <g {...this.props.edge.attrs}>
        <path {...this.props.edge.pathOpts} />
        <polygon {...this.props.edge.polygonOpts} />
      </g>
    );
  }
}

export default SVGEdge;
