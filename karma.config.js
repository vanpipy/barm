
module.exports = function (config) {

  config.set({

    frameworks: ['jasmine'],

    file: [
      'test/specs/index.js'
    ],

    preprocessors: {
      'test/specs/index.js' : ['webpack']
    },

    reporters: ['spec'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['PhantomJS'],

    singleRun: false,

    concurrency: Infinity,

    phantomjsLauncher: {
      exitOnResourceError: true
    },

    webpack: {
      entry: './test/specs/index.js',
      output: {
        path: './test',
        filename: 'specs.js'
      },
      module: {
        loaders: [

        ]
      }
    },

    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-webpack'),
      require('karma-spec-reporter')
    ]

  });

};
