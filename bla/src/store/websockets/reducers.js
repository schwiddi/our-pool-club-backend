import { ONOPEN, ONCLOSE, ONERROR } from './actions';

const websockets = (state = {}, action) => {
  switch (action.type) {
    case ONOPEN:
      return {
        ...state,
        connected: true,
      };
    case ONCLOSE:
      return {
        ...state,
        connected: false,
      };
    case ONERROR:
      return {
        ...state,
        connected: false,
      };
    default:
      return state;
  }
};

export default websockets;
