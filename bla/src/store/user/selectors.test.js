import currentUser from './actions.test';
import {
  getOrganizations,
  getDefaultOrganization,
  getSelectedOrganization,
  getUserName,
  DEFAULT_ORG,
  getUserIsAdmin,
} from './selectors';

const state = {
  user: {
    current: currentUser,
  },
};

const invalidStates = [
  undefined,
  {},
  { user: {} },
  {
    user: {
      current: undefined,
    },
  },
];

describe('getOrganizations', () => {
  invalidStates.forEach((s) => {
    it(`should return empty list for invalid state: ${s}`, () => {
      expect(getOrganizations(s)).toEqual([]);
    });
  });

  it('should return organizations for current user', () => {
    expect(getOrganizations(state)).toEqual(currentUser.organizations);
  });
});

describe('getDefaultOrganizations', () => {
  it(`should return '${DEFAULT_ORG}' list for empty state`, () => {
    expect(getDefaultOrganization(undefined)).toEqual(DEFAULT_ORG);
  });

  invalidStates.forEach((s) => {
    it(`should return '${DEFAULT_ORG}' for invalid state ${s}`, () => {
      expect(getDefaultOrganization(s)).toEqual(DEFAULT_ORG);
    });
  });

  it('should return first organization for current user', () => {
    expect(getDefaultOrganization(state)).toEqual(currentUser.organizations[0]);
  });
});

describe('getSelectedOrganization', () => {
  it(`should return '${DEFAULT_ORG}' list for empty state`, () => {
    expect(getSelectedOrganization(undefined)).toEqual(DEFAULT_ORG);
  });

  invalidStates.forEach((s) => {
    it(`should return '${DEFAULT_ORG}' for invalid state ${s}`, () => {
      expect(getSelectedOrganization(s)).toEqual(DEFAULT_ORG);
    });
  });

  it('should return first organization for current user, when no organizaton is selected', () => {
    expect(getSelectedOrganization(state)).toEqual(currentUser.organizations[0]);
  });

  const selectedOrganization = 'metricsOrg';
  const stateWithSelectedOrg = {
    user: {
      current: currentUser,
      selectedOrganization,
    },
  };

  it('should return selected organization if there is one in state', () => {
    expect(getSelectedOrganization(stateWithSelectedOrg)).toEqual(selectedOrganization);
  });

  it('should return the user', () => {
    expect(getUserName(stateWithSelectedOrg)).toEqual('admin');
  });
});

describe('getUserIsAdmin', () => {
  it('should return false if no arg is given', () => {
    expect(getUserIsAdmin()).toEqual(false);
  });

  it('should return false if one role is given that is not admin', () => {
    expect(getUserIsAdmin('l3_adw')).toEqual(false);
  });

  it('should return false if two roles are given and none is admin', () => {
    expect(getUserIsAdmin(['l3_adw', 'l3_aml'])).toEqual(false);
  });

  it('should return true if only admin role is given', () => {
    expect(getUserIsAdmin('admin')).toEqual(false);
  });


  it('should return true if two roles, the admin and another role was given', () => {
    expect(getUserIsAdmin(['admin', 'l3_aml'])).toEqual(false);
  });
});
