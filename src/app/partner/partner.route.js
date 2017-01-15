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
            title: 'Стать партнёром'
         }
        }
      ];
    }

})();