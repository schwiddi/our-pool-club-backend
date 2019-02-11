import { connect } from 'react-redux';

import CopyRight from 'components/Footer/CopyRight';
import { getUserName } from 'store/user/selectors';

const mapStateToProps = state => ({
  user: getUserName(state),
});

export default connect(mapStateToProps)(CopyRight);
