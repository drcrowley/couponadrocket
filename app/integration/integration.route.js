(function() {
  'use strict';

  angular
    .module('app.settings')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider
        .when('/integration', { 
          templateUrl: 'app/integration/integration.html', 
          controller: 'Integration',
          controllerAs: 'vm',          
          title: 'Интеграция'
        });
    }

})();