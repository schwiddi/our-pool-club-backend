import {
  profilesToArray,
  getProfileByID,
  getDiscoveredProfiles,
  requestingDisoverProfiles,
  getAllContexts,
} from './selectors';
import { allProfilesState } from './mocks';

describe('profilesToArray', () => {
  const state = {
    profiles: {
      all: {
        1: '1',
        2: '2',
      },
    },
  };
  const arr = ['1', '2'];
  it('should convert a list of profiles into array', () => {
    expect(profilesToArray(state)).toEqual(arr);
  });

  it('should handle an empty state', () => {
    expect(profilesToArray()).toEqual([]);
  });

  it('should handle an empty list of profiles', () => {
    expect(profilesToArray({ profiles: {} })).toEqual([]);
  });
});

describe('getProfileByID', () => {
  const state = {
    profiles: {
      all: allProfilesState,
    },
  };

  const emptyState = {
    profiles: {
      all: {},
    },
  };

  it('should return correct profile', () => {
    expect(getProfileByID(state, 'linux/autofs').name).toEqual('autofs');
  });

  it('should return empty object', () => {
    expect(getProfileByID(state, 'notExistentId')).toEqual({});
    expect(getProfileByID(emptyState, 'emptyState')).toEqual({});
  });
});

describe('getDiscoveredProfiles', () => {
  const state = {
    profiles: {
      discoveredProfiles: {
        id1: {
          nodes: {
            node1: 'valueNode1',
            node2: 'valueNode2',
          },
        },
        id2: {
          nodes: {
            node3: 'valueNode2',
            node4: 'valueNode3',
          },
        },
      },
    },
  };

  const emptyState = {
    profiles: {},
  };

  it('should return correct object', () => {
    expect(getDiscoveredProfiles(state, 'id1')).toEqual([
      {
        node: 'node1',
        state: 'valueNode1',
      },
      {
        node: 'node2',
        state: 'valueNode2',
      },
    ]);
  });

  it('should return an empty object', () => {
    expect(getDiscoveredProfiles(emptyState, 'id1')).toEqual([]);
    expect(getDiscoveredProfiles(state, 'notExistensId')).toEqual([]);
  });
});

describe('requestingDisoverProfiles', () => {
  const state = {
    profiles: {
      requestingDisoverProfiles: {
        id1: true,
      },
    },
  };

  const emptyState = {
    profiles: {},
  };

  it('should return true', () => {
    expect(requestingDisoverProfiles(state, 'id1')).toEqual(true);
  });

  it('should return false', () => {
    expect(requestingDisoverProfiles(state, 'notExistendId')).toEqual(false);
    expect(requestingDisoverProfiles(emptyState, 'emptyState')).toEqual(false);
  });
});

describe('getAllContexts', () => {
  const state = {
    profiles: {
      all: allProfilesState,
    },
  };

  it('should return correct contests', () => {
    expect(getAllContexts(state)).toEqual(['prod', 'dev', 'e1', 'e2']);
  });
});

