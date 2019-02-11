import deepFreeze from 'deep-freeze';

import {
  REQUEST_ALL,
  RECEIVE_ALL,
  DELETING,
  DELETE_SUCCESS,
  DELETE_ERROR,
  UPDATE,
  FILTER,
} from './actions';
import nodes from './reducers';

describe('nodes reducer', () => {
  it('default state', () => {
    const before = {};
    const after = {};
    const action = {};

    deepFreeze(before);
    deepFreeze(action);

    expect(nodes(before, {})).toEqual(after);
  });

  it(`action.type: ${REQUEST_ALL}`, () => {
    const before = {
      fetchingAll: false,
    };
    const after = {
      fetchingAll: true,
    };
    const action = {
      type: REQUEST_ALL,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(nodes(before, action)).toEqual(after);
  });

  it(`action.type: ${RECEIVE_ALL}`, () => {
    const response = [
      {
        name: 'zbindenren',
        status: 'stopped',
      },
      {
        name: 'p1-linux-mlsu008',
        status: 'running',
      },
      {
        name: 'e1-aplat-alsu001',
        status: 'stopped',
      },
      {
        name: 'e1-isy-alzf001',
        status: 'stopped',
      },
    ];
    const state = {
      all: response,
    };
    const before = {
      fetchingAll: true,
    };
    const after = Object.assign({ fetchingAll: false }, state);
    const action = {
      type: RECEIVE_ALL,
      nodes: response,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(nodes(before, action)).toEqual(after);
  });

  it(`action.type: ${DELETING}`, () => {
    const before = {};
    const after = {
      nodeDeleting: true,
    };
    const action = {
      type: DELETING,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(nodes(before, action)).toEqual(after);
  });

  it(`action.type: ${DELETE_SUCCESS}`, () => {
    const before = {
      nodeDeleting: true,
      all: [
        {
          name: 'zbindenren',
          status: 'stopped',
        },
        {
          name: 'p1-linux-mlsu008',
          status: 'running',
        },
        {
          name: 'e1-aplat-alsu001',
          status: 'stopped',
        },
        {
          name: 'e1-isy-alzf001',
          status: 'stopped',
        },
      ],
    };
    const after = {
      nodeDeleting: false,
      all: [
        {
          name: 'zbindenren',
          status: 'stopped',
        },
        {
          name: 'e1-aplat-alsu001',
          status: 'stopped',
        },
        {
          name: 'e1-isy-alzf001',
          status: 'stopped',
        },
      ],
    };
    const action = {
      type: DELETE_SUCCESS,
      node: 'p1-linux-mlsu008',
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(nodes(before, action)).toEqual(after);
  });

  it(`action.type: ${DELETE_ERROR}`, () => {
    const before = {};
    const after = {
      nodeDeleteError: true,
      nodeDeleting: false,
    };
    const action = {
      type: DELETE_ERROR,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(nodes(before, action)).toEqual(after);
  });

  it(`action.type: ${UPDATE}`, () => {
    const before = {
      all: [
        {
          name: 'zbindenren',
          status: 'stopped',
        },
        {
          name: 'p1-linux-mlsu008',
          status: 'running',
        },
        {
          name: 'e1-aplat-alsu001',
          status: 'stopped',
        },
      ],
    };
    const after = {
      ...before,
      all: [
        {
          name: 'zbindenren',
          status: 'stopped',
        },
        {
          name: 'p1-linux-mlsu008',
          status: 'running',
        },
        {
          name: 'e1-aplat-alsu001',
          status: 'running',
        },
      ],
    };

    const afterNewNode = {
      ...before,
      all: [
        {
          name: 'zbindenren',
          status: 'stopped',
        },
        {
          name: 'p1-linux-mlsu008',
          status: 'running',
        },
        {
          name: 'e1-aplat-alsu001',
          status: 'stopped',
        },
        {
          name: 'foxb',
          status: 'running',
        },
      ],
    };
    const action = {
      type: UPDATE,
      node: {
        name: 'e1-aplat-alsu001',
        status: 'running',
      },
    };

    const actionNewNode = {
      type: UPDATE,
      node: {
        name: 'foxb',
        status: 'running',
      },
    };

    deepFreeze(before);
    deepFreeze(action);
    deepFreeze(actionNewNode);

    expect(nodes(before, action)).toEqual(after);
    expect(nodes(before, actionNewNode)).toEqual(afterNewNode);
  });

  it(`action.type: ${FILTER}`, () => {
    const filter = {
      failed: true,
    };

    const before = {};
    const after = {
      filter,
    };

    const action = {
      type: FILTER,
      filter,
    };

    deepFreeze(before);
    deepFreeze(action);

    expect(nodes(before, action)).toEqual(after);
  });
});
