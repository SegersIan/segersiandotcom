angular.module('myApp')
	.controller('AppController', function($scope, $location) {
				
		$scope.onKeyPress = onKeyPress;
		$scope.goToRoute = goToRoute;
		
		function onKeyPress(event) {
			
			switch (event.keyCode){
				case 27 : { // ESC
					goToRoute('/');
					//finish();
				}break;
				case 65 : { // A
					goToRoute('/about');
				}break;
				case 82 : { // R
					goToRoute('/resume');
				}break;
				case 67 : { // C
					goToRoute('/contact');
				}break;
				case 83 : { // S
					goToRoute('/site');
				}break;
				default: {
					
				}
			}
			
		}
		
		function goToRoute(route) {
			
			openMenu();
			$location.path(route);
			
			if(route === '/'){
				openMenu();
				$location.path(route);
			}else{
				openContent();
				$location.path(route);
			}
		}
		
		function openContent() {
			$('#menu').addClass('mover');
			$('#content').addClass('mover');
		}
		
		function openMenu() {
			$('#menu').removeClass('mover');
			$('#content').removeClass('mover');
		}
		
	});