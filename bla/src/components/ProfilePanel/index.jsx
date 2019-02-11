import PropTypes from 'prop-types';
import React from 'react';
import get from 'lodash/get';
import { Panel, Table, Tabs, Tab, Modal, Button } from 'react-bootstrap';
import ProfileActions from './ProfileActions';
import SVG from '../../containers/ProfilePanel/SVG';
import api from '../../services/api';
import ProfileActionModal from './ProfileActionModal';
import InstanceList from './InstanceList';
import Header from './Header';

const toHash = arr => (
  arr.reduce((map, obj) => {
    const t = map;
    t[obj.key] = false;
    return t;
  }, {})
);

class ProfilePanel extends React.Component {
  static propTypes = {
    profile: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      instances: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    uniqueActions: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onActionSelect: PropTypes.func.isRequired,
    onProfileActionSelect: PropTypes.func.isRequired,
    // requestingDisoverProfiles: PropTypes.bool.isRequired,
    // discoveredProfiles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  state = {
    tab: 1,
    allToggled: false,
    instanceMap: toHash(this.props.profile.instances),
    showModal: false,
    showProfileActionModal: false,
    rediscoverData: [],
  };

  // componentWillReceiveProps = (nextProps) => {
  //   if (this.props.requestingDisoverProfiles && !nextProps.requestingDisoverProfiles) {
  //     this.setState(() => ({ showModal: true }));
  //   }
  // }

  onProfileActionSelect = () => {
    this.closeProfileActionModal();
    this.props.onProfileActionSelect(this.state.action, this.props.profile);
  };

  getIds = () => (
    (get(this.props, 'profile.instances') || []).sort()
  );

  showProfileActionModal = (data) => {
    this.setState({
      showProfileActionModal: true,
      action: data.action,
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  closeProfileActionModal = () => {
    this.setState({ showProfileActionModal: false });
  };

  handleGraphSelect = (tab) => {
    this.setState({
      tab,
    });
  };

  toggleSelect = (instanceId) => {
    const map = this.state.instanceMap;
    map[instanceId] = !map[instanceId];
    this.setState(() => ({
      instanceMap: map,
    }));
  };

  rediscoverProfile = () => {
    const p = this.props.profile;
    api.post(`discovery/organizations/${p.organization}/profile/${p.name}/rediscover`, {})
      .then((data) => {
        const arr = Object.keys(data.nodes).map(key => ({ node: key, state: data.nodes[key] }));
        this.setState(() => ({
          showModal: true,
          rediscoverData: arr,
        }));
      });
  };

  selectInstance = (instanceId) => {
    const map = this.state.instanceMap;
    map[instanceId] = true;
    this.setState(() => ({
      instanceMap: map,
    }));
  };

  deSelectInstance = (instanceId) => {
    const map = this.state.instanceMap;
    map[instanceId] = false;
    this.setState(() => ({
      instanceMap: map,
    }));
  };

  toggleAllSelected = () => {
    this.setState({ allToggled: !this.state.allToggled });
  };

  render() {
    const ids = this.getIds();

    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Profile Discovery State</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Host</th>
                  <th style={{ textAlign: 'center' }}>Discovered</th>
                </tr>
              </thead>
              <tbody>
                {this.state.rediscoverData.map(p => (
                  <tr key={p.node}>
                    <td>{p.node}</td>
                    <td style={{ textAlign: 'center' }}><span className={(p.state) ? 'glyphicon glyphicon-ok-sign text-success' : 'glyphicon glyphicon-exclamation-sign text-danger'} /></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
        <Panel
          collapsible
          defaultExpanded
          bsStyle="info"
          key={this.props.profile.id}
          header={
            <div><Header
              profile={this.props.profile}
              rediscoverProfile={this.rediscoverProfile}
              countPendingJobs={this.props.pendingJobs.length}
              countBlockingJobs={this.props.blockingJobs.length}
              areAllNodesHealthy={this.props.areAllNodesHealthy}
            />
            </div>}
        >
          <ProfileActions
            onSelect={this.showProfileActionModal}
            areAllNodesHealthy={this.props.areAllNodesHealthy}
          />
          <Tabs
            defaultActiveKey={1}
            id={`profile-tab-${this.props.profile.id}`}
            onSelect={this.handleGraphSelect}
          >
            <Tab eventKey={1} title="List">
              <InstanceList
                ids={ids}
                profile={this.props.profile.name}
                uniqueActions={this.props.uniqueActions}
                onActionSelect={this.props.onActionSelect}
                toggleSelect={i => this.toggleSelect(i)}
                toggleAllSelected={this.toggleAllSelected}
                deSelectInstance={this.deSelectInstance}
                instanceMap={this.state.instanceMap}
                allToggled={this.state.allToggled}
                areAllNodesHealthy={this.props.areAllNodesHealthy}
              />
            </Tab>
            <Tab eventKey={2} title="Graph (Beta)">
              {this.state.tab === 2 &&
                <div>
                  <SVG
                    profile={this.props.profile}
                    toggleSelect={i => this.toggleSelect(i)}
                    toggleAllSelected={this.toggleAllSelected}
                    deSelectInstance={this.deSelectInstance}
                    instanceMap={this.state.instanceMap}
                    allToggled={this.state.allToggled}
                    tab={this.state.tab}
                  />
                </div>
              }
            </Tab>
          </Tabs>
          <ProfileActionModal
            showModal={this.state.showProfileActionModal}
            onHideModal={this.closeProfileActionModal}
            onActionSelect={this.onProfileActionSelect}
            action={this.state.action}
            profile={this.props.profile}
          />
        </Panel>
      </div>
    );
  }
}

ProfilePanel.propTypes = {
  blockingJobs: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.string,
  })).isRequired,
  pendingJobs: PropTypes.arrayOf(PropTypes.shape({
    action: PropTypes.string,
  })).isRequired,
  areAllNodesHealthy: PropTypes.bool.isRequired,
};

export default ProfilePanel;
