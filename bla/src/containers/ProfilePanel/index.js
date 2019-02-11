import { connect } from 'react-redux';
import ProfilePanel from '../../components/ProfilePanel';
import { getActiveProfileByID, getActiveInstanceByID, getUniqueActions, getNodesFromInstances } from '../../store/instances/selectors';
import { getDiscoveredProfiles, requestingDisoverProfiles } from '../../store/profiles/selectors';
import { instanceAction } from '../../store/instances/actions';
import { rediscoverProfile } from '../../store/profiles/actions';
import { actionObject, profileActionObject } from '../../services/converter';
import { getPendingJobsByProfileId, getBlockingJobsByProfileId } from '../../store/jobs/selectors';
import { getIfAllNodesAreHealthy } from '../../store/nodes/selectors';

const mapStateToProps = (state, ownProps) => ({
  profile: getActiveProfileByID(state, ownProps.profileID),
  uniqueActions: getUniqueActions(state, ownProps.profileID),
  discoveredProfiles: getDiscoveredProfiles(state, ownProps.profileID),
  requestingDisoverProfiles: requestingDisoverProfiles(state, ownProps.profileID),
  pendingJobs: getPendingJobsByProfileId(state, ownProps.profileID),
  blockingJobs: getBlockingJobsByProfileId(state, ownProps.profileID),
  areAllNodesHealthy: getIfAllNodesAreHealthy(
    state,
    getNodesFromInstances(
      state,
      getActiveProfileByID(state, ownProps.profileID).instances,
    ),
  ),
});


const addInstanceActions = (action, selectedInstances) => {
  const instances = [];
  return (dispatch, getState) => {
    selectedInstances.forEach((id) => {
      const inst = getActiveInstanceByID(getState(), id);
      instances.push(inst);
    });
    const org = instances[0].profile.organization;
    const a = actionObject(action, instances);
    dispatch(instanceAction(org, a));
  };
};

const mapDispatchToProps = dispatch => ({
  onActionSelect: (action, instances) => {
    dispatch(addInstanceActions(action, instances));
  },
  rediscoverProfile: (profile) => {
    dispatch(rediscoverProfile(profile));
  },
  onProfileActionSelect: (action, profile) =>
    dispatch(instanceAction(profile.organization, profileActionObject(action, profile))),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePanel);
