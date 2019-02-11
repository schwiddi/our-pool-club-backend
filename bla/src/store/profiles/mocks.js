// Send a profile update Request to the backend API
export const profileUpdateRequest = {
  id: 'linux/autofs',
  organization: 'linux',
  name: 'autofs',
  constraints: {
    os: ['linux'],
  },
  running: [null, null],
  active: true,
};

// receive a profile update from the backend API
export const profileUpdateResponse = {
  id: 'linux/autofs',
  organization: 'linux',
  name: 'autofs',
  constraints: {
    os: ['linux'],
  },
  running: [null, null],
  active: true,
};

// a profile update from the backend will be stored in this format
// in the redux state
export const profileUpdateState = {
  id: 'linux/autofs',
  organization: 'linux',
  name: 'autofs',
  constraints: {
    os: ['linux'],
  },
  running: [null, null],
  active: true,
};

// profiles are normalized & stored in Redux store like this
export const activeProfilesState = {
  'linux/telegraf': {
    id: 'linux/telegraf',
    organization: 'linux',
    name: 'telegraf',
    tags: {
      context: ['dev', 'e1', 'e2'],
    },
    constraints: {},
    instances: [
      'linux/telegraf/sommermar/linux/systemd/telegraf.service',
      'linux/telegraf/sauterm/linux/systemd/telegraf.service',
    ],
  },
};

// instances are normalized & stored in Redux store like this
export const activeProfilesInstanceState = {
  'linux/telegraf/sommermar/linux/systemd/telegraf.service': {
    id: 'linux/telegraf/sommermar/linux/systemd/telegraf.service',
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
    current: 'running',
    override: 'unknown',
  },
  'linux/telegraf/sauterm/linux/systemd/telegraf.service': {
    id: 'linux/telegraf/sauterm/linux/systemd/telegraf.service',
    definition: {
      organization: 'linux',
      name: 'systemd',
    },
    host: 'sauterm',
    discovery: 'telegraf.service',
    profile: {
      id: 'linux/telegraf',
      organization: 'linux',
      name: 'telegraf',
    },
    target: 'running',
    current: 'running',
    override: 'unknown',
  },
};

// unnormalized response from the backend when requesting active profiles
// i.e htps://localhost:3001/api/v1/discovery/organizations/linux?context=e1
export const activeProfilesResponse = [
  {
    id: 'linux/telegraf',
    organization: 'linux',
    name: 'telegraf',
    tags: {
      context: ['dev', 'e1', 'e2'],
    },
    constraints: {},
    instances: [
      {
        id: 'linux/telegraf/sommermar/linux/systemd/telegraf.service',
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
        current: 'running',
        override: 'unknown',
      },
      {
        id: 'linux/telegraf/sauterm/linux/systemd/telegraf.service',
        definition: {
          organization: 'linux',
          name: 'systemd',
        },
        host: 'sauterm',
        discovery: 'telegraf.service',
        profile: {
          id: 'linux/telegraf',
          organization: 'linux',
          name: 'telegraf',
        },
        target: 'running',
        current: 'running',
        override: 'unknown',
      },
    ],
  },
];

// unnormalized response from the backend when requesting all profiles
// i.e. http://localhost:3001/api/v1/config/organizations/linux/profiles
export const allProfilesResponse = [
  {
    id: 'linux/telegraf',
    organization: 'linux',
    name: 'telegraf',
    tags: {
      context: ['dev', 'e1', 'e2'],
    },
    constraints: {
      os: ['linux'],
    },
    running: [
      {
        definition: 'systemd',
        discovery: 'telegraf',
        host: '',
      },
      {
        definition: 'sysv',
        discovery: 'telegraf',
        host: '',
      },
    ],
    active: true,
  },
  {
    id: 'linux/autofs',
    organization: 'linux',
    name: 'autofs',
    tags: {
      context: ['prod'],
    },
    constraints: {
      os: ['linux'],
    },
    running: [
      {
        definition: 'systemd',
        discovery: 'autofs',
        host: '',
      },
      {
        definition: 'sysv',
        discovery: 'autofs',
        host: '',
      },
    ],
    active: true,
  },
];

export const allProfilesState = {
  'linux/telegraf': {
    id: 'linux/telegraf',
    organization: 'linux',
    name: 'telegraf',
    tags: {
      context: ['dev', 'e1', 'e2'],
    },
    constraints: {
      os: ['linux'],
    },
    running: [
      {
        definition: 'systemd',
        discovery: 'telegraf',
        host: '',
      },
      {
        definition: 'sysv',
        discovery: 'telegraf',
        host: '',
      },
    ],
    active: true,
  },
  'linux/autofs': {
    id: 'linux/autofs',
    organization: 'linux',
    name: 'autofs',
    tags: {
      context: ['prod'],
    },
    constraints: {
      os: ['linux'],
    },
    running: [
      {
        definition: 'systemd',
        discovery: 'autofs',
        host: '',
      },
      {
        definition: 'sysv',
        discovery: 'autofs',
        host: '',
      },
    ],
    active: true,
  },
};
