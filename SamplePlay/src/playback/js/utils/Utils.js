/**
 *
 **/

"use strict";

class Utils {
	constructor() {

	}

	static isFileAllowed(file, type) {
		console.log(file.type, type);
		var check = null;
		if (type == 'image') {
			check = /image.*/;
		} else if (type == 'text'){
			check = /text.*/;
		}
		if (check == null) { return false}

		return (!file.type.match(check)) ? false : true;
	}
}

window.Utils = Utils;
