import {
  REQUEST_ALL,
  RECEIVE_ALL,
  DELETING,
  DELETE_ERROR,
  DELETE_SUCCESS,
  UPDATE,
  FILTER,
} from './actions';

const nodes = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ALL:
      return {
        ...state,
        fetchingAll: true,
      };
    case RECEIVE_ALL:
      return {
        ...state,
        all: action.nodes,
        fetchingAll: false,
      };
    case DELETING:
      return {
        ...state,
        nodeDeleting: true,
      };
    case DELETE_SUCCESS: {
      const newState = {
        ...state,
        nodeDeleting: false,
        all: [],
      };
      state.all.forEach((n) => {
        if (n.name !== action.node) {
          newState.all.push(n);
        }
      });
      return newState;
    }
    case DELETE_ERROR:
      return {
        ...state,
        nodeDeleting: false,
        nodeDeleteError: true,
      };
    case UPDATE: {
      const newNodes = state.all.slice();
      let found = false;
      newNodes.forEach((item, index) => {
        if (action.node.name === item.name) {
          found = true;
          newNodes[index] = action.node;
        }
      });
      if (!found) {
        newNodes.push(action.node);
      }
      return {
        ...state,
        all: newNodes,
      };
    }
    case FILTER:
      return {
        ...state,
        filter: action.filter,
      };
    default:
      return state;
  }
};

export default nodes;
