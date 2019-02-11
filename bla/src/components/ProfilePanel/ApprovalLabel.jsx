import React from 'react';
import { Label } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ApprovalLabel = ({ count }) => {
  if (!count) {
    return null;
  }

  const text = count > 1 ? 'Pending Approvals' : 'Pending Approval';

  return (
    <div style={{ float: 'right' }}>
      <Label bsStyle="danger">{`${count} ${text}`}</Label>
    </div>
  );
};

ApprovalLabel.propTypes = {
  count: PropTypes.number.isRequired,
};

export default ApprovalLabel;
