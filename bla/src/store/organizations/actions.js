import { normalize } from 'normalizr';
import api, { errorHandler } from 'services/api';
import * as schema from './schema';

export const REQUEST = 'organizations/REQUEST';
export const RECEIVE = 'organizations/RECEIVE';

export const requestOrganizations = () => ({
  type: REQUEST,
});

export const receiveOrganizations = json => ({
  type: RECEIVE,
  organizations: json,
});

export const reloadOrganizations = () => (
  function fetchOrganizations(dispatch) {
    // initialize emtpty data
    let normalizedOrganizations = {
      entities: {
        organizations: {},
      },
    };
    dispatch(requestOrganizations());
    return api.get('config/organizations')
      .then((data) => {
        if (data.length > 0) {
          normalizedOrganizations = normalize(data, [schema.organization]);
        }
        dispatch(receiveOrganizations(normalizedOrganizations.entities));
      })
      .catch((error) => {
        errorHandler(error, dispatch);
        dispatch(receiveOrganizations(normalizedOrganizations.entities));
      });
  }
);
