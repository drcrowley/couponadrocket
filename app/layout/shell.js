(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('Shell', Shell);

	Shell.$inject = ['$translate', 'tmhDynamicLocale'];

	function Shell($translate, tmhDynamicLocale) {
		var vm = this;
		vm.title = 'CouponAdRocket';

    $translate.use('ru');
    tmhDynamicLocale.set('ru');

		activate();

		function activate() {

		}
	}
})();