;(function () {
  'use strict';

  angular.module('app', [
    'app.core',

    'app.templates',
    'app.layout',
    'app.coupon',
    'app.stat',
    'app.sent',
    'app.integration',
    'app.settings',
    'app.faq',
    'app.partner',
    'app.prices'
  ]).config(config)
    .run(runBlock);

  config.$inject = ['$httpProvider', '$translateProvider', '$compileProvider'];


  runBlock.$inject = ['auth'];

  function runBlock(auth) {
    
  }

  function config($httpProvider, $translateProvider, $compileProvider) {
    $httpProvider.defaults.headers.get = {'Content-Type': 'application/json; charset=utf-8'};
    $compileProvider.debugInfoEnabled(false);
    $translateProvider.useSanitizeValueStrategy(null);
  }
})();