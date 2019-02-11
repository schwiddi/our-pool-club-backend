import api, { errorHandler } from 'services/api';
import { getDefaultOrganization } from './selectors';

export const FETCH = 'user/FETCH';
export const RECEIVE = 'user/RECEIVE';
export const SELECTED_ORGANIZATION = 'user/SELECTED_ORGANIZATION';

export const fetchUser = () => ({
  type: FETCH,
});

export const receiveUser = json => ({
  type: RECEIVE,
  current: json,
});

export const setSelectedOrganization = data => ({
  type: SELECTED_ORGANIZATION,
  selectedOrganization: data,
});

export const setDefaultOrganization = () => (
  function defaultOrg(dispatch, getState) {
    dispatch(setSelectedOrganization(getDefaultOrganization(getState())));
  }
);

export const fetchUserInfo = () => (
  function fetchInfo(dispatch) {
    dispatch(fetchUser());
    return api.get('users/me')
      .then((json) => {
        dispatch(receiveUser(json));
      })
      .catch(error => errorHandler(error, dispatch));
  }
);
