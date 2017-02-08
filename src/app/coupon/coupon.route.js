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
            title: 'Мои сайты - Купон',
            resolve: {
              colorThemes: ['dataservice' , function (dataservice) {
                return dataservice.getColorThemes();
              }]
            }
         }
        }
      ];
    }

})();