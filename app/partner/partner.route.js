(function() {
  'use strict';

  angular
    .module('app.partner')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider
        .when('/partner', { 
          templateUrl: 'app/partner/partner.html', 
          controller: 'Partner',
          controllerAs: 'vm',          
          title: 'Стать партнёром'
        });
    }

})();