// CONSTANTS

var board;
var maindiv;
var block1_selected;
var level;
var imgs_path;
var solution_shown;



function Block(img_location, correct_loc, i, img) {
	this.img = img;
	this.img_location = img_location;
	this.current_i = i;
	this.correct_loc= correct_loc;
	this.selected = false;
}



function Board(size, row, column) {
	this.array = new Array();
	this.size = size;
	this.running = true;

	// path
	imgs_path = "imgs/level"
	if(level==1) imgs_path += "1_";
	else if(level==2) imgs_path += "2_";
	else imgs_path += "3_";
	imgs_path += Math.round(Math.random()*1).toString() + "_";

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
		tmp = new Block(
			rand_images[i],
			parseInt(rand_images[i].charAt(14)),
			i,
			null
		);
		this.array.push(tmp);
	}

	// console.log(this.array);
}



// function swap_blocks(block1, block2) {
// 	var tmp1 = block2.img_location;
// 	var tmp2 = block2.img.current_loc;
// 	var tmp3 = block2.selected;
// 	block2.img_location = block1.img_location;
// 	block2.current_loc = block1.current_loc;
// 	block2.selected = block1.selected;
// 	block1.img_location = tmp1;
// 	block1.current_loc = tmp2;
// 	block1.selected = tmp3;
// 	block1.img.src = block1.img_location;
// 	block2.img.src = block2.img_location;
// }

function randomize(array) {
	arr = array.slice();
	let size = array.length;
	let curr_i = size-1;
	// if()


	while(curr_i != 0) {
		let rand_i = Math.floor(Math.random()*curr_i);
		curr_i-=1;
		let temp = arr[curr_i];
		arr[curr_i] = arr[rand_i];
		arr[rand_i] = temp;
	}
	return arr;
}


function init(level) {
	if(board!=null) {
		remove_blocks();
	}

	if(solution_shown) {
		remove_solution();
		solution_shown = false;
	}

	if(level==1)
		board = new Board(2, 1, 2);
	else if(level==2) 
		board = new Board(3, 1, 3);
	else
		board = new Board(10, 2, 5);
	
	// insert images
	maindiv = document.querySelector("#block");
	for(let i=0; i<board.array.length; i++) {
		let tmp = document.createElement("img");
		tmp.src = board.array[i].img_location;
		tmp.width = 200;
		tmp.classList = "imgs";
		tmp.style.position = "relative";
		tmp.style.transition = "opacity 1s";
		maindiv.appendChild(tmp);
		board.array[i].img = tmp;
	}

	// initialise events for board
	for(let i=0; i<board.array.length; i++) {
		board.array[i].img.addEventListener("click", e => {
			for(let j=0; j<board.array.length;j++) {
				if(board.array[j].current_i == i){
					block_click(j, e);
					break;
				}
			}
		});
	}
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
	board.array[i].img.style.zIndex = 9999;
	board.array[i].img.style.position = "absolute";
	board.array[i].img.addEventListener("mousemove", block_move);
}

function block_deselect(i) {
	board.array[i].selected = false;
	board.array[i].img.style.opacity = 1;
	board.array[i].img.style.zIndex = 1;
	board.array[i].img.removeEventListener("mousemove", block_move);
}

function block_move(event) {

	let mouse_x = event.pageX;
	let mouse_y = event.pageY;

	let box_top = mouse_y - event.target.height*1.25;
	let box_left = mouse_x - event.target.width*1.5;

	let dim = document.querySelector("#block").getBoundingClientRect();

	// console.log("Width: "  + event.target.width + " Height: " + event.target.height);
	// console.log("Mouse x: " + event.clientX + " y: " + event.clientY);

	if(mouse_y > dim['top'] && mouse_y < dim['bottom']) {
		event.target.style.top = box_top.toString() + "px";
	}
	if( mouse_x > dim['left'] && mouse_x < dim['right']) {
		event.target.style.left = box_left.toString() + "px";
	}
}

function check_board_correct() {
	let isCorrect = true;
	// udate current_loc

	for(let i=0; i<board.array.length; i++) {
		if(i != board.array[i].correct_loc){
			isCorrect = false;
			break;
		}
	}
	return isCorrect;
}

function update_location() {
	board.array.sort((e1, e2)=> {
		let e1_rect = e1.img.getBoundingClientRect();
		let e2_rect = e2.img.getBoundingClientRect();
		if(Math.abs(e1_rect['top'] - e2_rect['top']) < 200 )
			return e1_rect['left'] - e2_rect['left'];
		else
			return e1_rect['top'] - e2_rect['top'];
	});
}

function add_solution() {
	console.log("win");
	let maindiv = document.querySelector("#block");
	let dim = [maindiv.getBoundingClientRect()['width'], maindiv.getBoundingClientRect()['height']];

	maindiv.style.display = "flex";
	maindiv.style.flexDirection = "row";
	maindiv.style.justifyContent = "space-around";

	let tmp = document.createElement("img");
	tmp.src = imgs_path + "image.jpg";
	tmp.classList = "win-image";
	tmp.style.position = "relative";
	tmp.style.width = dim[0] + "px";
	if(level==1)
		tmp.style.height = dim[0]/2 + "px";
	if(level==2)
		tmp.style.height = dim[0]/3 + "px";
	if(level==3)
		tmp.style.height = (dim[0]/5)*2 + "px";	
	// tmp.style.width = "auto";
	maindiv.appendChild(tmp);
}

function remove_solution() {
	document.querySelector(".win-image").remove();
	document.querySelector("#block").style.display = "block";
}

function remove_blocks() {
	for(let i=0; i<board.array.length; i++) {
		board.array[i].img.remove();
	}
	board = null;
}





function start(l) {
	level = l;
	init(level);
}






// events
document.querySelector("#level1").addEventListener("click", e => {
	start(1);
});

document.querySelector("#level2").addEventListener("click", e => {
	start(2);
});

document.querySelector("#level3").addEventListener("click", e => {
	start(3);
});

document.querySelector("#check").addEventListener("click", e => {
	if(board!=null) {
		update_location();
		if(check_board_correct() && !solution_shown) {
			remove_blocks();
			add_solution();
			solution_shown = true;
		}
	}
})



// //////////////////////////////////// RUNNNNN
start(1);