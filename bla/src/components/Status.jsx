import PropTypes from 'prop-types';
import React from 'react';

const Status = ({
  ok,
  title,
}) => (
  <span
    style={{ fontSize: '30px' }}
    title={title}
    className={
      ok
        ? 'glyphicon glyphicon-ok-circle text-success'
        : 'glyphicon glyphicon-remove-circle text-danger'
    }
    aria-hidden="true"
  />
);

Status.propTypes = {
  ok: PropTypes.bool.isRequired,
  title: PropTypes.string,
};

Status.defaultProps = {
  title: '',
};

export default Status;
