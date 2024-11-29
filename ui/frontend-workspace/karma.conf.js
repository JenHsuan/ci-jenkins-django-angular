// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter'),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/angular-workspace'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml', 'junit'],
    junitReporter: {
      outputDir: '',
      outputFile: 'unit-test-results.xml',
      suite: '',
      useBrowserName: false,
      nameFormatter: undefined,
      classNameFormatter: undefined,
      properties: {}
    },
    browsers: ['Chrome', 'ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox'
        ]
      }
    },
    restartOnFileChange: true,
    captureTimeout: 100000, // it was already there
    browserDisconnectTimeout : 10000,
    browserDisconnectTolerance : 10,
    browserNoActivityTimeout : 60000,//by default 10000
  });
};
