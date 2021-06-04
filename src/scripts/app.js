/////////////////////// IMPORTS ////////////////////////////////

import { ResetBoard, updateBlockLocations, blockSort, checkBoardCorrect } from "./board.js";
import { getFileLocationsArray, getFileLocationStartPath, sleep } from "./utils.js";
import { createImgElement, blockSelect, blockDeselect, removeBoard, blinkWrongAnswer, createSolution } from "./dom_manipulation.js";
import { maindivMouseMove, maindivMouseClick, checkButtonClick } from "./events.js";


/////////// GLOBAL VARIABLES ///////////////////

var level;
var imgs_path;
var solution = null;
var solution_shown = "not_shown";
var maindiv = document.querySelector("#block");
var board;


////////////////////// EVENT HANDLING /////////////////////////

/**
 * Cover Function for maindivMouseClick Function
 * @param  {Event} event The event when maindiv is clicked.
 */
const f1 = (event) => {
    board = maindivMouseClick( event, board, blockSelect, blockDeselect, updateBlockLocations, blockSort);
};


/**
 * Cover Function for maindivMouseMove Function
 * @param  {Event} event The event when mouse moves on maindiv.
 */
const f2 = (event) => {
    board = maindivMouseMove(event, board, maindiv);
};


/**
 * Cover Function for level1 button Function
 */
const f3 = () => {
    Start(1);
};


/**
 * Cover Function for level2 button Function
 */
const f4 = () => {
    Start(2);
};


/**
 * Cover Function for level3 button Function
 */
const f5 = () => {
    Start(3);
};


/**
 * Cover Function for Check Button Function
 */
const f6 = () => {
    [board, solution_shown, maindiv, solution] = checkButtonClick( event, board, solution_shown, maindiv, imgs_path, solution, removeBoard, updateBlockLocations, blockSort, checkBoardCorrect, blinkWrongAnswer, sleep, createSolution);
};


/**
 * Removes the event listeners on maindiv, level buttons and check button
 * @param  {Function} f1 Maindiv Click Cover Function
 * @param  {Function} f2 Maindiv Mouse Move Cover Function
 * @param  {Function} f3 Level1 Cover Function
 * @param  {Function} f4 Level2 Cover Function
 * @param  {Function} f5 Level3 Cover Function
 * @param  {Function} f6 Check Button Cover Function.
 */
const removeEvents = (f1, f2, f3, f4, f5, f6) => {
    // remove events
    document.querySelector("#block").removeEventListener("click", f1);
    document.querySelector("#block").removeEventListener("mousemove", f2);
    document.querySelector("#level1").removeEventListener("click", f3); 
    document.querySelector("#level2").removeEventListener("click", f4);
    document.querySelector("#level3").removeEventListener("click", f5);
    document.querySelector("#check").removeEventListener("click", f6);
};


/**
 * Function for Handling all events related to DOM.
 * @param  {Function} f1 Maindiv Click Cover Function
 * @param  {Function} f2 Maindiv Mouse Move Cover Function
 * @param  {Function} f3 Level1 Cover Function
 * @param  {Function} f4 Level2 Cover Function
 * @param  {Function} f5 Level3 Cover Function
 * @param  {Function} f6 Check Button Cover Function.
 */
const initializeEvents = (f1, f2, f3, f4, f5, f6) => {
    document.querySelector("#block").addEventListener("click", f1);
    document.querySelector("#block").addEventListener("mousemove", f2);
    document.querySelector("#level1").addEventListener("click", f3); 
    document.querySelector("#level2").addEventListener("click", f4);
    document.querySelector("#level3").addEventListener("click", f5);
    document.querySelector("#check").addEventListener("click", f6);

};

////////////////////////// RUN //////////////////////////////

/**
 * Removes the events, resets the board and add the events back.
 * @param  {integer} level_id The level selected
 */
const Start = (level_id) => {
    level = level_id;
    removeEvents(f1, f2, f3, f4, f5, f6);
    [board, imgs_path, solution_shown, solution, maindiv] = ResetBoard(
        board, level, 2,"_", "imgs/level", imgs_path, solution, solution_shown, maindiv, removeBoard, removeEvents, getFileLocationStartPath, getFileLocationsArray, createImgElement);
    initializeEvents(f1, f2, f3, f4, f5, f6);
};


Start(1);