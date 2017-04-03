(function() {
  'use strict';

  angular
    .module('app.sent')
    .controller('Sent', Sent);

    Sent.$inject = ['$rootScope', '$routeParams', 'translations', 'dataservice', 'auth', 'config'];
    
    function Sent($rootScope, $routeParams, translations, dataservice, auth, config) {

      $rootScope.title = translations['C_HEAD_SITES'] + ' - ' + translations['C_HEAD_SENT_COUPONS'];

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

            vm.coupon = site;
          } else {
            dataservice.removeCurrentSite();
            $location.path('/site/new/coupon');
          }

          vm.exportUrl = config.apiUrl + '/manage/destibutedPromoCodes/' + vm.coupon.id + '/' + auth.get();
        });
      }
    }
})();