/**
 * ScreenTest Library
 *
 * Copyright (c) 2012, Andrey Chizh
 * All rights reserved.
 */

/**
 * Constructor for a new ScreenTest instance.
 *
 * Example:
 * var test = new ScreenTest([0,24,1440,900], 'img/test', 'ff12', 'png');
 *
 * @param {Array} bounds
 * @param {String} href
 * @param {String} browser
 * @param {String} imgType
 */
var ScreenTest = function(bounds, href, browser, imgType) {


    var result;


    /********************************************************/
    /*                    Events Functions                  */
    /********************************************************/

    // Start test on window.onload event
    window.onload = function() {
        compareImages(bounds);

    }


    // when load images
    function onloadImagesDOM(id) {
        console.log('load img : ' + id);
    }


    // this.result = function () {
    //     return result;
    // }


    function compareImages(bounds) {
        var imagesData;
        var imageDataLength;
        var etalonImagePixel, testImagePixel;
        var imageWidth;
        var allPixels = 1,
            errorPixels = 1;

        imagesData = getImagesData();

        etalonImagePixel = imagesData.etalon.data;
        testImagePixel = imagesData.test.data;

        imageDataLength = testImagePixel.length;
        imageWidth = imagesData.width * 4;

        for (var i = 0; i < imageDataLength; i += 4) {
            if ((i > bounds[0] * 4 + imageWidth * parseInt(i / imageWidth)) &&
                (i > bounds[1] * imageWidth) &&
                (i < bounds[2] * 4 + imageWidth * parseInt(i / imageWidth)) &&
                (i < bounds[3] * imageWidth)) {

                allPixels += 1;

                if (etalonImagePixel[i] != testImagePixel[i]) {
                    testImagePixel[i] = 255;
                    testImagePixel[i + 1] = 0;
                    testImagePixel[i + 2] = 0;

                    errorPixels += 1;
                }
            }
        }

        result = (errorPixels / allPixels) * 100;

        imagesData.ctx.putImageData(imagesData.test, 0, 0);

        alert(result.toFixed(3) + ' %');

    }


    function getImagesData() {
        var imagesSrc;
        var etalonImage, testImage;
        var imageWidth, imageHeight;
        var etalonCanvas, testCanvas;
        var etalonCtx, testCtx;
        var etalonImageData, testImageData;
        var imagesData = {};

        imagesSrc = getImagesSrc(href, browser, imgType);
        etalonImage = createImageDOM('screentest-etalon-image', imagesSrc.etalon);
        testImage = createImageDOM('screentest-test-image', imagesSrc.test);

        imageWidth = testImage.width;
        imageHeight = testImage.height;

        etalonCanvas = createCanvasDOM('screentest-etalon-canvas', imageWidth, imageHeight);
        testCanvas = createCanvasDOM('screentest-test-canvas', imageWidth, imageHeight);

        etalonCtx = etalonCanvas.getContext('2d');
        testCtx = testCanvas.getContext('2d');

        etalonCtx.drawImage(etalonImage, 0, 0);
        testCtx.drawImage(testImage, 0, 0);

        etalonImageData = etalonCtx.getImageData(0, 0, imageWidth, imageHeight);
        testImageData = testCtx.getImageData(0, 0, imageWidth, imageHeight);

        imagesData.etalon = etalonImageData;
        imagesData.test = testImageData;
        imagesData.width = imageWidth;
        imagesData.ctx = testCtx;

        return imagesData;
    }


    /********************************************************/
    /*                Src Images Function                   */
    /********************************************************/

    /**
     * Compile src for DOM elements <img> by the specified href, browser and imgType
     * @param {String} href
     * @param {String} browser
     * @param {String} imgType
     * @return {String}
     */
    function getImagesSrc(href, browser, imgType) {
        var imagesSrc = {};
        imagesSrc.etalon = href + '/' + 'img-etalon-' + browser + '.' + imgType;
        imagesSrc.test = href + '/' + 'img-test-' + browser + '.' + imgType;
        return imagesSrc;
    }

    /********************************************************/
    /*              DOM Elements Functions                  */
    /********************************************************/

    /**
     * Create DOM element <img> with the specified id and src
     * @param {String} id
     * @param {String} src
     * @return {DOMElement}
     */
    function createImageDOM(id, src) {
        var body, img;
        body = document.getElementsByTagName('body')[0];
        img = document.createElement('img');
        img.id = id;
        img.onload = onloadImagesDOM(id);
        img.src = src;
        body.appendChild(img);
        return img;
    }

    /**
     * Delete DOM element <img> with the specified id
     * @param {String} id
     */
    function deleteImageDOM(id) {
        var body, img;
        body = document.getElementsByTagName('body')[0];
        img = document.getElementById(id);
        body.removeChild(img);
    }

    /**
     * Create DOM element <canvas> with the specified id, width and height
     * @param {String} id
     * @param {String} src
     * @return {DOMElement}
     */
    function createCanvasDOM(id, width, height) {
        var body, canvas;
        body = document.getElementsByTagName('body')[0];
        canvas = document.createElement('canvas');
        canvas.id = id;
        canvas.width = width;
        canvas.height = height;
        body.appendChild(canvas);
        return canvas;
    }

    /**
     * Delete DOM element <canvas> with the specified id
     * @param {String} id
     */
    function deleteCanvasDOM(id) {
        var body, canvas;
        body = document.getElementsByTagName('body')[0];
        canvas = document.getElementById(id);
        body.removeChild(canvas);
    }

}
