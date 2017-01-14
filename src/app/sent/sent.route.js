(function() {
  'use strict';

  angular
    .module('app.sent')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider      
        .when('/site/:siteId/sent', { 
          templateUrl: 'app/sent/sent.html',   
          title: 'Мои сайты - Отправленные купоны',
          controller: 'Sent',
          controllerAs: 'vm'
        });
    }

})();