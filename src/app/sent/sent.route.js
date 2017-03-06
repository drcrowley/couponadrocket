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
            resolve: {
              translations: ['$translate' , function ($translate) {
                return $translate(['C_HEAD_SITES', 'C_HEAD_SENT_COUPONS']);
              }]
            }
         }
        }
      ];
    }

})();