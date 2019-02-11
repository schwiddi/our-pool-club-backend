
export const ONOPEN = 'websockets/ONOPEN';
export const ONCLOSE = 'websockets/ONCLOSE';
export const ONERROR = 'websockets/ONERROR';

// ws close event
export const wsOnOpen = () => ({
  type: ONOPEN,
});

// ws close event
export const wsOnClose = () => ({
  type: ONCLOSE,
});

// ws error event
export const wsOnError = () => ({
  type: ONERROR,
});
