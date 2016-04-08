/**
 *
 **/

"use strict";

class PlaybackMain {
	constructor() {
		this.init();
	}

	init() {
		this.previewCanvas = document.getElementById("previewCanvas");
		this.previewStage = new createjs.Stage(this.previewCanvas);

		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		createjs.Ticker.on("tick", this.tick, this)
	}

	play(JSONData) {
		if (JSONData == null) {
			alert("Please load drawing info first.");
			return;
		}
		this.result = JSON.parse(JSONData);
		this._loadData(this.result);
	}

	_loadData() {
		var type = this.result.type;
		if (type !== "jibo") {
			alert("This seems to be an error with that file. Check file is correct JIBO sketch.");
			return;
		}
		if (this.playback == null) {
			this.playback = new Playback(this.result.data, this.previewCanvas.width, this.previewCanvas.height, this.duration);
			this.previewStage.addChild(this.playback);
		}else {
			this.playback.setModel(this.result.data);
		}

		this.playback.play();
	}

	replay() {
		if (this.result == null) {
			alert("Can't replay any animation, load data first.");
			return;
		}
		this._loadData(this.result);
	}

	pause(){
		if (this.playback != null) {
			this.playback.pause();
		}
	}

	tick(event) {
		if (this.playback != null) {
			if (this.playback.animate === true) {
				this.playback.update(event.delta);
			}
		}
		this.previewStage.update(event);
	}

	changeDuration(value) {
		this.duration = value;
		if (this.playback != null) {
			this.playback.FPS_MS = this.duration;
		}
	}
}

window.PlaybackMain = PlaybackMain;
