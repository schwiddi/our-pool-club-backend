import React from 'react';
import PropTypes from 'prop-types';

const NodeHealth = ({ areAllNodesHealthy }) => {
  if (areAllNodesHealthy) {
    return null;
  }
  return (
    <span className="pull-right">
      <span
        style={{
            marginLeft: '10px',
        }}
        className="glyphicon glyphicon-warning-sign text-danger"
        aria-hidden="true"
        title="One or more Nodes are not responding in this Profile"
      />
    </span>
  );
};

NodeHealth.propTypes = {
  areAllNodesHealthy: PropTypes.bool.isRequired,
};

export default NodeHealth;
