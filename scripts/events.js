/**
 * Handles when block moves and moves the selected block to the locations of the mouse. (IMPURE FUNCTION)
 * @param  {Event} event The event for when mouse moves.
 * @param  {object Board} b     The Board
 */
export const maindivMouseMove = (event, b, maindiv) => {
    if(b != null) {
        if(b.block_selected != null) {
            let dim = maindiv.getBoundingClientRect();
            let mouse_x = event.x;
            let mouse_y = event.y;
            let box_top = mouse_y - (b.block_selected.height/2) - dim["top"];
            let box_left = mouse_x - (b.block_selected.width/2) - dim["left"];

            if(mouse_y > dim["top"] && mouse_y < dim["bottom"]) {
                b.block_selected.style.top = box_top.toString() + "px";
            }
            if( mouse_x > dim["left"] && mouse_x < dim["right"]) {
                b.block_selected.style.left = box_left.toString() + "px";
            }
        }
    }
    return b;
};


/**
 * Handles Block click events. Selects or deselects the block which is clicked. (IMPURE FUNCTION)
 * @param  {Event} event                The event for the clikc
 * @param  {object Board} b                The board
 * @param  {Function} blockSelect          Function to select the block.
 * @param  {Function} blockDeselect        Function to deselect the block.
 * @param  {Function} updateBlockLocations Updates the locations of blocks in board.
 * @param  {Function} blockSort            Helper Function for updateBlockLocations
 */
export const maindivMouseClick = (event, b, blockSelect, blockDeselect, updateBlockLocations, blockSort) => {
    // console.log(b);
    let img = event.target;
    if(img.classList == "imgs") {
        if(b.block_selected == null) {
            b.block_selected = blockSelect(img);
        }
        else if(b.block_selected == img) {
            b.block_selected = blockDeselect(img);
            b = updateBlockLocations(b, blockSort);
        }
    }
    return b;
};


/**
 * Checks the board if correct, the solution is shown, but if wrong, blinks red.
 * @param  {Event} event                The event when check button is clicked
 * @param  {object Board} board                The board
 * @param  {Function} updateBlockLocations Updates the blocks in board.
 * @param  {Function} blockSort            Helper function for updateBlockLocations
 * @param  {Function} checkBoardCorrect    check is board is correct
 * @param  {Function} sleep                Helper function for blinkWrongAnswer.
 */
export const checkButtonClick = ( event, b, solution_shown, maindiv, imgs_path, solution, removeBoard, updateBlockLocations, blockSort, checkBoardCorrect, blinkWrongAnswer, sleep, createSolution) => {
    if(b!= null) {
        b = updateBlockLocations(b, blockSort);
        if(solution_shown == "not_shown") {
            if(checkBoardCorrect(b)) {
                b = removeBoard(b);
                [solution, maindiv] = createSolution(maindiv, imgs_path + "image.jpg", "solution");
                solution_shown = "shown";
            }
            else { // wrong answer
                maindiv = blinkWrongAnswer(maindiv, sleep);
            }
        }
    }
    return [b, solution_shown, maindiv, solution];
};
