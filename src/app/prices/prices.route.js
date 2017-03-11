(function() {
  'use strict';

  angular
    .module('app.prices')
    .run(appRun);

    appRun.$inject = ['routehelper'];

    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [
        {
          url: '/prices',
          config: {
            templateUrl: 'app/prices/prices.html',
            controller: 'Prices',
            controllerAs: 'vm',
            title: 'Тарифы',
            resolve: {
              tariffs: ['dataservice' , function (dataservice) {
                return dataservice.getTariffs();
              }],
              user: ['dataservice' , function (dataservice) {
                return dataservice.getUser();
              }],
              translations: ['$translate' , function ($translate) {
                return $translate(['C_HEAD_TARIFFS', 'C_CMB_COMPANY_TYPE_1', 'C_CMB_COMPANY_TYPE_2', 'C_TOOLTIP_TARIFF_1', 'C_TOOLTIP_TARIFF_2', 'C_TOOLTIP_TARIFF_3', 'C_TOOLTIP_TARIFF_4']);
              }]          
            }
         }
        }
      ];
    }

})();