import { connect } from 'react-redux';
import InstanceRow from '../../components/ProfilePanel/InstanceRow';
import { getActiveInstanceByID } from '../../store/instances/selectors';
import { instanceAction } from '../../store/instances/actions';
import { getInstanceActions } from '../../store/definitions/selectors';
import { actionObject } from '../../services/converter';
import { getIfNodeIsHealthy } from '../../store/nodes/selectors';


const addInstanceAction = (id, action) => (dispatch, getState) => {
  const inst = getActiveInstanceByID(getState(), id);
  const org = inst.profile.organization;
  const a = actionObject(action, [inst]);
  dispatch(instanceAction(org, a));
};

const mapStateToProps = (state, ownProps) => ({
  instance: getActiveInstanceByID(state, ownProps.id),
  actions: getInstanceActions(state, ownProps.id),
  nodeIsHealthy: getIfNodeIsHealthy(state, getActiveInstanceByID(state, ownProps.id).host),
});

const mapDispatchToProps = dispatch => ({
  onActionSelect: (evt) => {
    dispatch(addInstanceAction(evt.instanceID, evt.action));
  },
});

const ProfileInstanceRow = connect(mapStateToProps, mapDispatchToProps)(InstanceRow);
export default ProfileInstanceRow;
