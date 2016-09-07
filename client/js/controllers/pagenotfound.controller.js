angular.module('myApp')
	.controller('PageNotFoundController', [ '$rootScope',function($rootScope) {
		$rootScope.title = '404';
	}]);