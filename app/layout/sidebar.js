(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Sidebar', Sidebar);

  Sidebar.$inject = [];

  function Sidebar($route, routehelper) {
    /*jshint validthis: true */
    var vm = this;


    activate();

    function activate() { 

    }

  }
})();