;(function () {
  'use strict';

  angular.module('app', [
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'ngSanitize',
    'ngMessages',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ui.bootstrap',
    'ui.toggle',
    'chart.js',
    'flow',

    'app.templates',
    'app.translate',
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

  config.$inject = ['$httpProvider', '$routeProvider', '$translateProvider', '$compileProvider'];

  function config($httpProvider, $routeProvider, $translateProvider, $compileProvider) {
    $httpProvider.defaults.headers.get = {'Content-Type': 'application/json; charset=utf-8'};
    $compileProvider.debugInfoEnabled(false);
    $routeProvider.otherwise({ redirectTo: '/site/0/coupon' });
    $translateProvider.useSanitizeValueStrategy(null);
  }
})();