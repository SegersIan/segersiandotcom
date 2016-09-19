var app = angular.module('myApp', ['ngRoute']);

app.config([ '$routeProvider', function($routeProvider) {
	
	// Bootstrap client side routes
	$routeProvider
		.when('/', {
			templateUrl : 'templates/main.html',
			controller : 'AppController'
		})
		.when('/about', {
			templateUrl : 'templates/about.html',
			controller : 'AboutController'
		})
		.when('/contact', {
			templateUrl : 'templates/contact.html',
			controller : 'SocialContactController'
		})
		.when('/site', {
			templateUrl : 'templates/site.html',
			controller : 'ThisSiteController'
		})
		.when('/resume', {
			templateUrl : 'templates/resume.html',
			controller : 'ResumeController'
		})
		.when('/404', {
			templateUrl : 'templates/404.html',
			controller : 'PageNotFoundController'
		})
		.otherwise(
			{ redirectTo: '/404' }
		);
	
}]);

app.run(['$rootScope', function($rootScope) {
	
	$rootScope.$on("$routeChangeSuccess", function(event, next, previous) {
		
		if(isHotlinkVisit(previous, next) || isReturnFromRootToAnyRoute(next, previous)){
			$rootScope.contentIsShown = true;
		}else if(isReturnFromAnyRouteToRoot(next, previous)){
			$rootScope.contentIsShown = false;
		}
		
		function isHotlinkVisit(previous, next){
			// Detects if the user opens the website with a url that does not target the root route
			return previous === undefined && next.$$route.redirectTo !== '/' && next.$$route.originalPath !== '/';
		}
		
		function isReturnFromAnyRouteToRoot(next, previous) {
			// Detects if the users clicked "back" and goes from any route than the root to the root route.
			return next !== undefined && next.$$route.originalPath === '/' && previous !== undefined && previous.$$route.originalPath !== '/';
		}
		
		function isReturnFromRootToAnyRoute(next, previous) {
			// Detects if the users clicked "back" and goes from the root route to any other route.
			return next !== undefined && next.$$route.originalPath !== '/' && previous !== undefined && previous.$$route.originalPath === '/';
		}
		
	});
	
}]);