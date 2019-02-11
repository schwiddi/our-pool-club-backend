import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';

import profiles from './profiles/reducers';
import nodes from './nodes/reducers';
import definitions from './definitions/reducers';
import user from './user/reducers';
import organizations from './organizations/reducers';
import websockets from './websockets/reducers';
import instances from './instances/reducers';
import jobs from './jobs/reducers';

const rootReducer = combineReducers({
  instances,
  profiles,
  jobs,
  definitions,
  organizations,
  user,
  nodes,
  notifications,
  websockets,
});

export default rootReducer;
