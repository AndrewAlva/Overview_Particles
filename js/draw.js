var container = document.getElementById("container");
var canvas, context; 
var maxWidth, maxHeight;
var mouseX, mouseY;


function init(){
	canvas = document.createElement("canvas");
	context = canvas.getContext("2d");
	container.appendChild(canvas);
	
	setSize(); 

	window.addEventListener("resize", setSize);
	window.addEventListener("mousemove", setMousePosition);
}


function animate(){
	requestAnimationFrame(animate); 
	render(); 
}


function render(){
	// Clear canvas to smooth drawing
	// context.clearRect(x, y, width, height); // Define what area of the canvas will be erased
	context.clearRect(0, 0, maxWidth, maxHeight);

	// Draw a rectangle
	// context.drawRect(x, y, width, height);
	context.fillStyle = "blue";
	context.fillRect(0, 300, 100, 100);

	// Draw paths
	context.beginPath();
	// context.moveTo(x, y); // Each moveTo indicates where the next point is
	context.moveTo(maxWidth/2, maxHeight/2); 
	context.lineTo(400, 500);
	context.lineTo(300, 550);
	context.lineTo(300, 100);
	context.lineTo(maxWidth/2, maxHeight/2);
	context.strokeStyle = "red";
	context.stroke();
	context.closePath();

	// Draw circles / arcs
	context.beginPath();
	// context.arc(x, y, radius, radian, boolean_clockdirection); // true is clockwise, false is counter clockwise
	context.arc(450, 300, 10, Math.PI*2, false);
	context.fillStyle = "#00ff00";
	context.fill();
	context.strokeStyle = "red";
	context.stroke();
	context.closePath();

	// Draw line that follows mouse
	context.beginPath();
	context.moveTo(maxWidth/2, maxHeight/2); 
	context.lineTo(mouseX, mouseY);
	context.strokeStyle = "black";
	context.stroke();
	context.closePath();
}


function setSize(){
	maxWidth = window.innerWidth;
	maxHeight = window.innerHeight;

	canvas.width = maxWidth;
	canvas.height = maxHeight;
}

function setMousePosition(event){
	var e = e || window.event;

	mouseX = e.clientX;
	mouseY = e.clientY;
}


init();
animate();