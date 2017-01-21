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

  function config($httpProvider, $translateProvider, $compileProvider) {
    $httpProvider.defaults.headers.get = {'Content-Type': 'application/json; charset=utf-8'};
    $httpProvider.defaults.headers.post = {'Content-Type': 'application/json; charset=utf-8'};
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $compileProvider.debugInfoEnabled(false);
    $translateProvider.useSanitizeValueStrategy(null);
  }

  runBlock.$inject = [];

  function runBlock() {
   
  }  
})();