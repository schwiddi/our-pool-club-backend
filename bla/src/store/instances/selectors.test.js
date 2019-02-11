// import { definitionState as definitions } from 'store/definitions/mock';
import {
  getSelectedContext,
  getContextSelector,
  getActiveProfiles,
  isUpdating,
  getSelectedProfileIds,
  instanceState,
  selectedProfilesArray,
  getActiveProfileByID,
  getActiveInstanceByID,
  // getProfileIdByInstance,
  getInstanceIds,
  // getUniqueActions,
  intersect,
  getFilter,
  getNodesFromInstances,
} from './selectors';
import {
  activeProfilesState,
  activeInstancesState,
  selectedProfilesState,
} from './mock';

describe('test selected context', () => {
  const state = {
    instances: {
      contextSelection: {
        context: 't1',
      },
    },
  };
  const emptyState = {
    instances: {},
  };
  it('should return the correct context String', () => {
    expect(getSelectedContext(state).context).toEqual('t1');
  });
  it('should return an empty String', () => {
    expect(getSelectedContext(emptyState)).toEqual({
      context: '',
    });
  });
});

describe('get active profiles', () => {
  const state = {
    instances: {
      activeProfiles: activeProfilesState,
    },
  };

  const emptyState = {
    instances: {},
  };

  it('should return an object of active profiles', () => {
    expect(getActiveProfiles(state)).toEqual(activeProfilesState);
  });

  it('should return an empty object', () => {
    expect(getActiveProfiles(emptyState)).toEqual({});
  });
});

describe('selected profiles', () => {
  const arr = Object.keys(activeProfilesState).map(key => activeProfilesState[key]);
  const state = {
    instances: {
      selectedProfiles: selectedProfilesState,
      activeProfiles: activeProfilesState,
    },
  };
  it('should return an array of selected profiles', () => {
    expect(selectedProfilesArray(state)).toEqual(arr);
  });
});

describe('test instance Filter', () => {
  const state = {
    instances: {
      filter: {
        id: 'testFilter',
        failed: false,
        overridden: false,
      },
    },
  };
  const emptyState = {
    instances: {},
  };
  it('should return the correct filter String', () => {
    expect(getFilter(state).id).toEqual('testFilter');
  });
  it('should return an empty String', () => {
    expect(getFilter(emptyState)).toEqual({
      id: '',
      overridden: false,
      failed: false,
    });
  });
});

describe('test isUpdating', () => {
  const stateCase1 = {
    instances: {
      lastUpdate: 2000,
      lastRelease: 1000,
    },
  };

  const stateCase2 = {
    instances: {
      lastUpdate: 2000,
      lastRelease: 2000,
    },
  };

  const emptyState = {
    instances: {},
  };

  it('case 1 should return true', () => {
    expect(isUpdating(stateCase1)).toEqual(true);
  });

  it('case 2 should return false', () => {
    expect(isUpdating(stateCase2)).toEqual(false);
  });

  it('empty state should return false', () => {
    expect(isUpdating(emptyState)).toEqual(false);
  });
});

describe('selected profiles', () => {
  const arr = Object.keys(activeProfilesState).map(key => activeProfilesState[key]);
  const state = {
    instances: {
      selectedProfiles: selectedProfilesState,
      activeProfiles: activeProfilesState,
    },
  };
  it('should return an array of selected profiles', () => {
    expect(selectedProfilesArray(state)).toEqual(arr);
  });
});

describe('test getSelectedProfileIds', () => {
  const state = {
    instances: {
      selectedProfiles: selectedProfilesState,
    },
  };

  const emptyState = {
    instances: {},
  };

  it('should return an array of selected profile ids', () => {
    expect(getSelectedProfileIds(state)).toEqual(['linux/telegraf']);
  });

  it('should return an empty array', () => {
    expect(getSelectedProfileIds(emptyState)).toEqual([]);
  });
});

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

describe('getContextSelector', () => {
  const state = {
    instances: {
      contextSelector: {
        context: 'test',
      },
    },
  };

  invalidStates.forEach(s =>
    it(`should return empty list for invalid state: ${s}`, () => {
      expect(getContextSelector(s)).toEqual({ context: 'None' });
    }));

  it('should return organizations for current user', () => {
    expect(getContextSelector(state)).toEqual({ context: 'test' });
  });
});

describe('instanceState', () => {
  const newState = (current, target, override) => ({
    instances: {
      activeInstances: {
        1: { current, target, override },
      },
    },
  });

  const addToState = (state, nr, current, target, override) => ({
    ...state,
    instances: {
      ...state.instances,
      activeInstances: {
        ...state.instances.activeInstances,
        [nr]: { current, target, override },
      },
    },
  });

  it('should test success', () => {
    const expected = {
      failed: 0, overwrites: 0, total: 1, state: '#398439',
    };
    const state = newState('running', 'running', 'unknown');
    expect(instanceState(state, { instances: ['1'] })).toEqual(expected);
  });

  it('should test neutral', () => {
    const expected = {
      failed: 0, overwrites: 0, total: 1, state: '#398439',
    };
    const state = newState('stopped', 'unknown', 'unknown');
    expect(instanceState(state, { instances: ['1'] })).toEqual(expected);
  });

  it('should test failed', () => {
    const expected = {
      failed: 1, overwrites: 0, total: 2, state: '#d43f3a',
    };
    let state = newState('running', 'stopped', 'unknown');
    state = addToState(state, 2, 'running', 'running', 'unknown');
    expect(instanceState(state, { instances: ['1', '2'] })).toEqual(expected);
  });

  it('should test unknown', () => {
    const expected = {
      failed: 0, overwrites: 0, total: 1, state: '#398439',
    };
    const state = newState('unknown', 'unknown', 'unknown');
    expect(instanceState(state, { instances: ['1'] })).toEqual(expected);
  });

  it('should test override', () => {
    const expected = {
      failed: 0, overwrites: 1, total: 2, state: '#269abc',
    };
    let state = newState('stopped', 'started', 'stopped');
    state = addToState(state, 2, 'running', 'running', 'unknown');
    expect(instanceState(state, { instances: ['1', '2'] })).toEqual(expected);
  });

  it('should test failed & override', () => {
    const expected = {
      failed: 1, overwrites: 1, total: 2, state: '#d43f3a',
    };
    let state = newState('stopped', 'started', 'stopped');
    state = addToState(state, 2, 'stopped', 'running', 'unknown');
    expect(instanceState(state, { instances: ['1', '2'] })).toEqual(expected);
  });
  it('should test empty state', () => {
    const expected = {
      failed: 0, overwrites: 0, total: 2, state: '#398439',
    };
    expect(instanceState({}, { instances: ['1', '2'] })).toEqual(expected);
  });
  it('should test empty profile', () => {
    const expected = {
      failed: 0, overwrites: 0, total: 0, state: '#398439',
    };
    const state = {};
    expect(instanceState(state, {})).toEqual(expected);
  });
});

describe('getActiveProfileByID', () => {
  const state = {
    instances: {
      activeProfiles: activeProfilesState,
    },
  };
  it('should return empty profile for nonexisting id', () => {
    expect(getActiveProfileByID(state, 'doesnotexist')).toEqual({});
  });

  it('should return valid profile for existing id', () => {
    expect(getActiveProfileByID(state, 'linux/telegraf').name).toEqual('telegraf');
  });
});

describe('getInstanceIds', () => {
  const profile = {
    instances: ['instanceID1', 'instanceID2'],
  };
  it('should return the list of instance ids for a given profile', () => {
    expect(getInstanceIds(profile)).toEqual(profile.instances);
  });

  it('should return an emtpy list', () => {
    expect(getInstanceIds({})).toEqual([]);
  });
  profile.instances = [];
  it('should return an emtpy list', () => {
    expect(getInstanceIds(profile)).toEqual([]);
  });
});

describe('getActiveInstanceByID', () => {
  const state = {
    instances: {
      activeInstances: activeInstancesState,
    },
  };
  it('should return empty instance for nonexisting id', () => {
    expect(getActiveInstanceByID(state, 'doesnotexist')).toEqual({});
  });

  it('should return valid instance for existing id', () => {
    expect(getActiveInstanceByID(
      state,
      'linux/telegraf/sommermar/linux/systemd/telegraf.service',
    ).host).toEqual('sommermar');
  });
});

describe('intersect', () => {
  const tests = [
    {
      arr1: [1, 2, 3, 4],
      arr2: [3, 4, 5],
      expected: [3, 4],
    },
    {
      arr1: [1, 2, 3, 4],
      arr2: [5, 6, 7],
      expected: [],
    },
    {
      arr1: [1, 2, 3, 4],
      arr2: [],
      expected: [],
    },
    {
      arr1: [],
      arr2: [],
      expected: [],
    },
    {
      arr1: [1, 2, 3, 4],
      arr2: null,
      expected: [],
    },
  ];
  tests.map(test =>
    it(`should return ${JSON.stringify(test.expected)} for arrays ${JSON.stringify(test.arr1)}, and ${JSON.stringify(test.arr2)}`, () => {
      expect(intersect(
        test.arr1,
        test.arr2,
      )).toEqual(test.expected);
    }));
});


describe('getNodesFromInstances', () => {
  const state = {
    instances: {
      activeInstances: activeInstancesState,
    },
  };

  const noInstances = [];
  const oneInstance = ['linux/telegraf/sommermar/linux/systemd/telegraf.service'];
  const moreInstances = ['linux/telegraf/sauterm/linux/systemd/telegraf.service', 'linux/telegraf/sommermar/linux/systemd/telegraf.service'];
  const sameNodeInstances = ['linux/telegraf/sauterm/linux/systemd/telegraf.service', 'linux/telegraf/sauterm/linux/systemd/telegraf.service'];
  const sameNodeAndOtherInstances = ['linux/telegraf/sauterm/linux/systemd/telegraf.service', 'linux/telegraf/sauterm/linux/systemd/telegraf.service', 'linux/telegraf/sommermar/linux/systemd/telegraf.service'];

  it('should return empty array if no instances given', () => {
    expect(getNodesFromInstances(state, noInstances)).toEqual([]);
  });

  it('should return array with one element if one instance is given', () => {
    expect(getNodesFromInstances(state, oneInstance)).toEqual(['sommermar']);
  });

  it('should return array with all hosts from the given instances', () => {
    expect(getNodesFromInstances(state, moreInstances)).toEqual(['sauterm', 'sommermar']);
  });

  it('should only return unique node names when two instances have the same node', () => {
    expect(getNodesFromInstances(state, sameNodeInstances)).toEqual(['sauterm']);
  });

  it('should only return unique node names when from three instances, two have the same node', () => {
    expect(getNodesFromInstances(state, sameNodeAndOtherInstances)).toEqual(['sauterm', 'sommermar']);
  });
});
