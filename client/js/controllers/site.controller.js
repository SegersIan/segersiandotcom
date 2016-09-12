angular.module('myApp')
	.controller('ThisSiteController', [ '$rootScope', function($rootScope) {
		$rootScope.title = 'site';
		$rootScope.hasLongContent = false;
	}]);