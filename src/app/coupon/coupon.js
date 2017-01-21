(function() {
  'use strict';

  angular
    .module('app.coupon')
    .controller('Coupon', Coupon);

    Coupon.$inject = ['$routeParams', '$location', 'dataservice', 'coupons', 'colorThemes'];

    function Coupon($routeParams, $location, dataservice, coupons, colorThemes) {
      var vm = this;

      var couponSettingsDefault = {},
          siteId = $routeParams.siteId,
          sites = coupons,
          site;

      console.log(coupons);
     
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

      vm.colorThemes = colorThemes;

      vm.getRegionList = function(value) {
        return dataservice.getRegions(value).then(function(data) {
          return data;
        });        
      }
    
      vm.submitCouponSettings = function() {
        console.log(vm.couponSettings);
        dataservice.saveCoupon(vm.couponSettings);
      }

      vm.addRegion = function() {
        var regionList = vm.couponSettings.showRegions;
        if(vm.region && !isInclude(regionList, vm.region)) {
          regionList.push(vm.region);
          vm.region = '';
        } 
      }

      vm.addFile = function ($files, $event, $flow) {
        var fileReader = new FileReader();
          fileReader.onload = function (event) {
            var base64 = event.target.result,
                base64Code = base64.replace('data:image/png;base64,', '');
            vm.couponSettings.image = base64Code;
          };
        
        fileReader.readAsDataURL($files[0].file);
      }

      vm.removeRegion = function(region) {
        var regionList = vm.couponSettings.showRegions,
            regionIndex = regionList.indexOf(region);

        if (regionIndex > -1) {
          regionList.splice(regionIndex, 1);
        }
      }

      function isInclude(arr,obj) {
        return (arr.indexOf(obj) != -1);
      }    
    }


})();