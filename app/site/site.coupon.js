(function() {
  'use strict';

  angular
    .module('app.site')
    .controller('Coupon', Coupon);

    Coupon.$inject = ['$routeParams', '$location', 'dataservice'];
    
    function Coupon($routeParams, $location, dataservice) {
      var vm = this;

      activate();

      vm.couponSettings = {
        regionList: []
      };

      var site = dataservice.getCurrentSite();

      vm.couponSettings = site ? site : {};

      vm.availableRegionList = ['Москва', 'Екатеринбург', 'Самара', 'Томск', 'Пермь'];
      
      vm.submitCouponSettings = function() {
        console.log(vm.couponSettings);
      }

      vm.addRegion = function() {
        var regionList = vm.couponSettings.regionList;
        if(vm.region && !isInclude(regionList, vm.region)) {
          regionList.push(vm.region);
        } 
      }

      vm.removeRegion = function(region) {
        var regionList = vm.couponSettings.regionList;
        var regionIndex = regionList.indexOf(region);

        if (regionIndex > -1) {
          regionList.splice(regionIndex, 1);
        }
      }

      function isInclude(arr,obj) {
        return (arr.indexOf(obj) != -1);
      }

      function activate() {

      }      
    }
})();