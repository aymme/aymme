// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    /**
     * Custom command to select DOM element by data-cy attribute.
     * @example cy.getBySel('element');
     */
    getBySel(value: string): Chainable<Element>;
  }
}

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-cy="${selector}"]`, ...args);
});
