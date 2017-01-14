(function() {
  'use strict';

  angular
    .module('app.coupon')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider      
        .when('/site/:siteId/integration', { 
          templateUrl: 'app/integration/integration.html',   
          title: 'Мои сайты - Интеграция',
          controller: 'Integration',
          controllerAs: 'vm'
        });
    }

})();