/**
 *
 **/

"use strict";

class Slider extends createjs.Shape {
	constructor(min, max, width, height) {
		super();
		this.min = this.value = min || 0;
		this.max = max ||100;

		this.width = width || 100;
		this.height = height || 20;

		this.values = {};

		this.trackColor = "#272834";
		this.thumbColor = "#57596c";

		this.cursor = "ew-resize";

		this.thumbX = 0;

		this.on("mousedown", this._handleInput, this);
		this.on("pressmove", this._handleInput, this);
	}

	isVisible() {
		return true;
	}

	draw(ctx, ignoreCache) {
		if (this._checkChange()) {
			var x = (this.width) * Math.max(0, Math.min(1, (this.value-this.min) / (this.max-this.min))) | 0;
			this.graphics.clear()
					.f(this.trackColor).dr(0, 0, this.width, this.height)
					.f(this.thumbColor).dr(0, 0, x, this.height);
			this.thumbX = x;
		}
		super.draw(ctx, true);
	}

	_checkChange() {
		var a = this, b = a.values;
		if (a.value !== b.value || a.min !== b.min || a.max !== b.max || a.width !== b.width || a.height !== b.height) {
			b.min = a.min;
			b.max = a.max;
			b.value = a.value;
			b.width = a.width;
			b.height = a.height;
			return true;
		}
		return false;
	}

	_handleInput(event) {
		var val = (event.localX) / (this.width) * (this.max - this.min) + this.min;
		val = Math.max(this.min, Math.min(this.max, val)) | 0 ;
		if (val == this.value) { return; }
		this.value = val;
		this.dispatchEvent("change");
	}
};

window.Slider = Slider;
