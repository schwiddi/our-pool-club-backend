import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Grid, Row, Col } from 'react-bootstrap';
import { Status } from './';
import ForceApproval from './ForceApproval';
import ApprovalController from './ApprovalController';

class ApprovalDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };

    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.execute = this.execute.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  execute(func) {
    return () => {
      func();
      this.close();
    };
  }

  render() {
    const {
      job,
      currentUser,
      onCancelJob,
      onRejectJob,
      onApproveJob,
      onForceJob,
    } = this.props;

    return (
      <div>
        <Button
          bsSize="small"
          className="btn btn-default"
          onClick={this.open}
        >Details
        </Button>
        <Modal show={this.state.showModal} bsSize="large" onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              { `${job.action} ${job.profile.organization}/${job.profile.name}` }
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid fluid >
              <Row className="show-grid">
                <Col xs={12} md={4} mdPush={8}>
                  {job.profile.tags.context.includes('p1') &&
                  <span
                    className="glyphicon glyphicon-warning-sign pull-right"
                    style={
                      {
                        color: '#f2dede',
                        fontSize: '10em',
                      }
                    }
                    aria-hidden="true"
                  />
                  }
                </Col>
                <Col xs={12} md={8} mdPull={4}>
                  <dl className="dl-horizontal">
                    <dt>Created at</dt>
                    <dd>{ (new Date(job.created_at)).toLocaleString() }</dd>
                    <dt>Created by</dt>
                    <dd>{ job.created_by }</dd>
                    { job.cancelled_by &&
                    <div>
                      <dt>Cancelled at</dt>
                      <dd>{(new Date(job.cancelled_at)).toLocaleString()}</dd>
                    </div>
                    }
                    { job.rejected_by &&
                    <div>
                      <dt>Rejected by</dt>
                      <dd>{job.rejected_by}</dd>
                      <dt>Rejected at</dt>
                      <dd>{(new Date(job.rejected_at)).toLocaleString()}</dd>
                    </div>
                    }
                    { job.forced_by &&
                    <div>
                      <dt>Forced by</dt>
                      <dd>{job.forced_by}</dd>
                    </div>
                    }
                    {/* { job.approved_by &&
                    <div><dt>Approved by</dt> <dd>{job.approved_by}</dd></div>
                    } */}
                    <dt>Status</dt>
                    <dd>{ job.status.code }</dd>
                    { job.status.code === Status.PENDING &&
                      <div>
                        <dt>Needed Permits</dt>
                        <dd>{ job.profile.approval.users }</dd>
                      </div>
                    }
                    { job.status.message &&
                    <div>
                      <dt>Status Message</dt>
                      <dd>{ job.status.message }</dd>
                    </div>
                    }
                  </dl>
                  <dl className="dl-horizontal">
                    <dt>Organization</dt>
                    <dd>{ job.profile.organization }</dd>
                    <dt>Profile</dt>
                    <dd>{ job.profile.name }</dd>
                    <dt>Context</dt>
                    <dd>{ job.profile.tags.context.join(', ') }</dd>
                    <dt>Kind</dt>
                    <dd>{ job.kind}</dd>
                    <dt>Action</dt>
                    <dd>{ job.action }</dd>
                  </dl>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <dl className="dl-horizontal">
                    <dt>Impacted Instances</dt>
                    <dd>
                      <details>
                        <summary>{ `${job.instances.length} ${job.instances.length === 0 ? 'instance' : 'instances'}...`}</summary>
                        <ul>
                          { job.instances.map(instance => <li key={instance}>{instance}</li>) }
                        </ul>
                      </details>
                    </dd>
                  </dl>
                </Col>
              </Row>
              { job.status.code === Status.PENDING &&
                job.created_by === currentUser ?
                  <ForceApproval onSubmit={message => this.execute(() => onForceJob(message))} /> :
                  null
                }
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <ApprovalController
              job={job}
              currentUser={currentUser}
              onApprove={this.execute(onApproveJob)}
              onReject={this.execute(onRejectJob)}
              onCancel={this.execute(onCancelJob)}
            />
            <Button className="pull-right" onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ApprovalDetails.propTypes = {
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
  }).isRequired,
  currentUser: PropTypes.string.isRequired,
  onCancelJob: PropTypes.func.isRequired,
  onRejectJob: PropTypes.func.isRequired,
  onApproveJob: PropTypes.func.isRequired,
  onForceJob: PropTypes.func.isRequired,
};

export default ApprovalDetails;
