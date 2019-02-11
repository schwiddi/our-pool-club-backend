export const definitionState = {
  'org:midwadm': {
    id: 'org:midwadm',
    name: 'midwadm',
    constraints: {},
    definition: {
      organization: 'org',
      profile: 'midwadm',
    },
    discovery: {
      script: {
        rediscover: false,
      },
    },
    commands: {
      kill: {
        rediscover: false,
      },
      start: {
        rediscover: false,
      },
      stop: {
        rediscover: false,
      },
    },
  },
  'linux:systemd': {
    id: 'linux:systemd',
    name: 'systemd',
    constraints: {},
    definition: {
      organization: 'linux',
      profile: 'systemd',
    },
    discovery: {
      script: {
        rediscover: false,
      },
    },
    commands: {
      disable: {
        rediscover: false,
      },
      enable: {
        rediscover: false,
      },
      start: {
        rediscover: false,
      },
      stop: {
        rediscover: false,
      },
      status: {},
      'eaipf-refreshVm': {},
      'bancs-deletesnaphsot': {},
      'wsd-deletesnapshot': {},
    },
  },
};

// unnormalized response from the backend
export const definitionResponse = [
  {
    id: 'org:midwadm',
    name: 'midwadm',
    constraints: {},
    definition: {
      organization: 'org',
      profile: 'midwadm',
    },
    discovery: {
      script: {
        rediscover: false,
      },
    },
    commands: {
      kill: {
        rediscover: false,
      },
      start: {
        rediscover: false,
      },
      stop: {
        rediscover: false,
      },
    },
  },
  {
    id: 'linux:systemd',
    name: 'systemd',
    constraints: {},
    definition: {
      organization: 'linux',
      profile: 'systemd',
    },
    discovery: {
      script: {
        rediscover: false,
      },
    },
    commands: {
      disable: {
        rediscover: false,
      },
      enable: {
        rediscover: false,
      },
      start: {
        rediscover: false,
      },
      stop: {
        rediscover: false,
      },
      status: {},
      'eaipf-refreshVm': {},
      'bancs-deletesnaphsot': {},
      'wsd-deletesnapshot': {},
    },
  },
];
