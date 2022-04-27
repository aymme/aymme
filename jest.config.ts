const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/api/category/data-access',
    '<rootDir>/libs/api/category/feature',
    '<rootDir>/libs/client/shell/ui',
  ],
};
