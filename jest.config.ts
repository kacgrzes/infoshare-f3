const { getJestProjects } = require('@nrwl/jest');

module.exports = {
  projects: getJestProjects(),
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
};
