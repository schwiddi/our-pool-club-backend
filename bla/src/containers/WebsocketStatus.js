import { connect } from 'react-redux';
import Status from 'components/Status';
import isWebsocketConnected from 'store/websockets/selectors';

const mapStateToProps = state => ({
  ok: isWebsocketConnected(state),
});

export default connect(mapStateToProps)(Status);
