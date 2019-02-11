// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


Cypress.Commands.add('nodesSpecLoadFixturesSeedAndVisit', () => {
  cy.fixture('apiVersion').as('apiVersion');
  cy.fixture('apiMe').as('apiMe');
  cy.fixture('apiNodes').as('apiNodes');
  cy.fixture('apiOrganizations').as('apiOrganizations');
  cy.fixture('apiEmptyArray').as('apiEmptyArray');
  cy.fixture('apiSockJsHotReloadIntercept').as('apiSockJsHotReloadIntercept');
  cy.fixture('apiEmptyObject').as('apiEmptyObject');

  cy.server({ force404: true });
  cy.route('GET', '/api/v1/version', '@apiVersion');
  cy.route('GET', '/api/v1/users/me', '@apiMe');
  cy.route('GET', '/api/v1/discovery/nodes', '@apiNodes');
  cy.route('GET', '/api/v1/config/organizations', '@apiOrganizations');
  cy.route('GET', '/api/v1/config/definitions', '@apiEmptyArray');
  cy.route('GET', '/api/v1/queue/jobs', '@apiEmptyArray');
  cy.route('GET', '/api/v1/config/organizations/123/profiles', '@apiEmptyArray');
  cy.route('GET', '/sockjs-node/**', '@apiSockJsHotReloadIntercept');
  cy.route('DELETE', '/api/v1/discovery/nodes/567', '@apiEmptyObject');
  cy.route('DELETE', '/api/v1/discovery/nodes/678', '@apiEmptyObject');

  cy.visit('http://localhost:7002/', {
    onBeforeLoad(win) {
      // eslint-disable-next-line no-param-reassign
      delete win.fetch;
    },
  });
});

