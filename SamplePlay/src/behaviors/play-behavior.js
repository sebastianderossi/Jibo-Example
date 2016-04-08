"use strict";

let jibo = require('jibo');
let Status = jibo.bt.Status;
let Behavior = jibo.bt.Behavior;

class PlayBehavior extends Behavior {
    constructor(options) {
        super(options);
        this.status = Status.INVALID;
    }
    start() {
      this.status = Status.IN_PROGRESS;
      var _this = this;
      return true;
    }
    stop() {}
    update() {
      return this.status;
    }
}

jibo.bt.register('PlayBehavior', 'project', PlayBehavior);
module.exports = PlayBehavior;
