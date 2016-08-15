angular.module("myApp", ["ngRoute"])
.config(function($routeProvider) {
	$routeProvider
		.when("/", {
			template : "main text"
		})
		.when("/creative", {
			template : "creative"
		})
		.when("/social", {
			template : "social"
		})
		.when("/blog", {
			template : "blog"
		})
		.when("/geeky", {
			template : "geeky"
		})
		.when("/projects", {
			template : "projects"
		})
		.when("/resume", {
			template : "resume"
		})
		.when("/about", {
			template : "about"
		})
		.when("/contact", {
			template : "contact"
		});
});