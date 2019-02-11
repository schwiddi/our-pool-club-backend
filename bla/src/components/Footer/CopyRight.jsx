import React from 'react';
import PropTypes from 'prop-types';

import { getHomeLink } from 'services/api';

class CopyRight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      t: '',
      link: getHomeLink(),
    };
  }

  render() {
    const date = new Date();
    return (
      <span className="pull-left">
        © {date.getFullYear()}
        <a href="mailto:smlinux@postfinance.ch"> - SM Linux</a>
        <p>
          {(this.props.user === 'herzogm' || this.props.user === 'development') &&
            <a href={this.state.link} onClick={() => { this.setState({ t: {} }); }}>
              test-logger {this.state.t}
            </a>}
        </p>
      </span>
    );
  }
}


CopyRight.propTypes = {
  user: PropTypes.string,
};

CopyRight.defaultProps = {
  user: 'undef',
};

export default CopyRight;
