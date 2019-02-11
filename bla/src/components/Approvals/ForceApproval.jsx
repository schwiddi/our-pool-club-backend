import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'react-bootstrap';

class ForceApproval extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reason: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      reason: event.target.value,
    });
  }

  render() {
    const { onSubmit } = this.props;
    return (
      <Row>
        <Col xs={12}>
          <dl className="dl-horizontal">
            <dt>Force Approval</dt>
            <dd>
              <details>
                <summary>Force Approval...</summary>
                <div>
                  <p>
                    Ein Force Approval ist nur in dringenden Fällen zugelassen.
                    Regulärer Prozess des 4-Augen-Prinzips wird umgangen.
                  </p>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Begründung"
                      value={this.state.reason}
                      onChange={this.handleChange}
                    />
                    <span className="input-group-btn">
                      <Button
                        className="pull-left btn btn-danger"
                        onClick={onSubmit(this.state.reason)}
                        disabled={!this.state.reason.length}
                      >
                        Force Approval <span className="glyphicon glyphicon-eye-close" aria-hidden="true" />
                      </Button>
                    </span>
                  </div>
                </div>
              </details>
            </dd>
          </dl>
        </Col>
      </Row>
    );
  }
}

ForceApproval.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ForceApproval;

