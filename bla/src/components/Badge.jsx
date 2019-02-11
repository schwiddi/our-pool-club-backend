import PropTypes from 'prop-types';
import React from 'react';
import { Badge as BootsrapBadge } from 'react-bootstrap';

const Badge = ({
  failState = {
    total: -1, failed: -1, overwrites: -1, state: 'red',
  },
  pullRight = false,
}) => {
  const actionStyle = {
    backgroundColor: [failState.state],
    marginLeft: '10px',
  };
  return (
    <BootsrapBadge
      style={actionStyle}
      pullRight={pullRight}
    >{failState.failed}/{typeof failState.overwrites !== 'undefined' &&
      <span>{failState.overwrites}/</span>
      }{failState.total}
    </BootsrapBadge>
  );
};

Badge.propTypes = {
  failState: PropTypes.shape({
    total: PropTypes.number.isRequired,
    failed: PropTypes.number.isRequired,
    overwrites: PropTypes.number,
    state: PropTypes.string,
  }).isRequired,
  pullRight: PropTypes.bool,
};

Badge.defaultProps = {
  pullRight: false,
};

export default Badge;
