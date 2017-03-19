(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('config', getConfig());

    function getConfig() {
      return typeof couponConfig != 'undefined' ? couponConfig : {
        apiUrl: 'http://94.142.139.199:8080/coupon-web/rs',
        iconSize: [125, 125],
        loginUrl: '/authorization.html',
        couponListScriptsUrl: '/coupon-list.js'
      };
    }
})();