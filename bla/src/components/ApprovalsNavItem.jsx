import React from 'react';
import PropTypes from 'prop-types';

const ApprovalNavItem = ({ countOthersPendingApprovals }) => (
  countOthersPendingApprovals > 0 ?
    <span>Approvals <span className="badge badge-light">{countOthersPendingApprovals}</span></span> :
    <span>Approvals</span>
);

ApprovalNavItem.propTypes = {
  countOthersPendingApprovals: PropTypes.number.isRequired,
};

export default ApprovalNavItem;
