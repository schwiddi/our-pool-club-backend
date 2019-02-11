import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import NodeBadge from 'containers/NodeBadge';
import NodeFilter from 'containers/NodeFilter';
import NodeList from 'containers/NodeList';
import ErrorBoundary from 'components/ErrorBoundary';
import DeleteAllFailedNodes from 'containers/Nodes/DeleteAllFailedNodes';

const NodePage = () => (
  <ErrorBoundary>
    <Grid>
      <Row>
        <Col xsOffset={2} xs={1}>
          <NodeBadge />
        </Col>
        <Col xs={1}>
          <form>
            <NodeFilter name="Failed only" />
          </form>
        </Col>
        <Col xsOffset={3} xs={1}>
          <DeleteAllFailedNodes />
        </Col>
      </Row>
      <Row>
        <Col xsOffset={1} xs={10}>
          <NodeList />
        </Col>
      </Row>
    </Grid>
  </ErrorBoundary>
);

export default NodePage;
