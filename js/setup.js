// var container = document.getElementById("container"); // Useful when many canvas for identifying specific containers
var canvas, context; // Always needed for js graphics
var maxWidth, maxHeight; // Define canvas size to be updated
var time = new Date().getTime();  // Very common variable to control animation

// Setup DOM and elements for animation
function init(){
	canvas = document.createElement("canvas");
	context = canvas.getContext("2d");

	container.appendChild(canvas);
	// document.body.appendChild(canvas);

	setSize(); // Set for the first time the width and height of the canvas 

	window.addEventListener("resize", setSize);
}

// Executes anythig 60 times per second
function animate(){
	requestAnimationFrame(animate); // Method for calling itself and create a loop
	time = new Date().getTime();
	render(); // This is the action that makes the animation
}

// Draw function. Defines what will be drawn
function render(){
	// Draw methods
}

// Define function to update canvas size
function setSize(){
	maxWidth = window.innerWidth;
	maxHeight = window.innerHeight;

	canvas.width = maxWidth;
	canvas.height = maxHeight;
}


init();
animate();