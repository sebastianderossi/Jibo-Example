/**
 *
 **/

"use strict";

class AssetModel {
	constructor() {
		this.results = {};
	}

	addItem(event) {
		this.results[event.item.id] = event.result;
	}

	getItemByID(id) {
		return this.results[id];
	}
};

window.AssetModel = AssetModel;
