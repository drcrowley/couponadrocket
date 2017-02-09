(function() {
  'use strict';

  angular.module('app.core', [
    /*
     * Angular modules
     */
    'ngRoute',
    'ngTouch',
    'ngAnimate',
    'ngSanitize',
    'ngMessages',
    'LocalStorageModule',
    'pascalprecht.translate',
    'tmh.dynamicLocale',
    'ui.bootstrap',
    'ui.toggle',
    'chart.js',
    'flow',
    /*
     * Our reusable cross app code modules
     */
    'blocks.exception', 
    'blocks.logger', 
    'blocks.router'
  ]);
})();
