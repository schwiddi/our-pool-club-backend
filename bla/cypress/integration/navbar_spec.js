describe('NavBar', () => {
  it('checks if the NavBar is there', () => {
    cy.server({ force404: true }); // to intercept API requests

    cy.route(
      'GET', '/api/v1/version',
      {
        git:
        {
          hash: '9999999',
          date: '1977-05-25T15:00:00-07:00',
          dirty: true,
        },
        build:
           {
             date: '1977-05-25T15:00:00-07:00',
             go:
             {
               version: '1.9',
               arch: 'linux/amd64',
             },
             user: 'Nobody \u003cnobody@example.com\u003e',
           },
      }
      ,
    );

    // on the me endpoint we deliver two orgs 123 & 456
    // on these we gonna test later if the dropdown gets correctly filled with these orgs
    cy.route(
      'GET', '/api/v1/users/me',
      {
        name: 'development',
        roles: ['admin'],
        organizations: ['123', '456'],
      },
    );

    cy.route(
      'GET', '/api/v1/discovery/nodes',
      [{
        name: 'someServer',
        os: 'linux',
        arch: 'amd64',
        version: 'v1.4.3-61',
        build: '2018-12-06T16:05:26+01:00',
        status: 'running',
        since: '2019-01-23T15:34:11.974864709+01:00',
      }]
      ,
    );

    cy.route(
      'GET', '/api/v1/config/organizations',
      [{
        id: '123',
        name: '123',
        email: 'dummy@noreply.com',
        alarming: false,
        access: [{ role: 'admin', permissions: 3 }],
        job: { approval: { users: 1, instances: 1000 } },
      }, {
        id: '456',
        name: '456',
        email: 'dummy@noreply.com',
        alarming: false,
        access: [{ role: 'admin', permissions: 3 }],
        job: { approval: { users: 1, instances: 1000 } },
      }]
      ,
    );

    cy.route(
      'GET', '/api/v1/config/definitions',
      []
      ,
    );

    cy.route(
      'GET', '/api/v1/queue/jobs',
      []
      ,
    );

    cy.route(
      'GET', '/api/v1/config/organizations/123/profiles',
      []
      ,
    );

    cy.route(
      'GET', '/sockjs-node/**',
      {
        websocket: true, origins: ['*:*'], cookie_needed: false,
      }
      ,
    );

    cy.visit('http://localhost:7002/', {
      onBeforeLoad(win) {
        // this here is needed that fetch gets moved to xhr cause cypress now does not support fetch
        // https://github.com/cypress-io/cypress/issues/95
        // eslint-disable-next-line no-param-reassign
        delete win.fetch;
      },
    });

    cy.get('.navbar').should('have.attr', 'class').should('include', 'navbar navbar-inverse');
    cy.get('img').should('have.attr', 'alt').should('include', 'mule logo');


    cy.contains('Approvals').click();
    cy.url().should('include', '/#/approvals');
    cy.contains('Profiles').click();
    cy.url().should('include', '/#/profiles');
    cy.contains('Nodes').click();
    cy.url().should('include', '/#/nodes');
    cy.contains('Instances').click();
    cy.url().should('include', '/#/');
    // the org dropdown will be tested in another spec
  });
});
