angular.module('myApp')
	.controller('AppController', [ '$scope', '$location', '$timeout', function($scope, $location, $timeout) {
				
		$scope.onKeyPress = onKeyPress;
		$scope.goToRoute = goToRoute;
		
		function onKeyPress(event) {
			
			// Ignore keys on usual key combinations
			if(event.altKey || event.ctrlKey || event.shiftKey || event.metaKey) return;
			
			switch (event.keyCode){
				case 27 : { // ESC
					goToRoute('/');
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
			if(route === '/'){
				openMenu();
				
				// Delay for visual effects > Consider to use a directive or template
				$timeout(
					function () {
						$location.path(route);
					}, 400, true
				);
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
		
	}]);