/**
 *
 **/

"use strict";

class DrawModel extends createjs.EventDispatcher {
	constructor() {
		super();
		this.drawInfo = [];
	}

	getDrawInfo() {
		return this.drawInfo;
	}

	getLength() {
		return this.drawInfo.length;
	}

	clear() {
		this.drawInfo = [];
	}

	isDrawInfoEmpty() {
		return (this.drawInfo.length == 0) ? true : false;
	}

	/**
	 * @method getInstructionAt
	 * @param index
	 * @returns Array
	 */
	getInstructionAt(index) {
		return this.drawInfo[index];
	}

	addCommand(element) {
		this.drawInfo.push(element);
	}

	getTotalCommandInstruction() {
		var num = 0;
		for(var i=0;i<this.drawInfo.length;i++) {
			var element = this.drawInfo[i];
			num += element.cmd.length;
		}
		return num;
	}

	killAllPrev(target) {
		var list = this.getFlatList();
		var tmp = [];
		var commands = [];
		var prevIndex = 0;
		for(var i=0;i<target;i++) {
			var data = list[i];
			var color = data.color;
			var thickness = data.thickness;
			var currentLevel = data.level;
			if (currentLevel != prevIndex) {
				commands = []
			}
			commands.push(data.cmd);
			tmp[data.level] = {
				color:color,
				thickness:thickness,
				cmd:commands
			};

			prevIndex = currentLevel;
		}
		this.drawInfo = [];
		this.drawInfo = tmp;
	}

	getFlatList() {
		var flatCmds = [];
		var l = this.drawInfo.length;
		for(var i=0;i<l;i++) {
			let lineElement = this.drawInfo[i];
			var color = lineElement.color;
			var thickness = lineElement.thickness;
			var cmds = lineElement.cmd;
			for(var j=0;j<cmds.length;j++) {
				var cmd = cmds[j];
				flatCmds.push({
					color:color,
					thickness:thickness,
					cmd:cmd,
					level:i
				});
			}
		}
		return flatCmds;
	}

	getTotalCMDToIndex(index) {
		var num = 0;
		for(var i=0;i<index;i++) {
			var element = this.drawInfo[i];
			num += element.cmd.length;
		}
		return num;
	}

	setThickness(value) {
		this.thickness = value;
	}

	getThickness() {
		return this.thickness;
	}

	setLimit(value) {
		this.limit = value;
	}

	getLimit() {
		return this.limit;
	}

	getTotalCMD() {
		var num = 0;
		for(var i=0;i<this.drawInfo.length;i++) {
			var element = this.drawInfo[i];
			num += element.cmd.length;
		}
		return num;
	}


};

window.DrawModel = DrawModel;
