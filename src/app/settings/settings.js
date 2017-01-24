(function() {
  'use strict';

  angular
    .module('app.settings')
    .controller('Settings', Settings);

    Settings.$inject = ['dataservice'];  

    function Settings(dataservice) {
      var vm = this;
      vm.title = 'Настройки';
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