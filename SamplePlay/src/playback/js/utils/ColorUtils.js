/**
 *
 **/

"use strict";

class ColorUtils {
	constructor() {
	}

	static rgbToHex(R,G,B) {
		return ColorUtils.toHex(R)+ColorUtils.toHex(G)+ColorUtils.toHex(B);
	}

	static toHex(n) {
		n = parseInt(n,10);
		if (isNaN(n)) return "00";
		n = Math.max(0,Math.min(n,255));
		return "0123456789ABCDEF".charAt((n-n%16)/16)  + "0123456789ABCDEF".charAt(n%16);
	}

	static colorTransform (startColor, endColor, amount) {
		var colors = [];
		for(var i=0;i<amount;i++) {
			var step = i/amount;

			var startR = startColor >> 16 & 0xFF;
			var startG = startColor >> 8 & 0xFF;
			var startB = startColor & 0xFF;

			var endR = endColor>>16&0xFF;
			var endG = endColor>>8&0xFF;
			var endB = endColor&0xFF;

			var r = startR + (endR - startR) * step;
			var g = startG + (endG - startG) * step;
			var b = startB + (endB - startB) * step;

			colors[i]= {red:r|0, green:g|0, blue:b|0};
		}
		return colors;
	}

};

window.ColorUtils = ColorUtils;
