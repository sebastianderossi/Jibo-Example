/**
 *
 **/

"use strict";

class ColorModel extends createjs.EventDispatcher {
	constructor() {
		super();

		this.colors = [
			"#5b42b5", "#282059", "#8857d3", "#33185a",
			"#a12b60", "#e51f56", "#831340", "#e80d38",
			"#820a2e", "#fa3938", "#970627", "#f34e31",
			"#87070d", "#fd893c", "#ad4229", "#3967a9",
			"#1b2761", "#209db2", "#084462", "#3ceedc",
			"#126968", "#1aaf79", "#085241", "#31c85f",
			"#1c6636", "#90db4c", "#34722e", "#a6fd58",
			"#2e7828", "#fac142", "#ab6628", "#a2b0cb",
			"#4d587f", "#6e8f9a", "#274356", "#bbc6ca",
			"#434d55", "#787c91", "#3a3d4a", "#984442",
			"#4e2328", "#a8512f", "#63200f", "#39f2fa",
			"#1a7797", "#58586c", "#282734", "#FFFFFF",
			"#cfcfcf", "#000000"
		]
	}

	getColorAtIndex(index) {
		return this.colors[index];
	}

	getSelectRandomColor() {
		return this.colors[Math.random()*this.colors.length|0];
	}

	getColors() {
		return this.colors;
	}
	getCurrentColor() {
		return this.color;
	}
	setCurrentColor(value) {
		this.color = value;
		this.dispatchEvent("colorChange");
	}

	getGridentColor() {
		return this.colorGrident;
	}
	setGradientColor(value) {
		this.colorGrident = value;
		this.dispatchEvent("colorGridentChange");
	}
};

window.ColorModel = ColorModel;
