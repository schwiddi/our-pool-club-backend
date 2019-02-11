import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';


const DeleteAllFailedNodesButton = ({
  userIsAdmin,
  failedNodesCount,
  failedNodes,
  deleteNodeHandler,
}) => (
  userIsAdmin && failedNodesCount > 0 && (
  <Button
    bsStyle="danger"
    onClick={() => failedNodes.forEach((element) => {
          setTimeout(() => {
            deleteNodeHandler(element.name);
          }, 100);
        })}
  >Remove all Failed
  </Button>
  )
);

DeleteAllFailedNodesButton.propTypes = {
  failedNodes: PropTypes.arrayOf(PropTypes.object),
  failedNodesCount: PropTypes.number.isRequired,
  userIsAdmin: PropTypes.bool.isRequired,
  deleteNodeHandler: PropTypes.func.isRequired,
};

export default DeleteAllFailedNodesButton;
