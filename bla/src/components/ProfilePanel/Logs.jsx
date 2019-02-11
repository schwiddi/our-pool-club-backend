import PropTypes from 'prop-types';
import React from 'react';

import LogView from './LogView';

class Logs extends React.Component {
  static propTypes = {
    instance: PropTypes.shape({
      id: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
      definition: PropTypes.shape({
        organization: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      profile: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        organization: PropTypes.string.isRequired,
      }).isRequired,
      discovery: PropTypes.string.isRequired,
      current: PropTypes.string.isRequired,
      target: PropTypes.string.isRequired,
    }).isRequired,
    actions: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    actions: [],
  }

  shouldComponentUpdate = () => (
    false
  )

  render() {
    return (
      <LogView
        instance={this.props.instance}
        actions={this.props.actions}
      />
    );
  }
}

export default Logs;
