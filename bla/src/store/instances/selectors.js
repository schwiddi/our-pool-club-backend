import get from 'lodash/get';
import uniq from 'lodash/uniq';
import { getInstanceActions } from '../definitions/selectors';
import { isFailed, isOverridden, getColor } from '../../services/style/instance';

export const getSelectedContext = state => get(state, 'instances.contextSelection', { context: '' });

export const getContextSelector = state =>
  get(state, 'instances.contextSelector', { context: 'None' });

export const getActiveProfiles = state =>
  get(state, 'instances.activeProfiles', {});

export const getFilter = state => get(state, 'instances.filter', {
  id: '',
  overridden: false,
  failed: false,
});

export const isUpdating = (state) => {
  const lastUpdate = get(state, 'instances.lastUpdate', 0);
  const lastRelease = get(state, 'instances.lastRelease', 0);
  const diff = lastRelease - lastUpdate;
  if (diff === 0) return false;
  return diff < 5000;
};

export const activeProfilesArray = state =>
  Object.keys(getActiveProfiles(state))
    .map(key => getActiveProfiles(state)[key])
    .sort((a, b) => a.name.localeCompare(b.name));

export const getSelectedProfileIds = (state) => {
  const ids = get(state, 'instances.selectedProfiles', []);
  return ids.sort();
};

export const selectedProfilesArray = state =>
  activeProfilesArray(state).filter(profile =>
    getSelectedProfileIds(state).indexOf(profile.id) !== -1);

// get the instance-state for specific profile
// TODO: rename, has confusing name
export const instanceState = (state, profile) => {
  const instanceIds = get(profile, 'instances') || [];
  const failedCount = instanceIds.filter(id =>
    isFailed((get(state, 'instances.activeInstances') || {})[id])).length;
  const overrideCount = instanceIds.filter(id =>
    isOverridden((get(state, 'instances.activeInstances') || {})[id])).length;
  return {
    failed: failedCount,
    overwrites: overrideCount,
    total: instanceIds.length,
    state: getColor(failedCount, overrideCount),
  };
};

// get array of instances for a given profile
export const getInstanceIds = profile =>
  get(profile, 'instances', []);

export const getActiveProfileByID = (state, id) =>
  get(state, `instances.activeProfiles["${id}"]`, {});

export const getActiveInstanceByID = (state, id) =>
  get(state, `instances.activeInstances["${id}"]`) || {};

export const intersect = (array1, array2) => {
  if (!array1 || !array2) {
    return [];
  }
  const set = new Set(array2);
  const intersection = new Set([...array1].filter(x => set.has(x)));
  return [...intersection];
};

export const getProfileIdByInstance = instance => (
  get(instance, '.profile.id', {})
);

export const getUniqueActions = (state, selectedInstanceIds) => {
  let allActions = getInstanceActions(state, selectedInstanceIds[0]);
  for (let i = 0; i < selectedInstanceIds.length - 1; i += 1) {
    const currentActions = getInstanceActions(state, selectedInstanceIds[i + 1]);
    allActions = intersect(allActions, currentActions);
  }
  return [...allActions];
};

export const getNodesFromInstances = (state, instances) => {
  const nodes = [];
  instances.forEach((element) => {
    const tmp = getActiveInstanceByID(state, element).host;
    nodes.push(tmp);
  });
  const uniqnodes = uniq(nodes);
  return uniqnodes;
};
