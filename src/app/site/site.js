(function() {
  'use strict';

  angular
    .module('app.site')
    .controller('Site', Site);

    Site.$inject = ['$routeParams', '$location', 'dataservice'];
    
    function Site($routeParams, $location, dataservice) {
      var vm = this;

      var siteId = $routeParams.siteId,
          sites = dataservice.getSites();

      vm.activeTab = $routeParams.tabId ? parseInt($routeParams.tabId) : 0;

      activate();

      vm.onTabSelect = function(index) {
        if (!siteId) return;
        $location.url('/site/' + siteId + '/' + index);
      };     

      function activate() {
        if (sites.length && siteId != 'new') {
          if (siteId) {
            dataservice.setCurrentSite(siteId);
            $location.url('/site/' + siteId + '/' + vm.activeTab);
          } else {
            dataservice.setCurrentSite(sites[0].id);
            $location.url('/site/' + sites[0].id + '/' + vm.activeTab);
          }
        } else {
          $location.url('/site/new/' + vm.activeTab);
          dataservice.removeCurrentSite();
        }

        vm.currentSite = dataservice.getCurrentSite();
      }      
    }
})();