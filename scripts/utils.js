/**
 * Creates a array of strings containing the full path of each images in the current level. (PURE FUNCTION)
 * @param  {string} folder_location the folder location of images for the current level.
 * @param  {integer} array_size      the number of images that are in the folder.
 * @return {array}                 an array of strings containing the full path of each images in the level.
 */
export const getFileLocationsArray = (folder_location, array_size) => {
    let fla = new Array(array_size);
    fla = fla.fill("");
    fla = fla.map( (item, index) => item += folder_location + index.toString() + ".png");
    return fla;
};


/**
 * Creates the path string for the images location for current level with a random choice. (PURE FUNCTION)
 * @param  {integer} level_id       current level being played.
 * @param  {integer} num_of_choices the number of available choices in each level for images.
 * @param  {string} seperator      seperator between level and choice.
 * @return {string}                the folder location for images of current level.
 */
export const getFileLocationStartPath = (level_id, num_of_choices, seperator, startpath) => {
    let flsp = startpath + level_id.toString() + seperator;
    flsp += Math.round(Math.random() * (num_of_choices - 1)).toString() + seperator;
    return flsp;
};


/**
 * Returns a promise of setTimeout (MIGHT BE A PURE FUNCTION)
 * @param  {integer} ms The amount of time to sleep
 * @return {Promise}    the promise of setTimeout
 */
export const sleep = (ms) => {
    return new Promise(r => setTimeout(r, ms));
};