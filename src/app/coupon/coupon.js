(function() {
  'use strict';

  angular
    .module('app.coupon')
    .controller('Coupon', Coupon);

    Coupon.$inject = ['$routeParams', '$location', 'dataservice', 'coupons'];

    function Coupon($routeParams, $location, dataservice, coupons) {
      var vm = this;


      var couponSettingsDefault = {
        regionList: [],
        promoCodeType: 0
      };
      
      var siteId = $routeParams.siteId,
          sites = coupons,
          site;
     
      if (sites.length && siteId != 'new') {

        sites.forEach(function(siteItem) {
          if (siteId == siteItem.id) {
            site = siteItem;
          }
        });       

        if (site) {
          dataservice.setCurrentSite(siteId);
        } else {
          $location.url('/site/1/coupon');
          site = sites[0].id;
          dataservice.setCurrentSite(site.id);
        }

        vm.couponSettings = site;
      } else {
        dataservice.removeCurrentSite();
        $location.url('/site/new/coupon');
        vm.couponSettings = couponSettingsDefault;
      }

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
    }


})();