const notifyOptions = ({
  title = 'Backend Error',
  message = 'general error occured',
  autoDismiss = 10,
} = { }) => ({
  title,
  message,
  position: 'tr',
  autoDismiss,
}
);

export default notifyOptions;
