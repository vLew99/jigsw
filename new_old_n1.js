// CONSTANTS
var level;






function Block(img_location, current_loc, correct_loc, img) {
	this.img = img;
	this.img_location = img_location;
	this.current_loc = current_loc;
	this.correct_loc= correct_loc;
	this.selected = false;
	this.image_loc = null;
}

function Board(size) {
	this.array = new Array();
	this.size = size;

	// path
	imgs_path = "imgs/level"
	if(level==1) imgs_path += "1/";
	else if(level==2) imgs_path += "2/";
	else imgs_path += "3/";
	imgs_path += Math.round(Math.random()*1).toString() + "/";

	// console.log(imgs_path);

	// images path and randomize
	images = [];
	for(let i=0; i < size; i++)
		images.push(imgs_path + i.toString() + ".png");
	rand_images = randomize(images);

	// console.log(images);
	// console.log(rand_images);

	// insert into array
	let tmp;
	for(let i=0; i<size;i++) {
		tmp = new Block(rand_images[i], i, parseInt(rand_images[i].charAt(14)), 0);
		this.array.push(tmp);
	}

	// console.log(this.array);
}


var board;
var maindiv;
var block1_selected;
var if_selected = false;


function swap_blocks(block1, block2) {
	var tmp1 = block2.img_location;
	var tmp2 = block2.img.current_loc;
	var tmp3 = block2.selected;
	block2.img_location = block1.img_location;
	block2.current_loc = block1.current_loc;
	block2.selected = block1.selected;
	block1.img_location = tmp1;
	block1.current_loc = tmp2;
	block1.selected = tmp3;
	block1.img.src = block1.img_location;
	block2.img.src = block2.img_location;
}


function init(level) {
	// if(board!=null) {
	// 	for(let i=0; i<board.array.length; i++) {
	// 		board.array[i].img.remove();
	// 	}
	// }


	if(level==1)
		board = new Board(2);
	else if(level==2) 
		board = new Board(3);
	else
		board = new Board(10);
	
	maindiv = document.querySelector("#block");
	var tmp;
	for(let i=0; i<board.array.length; i++) {
		tmp = document.createElement("img");
		tmp.src = board.array[i].img_location;
		tmp.classList = "imgs";
		tmp.style.position = "relative";
		tmp.style.transition = "opacity 1s";
		maindiv.appendChild(tmp);
		board.array[i].img = tmp;
	}

	// initialise events for board
	for(let i=0; i<board.array.length; i++) {
		board.array[i].img.addEventListener("click", e => {
			block_click(i, e);
			e.stopPropagation();
		});
	}

	// maindiv.addEventListener("pointerover", e => {
	// 	maindiv.addEventListener("pointermove", block_move);
	// 	console.log("added " + e.target.id);
	// });


	// document.getElementById("outside-block").addEventListener("pointerleave", e => {
	// 	if(e.target != e.currentTarget) return;
	// 	maindiv.removeEventListener("pointermove", block_move);
	// 	console.log("remove " + e.target.id);

	// });
	

	



	// function block_move(event) {
	// 	for(let i=0; i<board.array.length ; i++) {
	// 		if(board.array[i].selected) {
	// 			board.array[i].img.style.position = "absolute";
	// 			var middleY = event.pageY - board.array[i].img.height;
	// 			let middleX = event.pageX - board.array[i].img.width;
	// 			board.array[i].img.style.top = middleY.toString() + "px";
	// 			board.array[i].img.style.left = middleX.toString() + "px";
	// 		}
	// 	}
	// }


	// for (let i=0; i<board.array.length; i++) {
	// 	maindiv.addEventListener("mousemove", e => {
	// 		if(board.array[i].selected) {
	// 			board.array[i].img.style.position = "absolute";
	// 			console.log(e);

	// 			var middleY = e.pageY - board.array[i].img.height;
	// 			let middleX = e.pageX - board.array[i].img.width;
	// 			// var middleY = e.clientY - (128/2);
	// 			// let middleX = e.clientX - (128/2);
	// 			board.array[i].img.style.top = middleY.toString() + "px";
	// 			board.array[i].img.style.left = middleX.toString() + "px";
	// 			// console.log(board.array[i].img.style.left);
	// 			block1_selected = board.array[i];
	// 		}
	// 	});
	// }
}


function block_click(i, e) {
	if(board.array[i].selected == false){
		console.log("selected block");
		block_select(i, e);
	}
	else{
		console.log("deselect block");
		block_deselect(i);
	}
}

function block_select(i, e) {
	// block_select
	board.array[i].img.style.opacity = 0.5;
	board.array[i].selected = true;
	board.array[i].image_loc = [e.pageX, e.pageY];
	board.array[i].img.style.zIndex = 9999;

	// events
	console.log("move block");
	board.array[i].img.addEventListener("mousemove", block_move);
}


function block_deselect(i) {
	board.array[i].selected = false;
	board.array[i].img.style.opacity = 1;
	board.array[i].img.style.zIndex = 1;
	//events
	console.log("stop move block");
	board.array[i].img.removeEventListener("mousemove", block_move);
}

function block_move(event) {
	event.target.style.position = "absolute";
	var middleY = event.pageY - event.target.height;
	let middleX = event.pageX - event.target.width;
	event.target.style.top = middleY.toString() + "px";
	event.target.style.left = middleX.toString() + "px";
	document.getElementById("block").addEventListener("mouseover", e=> {
		event.target.removeEventListener("mousemove", block_move);
	});

	document.getElementById("block").addEventListener("mouseout", e=> {
		event.target.addEventListener("mousemove", block_move);
	});
	e.stopPropagation();
}


document.querySelector("#level1").addEventListener("click", e => {
	level=1;
	init(level);
});

document.querySelector("#level2").addEventListener("click", e => {
	level=2;
	init(level);
});

document.querySelector("#level3").addEventListener("click", e => {
	level=3;
	init(level);
});

function gameloop() {
	if(stop_movement==true)
	{
		
	}
}


level= 3;
init(level);

setInterval(gameloop, 10);
console.log(board);


































function randomize(array) {
	arr = array.slice();
	let size = array.length;
	let curr_i = size-1;
	while(curr_i != 0) {
		let rand_i = Math.floor(Math.random()*curr_i);
		curr_i-=1;
		let temp = arr[curr_i];
		arr[curr_i] = arr[rand_i];
		arr[rand_i] = temp;
	}
	return arr;
}
