(function() {
  'use strict';

  angular
    .module('app.settings')
    .run(appRun);

    appRun.$inject = ['routehelper'];

    function appRun(routehelper) {
      routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
      return [
        {
          url: '/settings',
          config: {
            templateUrl: 'app/settings/settings.html', 
            controller: 'Settings',
            controllerAs: 'vm',
            title: 'Настройки'
         }
        }
      ];
    }

})();