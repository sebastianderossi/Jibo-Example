/**
 *
 **/

"use strict";

class DrawingUtils {
	constructor() {

	}

	static getSprite(w, h, color) {
		var s = new createjs.Shape();
		var g = s.graphics;
		s.width = w;
		s.height = h;
		g.f(color).dr(0,0,w,h);
		return s;
	}

	static getCircleSprite(radius, fillColor, strokeColor, strokeThickness) {
		var s = new createjs.Shape();
		var g = s.graphics;
		s.width = radius;
		s.height = radius;
		s.strokeThickness = strokeThickness;
		g.s("#000000")
			.ss(strokeThickness, "round").f(fillColor).dc(0,0,radius)
			.ss(strokeThickness).s(strokeColor).dc(0,0,radius-strokeThickness/2);
		return s;
	}
};

window.DrawingUtils = DrawingUtils;
