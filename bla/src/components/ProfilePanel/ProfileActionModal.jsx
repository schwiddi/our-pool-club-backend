import PropTypes from 'prop-types';
import React from 'react';
import {
  Modal,
  Button,
} from 'react-bootstrap';

const ProfileActionModal = ({
  action,
  showModal,
  onActionSelect,
  profile,
  onHideModal,
}) => (
  <Modal show={showModal} bsSize="large" onHide={() => onHideModal()}>
    <Modal.Header closeButton>
      <Modal.Title>
        ProfileAction for profile <strong>{profile.name} </strong>
        <span className="glyphicon glyphicon-warning-sign" aria-hidden="true" />
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Action <strong>{action}</strong> affects entire profile.
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => onActionSelect(profile, action)} bsStyle="success">
        Go
      </Button>
      <Button onClick={() => onHideModal()}>Cancel</Button>
    </Modal.Footer>
  </Modal>
);

ProfileActionModal.propTypes = {
  action: PropTypes.string,
  showModal: PropTypes.bool.isRequired,
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
  onHideModal: PropTypes.func.isRequired,
  onActionSelect: PropTypes.func.isRequired,
};

ProfileActionModal.defaultProps = {
  action: 'none',
  profile: 'none',
};

export default ProfileActionModal;
