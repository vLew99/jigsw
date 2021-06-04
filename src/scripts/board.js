/////////////////////////////// BOARD CONSTRUCTORS ////////////////////////////////////////


/**
 * Function Constructor for Block Object.
 * @param {string} file_location Location in file system where the image is.
 * @param {integer} current_loc   The currect location of each block on the DOM
 * @param {DOM Element} img       The DOM Element associated with the image.
 */
export function Block(file_location, current_loc, img) {
    this.img = img;
    this.file_location = file_location;
    this.current_loc = current_loc;
    this.correct_loc= parseInt(file_location.charAt(14));
}


/**
 * Function Constructor for Board Object
 * @param {integer} size                     The number of images on board.
 * @param {integer} level                    The level selected.
 * @param {string} imgs_path                The Folder path of all the images for currect level.
 * @param {DOM Element} maindiv                  The parent Element for adding the created blocks.
 * @param {Function} getFileLocationsArray    The function returns the array of locations of all the images of current level.
 * @param {Function} createImgElement         The function creates a HTMLImageElement, adds it to the DOM and returns it.
 */
export function Board(size, level, imgs_path, maindiv, getFileLocationsArray, createImgElement) {
    this.size = size;

    // path
    let imgs_locs = getFileLocationsArray(imgs_path, size);
    let rand_imgs_locs = imgs_locs.sort( () => Math.random() - 0.5); // randomize the file_locations_array and store in another


    this.array = new Array(this.size);
    this.array = this.array.fill("");
    this.array = this.array.map( (item, index) => {
        let img;
        [img, maindiv] = createImgElement(maindiv, rand_imgs_locs[index], "imgs", 200, false);
        return new Block(
            rand_imgs_locs[index],
            index,
            img
        );
    });
    this.block_selected = null;
    this.parent = document.querySelector("#block");
    this.solution = null;
}








///////////////////////////// BOARD FUNCTIONS ///////////////////////////////////



/**
 * This function resets the board, if solution is shown, hides it, and if board is shown, removes the board, and then creates a new board.
 * @param  {object Board} b                     The board.
 * @param  {integer} level                      The currect level selected.
 * @param  {integer} choices                    The number of choices in each level.
 * @param  {string} seperator                   Seperator in the imgs path.
 * @param  {string} initial_path                The folder path of all imgs.
 * @param  {string} imgs_path                   The folder path for the images for current level.
 * @param  {DOM Element} solution               The HTMLImageElement associated with showing solution. Can be null.
 * @param  {string} solution_shown              To track if solution is visible on board or not.
 * @param  {DOM Element} maindiv                The parent to which Blocks are added.
 * @param  {Function} removeBoard               Removes the blocks and returns board as null.
 * @param  {Function} removeEvents              Remove all the events.
 * @param  {Function} getFileLocationStartPath  Gets the folder location for currect level.
 * @param  {Function} getFileLocationsArray     Gets the array of locations of current level.
 * @param  {Function} createImgElement          Gets the HTMLImageElement for a block.
 * @return {Array}  [b, imgs_path, solution_shown, solution, maindiv]       The function updates these.                     
 */
export const ResetBoard = (
    b, level, choices, seperator, initial_path, imgs_path, solution, solution_shown, maindiv, removeBoard, removeEvents, getFileLocationStartPath, getFileLocationsArray, createImgElement) => {

    imgs_path = getFileLocationStartPath(level, choices, seperator, initial_path);

    if(b!=null) {
        b = removeBoard(b);
    }

    if(solution_shown == "shown") {
        solution.remove();
        solution = null;
        solution_shown = "not_shown";
        maindiv.style.backgroundColor = "#dcdcd3";
    }

    let size = level < 3 ? ((level==1) ? 2 : 3) : 10;
    b = new Board(size, level, imgs_path, maindiv, getFileLocationsArray, createImgElement);
    return [b, imgs_path, solution_shown, solution, maindiv];
};



/**
 * Compares the location between any 2 blocks and returns which is farther from (0, 0) on DOM. (PURE FUNCTION)
 * @param  {Object Block} block1 The first block to compare.
 * @param  {Object Block} block2 The second block to compare
 * @return {Boolean}       Returns which is farther from (0, 0) on DOM.
 */
export const blockSort = (block1, block2) => {
    let block1_rect = block1.img.getBoundingClientRect();
    let block2_rect = block2.img.getBoundingClientRect();
    if(Math.abs(block1_rect["top"] - block2_rect["top"]) < 180 ) /////////////////////////////
        return block1_rect["left"] - block2_rect["left"];
    else
        return block1_rect["top"] - block2_rect["top"];
};



/**
 * Updates the blocks in the array according to their currect location on the DOM. (IMPURE FUNCTION)
 * @param  {Object Board} board     The Board Object
 * @param  {Function} blockSort Helper Function for sorting
 * @return {Object Board}           Returns the updated board
 */
export const updateBlockLocations = (b, blockSort) => {
    b.array.sort(blockSort);
    return b;
};


/**
 * Checks the board for correct locations.
 * @param  {object Board} b The board
 * @return {Boolean}   True if blocks are in correct location and False if not.
 */
export const checkBoardCorrect = (b) => {
    return b.array.every((item, index) => index == item.correct_loc);
};