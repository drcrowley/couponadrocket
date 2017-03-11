(function() {
  'use strict';

  angular
    .module('app.sent')
    .controller('Integration', Integration);

    Integration.$inject = ['$rootScope', '$routeParams', 'translations', 'dataservice'];
    
    function Integration($rootScope, $routeParams, translations, dataservice) {
      var vm = this;
      $rootScope.title = translations['C_HEAD_SITES'] + ' - ' + translations['C_HEAD_INTEGRATION'];

      activate();

      function activate() {
        dataservice.getCoupons().then(function(coupons) {
          var siteId = $routeParams.siteId,
              site;
       
          if (coupons.length) {
            coupons.forEach(function(coupon) {
              if (siteId == coupon.id) {
                site = coupon;
              }
            });
            if (site) {
              dataservice.setCurrentSite(siteId);
            } else {
              site = coupons[0];         
              dataservice.setCurrentSite(site.id);
              $location.path('/site/'+ site.id + '/coupon');
            }

            vm.coupon = site;
          } else {
            dataservice.removeCurrentSite();
            $location.path('/site/new/coupon');
          }

        });
      }
    }
})();