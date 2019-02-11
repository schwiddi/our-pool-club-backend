import { connect } from 'react-redux';
import { reloadAllProfiles } from 'store/profiles/actions';
import { getOrganizations, getSelectedOrganization } from 'store/user/selectors';
import { setSelectedOrganization } from 'store/user/actions';
import { reloadActiveInstances, clearProfileSelection } from 'store/instances/actions';
import UserDropdown from 'components/UserDropdown';

const mapStateToProps = state => ({
  selectedOrganization: getSelectedOrganization(state),
  organizations: getOrganizations(state),
  context: state.instances.contextSelector,
});

const mapDispatchToProps = dispatch => ({
  onOrganizationSelected: (evt, ctx) => {
    dispatch(clearProfileSelection());
    dispatch(setSelectedOrganization(evt));
    dispatch(reloadAllProfiles());
    dispatch(reloadActiveInstances(ctx));
  },
});

const mergeProps = (state, actions) => {
  let ctx = state.context;
  if (!ctx) {
    ctx = { context: '' };
  }
  return {
    selectedOrganization: state.selectedOrganization,
    organizations: state.organizations,
    onOrganizationSelected: evt => actions.onOrganizationSelected(evt, ctx),
  };
};

const UserDropdownMenu = connect(mapStateToProps, mapDispatchToProps, mergeProps)(UserDropdown);

export default UserDropdownMenu;
