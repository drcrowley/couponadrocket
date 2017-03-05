(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('Shell', Shell);

	Shell.$inject = ['$translate', 'tmhDynamicLocale', 'dataservice'];

	function Shell($translate, tmhDynamicLocale, dataservice) {
		var vm = this;
		vm.title = 'CouponAdRocket';

    $translate.use('ru');
    tmhDynamicLocale.set('ru');
	}
})();