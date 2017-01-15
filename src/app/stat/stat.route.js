(function() {
  'use strict';

  angular
    .module('app.stat')
    .run(appRun);

    appRun.$inject = ['routehelper'];

    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [
        {
          url: '/site/:siteId/stat',
          config: {
            templateUrl: 'app/stat/stat.html', 
            controller: 'Stat',
            controllerAs: 'vm',
            title: 'Мои сайты - Статистика'
         }
        }
      ];
    }

})();