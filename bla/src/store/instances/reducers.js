import {
  REQUEST_ACTIVE,
  RECEIVE_ACTIVE,
  SET_CONTEXT_SELECTION,
  ADD_PROFILE_SELECTION,
  REMOVE_PROFILE_SELECTION,
  CLEAR_PROFILE_SELECTION,
  REQUEST_ACTION,
  RECEIVE_ACTION,
  UPDATE_FILTER,
  UPDATE,
  SET_UPDATE_FLAG,
  UNSET_UPDATE_FLAG,
} from './actions';

const d = +new Date();

const instances = (state = { lastUpdate: d, lastRelease: d }, action) => {
  switch (action.type) {
    case SET_UPDATE_FLAG:
      return {
        ...state,
        lastUpdate: +new Date(),
      };
    case UNSET_UPDATE_FLAG:
      return {
        ...state,
        lastRelease: +new Date(),
      };
    case REQUEST_ACTIVE:
      return {
        ...state,
        fetchingActive: true,
      };
    case RECEIVE_ACTIVE:
      return {
        ...state,
        activeProfiles: action.active.profiles,
        activeInstances: action.active.instances,
        fetchingActive: false,
        selectedProfiles: [],
      };
    case SET_CONTEXT_SELECTION:
      return {
        ...state,
        contextSelection: action.context,
      };
    case ADD_PROFILE_SELECTION: {
      const selectedProfiles = state.selectedProfiles
        ? [...state.selectedProfiles, action.profileId]
        : [action.profileId];
      return {
        ...state,
        selectedProfiles,
      };
    }
    case REMOVE_PROFILE_SELECTION: {
      const selectedProfiles = state.selectedProfiles
        ? state.selectedProfiles.filter(profileId => profileId !== action.profileId)
        : [];
      return {
        ...state,
        selectedProfiles,
      };
    }
    case CLEAR_PROFILE_SELECTION:
      return {
        ...state,
        selectedProfiles: [],
      };
    case REQUEST_ACTION:
      return {
        fetchingAction: true,
        ...state,
      };
    case RECEIVE_ACTION:
      return {
        fetchingAction: false,
        ...state,
      };
    case UPDATE_FILTER: {
      const filter = {
        ...state.filter,
        ...action.filter,
      };
      return {
        ...state,
        filter,
      };
    }
    case UPDATE: {
      const instance = action.message;
      if (instance.op === 'put') {
        if (state.activeInstances && state.activeInstances[instance.id]) {
          // update instances if already in store
          return {
            ...state,
            activeInstances: {
              ...state.activeInstances,
              [instance.id]: {
                ...state.activeInstances[instance.id],
                current: instance.current,
                override: instance.override,
              },
            },
          };
        } else if (state.activeProfiles && state.activeProfiles[instance.profile.id]) {
          return {
            ...state,
            activeInstances: {
              ...state.activeInstances,
              [instance.id]: instance,
            },
            activeProfiles: {
              ...state.activeProfiles,
              [state.activeProfiles[instance.profile.id].id]: {
                ...state.activeProfiles[instance.profile.id],
                instances: [
                  ...state.activeProfiles[instance.profile.id].instances,
                  instance.id,
                ],
              },
            },
          };
        }
      } else {
        const { [instance.id]: deleted, ...newActiveInstances } = state.activeInstances;
        return {
          ...state,
          activeInstances: newActiveInstances,
          activeProfiles: {
            ...state.activeProfiles,
            [state.activeProfiles[instance.profile.id].id]: {
              ...state.activeProfiles[instance.profile.id],
              instances: state.activeProfiles[instance.profile.id]
                .instances.filter(item => item !== instance.id),
            },
          },
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default instances;
