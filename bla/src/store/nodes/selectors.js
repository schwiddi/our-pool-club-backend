import get from 'lodash/get';

const initialState = {
  nodes: {
    all: [],
    filter: {
      failedOnly: false,
    },
  },
};

export const getNodes = (state = initialState) => {
  const all = get(state, 'nodes.all');
  if (all) {
    return all.sort((a, b) => a.name.localeCompare(b.name));
  }
  return [];
};

export const getFailedNodes = (state = initialState) => {
  const all = getNodes(state);
  return all.filter(node => node.status !== 'running');
};

export const getFilteredNodes = (state = initialState) => {
  const all = getNodes(state);
  const failedOnly = get(state, 'nodes.filter.failedOnly', false);
  if (failedOnly) {
    return all.filter(node => node.status !== 'running');
  }
  return all;
};

// when node is there and running should return true
// in all other cases false
export const getIfNodeIsHealthy = (state = initialState, node) => {
  const all = getNodes(state);
  const running = all.filter(element => element.status === 'running');
  const nodeIsHealthy = running.filter(element => element.name === node);
  if (nodeIsHealthy.length > 0) {
    return true;
  }
  return false;
};

// when all given nodes are running this should return true
// in all other cases false
export const getIfAllNodesAreHealthy = (state = initialState, nodes) => {
  if (nodes.length === 0) {
    return false;
  }
  const all = getNodes(state);

  const running = all.filter(element => element.status === 'running');

  const goodnodes = [];
  nodes.forEach((element) => {
    const nodeIsHealthy = running.filter(e => e.name === element);

    if (nodeIsHealthy.length > 0) {
      goodnodes.push(nodeIsHealthy);
    }
  });


  if (nodes.length === goodnodes.length) {
    return true;
  }
  return false;
};
