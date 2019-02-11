import PropTypes from 'prop-types';
import React from 'react';
import { NavDropdown, MenuItem } from 'react-bootstrap';

const UserDropdown = ({
  organizations = [],
  selectedOrganization = '',
  onOrganizationSelected,
}) => (
  <NavDropdown
    onSelect={onOrganizationSelected}
    title={selectedOrganization}
    id="organizations"
    eventKey={1}
  >
    { organizations.map(org =>
      <MenuItem key={org} eventKey={org} >{org}</MenuItem>)}
  </NavDropdown>
);

UserDropdown.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  selectedOrganization: PropTypes.string.isRequired,
  onOrganizationSelected: PropTypes.func.isRequired,
};

export default UserDropdown;
