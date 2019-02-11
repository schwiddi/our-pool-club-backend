import PropTypes from 'prop-types';
import React from 'react';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import ReactTable from 'react-table';

import ContextLabel from './ContextLabel';

const ProfileList = ({
  profiles = [],
  onProfileUpdate,
}) => {
  function toggleActive(p) {
    return Object.assign({}, p, {
      active: !p.active,
    });
  }
  const columns = [
    {
      Header: 'Id',
      accessor: 'id',
    },
    {
      Header: 'Organization',
      accessor: 'organization',
    },
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Context',
      id: 'context',
      accessor: d => d.tags.context,
      Cell: row => (
        <ContextLabel contexts={row.value} />
      ),
      filterMethod: (filter, row) => {
        let matches = false;
        row[filter.id].forEach((x) => {
          if (x.includes(filter.value)) {
            matches = true;
          }
        });
        return matches;
      },
    },
    {
      Header: '',
      id: 'buttons',
      Cell: row => (
        <ButtonToolbar>
          <ToggleButtonGroup type="checkbox" defaultValue={row.original.active ? 1 : 0}>
            <ToggleButton
              bsStyle={row.original.active ? 'success' : 'default'}
              value={1}
              onChange={() => onProfileUpdate(toggleActive(row.original))}
            >
              {row.original.active ? 'Active' : 'Inactive'}
            </ToggleButton>
          </ToggleButtonGroup>
        </ButtonToolbar>
      ),
      filterable: false,
    },
  ];
  return (
    <div id="profiles">
      <ReactTable
        filterable
        minRows="0"
        data={profiles}
        columns={columns}
        defaultFilterMethod={(filter, row) => String(row[filter.id]).includes(filter.value)}
      />
    </div>
  );
};

ProfileList.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    organization: PropTypes.string.isRequired,
    active: PropTypes.bool,
    tags: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  })).isRequired,
  onProfileUpdate: PropTypes.func.isRequired,
};

export default ProfileList;
