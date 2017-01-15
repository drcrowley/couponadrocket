(function() {
  'use strict';

  angular
    .module('app.sent')
    .run(appRun);

    appRun.$inject = ['routehelper'];

    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [
        {
          url: '/site/:siteId/sent',
          config: {
            templateUrl: 'app/sent/sent.html',
            controller: 'Sent',
            controllerAs: 'vm',
            title: 'Мои сайты - Отправленные купоны',
         }
        }
      ];
    }

})();