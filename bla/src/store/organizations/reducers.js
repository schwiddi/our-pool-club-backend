import {
  REQUEST,
  RECEIVE,
} from './actions';

const organizations = (state = {}, action) => {
  switch (action.type) {
    case REQUEST: {
      return {
        ...state,
        isFetching: true,
      };
    }
    case RECEIVE: {
      return {
        ...state,
        all: action.organizations,
        isFetching: false,
      };
    }
    default:
      return state;
  }
};

export default organizations;
