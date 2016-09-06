angular.module('myApp')
	.controller('ThisSiteController', function($scope, $rootScope) {
		$rootScope.title = 'site';
	});