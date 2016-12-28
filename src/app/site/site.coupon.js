(function() {
  'use strict';

  angular
    .module('app.site')
    .controller('Coupon', Coupon);

    Coupon.$inject = ['$routeParams', '$location', 'dataservice'];
    
    function Coupon($routeParams, $location, dataservice) {
      var vm = this;

      activate();

      var couponSettingsDefault = {
        regionList: [],
        promoCodeType: 0
      };

      var site = dataservice.getCurrentSite();

      vm.couponSettings = site ? site : couponSettingsDefault;

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

      vm.addFile = function ($files, $event, $flow) {
        var base64;
        var fileReader = new FileReader();
          fileReader.onload = function (event) {
            base64 = event.target.result;
            vm.couponSettings.image = base64; 
          };
        
        fileReader.readAsDataURL($files[0].file);
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