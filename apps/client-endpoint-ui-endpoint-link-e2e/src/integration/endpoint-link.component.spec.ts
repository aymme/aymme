describe('client-mock-ui-endpoint-link', () => {
  beforeEach(() => cy.visit('/iframe.html?id=endpointlinkcomponent--primary&args=method;path;'));
  it('should render the component', () => {
    cy.get('ay-endpoint-link').should('exist');
  });
});
