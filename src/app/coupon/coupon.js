(function() {
  'use strict';

  angular
    .module('app.coupon')
    .controller('Coupon', Coupon);

    Coupon.$inject = ['$scope', '$routeParams', '$timeout', '$location', '$uibModal', 'dataservice', 'colorThemes', 'config'];

    function Coupon($scope, $routeParams, $timeout, $location, $uibModal, dataservice, colorThemes, config) {
      var vm = this;

      activate();

      vm.getRegionList = function(value) {
        return dataservice.getRegions(value).then(function(data) {
          return data.slice(0, 5);
        });
      }
    
      vm.saveCoupon = function(form) {
        dataservice.saveCoupon(vm.couponSettings).then(function(data) {
          form.$submitted = false;
          dataservice.setCurrentSite(data.id);
          vm.couponSettings = data;
          $location.url('/site/'+ data.id +'/coupon');
        });
      }

      vm.deleteCoupon = function() {
        $uibModal.open({
          animation: true,
          templateUrl: 'app/coupon/coupon-delete-confirm.html',
          scope: $scope,
          controllerAs: 'vm'
        });
      }

      vm.confirmDelete = function() {
        dataservice.deleteCoupon(vm.couponSettings.id).then(function() {
          activate();
        });
      }

      vm.resetCoupon = function() {
        activate();
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
            var dataUrl = event.target.result,
                iconSize = config.iconSize;

            resizeImage(dataUrl, iconSize[0], iconSize[1], function(dataUrl) {
              var base64 = dataUrl.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
              vm.couponSettings.image = base64;
            });
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

      function resizeImage(url, width, height, callback) {
          var sourceImage = new Image();

          sourceImage.onload = function() {
              var canvas = document.createElement("canvas");
              canvas.width = width;
              canvas.height = height;
              canvas.getContext("2d").drawImage(sourceImage, 0, 0, width, height);
              callback(canvas.toDataURL());
          }

          sourceImage.src = url;
      }

      function isInclude(arr,obj) {
        return (arr.indexOf(obj) != -1);
      }

      function activate() {
        dataservice.getCoupons().then(function(coupons) {
          var couponSettingsDefault = {
              couponCodeGenerate: true,
              colorTheme: 1,
              showRegions: []
            },
            siteId = $routeParams.siteId,
            site;
       
          if (coupons.length && siteId != 'new') {
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
              $location.url('/site/'+ site.id + '/coupon');
            }

            vm.couponSettings = site;
          } else {
            dataservice.removeCurrentSite();
            $location.url('/site/new/coupon');
            vm.couponSettings = couponSettingsDefault;
          }

          vm.colorThemes = colorThemes;
        });
      }
    }
})();