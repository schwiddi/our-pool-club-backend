// creates an multi action object
export const actionObject = (action, instances) => ({
  profile: {
    name: instances[0].profile.name,
  },
  action,
  instances: instances.map(instance => instance.id),
});

// creates an profile action object
export const profileActionObject = (action, profile) => ({
  organization: profile.organization,
  profile,
  action,
});
