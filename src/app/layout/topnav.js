(function () {
  'use strict';

  angular.module('app')
    .controller('TopNav', TopNav);

  TopNav.$inject = ['$route', 'dataservice'];

  function TopNav($route, dataservice) {
    var vm = this;

    vm.isRoute = isRoute;
    vm.isNavCollapsed = true;

    dataservice.getCoupons().then(function(data) {
      vm.coupons = data;
    });
    vm.currentSite = dataservice.getCurrentSite();

    function isRoute(r) {
      var title = $route.current.title;
      if (title) {
        return title.substr(0, r.length) === r;
      }
    }
  }
})();