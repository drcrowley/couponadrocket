(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Sidebar', Sidebar);

  Sidebar.$inject = ['$timeout', '$rootScope', 'dataservice'];

  function Sidebar($timeout, $rootScope, dataservice) {
    var vm = this;
    vm.currentSite = dataservice.getCurrentSite();
    dataservice.getUser().then(function(user) {
      vm.user = user;
    });
    $rootScope.$on('changeCurrentSite', function (event, data) {
      vm.currentSite = dataservice.getCurrentSite();
    });

    vm.toggleStatus = function() {
      if (vm.currentSite.activeFlag) {
        dataservice.activateCoupon(vm.currentSite.id).then(updateCurrentSite);
      } else {
        dataservice.deactivateCoupon(vm.currentSite.id).then(updateCurrentSite);
      }
    };

    function updateCurrentSite() {
      dataservice.getCoupons().then(function(coupons) {
        coupons.forEach(function(coupon) {
          if (vm.currentSite.id == coupon.id) {
            vm.currentSite = coupon;
          }
        });
      });   
    }
  }
})();