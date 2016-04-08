/**
 *
 **/

"use strict";

class ColorPalette extends createjs.Container {
	constructor(width, height) {
		super();

		this.container = new createjs.Container();

		this.arrow = new createjs.Bitmap(window.assetModel.getItemByID("arrow"));//"../assets/Arrow.png");
		//this.arrow.on("mousedown", this._handleInput, this);
		//this.arrow.on("pressmove", this._handleInput, this);
		this.value = 0;

		this.width = width || 512;
		this.height = height || 40;

		this.g = new createjs.Graphics();
		this.shape = new createjs.Shape(this.g);
		this.shape.cache(0, 0, this.width, 22);

		this.shape.on("click", this.handleArrowIndicator, this);
		this.shape.x = 4;

		this.previewGraphics = new createjs.Graphics();
		this.preview = new createjs.Shape(this.previewGraphics);
		this.preview.cache(0, 0, this.width, 40)


		this.startColor = "#000000";
		this.endColor = "#FFFFFF";

		this.color = "#FF0099";

		this.drawBG();
		this.drawPreview();
		this.drawGrid(window.colorModel.getColors());

		this.addChild(this.container, this.shape, this.preview, this.arrow);

	}

	changeColor(value) {
		this.color = value;
		this.drawPreview();
		this.drawBG();
		this.arrow.x = 234>>1;
	}

	drawPreview() {
		this.previewGraphics.c().f(this.color).dr(0, 0, this.width, 40);
		this.preview.updateCache();
	}

	drawGrid(arr) {
		var w = this.width;
		var paddingX = 1;
		var paddingY = 1;
		var l = arr.length;

		var cols = 5//w / l | 0;

		var width = (w / cols) - paddingX//*1.55;
		var h = 0;
		for(var i=0;i<l;i++) {
			var sprite = DrawingUtils.getSprite(width, 11, arr[i]);
			sprite.cache(0, 0, width, 11);
			sprite.on("click",this.handleClick, this);
			sprite.index=i;
			sprite.x = paddingX + (sprite.width + paddingX) * (i%cols);
			sprite.y = paddingY + (i/cols|0) * (sprite.height + paddingY);
			if (i%cols == 0) {
				h += ((sprite.height)+paddingY);
			}
			h += (paddingY);
			this.arrow.y = 122;
			this.shape.y = 131;
			this.preview.y = (this.shape.y + 32) + paddingY;
			this.container.addChild(sprite);
		}
	}

	handleArrowIndicator(event) {
		this.arrow.x = event.localX;
		var img_data = document.getElementById("colorCanvas").getContext('2d').getImageData(event.rawX, event.rawY, 1, 1).data;
		var R = img_data[0];
		var G = img_data[1];
		var B = img_data[2];
		var rgb = R + ',' + G + ',' + B;
		var hex = ColorUtils.rgbToHex(R,G,B);
		window.colorModel.setGradientColor("#"+hex);
	}

	handleClick(event) {
		var target = event.target;
		var index = target.index;
		var color = window.colorModel.getColorAtIndex(index);
		window.colorModel.setCurrentColor(color);
	}

	drawBG() {
		this.g.c().f("#000000").dr(0,0,(this.width-10) + 2,this.height+2).beginLinearGradientFill([this.startColor, this.color, this.endColor], [1, 0.5 , 0], this.width, 0, 0, 0).dr(2, 1, this.width-11, this.height);

		this.shape.updateCache();
	}
};

window.ColorPalette = ColorPalette;
