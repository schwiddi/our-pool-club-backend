import React from 'react';
import { Nav, NavItem, Navbar, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ApprovalNavItem from '../containers/ApprovalsNavItem';
import UserDropdownMenu from '../containers/UserDropdownMenu';
import { getHomeLink } from '../services/api';

const muleImg = require('assets/mule.png');

const Navigation = () => (
  <header>
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <a href={getHomeLink()}>
            <Image src={muleImg} alt="mule logo" />
          </a>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <LinkContainer exact to="/">
          <NavItem>Instances</NavItem>
        </LinkContainer>
        <LinkContainer exact to="/approvals">
          <NavItem><ApprovalNavItem /></NavItem>
        </LinkContainer>
        <LinkContainer to="/profiles">
          <NavItem>Profiles</NavItem>
        </LinkContainer>
        <LinkContainer to="/nodes">
          <NavItem>Nodes</NavItem>
        </LinkContainer>
        <UserDropdownMenu />
      </Nav>
    </Navbar>
  </header>
);

export default Navigation;
