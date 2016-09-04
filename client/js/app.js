var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider) {
	
	// Bootstrap client side routes
	$routeProvider
		.when('/', {
			templateUrl : 'templates/main.html'
		})
		.when('/creative', {
			templateUrl : 'templates/creative.html'
		})
		.when('/social', {
			templateUrl : 'templates/social.html'
		})
		.when('/blog', {
			templateUrl : 'templates/blog.html'
		})
		.when('/site', {
			templateUrl : 'templates/site.html'
		})
		.when('/projects', {
			templateUrl : 'templates/projects.html'
		})
		.when('/resume', {
			templateUrl : 'templates/resume.html'
		})
		.when('/about', {
			templateUrl : 'templates/about.html'
		})
		.when('/contact', {
			templateUrl : 'templates/contact.html'
		});
	
});