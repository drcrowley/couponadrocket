;(function () {
  'use strict';

  angular
    .module('app.translate', [])
    .config(translateConfig);

    translateConfig.$inject = ['$translateProvider', 'tmhDynamicLocaleProvider'];

    function translateConfig($translateProvider, tmhDynamicLocaleProvider) {
      tmhDynamicLocaleProvider.localeLocationPattern('/scripts/angular-locale_{{locale}}.js');

      $translateProvider.translations('en', {
        'Sites': 'My sites',
        'Settings': 'Settings',
        'Balance': 'Replenish the balance',
        'Integration': 'Integration',
        'Partner': 'Become a partner'
      });

      $translateProvider.translations('ru', {
        'Sites': 'Мои сайты',
        'Settings': 'Настройки',
        'Balance': 'Пополнить баланс',
        'Integration': 'Интеграция',
        'Partner': 'Стать партнёром'
      });

      $translateProvider.preferredLanguage('ru');
    };
})();