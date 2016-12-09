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
    'app.site',
    'app.settings',
    'app.balance',
    'app.faq',
    'app.integration',
    'app.partner'
  ]).config(config);

  config.$inject = ['$routeProvider'];

  function config($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/sites/default' });
  }
})();