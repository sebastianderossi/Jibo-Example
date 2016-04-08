/**
 *
 **/

"use strict";

class ColorPicker extends createjs.Container {
	constructor() {
		super();
		this.init();
	}

	init() {
		this.colorPointer = DrawingUtils.getCircleSprite(55, createjs.Graphics.getRGB(0,0,0,0), "#FFFFFF", 10);
		this.pointer = new createjs.Bitmap(window.assetModel.getItemByID("pickerIcon"));//"../assets/pickerIcon6.png");
		this.toggle(false);

		this.addChild(this.colorPointer, this.pointer);
	}

	toggle(value) {
		this.pointer.visible = value;
		this.colorPointer.visible = value;
	}

	updatePointer(colorHex) {
		var color = "#"+colorHex;
		this.colorPointer.graphics.c().s("#000000")
				.ss(this.colorPointer.strokeThickness, "round")
				.f(createjs.Graphics.getRGB(0,0,0,0)).dc(0,0,this.colorPointer.width)
				.ss(this.colorPointer.strokeThickness).s(color).dc(0,0,this.colorPointer.width-this.colorPointer.strokeThickness/2);
		window.colorModel.setCurrentColor(color);
	}

	isActive() {
		return (this.pointer.visible === true) ? true : false;
	}

	update(mouseX, mouseY) {
		if (this.pointer.visible) {
			this.pointer.x = mouseX;
			this.pointer.y = mouseY-this.pointer.image.height;
			this.colorPointer.x = mouseX;
			this.colorPointer.y = mouseY;
		}
	}
};

window.ColorPicker = ColorPicker;
