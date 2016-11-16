(function () {
    'use strict';

    angular.module('app')
        .controller('TopNav', TopNav);

    TopNav.$inject = ['$route'];

    function TopNav($route) {
        /* jshint validthis:true */
        var vm = this;

        vm.isRoute = isRoute;
        vm.isNavCollapsed = true;

        function isRoute(r) {
            return $route.current.title.substr(0, r.length) === r;
        }
    }
})();