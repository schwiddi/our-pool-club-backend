import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import ReactTable from 'react-table';

const isSearched = (filter, row) =>
  row[filter.id].toUpperCase().indexOf(filter.value.toUpperCase()) !== -1 || false;

const NodeList = ({
  nodes = [],
  deleteClickHandler,
  userIsAdmin,
}) => {
  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Status',
      accessor: 'status',
    },
    {
      Header: 'Last Change',
      accessor: 'since',
    },
    {
      Header: 'Version',
      accessor: 'version',
    },
    {
      Header: 'Build',
      accessor: 'build',
    },
    {
      Header: 'OS',
      accessor: 'os',
    },
    {
      Header: 'Arch',
      accessor: 'arch',
    },
    {
      Header: 'Button',
      Cell: rowInfo =>
        rowInfo.row.status === 'stopped' && userIsAdmin && (
          <Button onClick={() => deleteClickHandler(rowInfo.row.name)}>
            Remove
          </Button>),
      filterable: false,
    },
  ];

  return (
    <div id="nodes">
      <ReactTable
        filterable
        defaultFilterMethod={isSearched}
        getTrProps={(state, rowInfo) => (
          {
            className: rowInfo.row.status === 'running'
              ? 'bg-success'
              : 'bg-danger',
          }
        )}
        minRows="0"
        data={nodes}
        columns={columns}
      />
    </div>
  );
};

NodeList.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequred,
    version: PropTypes.string.isRequired,
    build: PropTypes.string.isRequired,
    since: PropTypes.string.isRequired,
    os: PropTypes.string.isRequired,
    arch: PropTypes.string.isRequired,
  })).isRequired,
  deleteClickHandler: PropTypes.func.isRequired,
  userIsAdmin: PropTypes.bool.isRequired,
};

export default NodeList;
