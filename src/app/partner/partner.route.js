(function() {
  'use strict';

  angular
    .module('app.partner')
    .run(appRun);

    appRun.$inject = ['routehelper'];

    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [
        {
          url: '/partner',
          config: {
            templateUrl: 'app/partner/partner.html',    
            controller: 'Partner',
            controllerAs: 'vm',
            resolve: {
              translations: ['$translate' , function ($translate) {
                return $translate(['C_HEAD_BECOME_A_PARTNER']);
              }]
            }
         }
        }
      ];
    }

})();