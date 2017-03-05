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
            title: 'FAQ',
            resolve: {
              faq: ['dataservice' , function (dataservice) {
                return dataservice.getFaq();
              }]
            }
         }
        }
      ];
    }

})();