(function() {
  'use strict';

  angular
    .module('app.services')
    .factory('translateLoader', translateLoader);

    translateLoader.$inject = ['$q', 'dataservice'];

    function translateLoader($q, dataservice) {
      return dataservice.getI18n;
      // return function (options) {
      //   var deferred = $q.defer(),
      //       translations;

      //     console.log(options.key);

      //     dataservice.getI18n()

      //     translations = {
      //       HEADLINE: 'What an awesome module!',
      //       PARAGRAPH: 'Srsly!',
      //       PASSED_AS_TEXT: 'Hey there! I\'m passed as text value!',
      //       PASSED_AS_ATTRIBUTE: 'I\'m passed as attribute value, cool ha?',
      //       PASSED_AS_INTERPOLATION: 'Beginners! I\'m interpolated!',
      //       VARIABLE_REPLACEMENT: 'Hi {{name}}',
      //       BUTTON_LANG_DE: 'German',
      //       BUTTON_LANG_EN: 'English'
      //     };


      //   deferred.resolve(translations);

     
      //   return deferred.promise;
      // };
    }

})();

