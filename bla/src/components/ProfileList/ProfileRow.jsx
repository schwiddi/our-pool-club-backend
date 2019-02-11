import PropTypes from 'prop-types';
import React from 'react';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

import ContextLabel from './ContextLabel';

const ProfileRow = ({
  profile,
  onProfileUpdate,
}) => {
  const actionStyle = {
    width: '1px',
  };
  function toggleActive(p) {
    return Object.assign({}, profile, {
      active: !p.active,
    });
  }
  return (
    <tr>
      <td>
        {profile.id}
      </td>
      <td>
        {profile.name}
      </td>
      <td>
        {profile.tags && <ContextLabel contexts={profile.tags.context} />}
      </td>
      <td style={actionStyle}>
        <ButtonToolbar>
          <ToggleButtonGroup type="checkbox" defaultValue={profile.active ? [1] : []}>
            <ToggleButton
              bsStyle={profile.active ? 'success' : 'default'}
              value={1}
              onChange={() => onProfileUpdate(toggleActive(profile))}
            >
              {profile.active ? 'Active' : 'Inactive'}
            </ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
      </td>
    </tr>
  );
};
ProfileRow.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
  onProfileUpdate: PropTypes.func.isRequired,
};

export default ProfileRow;
