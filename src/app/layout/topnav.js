(function () {
  'use strict';

  angular.module('app')
    .controller('TopNav', TopNav);

  TopNav.$inject = ['$route', '$rootScope', 'dataservice'];

  function TopNav($route, $rootScope, dataservice) {
    var vm = this;

    vm.isRoute = isRoute;
    vm.isNavCollapsed = true;

    activate();

    $rootScope.$on('changeCurrentSite', function (event, data) {
      activate();
    });

    vm.logout = function() {
      dataservice.logout();
    }

    function activate() {
      dataservice.getCoupons().then(function(data) {
        vm.coupons = data;
      });
      vm.currentSite = dataservice.getCurrentSite();      
    }

    function isRoute(r) {
      var title = $rootScope.title;
      if (title) {
        return title.substr(0, r.length) === r;
      }
    }
  }
})();