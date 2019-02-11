import PropTypes from 'prop-types';
import React from 'react';
import { ListGroupItem } from 'react-bootstrap';
import InstanceBadge from '../../containers/InstanceBadge';
import ApprovalLock from './ApprovalLock';
import BlockingJob from './BlockingJob';
import NodeHealth from './NodeHealth';

const ProfileListGroupItem = ({
  profile,
  selected,
  toggleProfile,
  blockingJobs,
  pendingJobs,
  areAllNodesHealthy,
}) => (
  <ListGroupItem
    key={profile.id}
    bsStyle={selected ? 'info' : 'warning'}
    onClick={() => toggleProfile(profile)}
  >
    <p>
      {profile.name}
      <InstanceBadge profile={profile} pullRight />
      <ApprovalLock count={pendingJobs.length} />
      <BlockingJob count={blockingJobs.length} />
      <NodeHealth areAllNodesHealthy={areAllNodesHealthy} />
    </p>
  </ListGroupItem>
);

ProfileListGroupItem.propTypes = {
  profile:
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  blockingJobs: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.string,
  })).isRequired,
  pendingJobs: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.string,
  })).isRequired,
  selected: PropTypes.bool.isRequired,
  toggleProfile: PropTypes.func.isRequired,
  areAllNodesHealthy: PropTypes.bool.isRequired,
};

export default ProfileListGroupItem;
