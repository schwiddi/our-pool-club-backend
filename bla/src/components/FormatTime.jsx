import PropTypes from 'prop-types';
import React from 'react';

import formatTime from 'services/format';

const FormatTime = props => (
  <span>
    {formatTime(props.children)}
  </span>
);

FormatTime.propTypes = {
  children: PropTypes.string.isRequired,
};
export default FormatTime;
