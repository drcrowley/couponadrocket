(function() {
  'use strict';

  angular
    .module('app.coupon')
    .controller('Coupon', Coupon);

    Coupon.$inject = ['$scope', '$routeParams', '$timeout', '$location', '$uibModal', '$rootScope', 'dataservice', 'colorThemes', 'translations', 'config'];

    function Coupon($scope, $routeParams, $timeout, $location, $uibModal, $rootScope, dataservice, colorThemes, translations, config) {
      var vm = this;

      $rootScope.title = translations['C_HEAD_SITES'] + ' - ' + translations['C_HEAD_COUPON'];

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

      vm.onRegionSelect = function() {
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

          snapshotResize(dataUrl, iconSize[0], iconSize[1], function(dataUrl) {
            vm.previewImageUrl = dataUrl;
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

      vm.showPreview = function(form) {
        if(form.$valid) {
          form.$submitted = false;
          var testCoupon = {
            id: 0,
            titel: vm.couponSettings.titel,
            url: vm.couponSettings.homepageUrl,
            imgUrl: vm.previewImageUrl ? vm.previewImageUrl : vm.couponSettings.imgUrl,
            descr: vm.couponSettings.description,
            text: vm.couponSettings.text,
          };
          var colorThemes = {
            '1': 'red',
            '2': 'green',
            '3': 'blue',
            '4': 'orange'
          };
          includeCoupons({colorTheme: colorThemes[vm.couponSettings.colorTheme], previewLink: '/show/couponsPreview', testCoupon: testCoupon});
        } else {
          form.$submitted = true;
        }
        function includeCoupons(params){var request=new XMLHttpRequest;request.open("GET",config.couponListScriptsUrl,!0),request.onload=function(){request.status>=200&&request.status<400&&eval(request.responseText.replace(/{{params}}/g,JSON.stringify(params)))},request.send()}
      }

     function snapshotResize(srcData, width, height, callback) {
        var imageObj = new Image(),
            canvas = document.createElement('canvas'),
            ctx = canvas.getContext('2d'),
            xStart = 0,
            yStart = 0,
            aspectRadio,
            newWidth,
            newHeight;
        
        canvas.width  = width;
        canvas.height = height;     

        imageObj.onload = function() {
          aspectRadio = imageObj.height / imageObj.width;

          if(imageObj.height < imageObj.width) {
             aspectRadio = imageObj.width / imageObj.height;
             newHeight = height,
             newWidth = aspectRadio * height;
             xStart = -(newWidth - width) / 2;
          } else {
             newWidth  = width,
             newHeight = aspectRadio * width;
             yStart = -(newHeight - height) / 2;
          }

          ctx.drawImage(imageObj, xStart, yStart, newWidth, newHeight);
          callback(canvas.toDataURL());         
        }

        imageObj.src  = srcData;
      }      

      function isInclude(arr,obj) {
        return (arr.indexOf(obj) != -1);
      }

      function activate() {
        dataservice.getCoupons().then(function(coupons) {
          var couponSettingsDefault = {
              couponCodeGenerate: false,
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