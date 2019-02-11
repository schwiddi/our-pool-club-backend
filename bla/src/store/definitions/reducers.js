import {
  REQUEST,
  RECEIVE,
} from './actions';

const definitions = (state = {}, action) => {
  switch (action.type) {
    case REQUEST:
      return Object.assign({}, state, {
        fetchingDefinitions: true,
      });
    case RECEIVE:
      return Object.assign({}, state, {
        definitions: action.definitions.definitions,
        fetchingDefinitions: false,
      });

    default:
      return state;
  }
};

export default definitions;
