describe('Newsletter', () => {
  beforeEach(() => {
    cy.task('seedDatabase');
  });
  it('should display a success message', () => {
    cy.intercept('POST', '/newsletter*', { status: 201 }).as('subscribe'); // intercept any HTTP request localhost:3000/newsletter?anything
    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@subscribe');
    cy.contains('Thanks for signing up');
  });
  it('should display validation errors', () => {
    cy.intercept('POST', '/newsletter*', { message: 'Email exists already.' }).as('subscribe'); // intercept any HTTP request localhost:3000/newsletter?anything
    cy.visit('/');
    cy.get('[data-cy="newsletter-email"]').type('test@example.com');
    cy.get('[data-cy="newsletter-submit"]').click();
    cy.wait('@subscribe');
    cy.contains('Email exists already.');
  });
});
