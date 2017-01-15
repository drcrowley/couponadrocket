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
  ]).config(config);

  config.$inject = ['$httpProvider', '$translateProvider', '$compileProvider', 'routehelperConfigProvider'];

  function config($httpProvider, $translateProvider, $compileProvider, routehelperConfigProvider) {
    $httpProvider.defaults.headers.get = {'Content-Type': 'application/json; charset=utf-8'};
    $compileProvider.debugInfoEnabled(false);
    
    $translateProvider.useSanitizeValueStrategy(null);

    // var resolveAlways = {
    //     ready: ['dataservice', function (dataservice) {
    //        return dataservice.ready();
    //     }]
    // };
    // routehelperConfigProvider.config.resolveAlways = resolveAlways;
  }
})();