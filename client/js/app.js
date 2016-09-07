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
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
				
		// In case of hot linking > Make sure the content panel is visible and the menu hidden
		if(current === undefined && next.$$route.redirectTo !== '/' && next.$$route.originalPath !== '/'){
			$('#menu').addClass('mover');
			$('#content').addClass('mover');
		}
		
	});
}]);