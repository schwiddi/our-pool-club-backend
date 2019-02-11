import { connect } from 'react-redux';
import ProfileListGroupItem from '../../components/ProfileSelector/ProfileListGroupItem';
import { selectedProfilesArray, getNodesFromInstances } from '../../store/instances/selectors';
import { removeProfileFromSelection, addProfileToSelection } from '../../store/instances/actions';
import { getPendingJobsByProfileId, getBlockingJobsByProfileId } from '../../store/jobs/selectors';
import { getIfAllNodesAreHealthy } from '../../store/nodes/selectors';

const toggleProfileSelection = profile => (
  (dispatch, getState) => (
    (selectedProfilesArray(getState()).filter(p => p.id === profile.id).length > 0)
      ? dispatch(removeProfileFromSelection(profile.id))
      : dispatch(addProfileToSelection(profile.id))
  )
);

const mapStateToProps = (state, ownProps) => ({
  profile: ownProps.profile,
  pendingJobs: getPendingJobsByProfileId(state, ownProps.profile.id),
  blockingJobs: getBlockingJobsByProfileId(state, ownProps.profile.id),
  selected: selectedProfilesArray(state).filter(p => p.id === ownProps.profile.id).length > 0,
  areAllNodesHealthy: getIfAllNodesAreHealthy(
    state,
    getNodesFromInstances(state, ownProps.profile.instances),
  ),
});

const mapDispatchToProps = dispatch => ({
  toggleProfile: (profile) => {
    dispatch(toggleProfileSelection(profile));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileListGroupItem);
