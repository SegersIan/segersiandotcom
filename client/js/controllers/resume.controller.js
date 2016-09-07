angular.module('myApp')
	.controller('ResumeController', [ '$rootScope', function($rootScope) {
		$rootScope.title = 'resume';
		
		initialize();
		
		function initialize() {
			drawSVG();
		}
		
		function drawSVG() {
			var svgVolumeControls = $('.svg-volume');
			
			svgVolumeControls.each(function () {
				var mySvg = this;
				
				var angleOfValueMin = -150;
				var angleOfValueMax = 150;
				
				var width = $(mySvg).width();
				var height = $(mySvg).height();
				var value = $(mySvg).attr('data-value');
				
				var angleOfValue = (angleOfValueMin) + (value * 3);
				
				var centerX = width / 2;
				var centerY = height / 2;
				var radiusInner = centerX * 0.5;
				var radiusOuter = centerX * 0.90;
				
				var strokeWidth = width * 0.10;
				
				$(mySvg).find('.voidMask').attr('d', drawMyArc(centerX, centerY, radiusOuter, angleOfValue, angleOfValueMax));
				$(mySvg).find('.voidMask').attr('stroke-width',strokeWidth);
				
				$(mySvg).find('.valueMask').attr('d', drawMyArc(centerX, centerY, radiusOuter, angleOfValueMin, angleOfValue));
				$(mySvg).find('.valueMask').attr('stroke-width',strokeWidth);
				
				$(mySvg).find('.valuePointer').attr('d', drawMyPointer(centerX, centerY, radiusInner, radiusOuter, angleOfValue));
				$(mySvg).find('.valuePointer').attr('stroke-width',strokeWidth);
				
			});
		}
		
		function drawMyArc(centerX, centerY, radius, startAngle, endAngle) {
			
			var start = polarToCartesian(centerX, centerY, radius, endAngle);
			var end = polarToCartesian(centerX, centerY, radius, startAngle);
			
			var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
			
			var d = [
				'M', start.x, start.y,
				'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
			].join(' ');
			
			return d;
		}
		
		function drawMyPointer(centerX, centerY, innerRadius, outerRadius, valueAngle) {
			var start = polarToCartesian(centerX, centerY, innerRadius, valueAngle);
			var end = polarToCartesian(centerX, centerY, outerRadius, valueAngle);
			
			return [
				'M', start.x, start.y,
				'L', end.x,end.y
			].join(' ');
		}
		
		function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
			var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;
			
			return {
				x: centerX + (radius * Math.cos(angleInRadians)),
				y: centerY + (radius * Math.sin(angleInRadians))
			};
		}
		
	}]);