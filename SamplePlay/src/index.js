"use strict";

let jibo = require('jibo');
let $ =  require('jquery');
let Status = jibo.bt.Status;

function start() {
    let root = jibo.bt.create('../behaviors/main');

    root.start();
    let intervalId = setInterval(function() {
        if (root.status !== Status.IN_PROGRESS) {
            clearInterval(intervalId);
        }
        else {
            root.update();
        }
    }, 33);
}

jibo.init().then( function() {
    require('./behaviors/play-behavior');

    let eyeElement = document.getElementById('eye');
    let myCanvas = document.getElementById('previewCanvas');

    $("#previewCanvas").fadeOut();
    jibo.visualize.createRobotRenderer(
        eyeElement,
        jibo.visualize.DisplayType.EYE,
        function() {
            start();
        }
    );
      //start();
}).catch( function(e) {
    console.error(e);
});
