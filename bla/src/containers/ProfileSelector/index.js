import { connect } from 'react-redux';

import ProfileSelector from 'components/ProfileSelector';
import { activeProfilesArray } from 'store/instances/selectors';


const mapStateToProps = state => ({
  profiles: activeProfilesArray(state),
});

export default connect(mapStateToProps)(ProfileSelector);
