import { connect } from 'react-redux';
import NotificationComponent from 'components/Notification';


const mapStateToProps = state => ({
  notifications: state.notifications,
});

const Notification = connect(mapStateToProps)(NotificationComponent);

export default Notification;
