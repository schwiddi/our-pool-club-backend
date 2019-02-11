import {
  getDefinitions,
  getDefinitionByID,
  getInstanceActions,
} from './selectors';

import { definitionState as definitions } from './mock';
import { activeInstancesState } from '../instances/mock';

const state = {
  definitions: {
    definitions,
  },
  instances: {
    activeInstances: activeInstancesState,
  },
};

const invalidStates = [
  undefined,
  {},
  { definitions: {} },
  {
    definitions: {
      definitions: undefined,
    },
  },
];

describe('getDefinitions', () => {
  invalidStates.forEach((s) => {
    it(`should return empty object for invalid state: ${s}`, () => {
      expect(getDefinitions(s)).toEqual({});
    });
  });

  it('should return definitions', () => {
    expect(getDefinitions(state)).toEqual(definitions);
  });
});

describe('getDefinitionsByID', () => {
  it('should return empty object for not found id', () => {
    expect(getDefinitionByID(state, 'notexist')).toEqual({});
  });

  it('should return valid definition for id org:midwadm', () => {
    expect(getDefinitionByID(state, 'org:midwadm').name).toEqual('midwadm');
  });
});

describe('getInstanceActions', () => {
  it('should return empty object for not found id', () => {
    expect(getInstanceActions(state, 'notexist')).toEqual([]);
  });

  it('should return valid definition for id org:midwadm', () => {
    expect(getInstanceActions(state, 'linux/telegraf/sommermar/linux/systemd/telegraf.service')).toEqual([
      'status',
      'start',
      'stop',
      'bancs-deletesnaphsot',
      'disable',
      'eaipf-refreshVm',
      'enable',
      'wsd-deletesnapshot',
    ]);
  });
});
