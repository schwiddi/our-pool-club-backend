import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const ProfileActions = ({ onSelect, areAllNodesHealthy }) => (
  <div style={{ float: 'right' }}>
    {areAllNodesHealthy ?
      <DropdownButton
        onSelect={onSelect}
        pullRight
        bsSize="small"
        bsStyle="danger"
        title="Profile Actions"
        id="profile-actions-dropdown"
      >
        <MenuItem key="start" eventKey={{ action: 'start' }}>Start</MenuItem>
        <MenuItem key="stop" eventKey={{ action: 'stop' }}>Stop</MenuItem>
        {/* <MenuItem key="sync" eventKey={{ action: 'sync' }}>Sync</MenuItem> */}
      </DropdownButton>
    :
      <DropdownButton
        disabled
        pullRight
        bsSize="small"
        bsStyle="danger"
        title="Profile Actions"
        id="profile-actions-dropdown"
      />}

  </div>
);

ProfileActions.propTypes = {
  onSelect: PropTypes.func.isRequired,
  areAllNodesHealthy: PropTypes.bool.isRequired,
};

export default ProfileActions;
