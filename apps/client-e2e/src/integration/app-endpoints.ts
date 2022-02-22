describe('App/endpoints', () => {
  before(() => {
    cy.task('db:seed');
    cy.visit('/');
  });

  describe('have certain elements on the page', () => {
    beforeEach(() => {
      cy.fixture('projects.json').as('projects');
    });

    it('should open the endpoints page when clicking on a project', () => {
      cy.getBySel('mock-wrapper').should('be.visible');
    });

    it('should dislpay the project title', () => {
      cy.get('@projects').then((projects: any) => {
        const text = `Project: ${projects[0].name}`;
        cy.getBySel('mock-project-name').contains(text);
      });
    });

    it('should display import and export buttons', () => {
      cy.getBySel('mock-import-bottom').should('be.visible');
      cy.getBySel('mock-export-bottom').should('be.visible');
    });

    it('should display no endpoints found message', () => {
      cy.getBySel('endpoints-no-endpoints-found').should('be.visible').contains('No endpoints found.');
    });

    it('should display a please select an endpoint first message', () => {
      cy.getBySel('endpoints-no-endpoint-selected')
        .should('be.visible')
        .contains('Please select an endpoint on the left.');
    });
  });

  describe('List endpoints', () => {
    before(() => {
      cy.getBySel('projects-list').children().eq(0).click();
    });

    it('should has something', () => {
      cy.getBySel('mock-export-bottom').should('be.visible');
    });
  });
});
