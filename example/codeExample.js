/*
 * The objective of this code is just to show JTouchSupport in action.
 * 
 * The sample code bellow was retrieved from here:
 * http://html5.litten.com/how-to-drag-and-drop-on-an-html5-canvas/
 * please visit this website if you do not understand how drag and drop works.
 * This version there are some of my own implementation to show how JTouchSupport works.
 */


var canvas, ctx, x, y,  width, height, dragok, jTouch;

	x		= 75;
	y		= 50;
	width 	= 700;
	height 	= 500;
	dragok 	= false;

	
	function rect(x,y,w,h) {
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		ctx.fill();
	}
	
	
	function clear() {
		ctx.clearRect(0, 0, width, height);
	}
	
	
	function init() {
		
		canvas = document.getElementById("stage");
		ctx = canvas.getContext("2d");
		
		
		//------------------------------------------------------------------------------------------------------------
		jTouch = new JTouchSupport(); //instantiating the object JTouch Support
		
		// Loading events...
		if ( jTouch.isTouchDevice() ) {
			canvas.addEventListener("touchstart", myDown, false);
			canvas.addEventListener("touchend", myUp, false);
		} else {
			canvas.addEventListener("mousedown", myDown, false);
			canvas.addEventListener('mouseup', myUp, false);
		}
		//------------------------------------------------------------------------------------------------------------
		
		
		return setInterval(draw, 8);
	}
	
	
	function draw() {
		clear();
		ctx.fillStyle = "#FAF7F8";
		rect(0,0,width,height);
		ctx.fillStyle = "#444444";
		rect(x - 15, y - 15, 30, 30);
	}
	
	
	//------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------
	// The part that is important for us. 
	//------------------------------------------------------------------------------------------------------------
	
	// Mouse moving // Finger moving on screen
	function myMove(e) {
		if (dragok) {
			
			jTouch.bypassDefaultMove(e); // preventing default actions like elastic and bounce effect when moving.
			
			
			x = jTouch.getX(e) - canvas.offsetLeft; //-- jTouch.getX(e): Get X value no matter if is desktop or touchscreen. 
			y = jTouch.getY(e) - canvas.offsetTop;	//-- jTouch.getY(e): Get Y value no matter if is desktop or touchscreen.
			
			document.body.style.cursor = 'move';
		}
	}
	
	
	// Mouse pressed // Finger on screen
	function myDown(e) {
		if (jTouch.getX(e) < x + 20 + canvas.offsetLeft
				&& jTouch.getX(e) > x - 20 + canvas.offsetLeft
				&& jTouch.getY(e) < y + 20 + canvas.offsetTop
				&& jTouch.getY(e) > y - 20 + canvas.offsetTop) {
			
			//------------------------------------------------------------------------------------------------------------
			// ADDING MOVING EVENT
			if ( jTouch.isTouchDevice() ) {
				canvas.addEventListener("touchmove", myMove, true);
			} else {
				canvas.addEventListener('mousemove', myMove, false);
			}
			//------------------------------------------------------------------------------------------------------------
			
			dragok = true;
		}
	}
	
	
	// Mouse button released // Finger out of screen
	function myUp(e) {
		
		jTouch.bypassDefaultMove(e);  // preventing default actions like elastic and bounce effect when moving.
		
		document.body.style.cursor = 'default';
		dragok = false;
		
		// Removing events when the mouse button is released or finger is not touching.
		if ( jTouch.isTouchDevice() ) {
			canvas.touchmove = null;
			canvas.removeEventListener('touchmove', myMove, false);
		} else {
			canvas.onmousemove = null;
			canvas.removeEventListener('mousemove', myMove, false);
		}
		
	}
	//------------------------------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------------------------------
	
	// Now the touch on screen or mouse click is very fluid, fast and responsive.
	
	init();