(function() {
  'use strict';

  angular
    .module('app.stat')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider      
        .when('/site/:siteId/stat', { 
          templateUrl: 'app/stat/stat.html',   
          title: 'Мои сайты - Статистика',
          controller: 'Stat',
          controllerAs: 'vm'
        });
    }

})();