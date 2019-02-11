import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Approvals from '../containers/Approvals/';
import ErrorBoundary from '../components/ErrorBoundary';

const ApprovalPage = () => (
  <ErrorBoundary>
    <Grid>
      <Row>
        <Col xsOffset={1} xs={10}>
          <Approvals />
        </Col>
      </Row>
    </Grid>
  </ErrorBoundary>
);

export default ApprovalPage;
