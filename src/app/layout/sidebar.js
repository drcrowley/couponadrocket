(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Sidebar', Sidebar);

  Sidebar.$inject = ['$scope', 'dataservice'];

  function Sidebar($rootScope, dataservice) {
    var vm = this;
   
    $rootScope.$on('changeCurrentSite', function (event, data) {
      vm.currentSite = dataservice.getCurrentSite();
    });

    activate();

    function activate() { 

    }

  }
})();