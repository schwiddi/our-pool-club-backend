import PropTypes from 'prop-types';
import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import TextFilter from '../TextFilter';


import ProfileListGroup from './ProfileListGroup';

const filterProfiles = (profiles, filter) => {
  if (filter) {
    return profiles.filter(p => p.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);
  }
  return profiles;
};

class ProfileSelector extends React.Component {
  static propTypes = {
    profiles: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  };

  state = {
    filter: '',
    tmp: '',
  };

  handleClick = (filter) => {
    this.setState(() => ({
      filter,
    }));
  };

  render() {
    return this.props.profiles.length > 0
      ?
        <div>
          {this.state.tmp}
          <TextFilter
            value={this.state.filter}
            placeholder="Filter Profiles"
            onChangeHandler={e => this.handleClick(e.target.value)}
          />
          <hr />
          <ProfileListGroup
            profiles={filterProfiles(this.props.profiles, this.state.filter)}
          />
        </div>
      :
        <Jumbotron>
          <h3>no profiles<br />in this environment</h3>
        </Jumbotron>;
  }
}


export default ProfileSelector;
