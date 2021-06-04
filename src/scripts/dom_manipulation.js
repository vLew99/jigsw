/**
 * Create a IMG element, sets properties for it and adds it to parent DOM. (IMPURE FUNCTION)
 * @param  {DOM Element}  parent        The parent DOM where this IMG element is to be added.
 * @param  {string}  file_location the exact path to the image file that needs to be applied to the IMG element.
 * @param  {string}  class_list    The class that the IMG element needs to be added to for style settings.
 * @param  {integer}  img_size      The size of the image on the view.
 * @param  {Boolean} is_draggble   Whether the image is draggable or not.
 * @return {DOM Element}                Returns the IMG Element created.
 */
export const createImgElement = (parent, file_location, class_list, img_size, is_draggble) => {
    let img = document.createElement("img");
    img.src = file_location;
    img.width = img.height = img_size;
    img.draggable = is_draggble;
    img.classList = class_list;
    parent.appendChild(img);
    return [img, parent];
};


/**
 * Create the Solution Image when the player solution is Correct. (IMPURE FUNCTION)
 * @param  {DOM Element} parent        DOM Element in which the solution is added to.
 * @param  {string} file_location the exact location of the path of solution image.
 * @param  {string} class_list    The class that the IMG Element needs to be added to.
 * @return {DOM Element}            Returns the IMG Element of the solution.
 */
export const createSolution = (parent, file_location, class_list) => {
    let parent_rect = parent.getBoundingClientRect();
    let solution = document.createElement("img");
    solution.src = file_location;
    solution.classList = class_list;
    solution.style.maxWidth = parent_rect["width"] + "px";
    solution.style.height = "auto";
    parent.appendChild(solution);
    parent.style.backgroundColor = "black";
    return [solution, parent];
};



/**
 * Selects the IMG element as block_selected and applies some styling. (IMPURE FUNCTION)
 * @param  {DOM Element} img_to_select The IMG Element to select
 * @return {DOM Element}               IMG Element after applying styling
 */
export const blockSelect = (img_to_select) => {
    img_to_select.style.opacity = 0.7;
    img_to_select.style.zIndex = 9999;
    img_to_select.style.position = "absolute";
    return img_to_select;
};



/**
 * Deselects the IMG element and returns NULL (IMPURE FUNCTION)
 * @param  {DOM Element} img_to_deselect The IMG element to deselect
 * @return {null}        
 */
export const blockDeselect = (img_to_deselect) => {
    img_to_deselect.style.opacity = 1;
    img_to_deselect.style.zIndex = 1;
    return null;
};




/**
 * Removes the DOM Element in board.array and then removes the board. and returns the board.
 * @return {object Board} The board
 */
export const removeBoard = (b) => {
    b.array.forEach( (item) => item.img.remove());
    b = null;
    return b;
};




/**
 * Function blinks the border for div provided.
 * @param  {DOM Element} div   The element whose border needs to blink.
 * @param  {Function} sleep Helper Function for returning the border color back to normal.
 */
export const blinkWrongAnswer = (div, sleep) => {
    if(div.classList == "") {
        div.classList = "wrong";
        sleep(500).then(() => {
            div.classList = "";
        });
    }
    return div;
};