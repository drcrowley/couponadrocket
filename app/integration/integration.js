(function() {
  'use strict';

  angular
    .module('app.integration')
    .controller('Integration', Integration);

    Integration.$inject = [];
    
    function Integration() {
      var vm = this;
      activate();

      function activate() {
        console.log(123);
      }
    }
})();