import { connect } from 'react-redux';
import { updateProfile, reloadAllProfiles } from 'store/profiles/actions';
import ProfileList from 'components/ProfileList';
import { profilesToArray } from 'store/profiles/selectors';

const mapStateToProps = state => ({
  profiles: profilesToArray(state),
});
const mapDispatchToProps = dispatch => ({
  onReloadClick: () => {
    dispatch(reloadAllProfiles());
  },
  onProfileUpdate: (profile) => {
    dispatch(updateProfile(profile));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileList);
