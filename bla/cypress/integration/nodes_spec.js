describe('nodes page', () => {
  it('checks the nodes badge', () => {
    cy.nodesSpecLoadFixturesSeedAndVisit();

    cy.get(':nth-child(4) > a').click();
    cy.get('.badge').should('contain', '2');
    cy.get('.badge').should('contain', '6');
    cy.get('.col-xs-offset-3 > .btn').click();
    cy.get('.badge').should('contain', '0');
  });


  it('checks that the failed only filter is there', () => {
    cy.nodesSpecLoadFixturesSeedAndVisit();

    cy.get(':nth-child(4) > a').click();
    cy.get('label').should('contain', 'Failed only');
  });

  it('checks that the failed only filter works', () => {
    cy.nodesSpecLoadFixturesSeedAndVisit();

    cy.get(':nth-child(4) > a').click();
    cy.get('label > input').click();
    cy.contains('running').should('not.exist');
    cy.get('label > input').click();
    cy.contains('running').should('exist');
  });


  it('checks that the remove all failed nodes button is there', () => {
    cy.nodesSpecLoadFixturesSeedAndVisit();

    cy.get(':nth-child(4) > a').click();
    cy.get('.col-xs-offset-3 > .btn').should('contain', 'Remove all Failed');
  });


  it('checks that the nodes table is there with the right data and remove button for failed nodes', () => {
    cy.nodesSpecLoadFixturesSeedAndVisit();

    cy.get(':nth-child(4) > a').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)').should('contain', 'running');
    cy.get(':nth-child(5) > .rt-tr > :nth-child(2)').should('contain', 'stopped');
    cy.get(':nth-child(5) > .rt-tr > :nth-child(8) > .btn').should('contain', 'Remove');
  });


  it('checks that the remove node button works', () => {
    cy.nodesSpecLoadFixturesSeedAndVisit();

    cy.get(':nth-child(4) > a').click();
    cy.get(':nth-child(5) > .rt-tr > :nth-child(8) > .btn').click();
    cy.get(':nth-child(5) > .rt-tr > :nth-child(1)').should('contain', '678');
  });


  it('checks that the remove all failed nodes button works fine', () => {
    cy.nodesSpecLoadFixturesSeedAndVisit();

    cy.get(':nth-child(4) > a').click();
    cy.get('.col-xs-offset-3 > .btn').click();
    cy.contains('678').should('not.exist');
    cy.contains('stopped').should('not.exist');
    cy.contains('Remove all Failed').should('not.exist');
  });
});
