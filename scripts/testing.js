function Block(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;
}

function Board(size) {
	this.size = size;
	this.array = new Array(this.size);
	this.array = this.array.fill("");
	console.log("Creating...");
	this.array = this.array.map( (item, index) => {
		let z  = document.createElement("img");
		document.querySelector("#block").appendChild(z);
		return new Block(10, 20, z);
	});
	this.block_selected = null;
}




const deepClone = function dc(o) {
    if(o == null || typeof(o) != 'object'){
        return o;
    }
    if(o.constructor.name == "HTMLImgElement"){
    	return o;
    }
	var temp = {...o};
	Object.keys(o).foreach((item) => {
		temp[key] = dc(o[key]);
	});
	
    return temp;
};



const deepCopy = function dcc(board) {
	var temp = {...board};
	console.log(temp);
	return temp;
}

var a1 = new Board(3)
console.log(a1);


a2 = deepClone(a1);
console.log(a2);