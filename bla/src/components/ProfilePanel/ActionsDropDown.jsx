import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class ActionDropDown extends Component {
  shouldComponentUpdate = () => (
    false
  )

  render() {
    const { instanceID } = this.props;
    return (
      <DropdownButton
        onSelect={this.props.onSelect}
        pullRight
        bsSize="small"
        title="Actions"
        id="bg-nested-dropdown"
      >
        {this.props.actions.map(action => (
          <MenuItem key={action} eventKey={{ instanceID, action }}>
            {action}
          </MenuItem>
        ))}
        <MenuItem divider />
        {['.sync', '.clear'].map(action => (
          <MenuItem key={action} eventKey={{ instanceID, action }}>
            {action}
          </MenuItem>
        ))}
      </DropdownButton>
    );
  }
}

ActionDropDown.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  instanceID: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ActionDropDown;
