document.onload = function () {
	touchScroll('scrollArea');
};

/*  touchscreen scrolling : credits to http://chris-barr.com/2010/05/scrolling_a_overflowauto_element_on_a_touch_screen_device/ */
function isTouchDevice(){
	try{
		return true;
	}catch(e){
		return false;
	}
}

function touchScroll(id){
	if(isTouchDevice()){
		
		var el = document.getElementById(id);
		var scrollStartPos = 0;
		
		document.getElementById(id).addEventListener("touchstart", function(event) {
			scrollStartPos = this.scrollTop + event.touches[0].pageY;
			event.preventDefault();
		},false);
		
		document.getElementById(id).addEventListener("touchmove", function(event) {
			this.scrollTop = scrollStartPos - event.touches[0].pageY;
			event.preventDefault();
			
		},false);
	}
}