import PropTypes from 'prop-types';
import React from 'react';
import { Table, FormGroup, FormControl, Button, DropdownButton, MenuItem, Glyphicon } from 'react-bootstrap';
import { instanceState } from '../../services/style/instance';

import InstanceRow from '../../containers/ProfilePanel/InstanceRow';
import ErrorBoundary from '../../components/ErrorBoundary';
import MultiActionDropDown from '../../containers/ProfilePanel/MultiActionDropDown';
import MultiActionModal from './MultiActionModal';

const STATE_FILTER = 'state';
const HOST_FILTER = 'host';
const DISCOVERY_FILTER = 'discovery';
const CURRENT_FILTER = 'current';
const TARGET_FILTER = 'target';

export const stateFilter = (state) => {
  if (instanceState[state]) {
    return <Glyphicon glyph={instanceState[state].glyph} />;
  }

  return 'all';
};

class InstanceList extends React.Component {
  static propTypes = {
    ids: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    profile: PropTypes.string.isRequired,
    onActionSelect: PropTypes.func.isRequired,
    allToggled: PropTypes.bool.isRequired,
    instanceMap: PropTypes.shape({}).isRequired,
    toggleSelect: PropTypes.func.isRequired,
    toggleAllSelected: PropTypes.func.isRequired,
    deSelectInstance: PropTypes.func.isRequired,
    areAllNodesHealthy: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      action: 'none',
      filter: {
        [STATE_FILTER]: { string: '.*', valid: true },
        [HOST_FILTER]: { string: '', valid: true },
        [TARGET_FILTER]: { string: '', valid: true },
        [CURRENT_FILTER]: { string: '', valid: true },
        [DISCOVERY_FILTER]: { string: '', valid: true },
      },
    };
  }

  onActionSelect = () => {
    this.hide();
    const instances = this.getSelectedInstances();
    this.props.onActionSelect(this.state.action, instances);
    instances.forEach(i => this.props.deSelectInstance(i));
  };

  onStateFilter = (e) => {
    this.setFilter(STATE_FILTER, e);
  };

  setFilter = (column, e) => {
    const filter = this.isValidRegExp(e) ? { string: e, valid: true } : { string: e, valid: false };

    this.setState({
      filter: {
        ...this.state.filter,
        [column]: filter,
      },
    });
  };

  getSelectedInstances = () => (
    Object.keys(this.props.instanceMap).filter(i => this.props.instanceMap[i] === true)
  );

  getValidationState = filter => (
    this.isValidRegExp(this.state.filter[filter].string) ? null : 'error'
  );

  hide = () => {
    this.setState({
      showModal: false,
    });
  };

  isValidRegExp = (exp) => {
    try {
      return new RegExp(exp);
    } catch (e) {
      return false;
    }
  };

  show = (data) => {
    this.setState({
      showModal: true,
      action: data.action,
    });
  };

  render() {
    return (
      <ErrorBoundary message="please reload your profiles and inform the Mule development team">
        <div id="instances">
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>State</th>
                <th>Host</th>
                <th>Name</th>
                <th>Current State</th>
                <th>Target State</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <DropdownButton
                    title={stateFilter(this.state.filter[STATE_FILTER].string)}
                    id="state"
                    onSelect={this.onStateFilter}
                  >
                    <MenuItem eventKey=".*">{stateFilter('*')}</MenuItem>
                    <MenuItem eventKey="success">{stateFilter('success')}</MenuItem>
                    <MenuItem eventKey="unknown">{stateFilter('unknown')}</MenuItem>
                    <MenuItem eventKey="transition">{stateFilter('transition')}</MenuItem>
                    <MenuItem eventKey="failed">{stateFilter('failed')}</MenuItem>
                    <MenuItem eventKey="neutral">{stateFilter('neutral')}</MenuItem>
                    <MenuItem eventKey="crash">{stateFilter('crash')}</MenuItem>
                  </DropdownButton>
                </td>
                <td>
                  <FormGroup
                    validationState={this.getValidationState(HOST_FILTER)}
                  >
                    <FormControl
                      type="text"
                      placeholder="Filter (RegExp)"
                      onChange={e => this.setFilter(HOST_FILTER, e.target.value)}
                      value={this.state.filter.host.string}
                    />
                  </FormGroup>
                </td>
                <td>
                  <FormGroup
                    validationState={this.getValidationState(DISCOVERY_FILTER)}
                  >
                    <FormControl
                      type="text"
                      placeholder="Filter (RegExp)"
                      onChange={e => this.setFilter(DISCOVERY_FILTER, e.target.value)}
                      value={this.state.filter.discovery.string}
                    />
                  </FormGroup>
                </td>
                <td>
                  <FormGroup
                    validationState={this.getValidationState(CURRENT_FILTER)}
                  >
                    <FormControl
                      type="text"
                      placeholder="Filter (RegExp)"
                      onChange={e => this.setFilter(CURRENT_FILTER, e.target.value)}
                      value={this.state.filter.current.string}
                    />
                  </FormGroup>
                </td>
                <td>
                  <FormGroup
                    validationState={this.getValidationState(TARGET_FILTER)}
                  >
                    <FormControl
                      type="text"
                      placeholder="Filter (RegExp)"
                      onChange={e => this.setFilter(TARGET_FILTER, e.target.value)}
                      value={this.state.filter.target.string}
                    />
                  </FormGroup>
                </td>
                <td>&nbsp;</td>
                <td>
                  {this.props.areAllNodesHealthy ?
                    <Button
                      className="glyphicon glyphicon-check"
                      bsSize="xsmall"
                      onClick={this.props.toggleAllSelected}
                    />
                :
                    <Button
                      className="glyphicon glyphicon-check"
                      bsSize="xsmall"
                      disabled
                    />
                }

                </td>
                <td>
                  {this.getSelectedInstances().length > 0 && this.props.areAllNodesHealthy &&
                    <MultiActionDropDown
                      onSelect={this.show}
                      selectedInstanceIds={this.getSelectedInstances()}
                      instanceID="notNecessary"
                    />
                  }
                </td>
              </tr>
              {this.props.ids.map(id => (
                <InstanceRow
                  key={id}
                  id={id}
                  toggleSelect={i => this.props.toggleSelect(i)}
                  selected={this.props.instanceMap[id] || false}
                  allToggled={this.props.allToggled}
                  filter={this.state.filter}
                />
              ))}
            </tbody>
          </Table>
          <MultiActionModal
            showModal={this.state.showModal}
            onHideModal={this.hide}
            onActionSelect={this.onActionSelect}
            action={this.state.action}
            selectedInstances={this.getSelectedInstances()}
            profile={this.props.profile}
          />
        </div>
      </ErrorBoundary>
    );
  }
}

export default InstanceList;
