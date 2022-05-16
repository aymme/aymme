import { ProjectMocks } from '../fixtures';

describe('App/endpoints', () => {
  before(() => {
    cy.task('seedProjects');
  });

  after(() => {
    cy.task('cleanupDatabase');
  });

  describe('have certain elements on the page', () => {
    before(() => {
      cy.visit('/');
      cy.getBySel('projects-list').children().eq(0).click();
    });

    it('should open the endpoints page when clicking on a project', () => {
      cy.getBySel('mock-wrapper').should('be.visible');
    });

    it('should display the project title', () => {
      const text = `Project: ${ProjectMocks.data.name}`;
      cy.getBySel('mock-project-name').contains(text);
    });

    it('should display import and export buttons', () => {
      cy.getBySel('mock-import-bottom').should('be.visible');
      cy.getBySel('mock-export-bottom').should('be.visible');
    });

    it('should display a please select an endpoint first message', () => {
      cy.getBySel('endpoints-no-endpoint-selected')
        .should('be.visible')
        .contains('Please select an endpoint on the left.');
    });
  });

  describe('Endpoints list', () => {
    before(() => {
      cy.visit('/');

      cy.getBySel('projects-list').children().eq(0).click();
    });

    it('should display the list of collections', () => {
      cy.getBySel('collection-list').should('be.visible');
    });

    it('should display one collection', () => {
      cy.getBySel('collection-item').should('be.visible');
    });

    it('should display 7 items in the list of endpoints', () => {
      const endpointList = cy.getBySel('endpoints-list');
      endpointList.should('be.visible');
      endpointList.children().should('have.length', 7);
    });

    it('should open the endpoint details after clicking on it', () => {
      cy.getBySel('endpoints-no-endpoint-selected').should('exist');
      cy.getBySel('endpoints-list').children().eq(0).click().get('li').should('have.class', 'is-selected');
      cy.getBySel('endpoints-no-endpoint-selected').should('not.exist');
    });
  });

  describe('Endpoint Details', () => {
    it('should display the details screen with the text details', () => {
      cy.getBySel('endpoint-details-screen').should('be.visible').contains('Details');
    });

    it('should show an update button with the text update', () => {
      cy.getBySel('endpoint-details-update-button').should('be.visible').contains('Update');
    });

    it('should display basic configuration', () => {
      cy.getBySel('endpoint-details-configuration').should('be.visible');
    });

    it('should display configuration and header tabs', () => {
      cy.getBySel('endpoint-details-configuration-tabs')
        .should('be.visible')
        .children()
        .should('have.length', 2)
        .eq(0)
        .should('have.class', 'active-tab');
    });

    it('should display configuration element: active status', () => {
      cy.getBySel('endpoint-details-configuration-active-status').should('be.visible').contains('Active Status');
    });

    it('should display configuration element: delay', () => {
      cy.getBySel('endpoint-details-configuration-delay').should('be.visible').contains('Delay');
    });

    it('should display configuration element: forward', () => {
      cy.getBySel('endpoint-details-configuration-forward').should('be.visible').contains('Forward');
    });

    it('should display configuration element: empty', () => {
      cy.getBySel('endpoint-details-configuration-empty').should('be.visible').contains('Empty');
    });

    it('should display the headers tab after clicking on header tab', () => {
      cy.getBySel('endpoint-details-configuration-tabs').children().last().click();
      cy.getBySel('endpoint-details-configuration-headers-not-found').should('be.visible');
    });

    it('should show the add header button when on the headers tab', () => {
      cy.getBySel('endpoint-details-configuration-add-new-header').should('be.visible');
    });
  });
});
