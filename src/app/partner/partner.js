(function() {
  'use strict';

  angular
    .module('app.partner')
    .controller('Partner', Partner);

    Partner.$inject = ['$rootScope', 'translations'];
    
    function Partner($rootScope, translations) {
      var vm = this;

      $rootScope.title = translations['C_HEAD_BECOME_A_PARTNER'];

      activate();

      function activate() {

      }
    }
})();