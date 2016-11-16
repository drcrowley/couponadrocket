(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('Shell', Shell);

	Shell.$inject = [];

	function Shell() {
		var vm = this;
		vm.title = 'CouponAdRocket';
		    
		activate();

		function activate() {

		}
	}
})();