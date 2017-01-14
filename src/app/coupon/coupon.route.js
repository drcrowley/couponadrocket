(function() {
  'use strict';

  angular
    .module('app.coupon')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider      
        .when('/site/:siteId/coupon', { 
          templateUrl: 'app/coupon/coupon.html',   
          title: 'Мои сайты - Купон',
          controller: 'Coupon',
          controllerAs: 'vm',
          resolve: {
            message: ['dataservice', function (dataservice) {
              return dataservice.getCityList();
            }]
          }
        });
    }

})();