/// <reference types="cypress" />

describe('share location', () => {
  it('should fetch the user location', () => {
    cy.visit('/');
    cy.get('[data-cy="get-loc-btn"]').click();
  });
});
