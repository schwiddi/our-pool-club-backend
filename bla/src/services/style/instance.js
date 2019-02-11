export const instanceStateDesc = {
  unknown: 'unknown',
  transition: 'transition',
  success: 'success',
  failed: 'failed',
  neutral: 'neutral',
  crash: 'crash',
};

export const instanceState = {
  unknown: {
    color: 'lightgrey',
    state: instanceStateDesc.unknown,
    class: 'default',
    glyph: 'glyphicon glyphicon-question-sign',
    glyphicon: 'question-sign',
  },
  transition: {
    color: 'lightgrey',
    state: instanceStateDesc.transition,
    class: 'default',
    glyph: 'glyphicon glyphicon-repeat',
    glyhpicon: 'repeat',
  },
  success: {
    color: '#398439',
    state: instanceStateDesc.success,
    class: 'success',
    glyph: 'glyphicon glyphicon-ok-sign text-success',
    glyphicon: 'ok-sign',
  },
  failed: {
    color: '#d43f3a',
    state: instanceStateDesc.failed,
    class: 'danger',
    glyph: 'glyphicon glyphicon-exclamation-sign text-danger',
    glyphicon: 'exclamation-sign',
  },
  neutral: {
    color: '#269abc',
    state: instanceStateDesc.neutral,
    class: 'info',
    glyph: 'glyphicon glyphicon-minus text-info',
    glyphicon: 'minus',
  },
  crash: {
    color: '#F4FA58',
    state: instanceStateDesc.crash,
    class: 'warning',
    glyph: 'glyphicon glyphicon-fire text-danger',
    glyphicon: 'fire',
  },
};

export const backendState = {
  runinng: 'running',
  stopped: 'stopped',
  failed: 'failed',
  unknown: 'unknown',
  starting: 'starting',
  stopping: 'stopping',
  status: 'status',
};

const frontentState = {
  'unknown-unknown': instanceState.unknown,
  'unknown-running': instanceState.unknown,
  'unknown-stopped': instanceState.unknown,
  'running-unknown': instanceState.success,
  'running-running': instanceState.success,
  'running-stopped': instanceState.failed,
  'stopped-unknown': instanceState.neutral,
  'stopped-running': instanceState.failed,
  'stopped-stopped': instanceState.neutral,
  'failed-unknown': instanceState.failed,
  'failed-running': instanceState.failed,
  'failed-stopped': instanceState.failed,
  'starting-unknown': instanceState.transition,
  'starting-running': instanceState.transition,
  'starting-stopped': instanceState.transition,
  'stopping-unknown': instanceState.transition,
  'stopping-running': instanceState.transition,
  'stopping-stopped': instanceState.transition,
  'status-unknown': instanceState.transition,
  'status-running': instanceState.transition,
  'status-stopped': instanceState.transition,
};

export const getInstanceState = (instance) => {
  if (instance) {
    const { current } = instance;
    const target = (instance.override !== backendState.unknown)
      ? instance.override
      : instance.target;
    const id = `${current}-${target}`;
    return frontentState[id] ? frontentState[id] : instanceState.crash;
  }
  // instance is empty, return default
  return frontentState[`${backendState.unknown}-${backendState.unknown}`];
};

// return true if instance is failed
export const isFailed = instance => (
  instance
    ? getInstanceState(instance).state === instanceStateDesc.failed
    : false
);

// return true if instance is overwridden
export const isOverridden = instance => (
  instance
    ? (instance.override) && (instance.override !== instanceStateDesc.unknown)
    : false
);

// returnn the correct color
export const getColor = (failed, override) => {
  if (failed > 0) return instanceState[instanceStateDesc.failed].color;
  if (override > 0) return instanceState[instanceStateDesc.neutral].color;
  return instanceState[instanceStateDesc.success].color;
};

export default getInstanceState;
