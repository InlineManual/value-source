const webpack_config = require('./webpack.config.js');


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: ['test/**/*.spec.js'],
    preprocessors: {'test/**/*.spec.js': ['webpack']},
    webpack: {
      module: webpack_config.module
    },
    webpackMiddleware: {noInfo: true},
    reporters: ['coverage', 'jasmine-diff', 'mocha'],
    mochaReporter: {
      output: 'minimal'
    },
    jasmineDiffReporter: {
      pretty: true
    },
    coverageReporter: {
      type: 'html',
      dir: 'temp/coverage'
    },
    browsers: ['PhantomJS'],
    singleRun: true
  });
};
