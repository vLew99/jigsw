// CONSTANTS

var board;
const maindiv = document.querySelector("#block");
var block_selected = null;
var level;
let imgs_path;
var solution_shown;


function Block(file_location, correct_loc, current_loc, img) {
	this.img = img;
	this.file_location = file_location;
	this.current_loc = current_loc;
	this.correct_loc= correct_loc;
	this.selected = false;
}

function Board(size) {
	this.size = size;

	// path
	imgs_path = getFileLocationStartPath(level); // move this somewhere other than here
	let imgs_locs = getFileLocationsArray(imgs_path, size);
	let rand_imgs_locs = imgs_locs.sort( () => Math.random() - 0.5); // randomize the file_locations_array and store in another

	this.array = new Array(this.size);
	this.array = this.array.fill("");
	this.array = this.array.map( (item, index) => {
		return new Block(
			rand_imgs_locs[index],
			parseInt(rand_imgs_locs[index].charAt(14)),
			index,
			createImgElement(rand_imgs_locs[index])
		);
	});
	this.block_selected = null;
	this.parent = document.querySelector("#block");
}

// converted
const getFileLocationStartPath = (level) => {
	let flsp = "imgs/level" + level.toString() + "_";
	flsp += Math.round(Math.random()*1).toString() + "_";
	return flsp;
};

// converted
const getFileLocationsArray = (imgs_path, array_size) => {
	let fla = new Array(array_size);
	fla = fla.fill("");
	fla = fla.map( (item, index) => item += imgs_path + index.toString() + ".png");
	return fla;
};


// converted
const createImgElement = (file_location) => {
	let img = document.createElement("img");
	img.src = file_location;
	img.width = img.height = 200;
	img.draggable = false;
	img.classList = "imgs";
	img.style.position = "relative";
	img.style.transition = "opacity 0.25s";
	document.querySelector("#block").appendChild(img);
	return img;
};

function init(level) {
	block_selected = null;
	if(board!=null) {
		removeBoard(board);
	}

	if(solution_shown==true) {
		remove_solution();
		solution_shown = false;
	}

	if(level==1) board = new Board(2);
	else if(level==2) board = new Board(3);
	else board = new Board(10);
}


// converted
const blockSelect = (img_to_select) => {
	img_to_select.style.opacity = 0.7;
	img_to_select.style.zIndex = 9999;
	img_to_select.style.position = "absolute";
	return img_to_select;
};


// converted
const blockDeselect = (img_to_deselect) => {
	img_to_deselect.style.opacity = 1;
	img_to_deselect.style.zIndex = 1;
	return null;
};

// some additional checking needs to be done here
const checkBoardCorrect = (board) => {
	return board.array.every((item, index) => index == item.correct_loc);
};


// converted
const blockSortFunction = (item1, item2) => {
	let e1_rect = item1.img.getBoundingClientRect();
	let e2_rect = item2.img.getBoundingClientRect();
	if(Math.abs(e1_rect['top'] - e2_rect['top']) < 200 )
		return e1_rect['left'] - e2_rect['left'];
	else
		return e1_rect['top'] - e2_rect['top']; 
};


// updates global board variable
const updateBlockLocations = (board, blockSortFunction) => {
	board.array.sort(blockSortFunction);
};




const addSolution = (imgs_path, parent) => {
	let parent_rect = parent.getBoundingClientRect();
	let solution = document.createElement("img");
	solution.src = imgs_path + "image.jpg";
	solution.classList = "win-image";
	solution.style.position = "absolute";
	solution.style.top = "50%";
	solution.style.transform = "translateY(-50%)";
	solution.style.maxWidth = parent_rect['width'] + "px";
	solution.style.height = "auto";
	parent.appendChild(solution);
};


const removeSolution = (solution) => {
	solution.remove();
}

function remove_solution() {
	document.querySelector(".win-image").remove();
}

const removeBoard = (board) => {
	board.array.map( item => item.img.remove() );
	board = null;
};




function start(l) {
	level = l;
	init(level);
}


function sleep(ms) {
	return new Promise(r => setTimeout(r, ms));
}



// EVENT FUNCTIONS
const maindivMouseClick = (event, board, blockSelect, blockDeselect, updateBlockLocations) => {
	let img = event.target;
	if(img.classList == "imgs") {
		if(board.block_selected == null) {
			board.block_selected = blockSelect(img);
		}
		else if(board.block_selected == img) {
			board.block_selected = blockDeselect(img);
			updateBlockLocations(board, );
		}
	}
};



const maindivMouseMove = (event, board) => {
	if(board.block_selected != null) {
		let dim = board.parent.getBoundingClientRect();
		let mouse_x = event.x;
		let mouse_y = event.y;
		let box_top = mouse_y - (board.block_selected.height/2) - dim['top'];
		let box_left = mouse_x - (board.block_selected.width/2) - dim['left'];

		if(mouse_y > dim['top'] && mouse_y < dim['bottom']) {
			board.block_selected.style.top = box_top.toString() + "px";
		}
		if( mouse_x > dim['left'] && mouse_x < dim['right']) {
			board.block_selected.style.left = box_left.toString() + "px";
		}
	}
};



// events
document.querySelector("#block").addEventListener("click", event => maindivMouseClick(event, board, blockSelect, blockDeselect));
document.querySelector("#block").addEventListener("mousemove", event => maindivMouseMove(event, board));
document.querySelector("#level1").addEventListener("click", event => start(1));
document.querySelector("#level2").addEventListener("click", e => start(2));
document.querySelector("#level3").addEventListener("click", e => start(3));

document.querySelector("#check").addEventListener("click", e => {
	if(board!=null) {
		updateBlockLocations(board, blockSortFunction);
		if(checkBoardCorrect(board) && !solution_shown) {
			removeBoard(board);
			addSolution(imgs_path, maindiv);
			solution_shown = true;
		}
		else {
			if(maindiv.classList == "") {
				maindiv.classList = "wrong";
				sleep(500).then(()=> {
					maindiv.classList = "";
				});
			}
		}
	}
})


// //////////////////////////////////// RUNNNNN
start(1);