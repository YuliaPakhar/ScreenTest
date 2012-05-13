// ScreenTest Library

// Copyright (c) 2012, Andrey Chizh
// All rights reserved.


var ScreenTest = function (bounds, href, browser, imgType) {


    // Start test on window.onload event
    // TODO: See cross-browsers onload
    window.onload = function () {
        init();
    }

    // Init function
    function init() {
        drawImagesDOM();
    }

    function drawImagesDOM() {
        var imagesSrc;
        imagesSrc = getImagesSrc(href, browser, imgType);
        createImageDOM('etalonImage', imagesSrc.etalon);
        createImageDOM('testImage', imagesSrc.test);

    }

    function getImagesSrc(href, browser, imgType) {
        var imagesSrc = {};
        imagesSrc.etalon = href + '/' + 'img-etalon-' + browser + '.' + imgType;
        imagesSrc.test = href + '/' + 'img-test-' + browser + '.' + imgType;
        return imagesSrc;
    }

    // Create DOM element <img> with the specified id and src
    function createImageDOM(id, src) {
        var body, img;
        body = document.getElementsByTagName('body')[0];
        img = document.createElement('img');
        img.id = id;
        img.src = src;
        body.appendChild(img);
    }

    // Get size of DOM element <img> with the specified id
    function getSizeImageDOM(id) {
        var img;
        img = document.getElementById(id);
        size = {};
        size.width = img.width;
        size.height = img.height;
        return size;
    }

    // Delete DOM element <img> with the specified id
    function deleteImageDOM(id) {
        var body, img;
        body = document.getElementsByTagName('body')[0];
        img = document.getElementById(id);
        body.removeChild(img);
    }

    // Create DOM element <canvas> with the specified id, width and height
    function createCanvasDOM(id, width, height) {
        var body, canvas;
        body = document.getElementsByTagName('body')[0];
        canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;
        body.appendChild(canvas);
    }

    // Delete DOM element <canvas> with the specified id
    function deleteCanvasDOM(id) {
        var body, canvas;
        body = document.getElementsByTagName('body')[0];
        canvas = document.getElementById(id);
        body.removeChild(canvas);
    }


    this.getDiffPixels = function () {
        deleteImgDOM('etalonImage');
        return _bounds;
    }

    this.result = function () {

        var test = true;
        return test;
    }



}
