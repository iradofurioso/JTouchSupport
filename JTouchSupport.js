
JTouchSupport = function() {

	
	this.isTouchDevice = function() { 
		if ("ontouchstart" in document.documentElement) {
			return true;
		} else {
			return false;
		}
	};
	
	this.getX = function(event) {
		
		if( this.isTouchDevice() ) {
			return event.targetTouches[0].pageX;
		} else {
			return event.pageX;
		}
		
	}
	
	this.getY = function(event) {
		
		if( this.isTouchDevice() ) {
			return event.targetTouches[0].pageY;
		} else {
			return event.pageY;
		}
		
	}

};

//EOF