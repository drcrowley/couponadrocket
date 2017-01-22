(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Sidebar', Sidebar);

  Sidebar.$inject = ['$scope', 'dataservice'];

  function Sidebar($rootScope, dataservice) {
    var vm = this;
    vm.currentSite = dataservice.getCurrentSite();

    $rootScope.$on('changeCurrentSite', function (event, data) {
      vm.currentSite = dataservice.getCurrentSite();
      if (vm.currentSite != undefined) {
        vm.toggleModel = vm.currentSite.status == 'active' ? true : false;
      }
    });



    vm.toggleStatus = function() {
      // if (vm.currentSite.status == 'active') {
      //   vm.currentSite.status = 'disabled';
      // } else {
      //   vm.currentSite.status = 'active';
      // }
    };

  }
})();