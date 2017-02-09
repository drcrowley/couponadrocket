(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('datacache', datacache);

  datacache.$inject = ['$cacheFactory'];

  function datacache($cacheFactory) {
    return $cacheFactory('cache', {});
  }
  
})();