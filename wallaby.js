module.exports = function (wallaby) {
  return {
    name: 'project',
    files: [
      'src/*',
      'src/components/**/*',
      'src/config/**/*',
      'src/filters/**/*',
      'src/i18n/**/*',
      'src/mixins/**/*',
      'src/routes/**/*',
      'src/services/**/*',
      'src/store/**/*',
      'test/unit/*.js',
      'static/pkg.json',
      'package.json'
    ],

    tests: ['test/**/*.spec.js'],

    env: {
      type: 'node',
      runner: 'node'
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
      '**/*.vue': require('wallaby-vue-compiler')(wallaby.compilers.babel({}))
    },

    preprocessors: {
      '**/*.vue': file => require('vue-jest').process(file.content, file.path)
    },

    setup: function (wallaby) {
      const jestConfig = require('./package').jest || require('./test/unit/jest.conf')
      jestConfig.transform = {};
      wallaby.testFramework.configure(jestConfig)
    },

    testFramework: 'jest',

    debug: true,
    reportConsoleErrorAsError: true,
    delays: {
      run: 2000
    }
  }
}
