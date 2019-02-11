import React from 'react';
import api from 'services/api';
import formatTime from 'services/format/';

const createVersionString = (version) => {
  let versionStr = version.git.hash;
  if (version.git.tag) {
    versionStr = `${version.git.tag}-${version.git.count}`;
  }
  if (version.git.dirty) {
    versionStr = `${versionStr}+`;
  }

  return versionStr;
};

class Version extends React.Component {
  state = {
    version: {
      git: {
        hash: 'N/A',
        tag: null,
      },
    },
  };

  componentDidMount = () => {
    api.get('version').then((json) => {
      const version = json;
      this.setState({ version });
    });
  };

  render() {
    return (
      <span title={formatTime(this.state.version.git.date)}>
        {createVersionString(this.state.version)}
      </span>
    );
  }
}

export default Version;
