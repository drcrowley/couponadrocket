(function() {
  'use strict';

  angular
    .module('app.coupon')
    .run(appRun);

    appRun.$inject = ['routehelper'];

    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [
        {
          url: '/site/:siteId/integration',
          config: {
            templateUrl: 'app/integration/integration.html', 
            controller: 'Integration',
            controllerAs: 'vm',
            resolve: {
              translations: ['$translate' , function ($translate) {
                return $translate(['C_HEAD_SITES', 'C_HEAD_INTEGRATION']);
              }]
            }
         }
        }
      ];
    }

})();