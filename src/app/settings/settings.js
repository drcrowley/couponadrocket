(function() {
  'use strict';

  angular
    .module('app.settings')
    .controller('Settings', Settings);

    Settings.$inject = [];  

    function Settings() {
      var vm = this;
      vm.title = 'Настройки';
      activate();

      function activate() {

      }
    }
})();