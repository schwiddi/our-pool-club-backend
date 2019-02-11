import {
  FETCH,
  RECEIVE,
  SELECTED_ORGANIZATION,
} from './actions';

const user = (state = {}, action) => {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        fetching: true,
      };
    case RECEIVE: {
      return {
        ...state,
        current: action.current,
        fetching: false,
      };
    }
    case SELECTED_ORGANIZATION: {
      return {
        ...state,
        selectedOrganization: action.selectedOrganization,
      };
    }

    default:
      return state;
  }
};

export default user;
