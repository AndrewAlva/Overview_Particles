var container = document.getElementById("container");
var canvas, context;
var maxWidth, maxHeight;
var time = new Date().getTime(); 

const PI2 = Math.PI*2;
Math.distance = function(a,b){
	return Math.sqrt(Math.pow((a.x-b.x), 2) + Math.pow((a.y-b.y), 2));
}

var particles = [];
var particleCounter = 300;
var distanceTrigger = 100;

// Example of a particle object
// var particle = {
// 	x: Math.random() * window.innerWidth,
// 	y: Math.random() * window.innerHeight,
// 	radius: Math.random() * 10
// };


// Class definition. First letter is capitilized always. This is the mold to create 'x' quantity of particles
var Particle = function(args){
	// if(!args) args = {}; // Two different ways to declare that 'args' is not defined
	if(args === undefined) args = {}; // 'args' need to exist to prevent, even if it's empty, so if it doesn't exists first you have to create it

	this.position = {
		x: args.x || Math.random() * window.innerWidth, // '||' Asign the value that came from the args, or if it's not defined set a default value
		y: args.y || Math.random() * window.innerHeight
	}
	this.radius = args.radius || Math.random() * 2; 
	this.speed = {
		x: (Math.random() * 2) - 1,
		y: (Math.random() * 2) - 1
	}

	this.draw = function(ctx){
		this.update();
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, PI2, false);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.closePath();
	}

	this.update = function(){
		// Move particles
		this.position.x += this.speed.x;
		this.position.y += this.speed.y;

		// When particles exit the viewport, draw them again at the beginning of the viewport
		// if (this.position.x > canvas.width) {this.position.x = 0 + (this.position.x - canvas.width); }
		// if (this.position.y > canvas.height) {this.position.y = 0 + (this.position.y - canvas.height); }
		// if (this.position.x < 0) {this.position.x = canvas.width;}
		// if (this.position.y < 0) {this.position.y = canvas.height;}

		// When particles touch the edge of the screen, revert their movement
		if (this.position.x > (canvas.width - this.radius) || this.position.x < (this.radius)){this.speed.x = this.speed.x * -1;}
		if (this.position.y > (canvas.height - this.radius) || this.position.y < (this.radius)){this.speed.y = this.speed.y * -1;}
	}

	return this; // Necessary to return the new object
}

function init(){
	canvas = document.createElement("canvas");
	context = canvas.getContext("2d");
	container.appendChild(canvas);

	setCanvasSize();
	window.addEventListener("resize", setCanvasSize);

	setParticles();
}

function animate(){
	requestAnimationFrame(animate);
	time = new Date().getTime();
	render();
}

function render(){
	context.clearRect(0, 0, canvas.width, canvas.height);

	// Draw all particles
	for (var i = 0; i < particles.length; i++) {
		var particle_a = particles[i]; // Simplify and identify each particle to be drawn
		particle_a.draw(context); // Draw each particle in the specified canvas/'context'

		for (var j = i + 1; j < particles.length; j++) {
			var particle_b = particles[j];
			var distance = Math.distance(particle_a.position, particle_b.position);

			if(distance < distanceTrigger){
				context.beginPath();
				context.moveTo(particle_a.position.x, particle_a.position.y);
				context.lineTo(particle_b.position.x, particle_b.position.y);
				context.lineCap = "round";
				context.strokeStyle = "rgba(255,255,255,"+ (1 - (distance / distanceTrigger)) +")";
				context.lineWidth = 1;
				context.stroke();
				context.closePath();
			}
		};
	};
}

function setCanvasSize(){
	maxWidth = window.innerWidth;
	maxHeight = window.innerHeight;

	canvas.width = maxWidth;
	canvas.height = maxHeight;
}

function setParticles(){
	for (var i = 0; i < particleCounter; i++) {
		var particle = new Particle();
		particles.push(particle);
	};
}



init();
animate();