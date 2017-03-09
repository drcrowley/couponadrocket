;(function () {
  'use strict';

  angular
    .module('app.core')
    .config(translateConfig);

    translateConfig.$inject = ['$translateProvider', 'tmhDynamicLocaleProvider'];

    function translateConfig($translateProvider, tmhDynamicLocaleProvider) {
      tmhDynamicLocaleProvider.localeLocationPattern('i18n/angular-locale_{{locale}}.js');
      $translateProvider.preferredLanguage('ru');
      $translateProvider.useLoader('translateLoader');
    };
})();