(function() {
  'use strict';

  angular
    .module('app.settings')
    .controller('Settings', Settings);

    Settings.$inject = ['$rootScope', 'translations', 'dataservice'];  

    function Settings($rootScope, translations, dataservice) {
      var vm = this;

      $rootScope.title = translations['C_HEAD_SETTINGS'];

      activate();

      vm.saveUser = function() {
        dataservice.updateUser(vm.user).then(function() {
          activate();
        });
      }

      vm.changePassword = function(form) {
        delete form.confirmPassword.$error.confirmError;
        if (!form.$valid) return;
        if (vm.password.newPwd == vm.password.cnfPwd) {
          delete vm.password.cnfPwd;
          dataservice.changePassword(vm.password);
          vm.password = {};
          form.$submitted = false;
        } else {
          form.confirmPassword.$error.confirmError = true;
        }
      }

      vm.resetPassword = function() {
        vm.password = {};
      }

      vm.resetUser = function() {
        activate();
      }      

      function activate() {
        dataservice.getUser().then(function(user) {
          vm.user = user;
        });
      }
    }
})();