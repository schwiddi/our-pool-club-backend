import { normalize } from 'normalizr';
import Notifications from 'react-notification-system-redux';
import notifyOptions from 'services/notification';
import { getSelectedOrganization } from 'store/user/selectors';
import api, { errorHandler, parseEndpoint } from 'services/api';
import * as schema from './schema';

export const REQUEST_ACTIVE = 'instances/REQUEST_ACTIVE';
export const RECEIVE_ACTIVE = 'instances/RECEIVE_ACTIVE';
export const SET_CONTEXT_SELECTION = 'intstances/SET_CONTEXT_SELECTION';
export const ADD_PROFILE_SELECTION = 'intstances/ADD_PROFILE_SELECTION';
export const REMOVE_PROFILE_SELECTION = 'intstances/REMOVE_PROFILE_SELECTION';
export const CLEAR_PROFILE_SELECTION = 'intstances/CLEAR_PROFILE_SELECTION';
export const REQUEST_ACTION = 'instances/REQUEST_ACTION';
export const RECEIVE_ACTION = 'instances/RECEIVE_ACTION';
export const UPDATE_FILTER = 'instances/UPDATE_FILTER';
export const UPDATE = 'instances/UPDATE';
export const SET_UPDATE_FLAG = 'instances/UPDATE_FLAG';
export const UNSET_UPDATE_FLAG = 'instances/UNSET_UPDATE_FLAG';

export const setUpdateFlag = () => ({
  type: SET_UPDATE_FLAG,
});

export const unsetUpdateFlag = () => ({
  type: UNSET_UPDATE_FLAG,
});

export const requestActiveInstances = () => ({
  type: REQUEST_ACTIVE,
});

export const receiveActiveInstances = json => ({
  type: RECEIVE_ACTIVE,
  active: json,
});

export const setContextSelection = context => ({
  type: SET_CONTEXT_SELECTION,
  context,
});

export const addProfileToSelection = profileId => ({
  type: ADD_PROFILE_SELECTION,
  profileId,
});

export const removeProfileFromSelection = profileId => ({
  type: REMOVE_PROFILE_SELECTION,
  profileId,
});

export const clearProfileSelection = () => ({
  type: CLEAR_PROFILE_SELECTION,
});

export const requestAction = () => ({
  type: REQUEST_ACTION,
});

export const receiveAction = () => ({
  type: RECEIVE_ACTION,
});

export const updateFilter = filter => ({
  type: UPDATE_FILTER,
  filter,
});

export const updateInstance = message => ({
  type: UPDATE,
  message,
});

export const updateActiveInstance = message =>
  function t(dispatch, getState) {
    const { selectedProfiles } = getState().instances;
    if (selectedProfiles && selectedProfiles.includes(message.profile.id)) {
      dispatch(dispatch(setUpdateFlag()));
      setTimeout(() => dispatch(unsetUpdateFlag()), 5000);
      dispatch(updateInstance(message));
    } else {
      const { activeInstances } = getState().instances;
      if (activeInstances && Object.keys(activeInstances).includes(message.id)) {
        dispatch(updateInstance(message));
      }
    }
  };

export const reloadActiveInstances = query =>
  function fetchProfiles(dispatch, getState) {
    // initialize empty data
    let normalizedProfiles = {
      entities: {
        instances: {},
        activeProfiles: {},
      },
    };
    const urlString = 'discovery/organizations';
    dispatch(requestActiveInstances());
    const org = getSelectedOrganization(getState());
    return fetch(parseEndpoint(`${urlString}/${org}`, query), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      method: 'GET',
    })
      .then((response) => {
        if (response.status > 399) {
          dispatch(Notifications.error(notifyOptions({
            message: `could not reload active profiles, error code: ${response.status}, ${response.statusText}`,
          })));
          return [];
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          normalizedProfiles = normalize(data, [schema.activeProfile]);
        }
        dispatch(receiveActiveInstances(normalizedProfiles.entities));
        dispatch(setContextSelection(query));
      })
      .catch(() => {
        dispatch(Notifications.error(notifyOptions({
          title: 'dispatch Error',
          message: 'error in reloadActiveProfiles, call administrator',
        })));
        dispatch(receiveActiveInstances(normalizedProfiles.entities));
      });
  };

export const instanceAction = (org, data) => function fetchActions(dispatch) {
  const urlString = `queue/jobs/${org}`;
  dispatch(requestAction());
  return api.post(urlString, data)
    .then(() => dispatch(receiveAction()))
    .catch((error) => {
      errorHandler(error, dispatch);
    });
};
