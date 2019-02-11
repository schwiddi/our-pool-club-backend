import api, { errorHandler } from 'services/api';

export const REQUEST_ALL = 'nodes/REQUEST_ALL';
export const RECEIVE_ALL = 'nodes/RECEIVE_ALL';
export const DELETING = 'nodes/DELETING';
export const DELETE_SUCCESS = 'nodes/DELETE_SUCCESS';
export const DELETE_ERROR = 'nodes/DELETE_ERROR';
export const UPDATE = 'nodes/UPDATE';
export const FILTER = 'nodes/FILTER';

export const requestAllNodes = () => ({
  type: REQUEST_ALL,
});

export const receiveAllNodes = json => ({
  type: RECEIVE_ALL,
  nodes: json,
});

export const deleteNodeSuccess = node => ({
  type: DELETE_SUCCESS,
  node,
});

export const deleteNodeError = () => ({
  type: DELETE_ERROR,
});

export const deletingNode = () => ({
  type: DELETING,
});

export const updateNode = json => ({
  type: UPDATE,
  node: json,
});

export const filterNode = filter => ({
  type: FILTER,
  filter,
});

export const fetchAllNodes = () =>
  function fetchNodes(dispatch) {
    const urlString = 'discovery/nodes';
    dispatch(requestAllNodes());
    return api
      .get(urlString)
      .then(json => dispatch(receiveAllNodes(json)));
    // .catch(error => errorHandler(error, dispatch));
  };

export const deleteNode = node =>
  function delNode(dispatch) {
    const urlString = `discovery/nodes/${node}`;
    dispatch(deletingNode());
    return api.delete(urlString)
      .then(() => dispatch(deleteNodeSuccess(node)))
      .catch((error) => {
        dispatch(deleteNodeError());
        errorHandler(error, dispatch);
      });
  };
