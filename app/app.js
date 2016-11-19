;(function () {
  'use strict';

  angular.module('app', [
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'ngSanitize',
    'ui.bootstrap',
    'chart.js',

    'app.layout',
    'app.home',
    'app.settings'
  ]).config(routeConfig);

  routeConfig.$inject = ['$routeProvider'];

  function routeConfig($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/' });
  }
})();