import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { reloadAllProfiles } from 'store/profiles/actions';

const mapDispatchToProps = dispatch => ({
  onClick: () => dispatch(reloadAllProfiles()),
});

export default connect(null, mapDispatchToProps)(Button);
