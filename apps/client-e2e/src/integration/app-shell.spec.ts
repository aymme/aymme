describe('Aymme', () => {
  before(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  describe('should redirect to /projects', () => {
    it('should redirect', () => {
      cy.location('pathname').should('eq', '/projects');
    });
  });

  describe('should have a logo component', () => {
    it('should display a logo in the header', () => {
      cy.getBySel('logo')
        .should('be.visible')
        .get('img')
        .should('have.attr', 'src', 'assets/images/aymme-logo.png')
        .getBySel('brand')
        .contains('AYMME')
        .getBySel('brand-subtext')
        .contains('Are you mocking me?');
    });
  });

  describe('should display the navigation', () => {
    it('should display a menu', () => {
      cy.getBySel('main-navigation').should('be.visible');
    });

    it('should have 4 menu items', () => {
      const menu = cy.getBySel('main-navigation-list');
      menu.should('be.visible');
      menu.children().should('have.length', 4);
    });
  });

  describe('should display a theme switcher', () => {
    it('theme switcher component should be visible', () => {
      cy.getBySel('theme-switcher').should('be.visible');
    });

    it('should default theme set to dark', () => {
      cy.get('html').should('have.class', 'dark');
    });

    it('should update the theme preference on click', () => {
      cy.getBySel('theme-switcher-light').click();
      cy.get('html').should('have.class', 'light');

      cy.getBySel('theme-switcher-dark').click();
      cy.get('html').should('have.class', 'dark');
    });
  });

  describe('should have a footer component', () => {
    it('footer should be visible', () => {
      cy.getBySel('footer').should('be.visible');
    });

    it('should have 2 paragraph texts', () => {
      cy.getBySel('footer').children().should('have.length', 2);
    });

    it('should display copyright', () => {
      const fullYear: number = new Date().getFullYear();
      cy.getBySel('footer').first().should('contain', `AYMME | Copyright ${fullYear} | Github`);
    });

    it('should display author', () => {
      cy.getBySel('footer').children().eq(1).should('contain', 'Created by creative people.');
    });
  });
});
