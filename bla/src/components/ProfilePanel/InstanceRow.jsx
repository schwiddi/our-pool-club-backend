import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Checkbox, DropdownButton } from 'react-bootstrap';

import { getInstanceState } from 'services/style/instance';
import Logs from './Logs';
import ActionDropDown from './ActionsDropDown';

const getRegex = exp =>
  new RegExp(exp, 'i');

const visible = (filter, instance) => {
  if (!filter.host.valid || (filter.host.string !== '' && !instance.host.match(getRegex(filter.host.string)))) {
    return false;
  }
  if (!filter.current.valid || (filter.current.string !== '' && !instance.current.match(getRegex(filter.current.string)))) {
    return false;
  }
  let { target } = instance;
  if (instance.override !== 'unknown') {
    target = `${target} (*${instance.override})`;
  }
  if (!filter.target.valid || (filter.target.string !== '' && !target.match(getRegex(filter.target.string)))) {
    return false;
  }
  if (!filter.discovery.valid || (filter.discovery.string !== '' &&
    !`${instance.definition.name}/${instance.discovery}`
      .match(getRegex(filter.discovery.string)))) {
    return false;
  }
  if (!filter.state.valid ||
    !getInstanceState(instance).state.match(getRegex(filter.state.string))) {
    return false;
  }

  return true;
};

class InstanceRow extends Component {
  componentWillReceiveProps = (nextProps) => {
    if (visible(this.props.filter, this.props.instance)) {
      if (nextProps.allToggled && !this.props.allToggled && !this.props.selected) {
        this.props.toggleSelect(this.props.instance.id);
        return;
      }
      if (this.props.allToggled && !nextProps.allToggled && this.props.selected) {
        this.props.toggleSelect(this.props.instance.id);
      }
    }
  }

  render() {
    const instanceState = getInstanceState(this.props.instance);

    if (!visible(this.props.filter, this.props.instance)) return null;

    return (
      <tr className={instanceState.class}>
        <td role="alert">
          <span className={instanceState.glyph} aria-hidden="true" />
        </td>
        <td>
          {this.props.instance.host}
        </td>
        <td>
          {`${this.props.instance.definition.name}/${this.props.instance.discovery}`}
        </td>
        <td>
          {this.props.instance.current}
        </td>
        <td>
          {this.props.instance.target}
          {this.props.instance.override !== 'unknown' && ` (*${this.props.instance.override})`}
        </td>
        <td>
          <Logs instance={this.props.instance} actions={this.props.actions} />
        </td>
        <td>
          <Checkbox
            onChange={() => this.props.toggleSelect(this.props.instance.id)}
            checked={this.props.selected}
          />
        </td>
        <td>
          {this.props.nodeIsHealthy ?
            <ActionDropDown
              onSelect={this.props.onActionSelect}
              actions={this.props.actions}
              instanceID={this.props.instance.id}
            /> :
            <DropdownButton
              pullRight
              bsSize="small"
              title="Actions"
              id="bg-nested-dropdown"
              disabled
            />}
        </td>
      </tr>
    );
  }
}

InstanceRow.propTypes = {
  instance: PropTypes.shape({
    id: PropTypes.string.isRequired,
    host: PropTypes.string.isRequired,
    current: PropTypes.string.isRequired,
    target: PropTypes.string.isRequired,
    override: PropTypes.string.isRequired,
    discovery: PropTypes.string.isRequired,
    profile: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      organization: PropTypes.string.isRequired,
    }).isRequired,
    definition: PropTypes.shape({
      organization: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  filter: PropTypes.shape({
    discovery: PropTypes.shape({
      string: PropTypes.string.isRequired,
      valid: PropTypes.bool.isRequired,
    }).isRequired,
    host: PropTypes.shape({
      string: PropTypes.string.isRequired,
      valid: PropTypes.bool.isRequired,
    }).isRequired,
    target: PropTypes.shape({
      string: PropTypes.string.isRequired,
      valid: PropTypes.bool.isRequired,
    }).isRequired,
    current: PropTypes.shape({
      string: PropTypes.string.isRequired,
      valid: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.bool.isRequired,
  allToggled: PropTypes.bool.isRequired,
  onActionSelect: PropTypes.func.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  nodeIsHealthy: PropTypes.bool.isRequired,
};


export default InstanceRow;
