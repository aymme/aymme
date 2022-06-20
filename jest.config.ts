const { getJestProjects } = require('@nrwl/jest');

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/libs/api/category/data-access',
    '<rootDir>/libs/api/category/feature',
    '<rootDir>/libs/client/shell/ui',
  ],
};
