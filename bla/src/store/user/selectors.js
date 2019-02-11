import get from 'lodash/get';

export const DEFAULT_ORG = 'none';

export const getOrganizations = state => (
  get(state, 'user.current.organizations', [])
);

export const getDefaultOrganization = state => (
  getOrganizations(state).length === 0 ? DEFAULT_ORG : getOrganizations(state)[0]
);

// returns default org if not set
export const getSelectedOrganization = state => (
  get(state, 'user.selectedOrganization', getDefaultOrganization(state))
);

// returns the user
export const getUserName = state => (
  get(state, 'user.current.name', 'undef')
);

// returns true if user has admin role
export const getUserIsAdmin = state => (
  get(state, 'user.current.roles', 'undef').includes('admin')
);
