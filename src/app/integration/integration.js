(function() {
  'use strict';

  angular
    .module('app.sent')
    .controller('Integration', Integration);

    Integration.$inject = ['$routeParams', 'dataservice'];
    
    function Integration($routeParams, dataservice) {
      var vm = this;
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
          } else {
            dataservice.removeCurrentSite();
            $location.path('/site/new/coupon');
          }

        });
      }
    }
})();