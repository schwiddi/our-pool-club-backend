import {
  REQUEST_ALL,
  RECEIVE_ALL,
  REQUEST_PROFILE,
  RECEIVE_PROFILE,
} from './actions';

const profiles = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ALL:
      return {
        ...state,
        fetchingAllProfiles: true,
      };
    case RECEIVE_ALL:
      return {
        ...state,
        all: action.profiles.all,
        fetchingAllProfiles: false,
      };
    case REQUEST_PROFILE:
      return {
        ...state,
        fetchingProfile: true,
      };
    case RECEIVE_PROFILE:
      return {
        ...state,
        all: {
          ...state.all,
          [action.profile.id]: action.profile,
        },
        fetchingProfile: false,
      };
    default:
      return state;
  }
};

export default profiles;
