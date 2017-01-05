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
    'chart.js',
    'flow',

    'app.templates',
    'app.translate',
    'app.layout',
    'app.site',
    'app.settings',
    'app.faq',
    'app.partner',
    'app.prices'
  ]).config(config);

  config.$inject = ['$routeProvider', '$translateProvider'];

  function config($routeProvider, $translateProvider) {
    $routeProvider.otherwise({ redirectTo: '/site' });
  }
})();