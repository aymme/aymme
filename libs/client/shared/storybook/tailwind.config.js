const { createGlobPatternsForDependencies } = require('@nrwl/angular/tailwind');
const { join } = require('path');
const baseTailwindPreset = require('../../../../tailwind.base');

module.exports = {
  presets: [baseTailwindPreset],
  content: [join(__dirname, '../../**/', 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  darkMode: 'class',
  plugins: [],
};
