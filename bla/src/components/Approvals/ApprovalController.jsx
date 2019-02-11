import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';
import { Status } from './';

const ApprovalController = ({
  job,
  currentUser,
  onApprove,
  onReject,
  onCancel,
}) => {
  if (job.status.code === Status.PENDING &&
      job.created_by !== currentUser) {
    return (
      <div>
        <Button
          className="pull-left btn btn-success"
          onClick={onApprove}
        >
          Approve <span className="glyphicon glyphicon-ok" aria-hidden="true" />
        </Button>
        <Button
          className="pull-left btn btn-danger"
          onClick={onReject}
        >
          Reject <span className="glyphicon glyphicon-remove" aria-hidden="true" />
        </Button>
      </div>
    );
  }

  if ((job.status.code === Status.PENDING &&
      job.created_by === currentUser) ||
      job.status.code === Status.RUNNING) {
    return (
      <div>
        <Button
          className="pull-left btn btn-danger"
          onClick={onCancel}
        >
          Cancel Job <span className="glyphicon glyphicon-remove" aria-hidden="true" />
        </Button>
      </div>
    );
  }

  return null;
};

ApprovalController.propTypes = {
  job: PropTypes.shape({
    status: PropTypes.shape({
      code: PropTypes.string.isRequired,
    }),
    created_by: PropTypes.string.isRequired,
  }).isRequired,
  currentUser: PropTypes.string.isRequired,
  onApprove: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ApprovalController;
