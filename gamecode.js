// console.log("Hello World!");

var canvas1 = document.getElementById("canvas");
canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

var ctx1 = canvas1.getContext("2d");
var level;

function init() {
	level = 1;
}

var x = 100, y = 20;
var x_speed = 1, y_speed = 1;
var radius = 20;
var mouseLocation;
var clicked = false;
var color;

function draw(x, y) {
	ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
	ctx1.beginPath();
	if(clicked)
		color = "green";
	else
		color = "black";
	ctx1.arc(x, y, radius, 0, Math.PI*2, false);
	ctx1.fillStyle = color;
	ctx1.fill();
	ctx1.closePath();
}

function gameloop() {
	draw(x, y);
}

// events

window.addEventListener("resize", e=> {
	canvas1.width = window.innerWidth;
	canvas1.height = window.innerHeight;
});

canvas1.addEventListener("mousemove", e =>  {
	if(clicked){
		x = e.offsetX;
		y = e.offsetY;
	}
});

canvas1.addEventListener("click", e => {
	if(clicked==0) {
		x = e.offsetX;
		y = e.offsetY;
	}
	clicked=clicked^true;
});


document.querySelector("#level1").addEventListener("click", e => {
	console.log("Clicked Level1");
});

document.querySelector("#level2").addEventListener("click", e => {
	console.log("Clicked Level2");
});

document.querySelector("#level3").addEventListener("click", e => {
	console.log("Clicked Level3");
});



setInterval(gameloop, 10);