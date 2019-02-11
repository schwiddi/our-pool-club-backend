import PropTypes from 'prop-types';
import React from 'react';
import { ListGroup } from 'react-bootstrap';
import ProfileListGroupItem from '../../containers/ProfileSelector/ProfileListGroupItem';

const ProfileListGroup = ({ profiles }) =>
  profiles.length > 0 &&
  <ListGroup>
    {profiles.map(profile => (
      <ProfileListGroupItem
        key={profile.id}
        profile={profile}
      />
    ))}
  </ListGroup>;

ProfileListGroup.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default ProfileListGroup;
