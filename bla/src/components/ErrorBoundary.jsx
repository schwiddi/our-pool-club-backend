import React from 'react';
import PropTypes from 'prop-types';
import { Jumbotron } from 'react-bootstrap';

class ErrorBoundary extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    message: PropTypes.string,
    user: PropTypes.string,
    org: PropTypes.string,
    context: PropTypes.string,
  };

  static defaultProps = {
    message: '',
    user: 'undef',
    org: 'undef',
    context: 'undef',
  }

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true });
    const postUrl = '/MuleSplunk/services/collector/event';
    const message = {
      event: {
        user: this.props.user,
        org: this.props.org,
        context: this.props.context,
        error: `"${error}"`,
      },
    };
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      console.log('ErrorBoundary in dev mode: ', message); // eslint-disable-line no-console
    } else {
      console.log('ErrorBoundary in prod mode: ', message); // eslint-disable-line no-console
      fetch(postUrl, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        method: 'POST',
        body: JSON.stringify(message),
      }).then(data => console.log('Splunk logging:', data)); // eslint-disable-line no-console
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Jumbotron>
          <h2>an unexpected error occured in the UI</h2>
          {(this.props.message)
          ? this.props.message
          : 'please reload your browser and inform the Mule development team'
          }
        </Jumbotron>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
