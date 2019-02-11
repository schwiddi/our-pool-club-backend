import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Panel, PanelGroup, Modal } from 'react-bootstrap';
import ANSI from 'ansi-to-react';
import formatTime from 'services/format';
import api from 'services/api';

class LogView extends Component {
  static propTypes = {
    instance: PropTypes.shape({
      id: PropTypes.string.isRequired,
      host: PropTypes.string.isRequired,
      definition: PropTypes.shape({
        organization: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
      profile: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        organization: PropTypes.string.isRequired,
      }).isRequired,
      discovery: PropTypes.string.isRequired,
      current: PropTypes.string.isRequired,
      target: PropTypes.string.isRequired,
    }).isRequired,
    actions: PropTypes.arrayOf(PropTypes.string),
  };

  static defaultProps = {
    actions: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      content: [],
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.getLogs = this.getLogs.bind(this);
  }

  getLogs = () => {
    const urlString = [
      'discovery/organizations/',
      this.props.instance.profile.organization,
      '/profile/',
      this.props.instance.profile.name,
      '/hostname/',
      this.props.instance.host,
      '/definition/',
      this.props.instance.definition.organization,
      '/',
      this.props.instance.definition.name,
      '/discovery/',
      this.props.instance.discovery,
      '/output/',
      this.props.actions.join(','),
    ].join('');
    return api
      .get(urlString)
      .then(data =>
        this.setState({
          content: data,
        }))
      .catch(() =>
        this.setState({
          content: [],
        }));
  };

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.getLogs();
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div id="logs">
        <Button
          bsSize="small"
          onClick={() => this.open()}
        >Logs
        </Button>
        <Modal show={this.state.showModal} bsSize="large" onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.instance.host}:
              <b>{this.props.instance.discovery}</b>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PanelGroup defaultActiveKey="0" accordion>
              {this.state.content.sort((a, b) => new Date(b.date) - new Date(a.date)).map((
                key,
                index,
              ) => (
                <Panel
                  key={index.toString()}
                  header={`${key.action} - ${formatTime(key.date)}`}
                  eventKey={index.toString()}
                >
                  <dl className="dl-horizontal">
                    <dt>User</dt>
                    <dd>
                      {key.user}
                    </dd>
                  </dl>
                  <pre>
                    <ANSI>
                      {key.data}
                    </ANSI>
                  </pre>
                </Panel>
              ))}
            </PanelGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.open}>Reload</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default LogView;
