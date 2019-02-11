import PropTypes from 'prop-types';
import React from 'react';
import Notifications from 'react-notification-system-redux';

const Notification = ({
  notifications,
}) => {
  // Optional styling
  const style = {
    NotificationItem: { // Override the notification item
      DefaultStyle: { // Applied to every notification, regardless of the notification level
        margin: '10px 5px 2px 1px',
        fontSize: '120%',
      },
    },
  };

  return (
    <Notifications
      notifications={notifications}
      style={style}
    />
  );
};
Notification.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Notification;
