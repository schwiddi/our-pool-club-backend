
export const selectedProfilesState = [
  'linux/telegraf',
];

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

export const activeInstancesState = {
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
export const activeInstancesResponse = [
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
