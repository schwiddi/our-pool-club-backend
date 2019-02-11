import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import ProfileReload from 'containers/ProfileReload';
import ProfileList from 'containers/ProfileList';
import ErrorBoundary from 'containers/ErrorBoundary';

const ProfilePage = () => (
  <ErrorBoundary context="ProfilePage">
    <Grid>
      <Row>
        <Col xsOffset={1} xs={10}>
          <ProfileReload bsStyle="primary" >
              Reload all
          </ProfileReload>
        </Col>
      </Row>
      <Row>&nbsp;</Row>
      <Row>
        <Col xsOffset={1} xs={10}>
          <ProfileList />
        </Col>
      </Row>
    </Grid>
  </ErrorBoundary>
);

export default ProfilePage;
