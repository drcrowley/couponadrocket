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
            title: 'Тарифы'
         }
        }
      ];
    }

})();