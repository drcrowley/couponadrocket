(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('translateLoader', translateLoader);

    translateLoader.$inject = ['$q', 'dataservice'];

    function translateLoader($q, dataservice) {
      return dataservice.getI18n;
    }

})();

