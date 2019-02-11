import React from 'react';
import PropTypes from 'prop-types';

import { changeBackgroundColor, changeStrokeColor } from 'services/svg';

export class SVGNode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cursor: 'default',
    };
  }

  shouldComponentUpdate = () => (
    !this.props.updating
  )

  getStrokeWidth() {
    return (this.props.selectedInstances.includes(this.props.node.id)) ? 5 : 1;
  }

  content = () => {
    if (this.props.node.type === 'instance') {
      const coloredPolygonOpts = changeBackgroundColor(
        this.props.node.polygonOpts,
        this.props.color,
      );
      const stroke = this.getStrokeWidth();
      return (
        <g
          {...this.props.node.attrs}
          onClick={() => this.props.toggleSelect(this.props.node.id)}
          style={{ cursor: this.state.cursor }}
        >
          <title>{this.props.node.title}</title>
          <polygon {...coloredPolygonOpts} strokeWidth={stroke} />
          <text {...this.props.node.discoveryOpts}>{this.props.node.discovery}</text>
          <text {...this.props.node.definitionOpts}>{this.props.node.definition}</text>
          <text {...this.props.node.hostOpts}>{this.props.node.host}</text>
        </g>
      );
    }
    const coloredPolygonOpts = changeStrokeColor(this.props.node.ellipseOpts, '#398439');
    return (
      <g {...this.props.node.attrs} >
        <title>{this.props.node.title}</title>
        <ellipse {...coloredPolygonOpts} />
        <text {...this.props.node.cardinalityOpts}>{this.props.node.cardinality}</text>
      </g>
    );
  }
  render() {
    return (
      this.content()
    );
  }
}

SVGNode.propTypes = {
  node: PropTypes.shape({
    attrs: PropTypes.shape(),
    class: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    polygonOpts: PropTypes.shape(),
    ellipseOpts: PropTypes.shape(),
    discovery: PropTypes.string,
    definition: PropTypes.string,
    host: PropTypes.string,
    discoveryOpts: PropTypes.shape(),
    definitionOpts: PropTypes.shape(),
    hostOpts: PropTypes.shape(),
    cardinalityOpts: PropTypes.shape(),
    cardinality: PropTypes.string,
  }).isRequired,
  color: PropTypes.string.isRequired,
  selectedInstances: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  toggleSelect: PropTypes.func.isRequired,
  updating: PropTypes.bool.isRequired,
};

export default SVGNode;
