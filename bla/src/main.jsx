import PropTypes from 'prop-types';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router';
import { connect } from 'react-redux';

import NodePage from './components/NodePage';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import InstancePage from './components/InstancePage';
import ProfilePage from './components/ProfilePage';
import ApprovalPage from './components/ApprovalPage';
import Notification from './containers/Notification';
import { fetchAllNodes } from './store/nodes/actions';
import { reloadAllProfiles } from './store/profiles/actions';
import { reloadDefinitions } from './store/definitions/actions';
import { fetchUserInfo, setDefaultOrganization } from './store/user/actions';
import { reloadOrganizations } from './store/organizations/actions';
import { fetchAllJobs } from './store/jobs/actions';

const Console = window.console;

class Main extends React.Component {
  componentDidMount() {
    Console.log(`Build: ${process.env.VERSION} / ${process.env.NODE_ENV}`);
    let path = location.pathname === '/' ? '' : location.pathname; // eslint-disable-line no-restricted-globals
    if (path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    this.props.dispatch(fetchUserInfo()).then(() => {
      this.props.dispatch(setDefaultOrganization());
      this.props.dispatch(reloadAllProfiles());
      this.props.dispatch(fetchAllJobs());
    });
    this.props.dispatch(fetchAllNodes());
    this.props.dispatch(reloadOrganizations());
    this.props.dispatch(reloadDefinitions());
  }
  render() {
    return (
      <div>
        <Navigation />
        <section>
          <Switch>
            <Route path="/" exact component={InstancePage} />
            <Route path="/profiles" component={ProfilePage} />
            <Route path="/nodes" component={NodePage} />
            <Route path="/approvals" component={ApprovalPage} />
          </Switch>
        </section>
        <Footer />
        <Notification props />
      </div>
    );
  }
}
Main.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect()(Main));
