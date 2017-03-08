(function() {
  'use strict';

  angular
    .module('app.faq')
    .run(appRun);

    appRun.$inject = ['routehelper'];

    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [
        {
          url: '/faq',
          config: {
            templateUrl: 'app/faq/faq.html',    
            controller: 'Faq',
            controllerAs: 'vm',
            resolve: {
              faq: ['dataservice' , function (dataservice) {
                return dataservice.getFaq();
              }],
              translations: ['$translate' , function ($translate) {
                return $translate(['C_HEAD_FAQ']);
              }]
            }
         }
        }
      ];
    }

})();