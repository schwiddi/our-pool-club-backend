import get from 'lodash/get';

import { getActiveInstanceByID } from '../instances/selectors';

export const getDefinitions = state =>
  get(state, 'definitions.definitions', {});

export const getDefinitionByID = (state, id) =>
  get(getDefinitions(state), `["${id}"]`, {});

const prio = (input) => {
  switch (input) {
    case 'status':
      return '1';
    case 'start':
      return '2';
    case 'stop':
      return '3';
    default:
      return input;
  }
};

export const getInstanceActions = (state, id) => {
  const instance = getActiveInstanceByID(state, id);
  if (!instance || !instance.definition || !instance.definition.organization) {
    return [];
  }
  const definition = getDefinitionByID(
    state,
    `${instance.definition.organization}:${instance.definition.name}`,
  );
  if (!definition || !definition.commands) {
    return [];
  }
  return Object.keys(definition.commands).sort((a, b) => (prio(a) > prio(b)));
};
