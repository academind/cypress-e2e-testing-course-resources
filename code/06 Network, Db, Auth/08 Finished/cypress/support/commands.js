/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.get('[data-cy="auth-email"]').click();
  cy.get('[data-cy="auth-email"]').type('test@example.com');
  cy.get('[data-cy="auth-password"]').type('testpassword');
  cy.get('[data-cy="auth-submit"]').click();
  cy.location('pathname').should('eq', '/takeaways');
  cy.getCookie('__session').its('value').should('not.be.empty');
});

// the below code snippet is required to handle a React hydration bug that would cause tests to fail
// it's only a workaround until this React behavior / bug is fixed
Cypress.on('uncaught:exception', (err) => {
  // we check if the error is
  if (
    err.message.includes('Minified React error #418;') ||
    err.message.includes('Minified React error #423;') ||
    err.message.includes('hydrating') ||
    err.message.includes('Hydration')
  ) {
    return false;
  }
});
