import React from 'react';
import PropTypes from 'prop-types';

import { getAttrs, convertDomNode, convertDomEdge } from 'services/svg';
import SVGNode from 'containers/ProfilePanel/SVGNode';
import SVGEdge from 'containers/ProfilePanel/SVGEdge';

export class SVGGraph extends React.Component {
  shouldComponentUpdate() {
    return !this.props.updating;
  }

  getNodes = dom => (
    dom.querySelectorAll('.node')
  );

  getEdges = dom => (
    dom.querySelectorAll('.edge')
  );

  render() {
    const opts = getAttrs(this.props.svgElement.firstElementChild);
    const polygonOpts = getAttrs(this.props.svgElement.firstElementChild.getElementsByTagName('polygon')[0]);
    const nodes = this.getNodes(this.props.svgElement.firstElementChild);
    const edges = this.getEdges(this.props.svgElement.firstElementChild);
    return (
      <g {...opts}>
        <polygon {...polygonOpts} />
        { [].slice.call(nodes).map((node) => {
          const jsNode = convertDomNode(node);
          return (<SVGNode
            node={jsNode}
            key={jsNode.id}
            toggleSelect={this.props.toggleSelect}
            selectedInstances={this.props.selectedInstances}
          />);
        })}
        { [].slice.call(edges).map((edge) => {
          const jsEdge = convertDomEdge(edge);
          return <SVGEdge edge={jsEdge} key={edge.id} />;
        })}
      </g>
    );
  }
}

SVGGraph.propTypes = {
  svgElement: PropTypes.shape({
    firstElementChild: PropTypes.shape(),
  }).isRequired,
  selectedInstances: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  updating: PropTypes.bool.isRequired,
  toggleSelect: PropTypes.func.isRequired,
};

export default SVGGraph;
