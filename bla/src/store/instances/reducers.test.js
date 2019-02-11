import deepFreeze from 'deep-freeze';

import {
  REQUEST_ACTIVE,
  RECEIVE_ACTIVE,
  SET_CONTEXT_SELECTION,
  ADD_PROFILE_SELECTION,
  REMOVE_PROFILE_SELECTION,
  CLEAR_PROFILE_SELECTION,
  UPDATE_FILTER,
  UPDATE,
} from './actions';

import { activeProfilesState, activeInstancesState } from './mock';

import instances from './reducers';

describe('instances reducer', () => {
  it('default state', () => {
    const before = {};
    const after = {};
    const action = {};

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, {})).toEqual(after);
  });

  it(`action.type: ${UPDATE} - update an existing instance`, () => {
    const message =
      {
        id: 'linux/telegraf/sommermar/linux/systemd/telegraf.service',
        op: 'put',
        definition: {
          organization: 'linux',
          name: 'systemd',
        },
        host: 'sommermar',
        discovery: 'telegraf.service',
        profile: {
          id: 'linux/telegraf',
          organization: 'linux',
          name: 'telegraf',
        },
        target: 'running',
        current: 'stopped',
        override: 'unknown',
      };
    const before = {
      activeInstances: { ...activeInstancesState },
    };
    const stateAfterUpdate = { ...activeInstancesState };
    stateAfterUpdate[
      'linux/telegraf/sommermar/linux/systemd/telegraf.service'
    ].current =
      'stopped';
    const after = {
      activeInstances: stateAfterUpdate,
    };
    const action = {
      type: UPDATE,
      message,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, action)).toEqual(after);
  });

  it(`action.type: ${REQUEST_ACTIVE}`, () => {
    const before = {
      fetchingActive: false,
    };
    const after = {
      fetchingActive: true,
    };
    const action = {
      type: REQUEST_ACTIVE,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, action)).toEqual(after);
  });

  it(`action.type: ${RECEIVE_ACTIVE}`, () => {
    const before = {
      fetchingActive: true,
    };
    const after = {
      fetchingActive: false,
      activeProfiles: activeProfilesState,
      activeInstances: activeInstancesState,
      selectedProfiles: [],
    };

    const action = {
      type: RECEIVE_ACTIVE,
      active: {
        profiles: activeProfilesState,
        instances: activeInstancesState,
      },
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, action)).toEqual(after);
  });

  it(`action.type: ${SET_CONTEXT_SELECTION}`, () => {
    const contextSelection = {
      context: 'test',
    };
    const before = {};
    const after = {
      contextSelection,
    };

    const action = {
      type: SET_CONTEXT_SELECTION,
      context: contextSelection,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, action)).toEqual(after);
  });

  it(`action.type: ${ADD_PROFILE_SELECTION} with empty state`, () => {
    const before = {};
    const after = {
      selectedProfiles: ['p1'],
    };

    const action = {
      type: ADD_PROFILE_SELECTION,
      profileId: 'p1',
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, action)).toEqual(after);
  });

  it(`action.type: ${ADD_PROFILE_SELECTION} non empty state`, () => {
    const selectedProfiles = ['p1', 'p2'];
    const before = {
      selectedProfiles: [selectedProfiles[0]],
    };
    const after = {
      selectedProfiles,
    };

    const action = {
      type: ADD_PROFILE_SELECTION,
      profileId: selectedProfiles[1],
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, action)).toEqual(after);
  });

  it(`action.type: ${REMOVE_PROFILE_SELECTION} with empty state`, () => {
    const before = {};
    const after = {
      selectedProfiles: [],
    };

    const action = {
      type: REMOVE_PROFILE_SELECTION,
      profileId: 'p1',
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, action)).toEqual(after);
  });

  it(`action.type: ${REMOVE_PROFILE_SELECTION} non empty state`, () => {
    const selectedProfiles = ['p1', 'p2'];
    const before = {
      selectedProfiles,
    };
    const after = {
      selectedProfiles: [selectedProfiles[1]],
    };

    const action = {
      type: REMOVE_PROFILE_SELECTION,
      profileId: selectedProfiles[0],
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, action)).toEqual(after);
  });

  it(`action.type: ${CLEAR_PROFILE_SELECTION} non empty state`, () => {
    const selectedProfiles = ['p1', 'p2'];
    const before = {
      selectedProfiles,
    };
    const after = {
      selectedProfiles: [],
    };

    const action = {
      type: CLEAR_PROFILE_SELECTION,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, action)).toEqual(after);
  });

  it(`action.type: ${UPDATE_FILTER}`, () => {
    const before = {
      filter: {
        id: 'foxb',
      },
    };
    const after = {
      filter: {
        id: 'foxb',
        failed: true,
        overridden: false,
      },
    };

    const action = {
      type: UPDATE_FILTER,
      filter: {
        failed: true,
        overridden: false,
      },
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, action)).toEqual(after);
  });

  it(`action.type: ${UPDATE} - add a new instance to an existing profile`, () => {
    const message =
      {
        id: 'linux/telegraf/herzogm/linux/systemd/telegraf.service',
        op: 'put',
        definition: {
          organization: 'linux',
          name: 'systemd',
        },
        host: 'herzogm',
        discovery: 'telegraf.service',
        profile: {
          id: 'linux/telegraf',
          organization: 'linux',
          name: 'telegraf',
        },
        target: 'running',
        current: 'stopped',
        override: 'unknown',
      };
    const before = {
      activeInstances: activeInstancesState,
      activeProfiles: activeProfilesState,
    };

    // set state of active Profiles after the update
    const instance = message.id;
    const activeProfileStateAfterUpdate = {
      ...activeProfilesState,
      'linux/telegraf': {
        ...activeProfilesState['linux/telegraf'],
        instances: [
          ...activeProfilesState['linux/telegraf'].instances,
          instance,
        ],
      },
    };

    // set state for instances after the update
    const newMessage = message;
    const instanceStateAfterUpdate = {
      ...activeInstancesState,
      [newMessage.id]: newMessage,
    };
    const after = {
      activeInstances: instanceStateAfterUpdate,
      activeProfiles: activeProfileStateAfterUpdate,
    };

    const action = {
      type: UPDATE,
      message,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, action)).toEqual(after);
  });

  it(`action.type: ${UPDATE} - add an instance that is missing in profiles`, () => {
    const message =
      {
        id: 'linux/fake/herzogm/linux/systemd/telegraf.service',
        op: 'put',
        definition: {
          organization: 'linux',
          name: 'systemd',
        },
        host: 'herzogm',
        discovery: 'telegraf.service',
        profile: {
          id: 'linux/fake',
          organization: 'linux',
          name: 'telegraf',
        },
        target: 'running',
        current: 'stopped',
        override: 'unknown',
      };
    const before = {
      activeInstances: activeInstancesState,
      activeProfiles: activeProfilesState,
    };

    const after = {
      activeInstances: activeInstancesState,
      activeProfiles: activeProfilesState,
    };
    const action = {
      type: UPDATE,
      message,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, action)).toEqual(after);
  });

  it(`action.type: ${UPDATE} - remove instance`, () => {
    const message =
      {
        id: 'linux/telegraf/sommermar/linux/systemd/telegraf.service',
        op: 'delete',
        definition: {
          organization: 'linux',
          name: 'systemd',
        },
        host: 'herzogm',
        discovery: 'telegraf.service',
        profile: {
          id: 'linux/telegraf',
          organization: 'linux',
          name: 'telegraf',
        },
        target: 'running',
        current: 'stopped',
        override: 'unknown',
      };
    const before = {
      activeInstances: activeInstancesState,
      activeProfiles: activeProfilesState,
    };

    const activeProfilesStateAfter = {
      'linux/telegraf': {
        id: 'linux/telegraf',
        organization: 'linux',
        name: 'telegraf',
        tags: {
          context: ['dev', 'e1', 'e2'],
        },
        constraints: {},
        instances: [
          'linux/telegraf/sauterm/linux/systemd/telegraf.service',
        ],
      },
    };
    const after = {
      activeInstances: {
        'linux/telegraf/sauterm/linux/systemd/telegraf.service': activeInstancesState['linux/telegraf/sauterm/linux/systemd/telegraf.service'],
      },
      activeProfiles: activeProfilesStateAfter,
    };
    const action = {
      type: UPDATE,
      message,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(instances(before, action)).toEqual(after);
  });
});
