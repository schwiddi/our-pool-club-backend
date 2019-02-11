import {
  getNodes,
  getFailedNodes,
  getFilteredNodes,
  getIfNodeIsHealthy,
  getIfAllNodesAreHealthy,
} from './selectors';

describe('get nodes', () => {
  const state = {
    nodes: {
      all: [
        { name: 'nodexyz', status: 'running' },
        { name: 'node1', status: 'running' },
        { name: 'node2', status: 'stopped' },
      ],
    },
  };

  const expectedResult = [
    { name: 'node1', status: 'running' },
    { name: 'node2', status: 'stopped' },
    { name: 'nodexyz', status: 'running' },
  ];

  const emptyState = {
    nodes: {},
  };

  it('should return an array with the nodes objects', () => {
    expect(getNodes(state)).toEqual(expectedResult);
  });

  it('should return an empty', () => {
    expect(getNodes(emptyState)).toEqual([]);
  });
});

describe('get failed nodes', () => {
  const state = {
    nodes: {
      all: [
        { name: 'nodexyz', status: 'running' },
        { name: 'node1', status: 'running' },
        { name: 'node2', status: 'stopped' },
      ],
    },
  };

  const expectedResult = [
    { name: 'node2', status: 'stopped' },
  ];

  const emptyState = {
    nodes: {},
  };

  it('should return an array with the failed nodes objects', () => {
    expect(getFailedNodes(state)).toEqual(expectedResult);
  });

  it('should return an empty', () => {
    expect(getFailedNodes(emptyState)).toEqual([]);
  });
});

describe('nodes selector', () => {
  const failedNodes = [];
  const invalidStates = [
    undefined,
    {},
    {
      nodes: {},
    },
  ];

  invalidStates.forEach((state) => {
    it(`should get empty list of failed nodes for undefined state ${state}`, () => {
      expect(getFilteredNodes(state)).toEqual(failedNodes);
    });
  });

  const all = [
    {
      name: 'node1',
      status: 'running',
    },
    {
      name: 'node2',
      status: 'stopped',
    },
  ];

  const validState = {
    nodes: {
      all,
    },
  };

  it('it should get all nodes', () => {
    expect(getFilteredNodes(validState)).toEqual(all);
  });

  const validStateWithFilter = {
    nodes: {
      all,
      filter: {
        failedOnly: true,
      },
    },
  };

  it('it should get filtered nodes', () => {
    expect(getFilteredNodes(validStateWithFilter)).toEqual([{
      name: 'node2',
      status: 'stopped',
    }]);
  });
});

describe('getIfNodeIsHealthy', () => {
  const state = {
    nodes: {
      all: [
        { name: 'node1', status: 'running' },
        { name: 'node2', status: 'stopped' },
      ],
    },
  };
  it('should return true cause the node we are checking is running', () => {
    expect(getIfNodeIsHealthy(state, 'node1')).toEqual(true);
  });

  it('should return false cause the node we are checking is stopped', () => {
    expect(getIfNodeIsHealthy(state, 'node2')).toEqual(false);
  });

  it('should return false cause the node we are checking is node in the store', () => {
    expect(getIfNodeIsHealthy(state, 'node3')).toEqual(false);
  });
});


describe('getIfAllNodesAreHealthy', () => {
  const state = {
    nodes: {
      all: [
        { name: 'node1', status: 'running' },
        { name: 'node2', status: 'running' },
        { name: 'node3', status: 'stopped' },
      ],
    },
  };

  const noNode = [];
  const oneNode = ['node1'];
  const twoGoodNodes = ['node1', 'node2'];
  const twoBadNodes = ['node3', 'node4'];
  const oneBadOneGoodNode = ['node1', 'node4'];
  const stoppedNode = ['node3'];

  it('should return false with no node given', () => {
    expect(getIfAllNodesAreHealthy(state, noNode)).toEqual(false);
  });

  it('should return false with one node given that is not running', () => {
    expect(getIfAllNodesAreHealthy(state, stoppedNode)).toEqual(false);
  });

  it('should return true with one node given that is running', () => {
    expect(getIfAllNodesAreHealthy(state, oneNode)).toEqual(true);
  });

  it('should return false with two bad nodes given', () => {
    expect(getIfAllNodesAreHealthy(state, twoBadNodes)).toEqual(false);
  });

  it('should return false with one good and one bad node given', () => {
    expect(getIfAllNodesAreHealthy(state, oneBadOneGoodNode)).toEqual(false);
  });

  it('should return true with two good nodes given', () => {
    expect(getIfAllNodesAreHealthy(state, twoGoodNodes)).toEqual(true);
  });
});
