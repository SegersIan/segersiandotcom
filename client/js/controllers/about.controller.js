angular.module('myApp')
	.controller('AboutController', [ '$rootScope', function($rootScope) {
		$rootScope.title = 'about me';
	}]);