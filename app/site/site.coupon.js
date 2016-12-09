(function() {
  'use strict';

  angular
    .module('app.site')
    .controller('Coupon', Coupon);

    Coupon.$inject = ['$translate', '$routeParams', '$location', 'tmhDynamicLocale', 'dataservice'];
    
    function Coupon($translate, $routeParams, $location, tmhDynamicLocale, dataservice) {
      var vm = this;

      activate();

      vm.couponSettings = {
        regionList: []
      };
      vm.availableRegionList = ['Москва', 'Екатеринбург', 'Самара', 'Томск', 'Пермь'];

      var siteId = $routeParams.id,
          sites = dataservice.getSites();

      if (sites.length) {
        switch (siteId) {
          case 'new':
            $location.url('/sites/new');
            break;
            
          case 'default':
            $location.url('/sites/' + sites[0].id);
            vm.couponSettings = sites[0];
            break;

          default:
            sites.forEach(function(item) {
              if (item.id == siteId) {
                vm.couponSettings = item;
              }
            });
        }
      } else {
        $location.url('/sites/new');
      }

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