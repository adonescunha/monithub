// Karma configuration

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './public/',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['systemjs', 'jasmine'],

    plugins: [
      'karma-systemjs',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-junit-reporter'
    ],


    // list of files / patterns to load in the browser
    files: [
      'test/**/*.spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    systemjs: {
      configFile: 'config.js',
      config: {
        transpiler: 'babel',
        packages: 'jspm_packages',
        paths: {
          "github:*": "jspm_packages/github/*",
          "npm:*": "jspm_packages/npm/*",
          'es6-module-loader': '../node_modules/es6-module-loader/dist/es6-module-loader.js',
          'systemjs': '../node_modules/systemjs/dist/system.js',
          'system-polyfills': '../node_modules/systemjs/dist/system-polyfills.js',
          'babel': '../node_modules/babel-core/browser.js',
          'phantomjs-polyfill': '../node_modules/phantomjs-polyfill/bind-polyfill.js'
        }
      },

      serveFiles: [
        'jspm_packages/npm/babel-core@5.8.34.js',
        'jspm_packages/npm/babel-core@5.8.34/**/*.js',
        'jspm_packages/github/angular/**/*.js',
        'jspm_packages/github/systemjs/**/*.js',
        'app/**/*.js',
        'app/**/*.html',
        'css/**/*.css',
      ],
    },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,


    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  })
}
