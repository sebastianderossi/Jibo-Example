/**
 *
 **/

"use strict";

class Playback extends createjs.Container {
	constructor(data, width, height, duration) {
		super();

		this.data = data;
		this.animate = false;

		this.width = width || 1280;
		this.height = height || 720;

		this.FPS_MS = duration || 10000; // Time in milliseconds
		this.prevIndex = 0;

		this.totalTime = 0;
		this.prevTime = 0;

		//SD: Last item to be drawn
		this.lastItem = {x:0, y:0};

		this.shape = new createjs.Shape();
		this.g = this.shape.graphics;

		this.canvas = new createjs.Container();
		this.canvas.addChild(this.shape);

		this.canvas.cache(0, 0, this.width, this.height);
		//SD:TEST
		this.currentShape = new createjs.Shape();
		this.currentShape.alpha = 0;
		this.currentShape.cache(0, 0, this.width, this.height);

		this.addChild(this.currentShape);
		this.addChild(this.canvas);
	}
	//TO DO use drawmodel
	getFlatList() {
		var list = [];
		var len = this.data.length;
		for(var i=0;i<len;i++) {
			var lineElement = this.data[i];
			var cmd = lineElement.cmd;
			var l2 = lineElement.cmd.length;
			for(var j=0;j<l2;j++ ) {
				var item = cmd[j];
				var color = lineElement.color;
				var thickness = lineElement.thickness;
				list.push({cmd:item, color:color, thickness:thickness});
			}
		}
		return list;
	}

	tick(event) {
		if (this.animate) {
			this.update(event.delta);
		}
	}
	//TODO use drawmodel
	setModel(data) {
		this.clear();
		this.canvas.cache(0, 0, this.width, this.height);
		this.canvas.cache(0, 0, this.width, this.height);
		this.data = data;
	}

	play() {
		//SD:Testing
		this.lastColor = null;
		this.flatList = this.getFlatList();
		this.totalInstructions = this.flatList.length;
		//this._instantDraw();
		setTimeout(() => {
			this.animate = true;
			this.start = new Date().getTime();
		}, 1000);

	}

	//SD:Testing
	_instantDraw() {
		var l = this.flatList.length;
		var g = this.currentShape.graphics;
		g.clear();

		for(var i=0;i<l;i++) {
			let lineElement = this.flatList[i];
			let cmd = lineElement.cmd;
			let color = lineElement.color;
			let thickness = lineElement.thickness;
			if (cmd.x != null && cmd.y != null) {
				g.ss(thickness, "round", "round",2).s(color);
				g.mt(cmd.x, cmd.y);
			} else if (cmd.x1 != null && cmd.y1 != null && cmd.x2 != null && cmd.y2 != null) {
				g.qt(cmd.x1, cmd.y1, cmd.x2, cmd.y2);
			}
		}
		//this.drawLayer.updateCache();
	}

	pause() {
		this.animate = !this.animate;
	}
	//TODO use drawmodel
	getTotalCMD() {
		var num = 0;
		var len = this.data.length;
		for(var i=0;i<len;i++) {
			var element = this.data[i];
			num += element.cmd.length;
		}
		return num;
	}


	update(delta) {
		this.prevTime = delta;
		var ratio = this.totalTime / this.FPS_MS;
		var index = Math.round(ratio * this.totalInstructions);
		var cmd, color, thickness;
		var count= 0;
		if (index >= this.totalInstructions) {
			this.g.clear();
			//console.log("done, now draw remaining", this.prevIndex,":" ,this.totalInstructions)
			//SD:Ensure a little overlap.
			//this.prevIndex -= 10;
			console.log(this.prevIndex, this.totalInstructions, this.totalInstructions - this.prevIndex)
			while (this.prevIndex <= (this.totalInstructions)) {
				//SD: Every single draw within the current tick, draw curve and increment previous.
				//console.log("i am I looping")
				var _item = this.flatList[this.prevIndex];

				if (_item != null) {

					var _cmd = _item.cmd;
					var _color1 = _item.color;
					var _thickness = _item.thickness;
					if (_cmd.x != null) {
						//Current command is to MT, start of a line segment.
						console.log(_color1)
						this.g.s(_color1).ss(_thickness, "round", "round", 2).mt(_cmd.x, _cmd.y);
						this.lastItem = {x:_cmd.x, y:_cmd.y};
					}else {
						//SD:TODO check if last commands don't have MT to reset color & thickness
						if (this.lastItem) {
							this.g.s(_color1).ss(_thickness, "round", "round", 2).mt(this.lastItem.x, this.lastItem.y);
						}
						this.g.qt(_cmd.x1, _cmd.y1, _cmd.x2, _cmd.y2);
						//SD:Remove this...Test first.
						/*if (_thickness > 5) {
							this.g.s(_color1).ss(_thickness, "round", "round", 2).qt(_cmd.x1, _cmd.y1, _cmd.x2, _cmd.y2);
						}else {
							this.g.qt(_cmd.x1, _cmd.y1, _cmd.x2, _cmd.y2);
						}*/

						this.lastItem = {x:_cmd.x2, y:_cmd.y2};
					}
					count++;
				}
				this.prevIndex++;

			}
			console.log(count);
			this.canvas.updateCache("source-over");
			this.end = new Date().getTime();
			var time = this.end - this.start;
			console.log("Stop:", time / 1000);
			var _this = this;
			//createjs.Tween.get(this.canvas).to({alpha:0}, 1000)
			//this.currentShape.updateCache();
			//createjs.Tween.get(this.currentShape).wait(1000).call(function() {
			//	_this.canvas.updateCache();
			//}).to({alpha:1}, 1000);
			this.animate = false;
			return;
		}

		//Calculate our current
		var item = this.flatList[index];
		cmd = item.cmd;
		var base = Math.random()*100|0
		color = item.color;
		thickness = item.thickness;
		console.log("out")
		this.g.clear();
		if (index > this.prevIndex) {
			if (cmd.x != null) {
				if (this.lastColor != null) {
					this.g.s(this.lastColor).ss(this.lastThickness, "round","round", 2).mt(this.lastItem.x, this.lastItem.y);
				}else {
					this.g.s(color).ss(thickness, "round", "round",2).mt(this.lastItem.x, this.lastItem.y);
				}

			}else {
				if (this.lastColor != null) {
					this.g.s(this.lastColor).ss(this.lastThickness, "round","round",2).mt(this.lastItem.x, this.lastItem.y);
				}else {
					this.g.s(color).ss(thickness, "round","round", 2).mt(this.lastItem.x, this.lastItem.y);
				}

			}
		}

		while (this.prevIndex <= index) {
			//SD: Every single draw within the current tick, draw curve and increment previous.
			var _item = this.flatList[this.prevIndex];
			var _cmd = _item.cmd;
			var _color = _item.color;//createjs.Graphics.getRGB(Math.random()*255|0, Math.random()*255|0, Math.random()*255|0)//_item.color;
			var _thickness = _item.thickness;

			if (_cmd.x != null) {
				//Current command is to MT, start of a line segment.
				this.g.s(_color).ss(_thickness, "round", "round",2).mt(_cmd.x, _cmd.y);
				this.lastItem = {x:_cmd.x, y:_cmd.y};
				this.lastColor = _color;
				this.lastThickness = _thickness;
				//this.stage.addChild(this.getSprite(5, _color, this.lastItem.x, this.lastItem.y));
			}else {
				this.g.qt(_cmd.x1, _cmd.y1, _cmd.x2, _cmd.y2);
				this.lastItem = {x:_cmd.x2, y:_cmd.y2};
			}
			this.prevIndex++;
		}

		this.canvas.updateCache("source-over");
		this.totalTime += this.prevTime;
		this.prevIndex = index;
	}

	//SD:Testing
	getSprite(r, color, x, y) {
		var b = new createjs.Shape();
		b.graphics.s("#ffffff").ss(1, "round").f(color).dc(0, 0, r);
		b.x = x;
		b.y = y;
		//b.alpha = 0.5;
		return b;
	}

	cancel() {
		this.clear();
	}

	clear() {
		this.prevTime = 0;
		this.prevIndex = 0;
		this.totalTime = 0;
		this.g.clear();
		this.canvas.uncache();
		this.currentShape.uncache();
		this.data = [];
		this.animate = false;
		this.lastItem = {x:0, y:0};
	}
};

window.Playback = Playback;
