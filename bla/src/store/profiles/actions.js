// import api, { errorHandler } from 'services/api';
import fetch from 'isomorphic-fetch';
import Notifications from 'react-notification-system-redux';
import { normalize, schema } from 'normalizr';
import { getSelectedOrganization } from 'store/user/selectors';
import { reloadActiveInstances } from 'store/instances/actions';
import notifyOptions from 'services/notification';
import { parseEndpoint } from 'services/api';

export const REQUEST_ALL = 'profiles/REQUEST_ALL';
export const RECEIVE_ALL = 'profiles/RECEIVE_ALL';
export const REQUEST_PROFILE = 'profiles/REQUEST_PROFILE';
export const RECEIVE_PROFILE = 'profiles/RECEIVE_PROFILE';

// schema for all profiles (active and inactive)
export const allProfile = new schema.Entity('all', {
}, { idAttribute: 'id' });

export const requestProfile = () => ({
  type: REQUEST_PROFILE,
});

export const receiveProfile = profile => ({
  type: RECEIVE_PROFILE,
  profile,
});

export const requestAll = () => ({
  type: REQUEST_ALL,
});

export const receiveAll = json => ({
  type: RECEIVE_ALL,
  profiles: json,
});

export const reloadAllProfiles = () =>
  function fetchProfiles(dispatch, getState) {
    // initialize empty profie data
    let normalizedProfiles = {
      entities: {
        all: {},
      },
    };
    const org = getSelectedOrganization(getState());
    const urlString = `config/organizations/${org}/profiles`;
    dispatch(requestAll());
    return fetch(parseEndpoint(urlString), {
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
            message: `could not reload profiles, error code: ${response.status}, ${response.statusText}`,
          })));
          return [];
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          normalizedProfiles = normalize(data, [allProfile]);
        }
        dispatch(receiveAll(normalizedProfiles.entities));
      })
      .catch(() => {
        dispatch(Notifications.error(notifyOptions({
          title: 'dispatch Error',
          message: 'error in reloadAllProfiles, call administrator',
        })));
        dispatch(receiveAll(normalizedProfiles.entities));
      });
  };

export const updateProfile = profile =>
  function fetchProfile(dispatch, getState) {
    dispatch(requestProfile());
    const putUrl = `config/organizations/${profile.organization}/profiles/${profile.name}`;
    return fetch(parseEndpoint(putUrl), {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
      method: 'PUT',
      body: JSON.stringify(profile),
    })
      .then((response) => {
        if (response.status > 399) {
          dispatch(Notifications.error(notifyOptions({
            message: `could not update profile, error code: ${response.status}, ${response.statusText}`,
          })));
        }
        // sync update redux store
        dispatch(receiveProfile(profile));
        // async fetch
        return dispatch(reloadActiveInstances(getState().instances.contextSelection));
      })
      .catch(() => {
        dispatch(Notifications.error(notifyOptions({
          title: 'dispatch Error',
          message: 'error in updateProfile, call administrator',
        })));
      });
  };
