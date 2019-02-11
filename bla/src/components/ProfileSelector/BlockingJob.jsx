import React from 'react';
import PropTypes from 'prop-types';

const BlockingJob = ({ count }) => {
  if (!count) {
    return null;
  }

  const text = count > 1 ? `${count} Blocking Jobs` : `${count} Blocking Job`;

  return (
    <span className="pull-right">
      <span
        style={{ marginLeft: '10px' }}
        className="glyphicon glyphicon-lock text-danger"
        aria-hidden="true"
        title={text}
      />
    </span>
  );
};

BlockingJob.propTypes = {
  count: PropTypes.number.isRequired,
};

export default BlockingJob;
