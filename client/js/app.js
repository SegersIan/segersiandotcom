var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
	
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
		.when('/resume', {
			templateUrl : 'templates/resume.html',
			controller : 'ResumeController'
		})
		.when('/contact', {
			templateUrl : 'templates/contact.html',
			controller : 'SocialContactController'
		})
		.when('/site', {
			templateUrl : 'templates/site.html',
			controller : 'ThisSiteController'
		});
	
});

app.run( function($rootScope, $location) {
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		
		// In case of hot linking > Make sure the content panel is visible
		if(!current && next.originalPath !== '/'){
			$('#menu').addClass('mover');
			$('#content').addClass('mover');
		}
		
	});
});