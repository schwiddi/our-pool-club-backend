import React from 'react';
import { Row, Grid, Col } from 'react-bootstrap';
import ContextSelector from '../containers/ContextSelector';
import ProfileSelector from '../containers/ProfileSelector';
import ProfilePanels from '../containers/ProfilePanels';
import ErrorBoundary from '../containers/ErrorBoundary';

import './style.css';

const InstancePage = () => (
  <ErrorBoundary context="InstancePage">
    <Grid>
      <Row id="instancerow">
        <Col xs={12} md={3}>
          <div id="profilefilter">
            <ContextSelector />
            <hr />
            <ProfileSelector />
          </div>
        </Col>
        <Col xs={12} md={9}>
          <ProfilePanels />
        </Col>
      </Row>
    </Grid>
  </ErrorBoundary>
);

export default InstancePage;
