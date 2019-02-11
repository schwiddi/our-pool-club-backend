// jobs are stored in Redux store like this
const activeJobsState = {
  user: {
    current: {
      name: 'development',
    },
  },
  jobs: {
    all: {
      '01C2EVSDKZF0G8JDHP5C5Z0HMQ': {
        id: '01C2EVSDKZF0G8JDHP5C5Z0HMQ',
        kind: 'ProfileAction',
        profile: {
          name: 'e-autofs',
          organization: 'linux',
          tags: {
            context: [
              'e1',
            ],
          },
          approval: {
            users: 1,
            instances: 5,
          },
        },
        status: {
          code: 'Pending',
        },
        action: 'start',
        description: 'start e aufofs',
        rejected_at: '000-01-01T00:00:00Z',
        instances: [
          'linux/e1-autofs/e1-herzogm-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-jordim-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-sauterm-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-schamnea-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-sommermar-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-zbindenren-alsu001/linux/sysv/autofs',
          'linux/e1-autofs/e1-brechbuehr-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-foxb-alsu001/linux/systemd/autofs.servic',
        ],
        created_by: 'development',
        created_at: '201-12-28T16:27:58.591847875+01:00',
        started_at: '000-01-01T00:00:00Z',
        deadline: '000-01-01T00:00:00Z',
      },
      '02C2EVSDKZF0G8JDHP5C5Z0HMQ': {
        id: '02C2EVSDKZF0G8JDHP5C5Z0HMQ',
        kind: 'ProfileAction',
        profile: {
          name: 'e-autofs',
          organization: 'zv',
          tags: {
            context: [
              'e1',
            ],
          },
          approval: {
            users: 1,
            instances: 5,
          },
        },
        status: {
          code: 'Cancelled',
        },
        action: 'start',
        description: 'start e aufofs',
        rejected_at: '000-01-01T00:00:00Z',
        instances: [
          'linux/e1-autofs/e1-herzogm-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-jordim-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-sauterm-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-schamnea-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-sommermar-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-zbindenren-alsu001/linux/sysv/autofs',
          'linux/e1-autofs/e1-brechbuehr-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-foxb-alsu001/linux/systemd/autofs.servic',
        ],
        created_by: 'operator',
        created_at: '201-12-28T16:27:58.591847875+01:00',
        started_at: '000-01-01T00:00:00Z',
        deadline: '000-01-01T00:00:00Z',
      },
      '03C2EVSDKZF0G8JDHP5C5Z0HMQ': {
        id: '03C2EVSDKZF0G8JDHP5C5Z0HMQ',
        kind: 'ProfileAction',
        profile: {
          name: 'e-autofs',
          organization: 'zv',
          tags: {
            context: [
              'e1',
            ],
          },
          approval: {
            users: 1,
            instances: 5,
          },
        },
        status: {
          code: 'Running',
        },
        action: 'start',
        description: 'start e aufofs',
        rejected_at: '000-01-01T00:00:00Z',
        instances: [
          'linux/e1-autofs/e1-herzogm-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-jordim-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-sauterm-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-schamnea-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-sommermar-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-zbindenren-alsu001/linux/sysv/autofs',
          'linux/e1-autofs/e1-brechbuehr-alsu001/linux/systemd/autofs.service',
          'linux/e1-autofs/e1-foxb-alsu001/linux/systemd/autofs.servic',
        ],
        created_by: 'operator',
        created_at: '201-12-28T16:27:58.591847875+01:00',
        started_at: '000-01-01T00:00:00Z',
        deadline: '000-01-01T00:00:00Z',
      },
    },
  },
};

export default activeJobsState;
