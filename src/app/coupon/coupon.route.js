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
          url: '/site/:siteId/coupon',
          config: {
            templateUrl: 'app/coupon/coupon.html',   
            controller: 'Coupon',
            controllerAs: 'vm',
            resolve: {
              colorThemes: ['dataservice' , function (dataservice) {
                return dataservice.getColorThemes();
              }],
              translations: ['$translate' , function ($translate) {
                return $translate(['C_HEAD_SITES', 'C_HEAD_COUPON']);
              }]
            }
         }
        }
      ];
    }

})();