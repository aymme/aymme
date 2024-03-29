describe('App/Projects', () => {
  const PROJECT_NAME = 'Test: New Project 1';
  const PROJECT_NAME_EXISTS_ERROR = 'Project name already exists';

  before(() => {
    cy.task('deleteAllProjects');
  });

  after(() => {
    cy.task('deleteAllProjects');
  });

  describe('Project: display a list of projects', () => {
    beforeEach(() => {
      cy.visit('/');
    });

    it('should show', () => {
      cy.getBySel('projects-list-container').should('be.visible');
    });

    it('should have a current projects title', () => {
      cy.getBySel('projects-list-title').contains('Current Projects');
    });

    it('should show a no projects found message', () => {
      cy.getBySel('no-projects').contains('There are no projects found. Create a project first.');
    });
  });

  describe('Projects: add new project form', () => {
    it('should have a add new project button', () => {
      cy.getBySel('projects-list-add-new-project').should('be.visible');
    });

    it('should display the add new project form on click "add new project"', () => {
      cy.getBySel('projects-list-add-new-project').click();
      cy.getBySel('add-new-project-form').should('be.visible');
    });

    it('should display add a new project title', () => {
      cy.getBySel('add-new-project-title').contains('Add a new project');
    });

    it('should display new project into text', () => {
      cy.getBySel('add-new-project-intro').should('be.visible');
    });

    it('should display a add new project form with input of name', () => {
      cy.getBySel('add-new-project-form').should('be.visible');
    });

    it('should display an error message if no project name is provided before adding', () => {
      cy.getBySel('add-new-project-submit').click();
      cy.getBySel('add-new-project-error').should('be.visible').contains('Please specify a project name.');
    });

    it('should close the add new project form on the close button', () => {
      cy.getBySel('add-new-project-close-button').click();
      cy.getBySel('add-new-project-form').should('not.exist');
    });
  });

  describe('Projects: adding a new project', () => {
    it('should create a new project if the name is provided in the form', () => {
      // reset form
      cy.visit('/');
      cy.getBySel('projects-list-add-new-project').click();

      // continue test
      cy.getBySel('add-new-project-form-input-name').type(PROJECT_NAME);
      cy.getBySel('add-new-project-submit').click();

      cy.getBySel('add-new-project-form').should('not.exist');
      const projectListElement = cy.getBySel('projects-list');

      projectListElement.should('be.visible').children().should('have.length', 1);

      projectListElement.eq(0).contains(PROJECT_NAME);
    });
  });

  describe('Projects: should delete a project', () => {
    it('should delete a project', () => {
      const projectListElement = cy.getBySel('projects-list');
      projectListElement.children().should('have.length', 1);
      projectListElement.eq(0).getBySel('projects-delete-project').click();
      projectListElement.children().should('have.length', 0);
      cy.getBySel('no-projects').contains('There are no projects found. Create a project first.');
    });
  });

  describe('Projects: add a project with a name that already exists', () => {
    it('should display a error', () => {
      cy.getBySel('projects-list-add-new-project').click();
      cy.getBySel('add-new-project-form-input-name').type(PROJECT_NAME);
      cy.getBySel('add-new-project-submit').click();

      cy.getBySel('projects-list-add-new-project').click();
      cy.getBySel('add-new-project-form-input-name').type(PROJECT_NAME);
      cy.getBySel('add-new-project-submit').click();

      cy.getBySel('add-new-project-error').contains(PROJECT_NAME_EXISTS_ERROR);
    });

    it('should allow to add a new project when the name is changed', () => {
      cy.getBySel('add-new-project-form-input-name').clear();
      cy.getBySel('add-new-project-form-input-name').type('Test: New Project 2');
      cy.getBySel('add-new-project-submit').click();
    });
  });
});
