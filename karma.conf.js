'use strict';

module.exports = function(config) {

  var configuration = {
    frameworks: ['jasmine'],
    plugins: [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-story-reporter'
    ],
    files: [
      'jq-plugin.js',
     	'tests/*.js'
    ],
    // browsers: [ 'Chrome', 'Firefox' ],
    browsers: [ 'Chrome' ],
    singleRun: true,
    reporters: ['story']
  };

  if(process.env.TRAVIS){
    configuration.browsers = [ 'Chrome', 'Firefox' ];
  }

  if( process.env.DRONE || process.env.WERCKER ){
    configuration.browsers = [ 'Chrome' ];
  }

  config.set(configuration);

};
