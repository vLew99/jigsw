// CONSTANTS

const STARTPATH = "imgs/level"
var maindiv = document.querySelector("#block");
var level;
let imgs_path;
var solution;
var solution_shown = "not_shown";
var board;




function Block(file_location, correct_loc, current_loc, img) {
	this.img = img;
	this.file_location = file_location;
	this.current_loc = current_loc;
	this.correct_loc= correct_loc;
}

const deepClone = function dc(o) {
    if(o == null || typeof(o) != 'object'){
        return o;
    }

    if(o.constructor.name == "HTMLImageElement"){
    	return o;
    }

	var temp = {...o};
    for(var key in o){
        temp[key] = dc(o[key])
    }

    return temp;
};


function Board(size) {
	this.size = size;

	// path
	imgs_path = getFileLocationStartPath(level, 1, "_"); // move this somewhere other than here
	let imgs_locs = getFileLocationsArray(imgs_path, size);
	let rand_imgs_locs = imgs_locs.sort( () => Math.random() - 0.5); // randomize the file_locations_array and store in another

	this.array = new Array(this.size);
	this.array = this.array.fill("");
	this.array = this.array.map( (item, index) => {
		let img = createImgElement(maindiv, rand_imgs_locs[index], "imgs", 200, false);
		return new Block(
			rand_imgs_locs[index],
			parseInt(rand_imgs_locs[index].charAt(14)),
			index,
			img
		);
	});
	this.block_selected = null;
}



/**
 * Creates a array of strings containing the full path of each images in the current level.
 * @param  {string} folder_location the folder location of images for the current level.
 * @param  {integer} array_size      the number of images that are in the folder.
 * @return {array}                 an array of strings containing the full path of each images in the level.
 */
const getFileLocationsArray = (folder_location, array_size) => {
	let fla = new Array(array_size);
	fla = fla.fill("");
	fla = fla.map( (item, index) => item += folder_location + index.toString() + ".png");
	return fla;
};



/**
 * Creates the path string for the images location for current level with a random choice.
 * @param  {integer} level_id       current level being played.
 * @param  {integer} num_of_choices the number of available choices in each level for images.
 * @param  {string} seperator      seperator between level and choice.
 * @return {string}                the folder location for images of current level.
 */
const getFileLocationStartPath = (level_id, num_of_choices, seperator) => {
	let flsp = STARTPATH + level_id.toString() + seperator;
	flsp += Math.round(Math.random() * num_of_choices).toString() + seperator;
	return flsp;
};




/**
 * Create a IMG element, sets properties for it and adds it to parent DOM.
 * @param  {DOM Element}  parent        The parent DOM where this IMG element is to be added.
 * @param  {string}  file_location the exact path to the image file that needs to be applied to the IMG element.
 * @param  {string}  class_list    The class that the IMG element needs to be added to for style settings.
 * @param  {integer}  img_size      The size of the image on the view.
 * @param  {Boolean} is_draggble   Whether the image is draggable or not.
 * @return {DOM Element}                Returns the IMG Element created.
 */
const createImgElement = (parent, file_location, class_list, img_size, is_draggble) => {
	let img = document.createElement("img");
	img.src = file_location;
	img.width = img.height = img_size;
	img.draggable = is_draggble;
	img.classList = class_list;
	parent.appendChild(img);
	return img;
};



// some additional checking needs to be done here
const checkBoardCorrect = (b) => {
	return board.array.every((item, index) => index == item.correct_loc);
};



/**
 * Compares the location between any 2 blocks and returns which is farther from (0, 0) on DOM.
 * @param  {Object Block} block1 The first block to compare.
 * @param  {Object Block} block2 The second block to compare
 * @return {Boolean}       Returns which is farther from (0, 0) on DOM.
 */
const blockSort = (block1, block2) => {
	console.log(block1, block2);
	let block1_rect = block1.img.getBoundingClientRect();
	let block2_rect = block2.img.getBoundingClientRect();
	if(Math.abs(block1_rect['top'] - block2_rect['top']) < 200 ) /////////////////////////////
		return block1_rect['left'] - block2_rect['left'];
	else
		return block1_rect['top'] - block2_rect['top']; 
};



/**
 * Create the Solution Image when the player solution is Correct.
 * @param  {DOM Element} parent        DOM Element in which the solution is added to.
 * @param  {string} file_location the exact location of the path of solution image.
 * @param  {string} class_list    The class that the IMG Element needs to be added to.
 * @return {DOM Element}			Returns the IMG Element of the solution.
 */
const addSolution = (parent, file_location, class_list) => {
	let parent_rect = parent.getBoundingClientRect();
	let solution = document.createElement("img");
	solution.src = file_location;
	solution.classList = class_list;
	solution.style.maxWidth = parent_rect['width'] + "px";
	solution.style.height = "auto";
	parent.appendChild(solution);
	return solution;
};


const removeBoard = () => {
	board.array.forEach( (item) => item.img.remove());
	board = null;
};


const sleep = (ms) => {
	return new Promise(r => setTimeout(r, ms));
};



/**
 * Selects the IMG element as block_selected and applies some styling.
 * @param  {DOM Element} img_to_select The IMG Element to select
 * @return {DOM Element}               IMG Element after applying styling
 */
const blockSelect = (img_to_select) => {
	img_to_select.style.opacity = 0.7;
	img_to_select.style.zIndex = 9999;
	img_to_select.style.position = "absolute";
	return img_to_select;
};



/**
 * Deselects the IMG element and returns NULL
 * @param  {DOM Element} img_to_deselect The IMG element to deselect
 * @return {null}        
 */
const blockDeselect = (img_to_deselect) => {
	img_to_deselect.style.opacity = 1;
	img_to_deselect.style.zIndex = 1;
	return null;
};



/**
 * Updates the blocks in the array according to their currect location on the DOM.
 * @param  {Object Board} board     The Board Object
 * @param  {Function} blockSort Helper Function for sorting
 * @return {Object Board}           Returns the updated board
 */
const updateBlockLocations = (blockSort) => {
	board.array.sort(blockSort);
}



// EVENT FUNCTIONS
const maindivMouseClick = (event, b, blockSelect, blockDeselect, updateBlockLocations, blockSort) => {
	let img = event.target;
	if(img.classList == "imgs") {
		if(b.block_selected == null) {
			b.block_selected = blockSelect(img);
		}
		else if(b.block_selected == img) {
			b.block_selected = blockDeselect(img);
			updateBlockLocations(blockSort);
		}
	}
};


const maindivMouseMove = (event, b) => {
	if(b.block_selected != null) {
		let dim = maindiv.getBoundingClientRect();
		let mouse_x = event.x;
		let mouse_y = event.y;
		let box_top = mouse_y - (b.block_selected.height/2) - dim['top'];
		let box_left = mouse_x - (b.block_selected.width/2) - dim['left'];

		if(mouse_y > dim['top'] && mouse_y < dim['bottom']) {
			b.block_selected.style.top = box_top.toString() + "px";
		}
		if( mouse_x > dim['left'] && mouse_x < dim['right']) {
			b.block_selected.style.left = box_left.toString() + "px";
		}
	}
};


const blinkWrongAnswer = (div, sleep) => {
	if(div.classList == "") {
		div.classList = "wrong";
		sleep(500).then(() => {
			div.classList = "";
		});
	}
};


const checkSolution = (event, b, updateBlockLocations, blockSort, checkBoardCorrect, sleep, deepClone) => {
	if(b!= null) {
		updateBlockLocations(blockSort);

		if(solution_shown == "not_shown") {
			console.log(checkBoardCorrect(b));
			if(checkBoardCorrect(b)) { // correct answer
				// console.log("this is b before", b);
				removeBoard();
				// console.log("this is b " , b);
				solution = addSolution(maindiv, imgs_path + "image.jpg", "solution");
				solution_shown = "shown";
			}
			else { // wrong answer
				blinkWrongAnswer(maindiv, sleep);
			}
		}
	}
};


const initializeEvents = (b, blockSelect, blockDeselect, updateBlockLocations, blockSort, start, sleep, deepClone) => {
	document.querySelector("#block").addEventListener("click", event => maindivMouseClick(
		event, b, blockSelect, blockDeselect, updateBlockLocations, blockSort ));
	document.querySelector("#block").addEventListener("mousemove", event => maindivMouseMove(event, b));
	document.querySelector("#level1").addEventListener("click", event => start(1)); 
	document.querySelector("#level2").addEventListener("click", event => start(2));
	document.querySelector("#level3").addEventListener("click", event => start(3));
	document.querySelector("#check").addEventListener("click", event => checkSolution(
		event, b, updateBlockLocations, blockSort, checkBoardCorrect, sleep , deepClone));
};

function init(level) {
	if(board!=null) {
		removeBoard();
	}

	if(solution_shown == "shown") {
		console.log("SOLUTION: ", solution);
		solution.remove();
		console.log("SOLUTION: ", solution);
		solution = null;
		solution_shown = "not_shown";
	}

	if(level==1) board = new Board(2);
	else if(level==2) board = new Board(3);
	else board = new Board(10);
}


function start(l) {
	level = l;
	init(level);
	initializeEvents(board, blockSelect, blockDeselect, updateBlockLocations, blockSort, start, sleep, deepClone);
}


// //////////////////////////////////// RUNNNNN
start(1);
