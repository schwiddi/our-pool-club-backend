import PropTypes from 'prop-types';
import React from 'react';
import { Row, Jumbotron, Col } from 'react-bootstrap';
import ErrorBoundary from '../containers/ErrorBoundary';
import ProfilePanel from '../containers/ProfilePanel';

const ProfilePanels = ({ profileIds }) => (
  <ErrorBoundary context="ProfilePanel">
    <Row>
      {profileIds.length > 0
      ?
        <Col>
          {profileIds.map(p => <ProfilePanel key={p} profileID={p} />)}
        </Col>
      :
        <Jumbotron>
          <h2>no profile selected</h2>
        </Jumbotron>}
    </Row>
  </ErrorBoundary>
);

ProfilePanels.propTypes = {
  profileIds: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default ProfilePanels;
