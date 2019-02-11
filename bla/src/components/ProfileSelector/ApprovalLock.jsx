import React from 'react';
import PropTypes from 'prop-types';

const ApprovalLock = ({ count }) => {
  if (!count) {
    return null;
  }

  const text = count > 1 ? `${count} Pending Approvals` : `${count} Pending Approval`;

  return (
    <span className="pull-right">
      <span
        style={{ marginLeft: '10px' }}
        className="glyphicon glyphicon-eye-open text-danger"
        aria-hidden="true"
        title={text}
      />
    </span>
  );
};

ApprovalLock.propTypes = {
  count: PropTypes.number.isRequired,
};

export default ApprovalLock;
