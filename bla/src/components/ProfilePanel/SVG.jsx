import PropTypes from 'prop-types';
import React from 'react';
import uuid from 'uuid';
import Viz from 'viz.js/viz-lite';
import { getAttrs } from 'services/svg';
import api from 'services/api';

import SVGGraph from 'containers/ProfilePanel/SVGGraph';

export class SVG extends React.Component {
  static defaultProps = {
    graph: '',
    identifier: '',
  }

  static propTypes = {
    profile: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      instances: PropTypes.arrayOf(PropTypes.string).isRequired,
      organization: PropTypes.string,
    }).isRequired,
    toggleSelect: PropTypes.func.isRequired,
    tab: PropTypes.number.isRequired,
    identifier: PropTypes.string,
    graph: PropTypes.string,
    updating: PropTypes.bool.isRequired,
    instanceMap: PropTypes.shape({}).isRequired,
  };

  constructor(props) {
    super(props);
    const { identifier } = props.profile.id;
    this.state = {
      identifier: identifier !== undefined ? identifier : uuid.v4(),
      svgWidth: '100%',
    };
  }

  componentDidMount = () => {
    this.getGraph();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.updating !== nextProps.updating) {
      this.getGraph();
    }
  }

  shouldComponentUpdate() {
    return !this.props.updating;
  }

  getGraph() {
    const urlString = [
      'discovery/organizations/',
      this.props.profile.organization,
      '/profile/',
      this.props.profile.name,
      '/dependencies',
    ].join('');
    return api
      .get(urlString, { params: { format: 'json-dot', sort: 'true' } })
      .then(response =>
        this.setState({
          graph: this.getViz(response.data),
        }))
      .catch(() =>
        this.setState({
          graph: this.getViz('digraph A { B -> C; }'),
        }));
  }

  getViz = data => (
    Viz(data, { format: 'svg' })
  )

  getSelectedInstances = map => (
    Object.keys(map).filter(i => map[i] === true)
  )

  render() {
    if (!this.state.graph) {
      return null;
    }
    const { identifier } = this.state;
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(this.state.graph, 'text/xml');
    const svgElement = xmlDoc.getElementsByTagName('svg')[0];
    const opts = getAttrs(svgElement);
    opts.width = this.state.svgWidth;
    const up = this.props.updating ? 'updating' : 'updated';
    return (
      <div style={{ width: '100%' }} id={identifier}>
        {up}
        <svg {...opts} >
          <SVGGraph
            svgElement={svgElement}
            toggleSelect={this.props.toggleSelect}
            selectedInstances={this.getSelectedInstances(this.props.instanceMap)}
            selected
          />
        </svg>
      </div>
    );
  }
}

export default SVG;
