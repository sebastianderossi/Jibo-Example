/**
 *
 **/

"use strict";

class StatusBar extends createjs.Container {
	constructor(min, max, width, height) {
		super();

		this.min = min;
		this.max = max;
		this.width = width;
		this.height = height;

		this.tickColor = "#787c92";
		this.progressColor = "#3a3d4b";

		this.paddingY = 10;

		this.value = 0;

		this.progress = DrawingUtils.getSprite(0, 6, this.progressColor);
		this.progress.y = (this.height) + (this.progress.height/2);

		this.slider = new Slider(this.min, this.max, this.width, this.height);
		this.slider.on("change", this.handleSliderChange, this);

		this.markerContainer = new createjs.Container();
		this.markerContainer.y = this.height;

		this.tickContainer = new createjs.Container();

		this.addChild(this.slider, this.markerContainer, this.tickContainer, this.progress);
	}

	createMarker(color) {
		this.color = color;
		var marker = DrawingUtils.getSprite(0, this.height>>1, color);
		var tick = DrawingUtils.getSprite(1, this.height>>1, this.tickColor);
		marker.x = this.slider.thumbX;
		marker.y = this.paddingY;

		tick.x = this.slider.thumbX;
		tick.y = this.height + this.paddingY;

		this.markerContainer.addChild(marker);
		this.tickContainer.addChild(tick);
		this.update();
	}

	update() {
		//return
		let currentMarker = this.markerContainer.getChildAt(this.markerContainer.numChildren-1);
		let marker = currentMarker.graphics;
		let currentThumbX = this.slider.thumbX;
		let startX = currentMarker.x;
		let width = currentThumbX - startX;

		marker.c().f(this.color).dr(0, 0, width, this.height>>1);

		this.progress.graphics.c().f(this.progressColor).dr(0, 0, this.slider.thumbX, 3);
	}
	//SD: Gets all commands from a loaded data and draws out markers
	drawToPosition(elements) {
		this.clearAllMarkers();
		let l = elements.length;
		let element, color, cmds, len, marker, tick;
		let prevMarker = null;
		let totalCmdLength = 0;
		//SD:Offset is needed because pixel need to match with slider position.
		let totalW = 0;
		for(var i=0;i<l;i++) {
			element = elements[i];
			color = element.color;
			cmds = element.cmd;
			len = cmds.length*(this.slider.width/this.slider.max);
			totalCmdLength += len*(this.slider.max/this.slider.width);
			totalW += len;
			marker = DrawingUtils.getSprite(len, this.height>>1, color);
			marker.y = this.paddingY;
			tick = DrawingUtils.getSprite(1, this.height>>1, this.tickColor);
			this.markerContainer.addChild(marker);
			this.tickContainer.addChild(tick);
			if (prevMarker == null) {
				marker.x = 0;
			}else {
				marker.x += prevMarker.width + prevMarker.x;
			}
			tick.x = marker.x | 0;
			tick.y = this.height + this.paddingY;
			prevMarker = marker;
		}
		this.slider.set({value:totalCmdLength});
		this.progress.graphics.c().f(this.progressColor).dr(0, 0, totalW, 3);
	}

	clearAllMarkers() {
		this.markerContainer.removeAllChildren();
		this.tickContainer.removeAllChildren();
		this.progress.graphics.c();
	}

	updateValue(value) {
		this.slider.set({value:value});
		this.value = value;
	}

	updateLimit(value) {
		this.slider.max = value;
	}

	handleSliderChange(event) {
		this.value = this.slider.value;
		this.dispatchEvent(event);
	}
};

window.StatusBar = StatusBar;
