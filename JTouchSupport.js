
TouchSupport = function() {
	
	this.clientBrowser	= navigator.userAgent;
	
	this.iDevice		= this.clientBrowser.match(/(iPhone|iPad|iPod)/); 
	this.bbDevice		= this.clientBrowser.match(/BlackBerry/);
	this.droidDevice	= this.clientBrowser.match(/Android/); 
	
	
	this.browserEngine = function() {
		if( this.iDevice ) {
			return 1;
		} else if( this.bbDevice ) {
			return 2;
		} else if( this.droidDevice ) {
			return 3;
		} 
	}
	
	
	this.isTouchDevice = function() { 
		if ("ontouchstart" in document.documentElement) {
			return true;
		} else {
			return false;
		}
	};
		
	
	
	this.bypassDefaultMove = function(event) {
		event.preventDefault();
		window.scroll(0, 0);
		return false;
	}
	
	
	
	this.getX = function(event) {
		if( this.isTouchDevice() ) {
			if(this.iDevice) {
				return event.targetTouches[0].pageX;
			} else if (this.bbDevice) {
				// blackberry
			} else if (this.droidDevice) {
				// android
			}
			
		} else {
			if(this.isIE()) {
				return window.event.clientX;
			} else {
				return event.pageX;
			}
		}
	} 
	
	
	
	this.getY = function(event) {	
		if( this.isTouchDevice() ) {
			return event.targetTouches[0].pageY;
		} else {
			if(this.isIE()) {
				return window.event.clientY;
			} else {
				return event.pageY;
			}
			
		}
		
	}
	
	
	
	this.isIE = function() { // MS IE
		if (document.layers||document.getElementById&&!document.all) {
			return false;
		} else if (document.all) {
			return true; //IE
		}
	}

};