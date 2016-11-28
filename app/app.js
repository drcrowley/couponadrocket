;(function () {
  'use strict';

  angular.module('app', [
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'ngSanitize',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ui.bootstrap',
    'chart.js',

    'app.translate',
    'app.layout',
    'app.home',
    'app.settings',
    'app.balance',
    'app.faq',
    'app.integration',
    'app.partner'
  ]).config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/' });
  }
})();