(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('toastr', toastr)
    .constant('config', {
      apiUrl: 'http://94.142.139.199:8080/coupon-web/rs'
    });
})();