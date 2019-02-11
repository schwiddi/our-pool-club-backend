import get from 'lodash/get';

export const profilesToArray = state => (
  (get(state, 'profiles.all'))
    ? Object.keys(state.profiles.all).map(key => state.profiles.all[key])
    : []
);

export const getProfileByID = (state, id) => (
  get(state, `profiles.all["${id}"]`, {})
);

export const getDiscoveredProfiles = (state, profileId) => {
  const nodes = get(state, `profiles.discoveredProfiles["${profileId}"].nodes`, {});
  return Object.keys(nodes).map(p => ({ node: p, state: nodes[p] }));
};

export const requestingDisoverProfiles = (state, profileId) => (
  get(state, `profiles.requestingDisoverProfiles["${profileId}"]`, false)
);

// extracts all contexts list form profiles ordered by production first
export const getAllContexts = (state) => {
  const prod = new Set();
  const other = new Set();
  profilesToArray(state).map((p) => {
    const context = get(p, 'tags.context');
    if (context) {
      context.map((ctx) => {
        if (ctx && ctx.length > 0 && ctx[0].toLowerCase() === 'p') {
          prod.add(ctx);
        } else {
          other.add(ctx);
        }
        return null;
      });
    }
    return null;
  });
  return [...[...prod].sort(), ...[...other].sort()];
};
