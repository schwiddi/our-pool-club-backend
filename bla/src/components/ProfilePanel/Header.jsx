import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import InstanceBadge from 'containers/InstanceBadge';
import ApprovalLock from '../ProfileSelector/ApprovalLock';
import BlockingJob from '../ProfileSelector/BlockingJob';
import NodeHealth from '../ProfileSelector/NodeHealth';

const Header = ({
  profile,
  rediscoverProfile,
  countPendingJobs,
  countBlockingJobs,
  areAllNodesHealthy,
}) => (
  <div style={{ overflow: 'auto' }}>
    <div style={{ cursor: 'pointer', float: 'left' }}>
      {profile.name}
      <InstanceBadge profile={profile} />
      <ApprovalLock count={countPendingJobs} />
      <BlockingJob count={countBlockingJobs} />
      <NodeHealth areAllNodesHealthy={areAllNodesHealthy} />
    </div>
    <div style={{ float: 'right' }}>
      <Button
        bsStyle="primary"
        onClick={(e) => {
          e.stopPropagation();
          rediscoverProfile(profile);
        }}
      >Rediscover
      </Button>
    </div>
  </div>
);

Header.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    instances: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  rediscoverProfile: PropTypes.func.isRequired,
  countPendingJobs: PropTypes.number.isRequired,
  countBlockingJobs: PropTypes.number.isRequired,
  areAllNodesHealthy: PropTypes.bool.isRequired,
};

export default Header;
