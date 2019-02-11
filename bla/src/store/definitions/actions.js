import { normalize } from 'normalizr';
import api, { errorHandler } from '../../services/api';
import * as schema from './schema';

export const REQUEST = 'definitions/REQUEST';
export const RECEIVE = 'definitions/RECEIVE';

export const requestDefinitions = () => ({
  type: REQUEST,
});

export const receiveDefinitions = json => ({
  type: RECEIVE,
  definitions: json,
});

export const reloadDefinitions = () => (
  function fetchDefinitions(dispatch) {
    dispatch(requestDefinitions());
    return api.get('config/definitions')
      .then((json) => {
        const normalizedDefinitions = normalize(json, [schema.definition]);
        dispatch(receiveDefinitions(normalizedDefinitions.entities));
      })
      .catch(error => errorHandler(error, dispatch));
  }
);
