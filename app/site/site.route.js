(function() {
  'use strict';

  angular
    .module('app.site')
    .config(routeConfig);

    routeConfig.$inject = ['$routeProvider'];

    function routeConfig($routeProvider) {
      $routeProvider      
        .when('/site/:siteId?/:tabId?', { 
          templateUrl: 'app/site/site.html',   
          title: 'Мои сайты',
          controller: 'Site',
          controllerAs: 'vm'
        });
    }

})();