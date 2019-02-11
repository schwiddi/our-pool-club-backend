import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import ApprovalDetails from './ApprovalDetails';
import { actionFilter, statusFilter } from './';
import SelectFilter from './SelectFilter';

export const isSearched = (filter, row) =>
  row[filter.id].toUpperCase().indexOf(filter.value.toUpperCase()) !== -1 || false;

export const matchAction = (filter, row) =>
  filter.value === actionFilter.ALL || row[filter.id] === filter.value;

export const matchStatus = (filter, row) =>
  filter.value === statusFilter.ALL || row[filter.id] === filter.value;

const Approvals = ({
  jobs,
  currentUser,
  onCancelJob,
  onRejectJob,
  onApproveJob,
  onForceJob,
}) => {
  const columns = [
    {
      id: 'date',
      Header: 'Date',
      accessor: d => d.created_at,
      Cell: d => (new Date(d.value)).toLocaleString(),
    },
    {
      id: 'action',
      Header: 'Action',
      accessor: d => d.action,
      filterMethod: matchAction,
      Filter: SelectFilter(actionFilter),
    },
    {
      id: 'profile',
      Header: 'Profile',
      accessor: d => d.profile.name,
    },
    {
      id: 'organization',
      Header: 'Organization',
      accessor: d => d.profile.organization,
    },
    {
      id: 'status',
      Header: 'Status',
      accessor: d => d.status.code,
      filterMethod: matchStatus,
      Filter: SelectFilter(statusFilter),
    },
    {
      id: 'creator',
      Header: 'Creator',
      accessor: d => d.created_by,
    },
    {
      Header: 'Details',
      Cell: rowInfo => (
        <ApprovalDetails
          job={rowInfo.original}
          currentUser={currentUser}
          onCancelJob={() => onCancelJob(rowInfo.original)}
          onRejectJob={() => onRejectJob(rowInfo.original)}
          onApproveJob={() => onApproveJob(rowInfo.original)}
          onForceJob={message => onForceJob(rowInfo.original, message)}
        />
      ),
      filterable: false,
    },
  ];

  const defaultSorted = [
    {
      id: 'date',
      desc: true,
    },
  ];

  return (
    <div id="approvals">
      <ReactTable
        filterable
        defaultFilterMethod={isSearched}
        defaultSorted={defaultSorted}
        defaultPageSize={50}
        getTrProps={(state, rowInfo) => (
          {
            className: `status-${rowInfo.row.status.toLowerCase()}`,
          }
        )}
        minRows="0"
        data={jobs}
        columns={columns}
      />
    </div>
  );
};

Approvals.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.shape({
    job: PropTypes.shape({
      action: PropTypes.string,
      created_at: PropTypes.string,
      created_by: PropTypes.string,
      description: PropTypes.string,
      instances: PropTypes.arrayOf(PropTypes.string),
      kind: PropTypes.string,
      profile: PropTypes.shape({
        approval: PropTypes.shape({
          users: PropTypes.number,
        }),
        name: PropTypes.string,
        organization: PropTypes.string,
        tags: PropTypes.shape({
          context: PropTypes.arrayOf(PropTypes.string),
        }),
      }),
      status: PropTypes.shape({
        code: PropTypes.string,
      }),
      rejected_by: PropTypes.string,
    }),
  })).isRequired,
  currentUser: PropTypes.string.isRequired,
  onCancelJob: PropTypes.func.isRequired,
  onRejectJob: PropTypes.func.isRequired,
  onApproveJob: PropTypes.func.isRequired,
  onForceJob: PropTypes.func.isRequired,
};

export default Approvals;
