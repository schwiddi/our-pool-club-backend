import isWebsocketConnected from './selectors';

const invalidStates = [
  undefined,
  {},
  { websockets: {} },
  {
    websockets: {
      connected: undefined,
    },
  },
];

describe('isWebsocketConnected', () => {
  invalidStates.forEach((s) => {
    it(`should return empty list for invalid state: ${s}`, () => {
      expect(isWebsocketConnected(s)).toEqual(false);
    });
  });

  const state = {
    websockets: {
      connected: true,
    },
  };
  it('should return organizations for current user', () => {
    expect(isWebsocketConnected(state)).toEqual(true);
  });
});
