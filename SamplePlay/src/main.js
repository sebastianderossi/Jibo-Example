import jibo from 'jibo';
import path from 'path';

let {Status, factory} = jibo.bt;
let root = null;
let notepad = {};

function start() {
  console.log("start called")
}

function setup() {
console.log("setup called")
}

function update() {
console.log("update called")
}

jibo.init(function () {
  let eyeElement = document.getElementById('eye');
  jibo.visualize.createRobotRenderer(eyeElement, jibo.visualize.DisplayType.EYE);
  start();
});
