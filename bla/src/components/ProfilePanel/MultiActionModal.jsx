import PropTypes from 'prop-types';
import React from 'react';
import {
  Modal,
  Button,
} from 'react-bootstrap';

const MultiActionModal = ({
  selectedInstances,
  action,
  showModal,
  onActionSelect,
  profile,
  onHideModal,
}) => (
  <Modal show={showModal} bsSize="large" onHide={() => onHideModal()}>
    <Modal.Header closeButton>
      <Modal.Title>
        MultiAction for profile <b>{profile}</b>
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Action <b>{action}</b> affects <b>{selectedInstances.length}</b> instances.
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={() => onActionSelect(profile, action)} bsStyle="success">
        Go
      </Button>
      <Button onClick={() => onHideModal()}>Cancel</Button>
    </Modal.Footer>
  </Modal>
);

MultiActionModal.propTypes = {
  selectedInstances: PropTypes.arrayOf(PropTypes.string).isRequired,
  action: PropTypes.string,
  showModal: PropTypes.bool.isRequired,
  profile: PropTypes.string,
  onHideModal: PropTypes.func.isRequired,
  onActionSelect: PropTypes.func.isRequired,
};

MultiActionModal.defaultProps = {
  action: 'none',
  profile: 'none',
};

export default MultiActionModal;
